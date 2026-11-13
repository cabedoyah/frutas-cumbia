// Estadísticas para el panel /admin. Protegido con la variable de entorno ADMIN_PASSWORD.
// GET  → devuelve los contadores
// POST {action:"reset"} → borra todas las estadísticas
const crypto = require("crypto");
const { pipe, body } = require("./_lib");

const KEYS = ["fc:starts", "fc:ends", "fc:day:s", "fc:day:e", "fc:ans", "fc:fruit"];

function authorized(req) {
  const pass = process.env.ADMIN_PASSWORD || "";
  const sent = String(req.headers["x-admin-key"] || "");
  const a = crypto.createHash("sha256").update(sent).digest();
  const b = crypto.createHash("sha256").update(pass).digest();
  return pass.length > 0 && crypto.timingSafeEqual(a, b);
}

const hash = (arr) => { const o = {}; for (let i = 0; i < (arr || []).length; i += 2) o[arr[i]] = +arr[i + 1]; return o; };

module.exports = async (req, res) => {
  res.setHeader("Cache-Control", "no-store");
  if (!process.env.ADMIN_PASSWORD) { res.status(500).json({ error: "Falta la variable ADMIN_PASSWORD en Vercel." }); return; }
  if (!authorized(req)) { res.status(401).json({ error: "Contraseña incorrecta." }); return; }

  try {
    if (req.method === "POST") {
      const b = await body(req);
      if (b.action !== "reset") { res.status(400).json({ error: "Acción no válida." }); return; }
      await pipe([["DEL", ...KEYS]]);
      res.status(200).json({ ok: true });
      return;
    }
    const [s, e, ds, de, ans, fr] = await pipe([
      ["GET", KEYS[0]], ["GET", KEYS[1]], ["HGETALL", KEYS[2]], ["HGETALL", KEYS[3]], ["HGETALL", KEYS[4]], ["HGETALL", KEYS[5]],
    ]);
    res.status(200).json({
      starts: +s || 0, ends: +e || 0,
      dayStart: hash(ds), dayEnd: hash(de), answers: hash(ans), fruits: hash(fr),
    });
  } catch (err) {
    if (err.code === "NO_DB") res.status(503).json({ error: "La base de datos no está conectada. En Vercel: Storage → Upstash Redis → Connect al proyecto, y vuelve a desplegar." });
    else res.status(500).json({ error: "Error leyendo la base de datos." });
  }
};
