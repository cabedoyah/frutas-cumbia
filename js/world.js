/* =========================================================
   EDIFICIO: plantas, salas y escenas
   Planta 1 = tu plano (3 laboratorios, sala de becarios, pasillo,
   oficina de estudiantes y 3 despachos). Planta baja = cafetería,
   aula magna y vestíbulo.
   ========================================================= */
const FLOORS={
  1:{n:"Planta 1",corr:{axis:"h",v:143},stairs:[26,143]},
  0:{n:"Planta baja",corr:{axis:"v",v:302},stairs:[352,54]},
};
const ROOMS={
  lab1:{n:"Laboratorio 1",floor:1,x:8,y:8,w:96,h:118,door:[80,126],type:"lab",c:"#d3f9d8"},
  lab2:{n:"Laboratorio 2",floor:1,x:104,y:8,w:96,h:118,door:[176,126],type:"lab",c:"#d3f9d8"},
  lab3:{n:"Laboratorio 3",floor:1,x:200,y:8,w:96,h:118,door:[272,126],type:"lab",c:"#d3f9d8"},
  becarios:{n:"Sala de becarios",floor:1,x:296,y:8,w:96,h:118,door:[312,126],type:"becarios",c:"#e7f5ff"},
  est:{n:"Oficina de estudiantes",floor:1,x:8,y:160,w:96,h:122,door:[56,160],type:"office",c:"#fff3bf"},
  prof1:{n:"Despacho 1",floor:1,x:104,y:160,w:96,h:122,door:[152,160],type:"prof",c:"#ffe3e3",boss:"deadline"},
  prof2:{n:"Despacho 2",floor:1,x:200,y:160,w:96,h:122,door:[248,160],type:"prof",c:"#ffe3e3",boss:"revisor"},
  prof3:{n:"Despacho 3",floor:1,x:296,y:160,w:96,h:122,door:[344,160],type:"prof",c:"#ffe3e3",boss:"burocracia"},
  cafe:{n:"Cafetería",floor:0,x:8,y:8,w:252,h:150,door:[260,84],type:"cafe",c:"#ffe8cc"},
  aula:{n:"Aula Magna",floor:0,x:8,y:166,w:252,h:116,door:[260,224],type:"aula",c:"#f3f0ff"},
};

