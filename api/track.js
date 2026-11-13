// Registro anónimo de partidas. Solo cuenta: no guarda IPs, nombres ni nada personal.
// t:"s" = empezó una partida · t:"a" = respondió (q = id de pregunta, d = opción 0-3) · t:"e" = terminó (f = fruta)
const { pipe, day, body } = require("./_lib");

module.exports = async (req, res) => {
  if (req.method !== "POST") { res.status(405).end(); return; }
  let b;
  try { b = await body(req); } catch (e) { res.status(400).end(); return; }

  const P = "fc:", d = day();
  let cmds = null;
  if (b.t === "s") {
    cmds = [["INCR", P + "starts"], ["HINCRBY", P + "day:s", d, 1]];
  } else if (b.t === "a" && /^[a-z0-9]{1,12}$/.test(b.q) && [0, 1, 2, 3].includes(b.d)) {
    cmds = [["HINCRBY", P + "ans", b.q + "." + b.d, 1]];
  } else if (b.t === "e" && typeof b.f === "string" && b.f.length <= 40 && /^[\p{L} ]+$/u.test(b.f)) {
    cmds = [["INCR", P + "ends"], ["HINCRBY", P + "day:e", d, 1], ["HINCRBY", P + "fruit", b.f, 1]];
  }
  if (!cmds) { res.status(400).end(); return; }

  try { await pipe(cmds); res.status(204).end(); }
  catch (e) { res.status(e.code === "NO_DB" ? 503 : 500).end(); }
};
