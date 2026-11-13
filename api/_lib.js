// Utilidades compartidas (el "_" del nombre hace que Vercel no la publique como endpoint).
// Habla con Upstash Redis por su API REST, sin dependencias.

function cfg() {
  const e = process.env;
  let url = e.KV_REST_API_URL || e.UPSTASH_REDIS_REST_URL;
  let token = e.KV_REST_API_TOKEN || e.UPSTASH_REDIS_REST_TOKEN;
  // Por si la integración se creó con un prefijo personalizado (p. ej. STORAGE_KV_REST_API_URL)
  if (!url || !token) {
    for (const k of Object.keys(e)) {
      if (!url && /(REST_API_URL|REDIS_REST_URL)$/.test(k)) url = e[k];
      if (!token && /(REST_API_TOKEN|REDIS_REST_TOKEN)$/.test(k) && !/READ_ONLY/.test(k)) token = e[k];
    }
  }
  return { url, token };
}

async function pipe(cmds) {
  const { url, token } = cfg();
  if (!url || !token) { const err = new Error("NO_DB"); err.code = "NO_DB"; throw err; }
  const r = await fetch(url.replace(/\/$/, "") + "/pipeline", {
    method: "POST",
    headers: { Authorization: "Bearer " + token, "Content-Type": "application/json" },
    body: JSON.stringify(cmds),
  });
  if (!r.ok) throw new Error("DB " + r.status);
  return (await r.json()).map((x) => x.result);
}

// Día en hora de España, formato AAAA-MM-DD
function day() {
  return new Date().toLocaleDateString("sv-SE", { timeZone: "Europe/Madrid" });
}

async function body(req) {
  let b = req.body;
  if (b === undefined) {
    b = await new Promise((ok, ko) => {
      let d = "";
      req.on("data", (c) => { d += c; if (d.length > 4000) ko(new Error("too big")); });
      req.on("end", () => ok(d));
      req.on("error", ko);
    });
  }
  if (Buffer.isBuffer(b)) b = b.toString("utf8");
  if (typeof b === "string") b = JSON.parse(b || "{}");
  return b || {};
}

module.exports = { pipe, day, body };