/* ---------- plano de una planta ---------- */
function mapSVG(floor,info){
  const F=FLOORS[floor];let s="";
  const label=(r)=>{const lines=r.n.split(" ");const two=r.w<120&&lines.length>1;
    const t=two?[lines.slice(0,Math.ceil(lines.length/2)).join(" "),lines.slice(Math.ceil(lines.length/2)).join(" ")]:[r.n];
    return t.map((l,i)=>`<text x="${r.x+r.w/2}" y="${r.y+r.h/2+(i-(t.length-1)/2)*15+5}" text-anchor="middle" font-family="Patrick Hand" font-size="${two?14:17}" fill="${INK}">${l}</text>`).join("")};
  if(floor==1){
    s+=`<rect x="8" y="126" width="384" height="34" fill="#dee2e6" stroke="${INK}" stroke-width="3"/>`;
    s+=`<text x="210" y="148" text-anchor="middle" font-family="Patrick Hand" font-size="13" fill="#868e96">pasillo</text>`;
  }else{
    s+=`<rect x="260" y="8" width="132" height="274" fill="#dee2e6" stroke="${INK}" stroke-width="3"/>`;
    s+=`<text x="326" y="150" text-anchor="middle" font-family="Patrick Hand" font-size="15" fill="#868e96">Vestíbulo</text>`;
    s+=`<rect x="300" y="270" width="52" height="12" fill="#a5d8ff" stroke="${INK}" stroke-width="2.5"/><text x="326" y="264" text-anchor="middle" font-family="Patrick Hand" font-size="11" fill="#868e96">entrada</text>`;
  }
  Object.entries(ROOMS).filter(([,r])=>r.floor==floor).forEach(([id,r])=>{
    const locked=info.locked&&info.locked[id];
    s+=`<g class="room" data-room="${id}" style="cursor:pointer"><rect x="${r.x}" y="${r.y}" width="${r.w}" height="${r.h}" fill="${locked?"#e9ecef":r.c}" stroke="${INK}" stroke-width="3"/>`;
    s+=miniDeco(id,r);
    s+=label(r);
    if(locked)s+=`<text x="${r.x+r.w/2}" y="${r.y+r.h/2+30}" text-anchor="middle" font-size="18">🔒</text>`;
    s+=`</g>`;
    // puerta
    const[dx,dy]=r.door;s+=floor==1?`<rect x="${dx-11}" y="${dy-4}" width="22" height="8" fill="#dee2e6"/>`:`<rect x="${dx-4}" y="${dy-12}" width="8" height="24" fill="#dee2e6"/>`;
    if(info.marks&&info.marks[id])s+=`<g class="mark"><circle cx="${r.x+r.w-14}" cy="${r.y+16}" r="11" fill="#ffd43b" stroke="${INK}" stroke-width="2.5"/><text x="${r.x+r.w-14}" y="${r.y+22}" text-anchor="middle" font-family="Chewy" font-size="17" fill="${INK}">!</text></g>`;
  });
  // escaleras
  const[sx,sy]=F.stairs;
  s+=`<g class="stairs" style="cursor:pointer"><rect x="${sx-15}" y="${sy-14}" width="30" height="28" rx="5" fill="#fff" stroke="${INK}" stroke-width="2.5"/>`;
  for(let i=0;i<4;i++)s+=`<path d="M${sx-10+i*5} ${sy+8-i*5}h5v-5" fill="none" stroke="${INK}" stroke-width="2"/>`;
  s+=`<text x="${sx}" y="${sy+27}" text-anchor="middle" font-family="Patrick Hand" font-size="11" fill="${INK}">${floor==1?"↓ bajar":"↑ subir"}</text></g>`;
  return`<svg viewBox="0 0 400 290" class="mapsvg" xmlns="http://www.w3.org/2000/svg"><g filter="url(#wob)">${s}</g><g id="me"></g></svg>`;
}
/* decoración mínima dentro de cada sala en el plano */
function miniDeco(id,r){const{x,y,w,h}=r;let s="";const st=`stroke="${INK}" stroke-width="2"`;
  if(r.type==="lab")s+=`<rect x="${x+10}" y="${y+12}" width="${w-20}" height="14" fill="#e9ecef" ${st}/><text x="${x+18}" y="${y+24}" font-size="10">🧪⚗️🔬</text>`;
  if(r.type==="becarios"){ // como tu plano: sofás azules en L y la mesa roja
    s+=`<g fill="#4c6ef5" ${st}><rect x="${x+4}" y="${y+4}" width="12" height="70"/><rect x="${x+16}" y="${y+4}" width="${w-22}" height="12"/><rect x="${x+w-14}" y="${y+16}" width="12" height="${h-20}"/><rect x="${x+44}" y="${y+h-16}" width="${w-58}" height="12"/></g>`;
    s+=`<rect x="${x+w/2-6}" y="${y+34}" width="18" height="32" fill="#c92a2a" ${st}/>`}
  if(r.type==="office")s+=`<rect x="${x+8}" y="${y+h-30}" width="30" height="20" fill="#ffe066" ${st}/><rect x="${x+w-38}" y="${y+h-30}" width="30" height="20" fill="#ffe066" ${st}/>`;
  if(r.type==="prof")s+=`<rect x="${x+w/2-20}" y="${y+h-34}" width="40" height="18" fill="#a17f5c" ${st}/>`;
  if(r.type==="cafe"){[[40,110],[90,120],[150,112],[205,118]].forEach(([a,b])=>s+=`<circle cx="${x+a}" cy="${y+b}" r="11" fill="#ffc078" ${st}/>`);s+=`<rect x="${x+10}" y="${y+10}" width="${w-20}" height="16" fill="#a17f5c" ${st}/><text x="${x+20}" y="${y+23}" font-size="11">☕🍺🥟</text>`}
  if(r.type==="aula")for(let i=0;i<3;i++)s+=`<rect x="${x+40}" y="${y+60+i*14}" width="${w-80}" height="8" fill="#d0bfff" ${st}/>`;
  return s}
/* ruta por el pasillo desde un punto a otro de la misma planta */
function corridorPath(floor,from,to){const c=FLOORS[floor].corr;
  const P=c.axis==="h"?[[from[0],c.v],[to[0],c.v]]:[[c.v,from[1]],[c.v,to[1]]];return[from,...P,to]}

/* ---------- fondos de las salas (escena) ---------- */
function sceneSVG(type,roomId){const st=`stroke="${INK}" stroke-width="3" stroke-linejoin="round"`;let s="";
  const wall={lab:"#e6fcf5",becarios:"#e7f5ff",office:"#fff9db",prof:"#fff0f6",cafe:"#fff4e6",aula:"#f3f0ff"}[type]||"#fff";
  s+=`<rect x="0" y="0" width="360" height="210" fill="${wall}"/><rect x="0" y="150" width="360" height="60" fill="${type==="cafe"?"#e8c39e":"#e9ecef"}" ${st}/>`;
  for(let i=0;i<360;i+=40)s+=`<path d="M${i} 150L${i-20} 210" stroke="#ced4da" stroke-width="2"/>`;
  const win=(x,y)=>`<rect x="${x}" y="${y}" width="70" height="50" fill="#a5d8ff" ${st}/><path d="M${x+35} ${y}V${y+50}M${x} ${y+25}H${x+70}" stroke="${INK}" stroke-width="2.5"/>`;
  if(type==="lab"){s+=win(20,20)+`<rect x="110" y="18" width="120" height="70" fill="#fff" ${st}/><text x="170" y="48" text-anchor="middle" font-family="Patrick Hand" font-size="16">E = mc² ± café</text><text x="170" y="72" text-anchor="middle" font-family="Patrick Hand" font-size="13" fill="#e03131">¡NO TOCAR!</text>`;
    s+=`<rect x="10" y="112" width="340" height="16" fill="#adb5bd" ${st}/><rect x="20" y="128" width="10" height="22" fill="#868e96" ${st}/><rect x="330" y="128" width="10" height="22" fill="#868e96" ${st}/>`;
    s+=`<text x="250" y="108" font-size="30">🔬</text><text x="300" y="108" font-size="26">⚗️</text><g class="bubbling"><text x="50" y="108" font-size="26">🧪</text></g><text x="90" y="108" font-size="24">🧫</text><text x="250" y="60" font-size="26">🧯</text>`}
  if(type==="becarios"){s+=win(140,16);
    s+=`<g fill="#4c6ef5" ${st}><rect x="10" y="80" width="40" height="70" rx="8"/><rect x="10" y="80" width="250" height="26" rx="8"/><rect x="300" y="60" width="50" height="90" rx="8"/></g>`;
    s+=`<rect x="130" y="118" width="110" height="20" fill="#c92a2a" ${st}/><rect x="140" y="138" width="8" height="14" fill="#862e9c"/><rect x="222" y="138" width="8" height="14" fill="#862e9c"/><text x="150" y="116" font-size="20">🥟☕🍌</text><text x="270" y="40" font-size="26">🪴</text>`}
  if(type==="office"){s+=`<rect x="200" y="18" width="140" height="70" fill="#fff" ${st}/><path d="M212 40q20 -16 40 0t40 0" stroke="#4dabf7" stroke-width="3" fill="none"/><text x="270" y="78" text-anchor="middle" font-family="Patrick Hand" font-size="14">Plan de tesis v37</text>`;
    s+=win(30,20)+`<rect x="10" y="110" width="160" height="14" fill="#ffd43b" ${st}/><rect x="190" y="110" width="160" height="14" fill="#ffd43b" ${st}/><text x="40" y="106" font-size="26">💻</text><text x="120" y="106" font-size="22">📚</text><text x="220" y="106" font-size="26">🖥️</text><text x="300" y="106" font-size="22">☕</text>`}
  if(type==="prof"){s+=`<rect x="20" y="20" width="90" height="120" fill="#a17f5c" ${st}/>`;for(let i=0;i<3;i++)s+=`<rect x="26" y="${30+i*36}" width="78" height="26" fill="#e9c46a" ${st}/>`;
    s+=`<rect x="240" y="24" width="70" height="50" fill="#fff" ${st}/><text x="275" y="55" text-anchor="middle" font-size="22">📜</text><rect x="130" y="112" width="200" height="16" fill="#8d5524" ${st}/><text x="150" y="108" font-size="24">📁</text><text x="290" y="108" font-size="22">🖋️</text>`;
    s+=`<text x="150" y="70" font-family="Patrick Hand" font-size="14" fill="#c92a2a">Horario de atención: nunca</text>`}
  if(type==="cafe"){s+=`<rect x="0" y="70" width="360" height="44" fill="#a17f5c" ${st}/><rect x="20" y="14" width="150" height="48" fill="#343a40" ${st}/><text x="95" y="34" text-anchor="middle" font-family="Patrick Hand" font-size="13" fill="#fff">☕ Café 10 · 🥟 Empanada 15</text><text x="95" y="52" text-anchor="middle" font-family="Patrick Hand" font-size="13" fill="#ffd43b">🍺 Cerveza 20 · Fiado NO</text>`;
    s+=`<text x="200" y="66" font-size="34">☕</text><text x="250" y="66" font-size="30">🍺</text><text x="300" y="66" font-size="28">🥟</text><g class="steam"><text x="206" y="30" font-size="16">〰️</text></g>`}
  if(type==="aula"){s+=`<rect x="80" y="14" width="200" height="30" fill="#7048e8" ${st}/><text x="180" y="35" text-anchor="middle" font-family="Chewy" font-size="17" fill="#fff">DEFENSA DE TESIS</text><rect x="40" y="56" width="280" height="70" fill="#fff" ${st}/><text x="180" y="96" text-anchor="middle" font-family="Patrick Hand" font-size="16">“Conclusiones: hay que hacer más estudios”</text>`;
    s+=`<rect x="150" y="128" width="60" height="24" fill="#8d5524" ${st}/>`}
  return`<svg viewBox="0 0 360 210" class="scenesvg" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg"><g filter="url(#wob)">${s}</g></svg>`;
}
