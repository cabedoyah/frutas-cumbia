/* =========================================================
   PERSONAJES
   👉 name = nombre del personaje cuando aparece en el juego. Al elegir personaje no se
   muestra: cada jugador escribe el suyo. mv = sus 4 ataques [golpe, especial, defensa, curación].
   look: skin (piel) · hs (peinado: none|afro|curly|short|short2|long|ponytail|bun|fern|bald)
         hc (color de pelo) · gl (gafas: round|thin|red|cat|thick) · gc (color gafas)
         h (altura, 1 = normal) · w (anchura) · top (camiseta) · pants · coat (bata)
         fem (pestañas) · must (bigote) · beard (barba) · tie (corbata) · apron (delantal)
   st:   fuerza (daño) · aguante (vida) · suerte (pistas y críticos) · vista (tiempo al buscar)
   ========================================================= */
const ROSTER=[
  // ---- Sala de becarios ----
  {id:"samuel",name:"Jorge",room:"becarios",tag:"Ritmo en las venas",
   look:{skin:"#7b4a2d",hs:"none",top:"#ffd43b",pants:"#364fc7"},
   st:{fuerza:7,aguante:6,suerte:5,vista:4},mv:[{n:"Paso de cumbia",txt:"se marca un paso de cumbia que te deja mareado"},{n:"Remix demoledor",txt:"pone el remix a todo volumen y tiembla el laboratorio"},{n:"Código que funciona",txt:"se esconde detrás de un código que funciona (nadie sabe por qué)"},{n:"Segundo almuerzo",txt:"se come su segundo almuerzo del día"}],
   lines:["¿Ya almorzaste? Yo ya, dos veces.","Si el experimento no sale, se le pone música.","Mi código funciona. No sé por qué, pero funciona."]},
  {id:"mateo",name:"Cachopo Flavor",room:"becarios",tag:"Abrazos y arepas",
   look:{skin:"#f1c27d",hs:"short",hc:"#4a2c1d",w:1.35,top:"#ff8787",pants:"#495057"},
   st:{fuerza:6,aguante:9,suerte:4,vista:3},mv:[{n:"Abrazo de oso",txt:"da un abrazo de oso que nadie pidió"},{n:"Cachopo volador",txt:"lanza un cachopo gigante por los aires"},{n:"Siesta defensiva",txt:"se echa una siesta y los golpes rebotan"},{n:"Arepa de emergencia",txt:"saca una arepa de emergencia del bolsillo"}],
   lines:["Traje arepas para todos. Bueno, para mí, y si sobra…","El secreto de la ciencia es la siesta.","¿Quién se comió mi yogur de la nevera? Tengo sospechosos."]},
  {id:"julian",name:"Lechero Mayor",room:"becarios",tag:"Ve todo desde arriba",
   look:{skin:"#e8b98a",hs:"short2",hc:"#2b1d14",gl:"round",gc:"#2b2d42",h:1.18,top:"#69db7c",pants:"#343a40"},
   st:{fuerza:5,aguante:5,suerte:4,vista:8},mv:[{n:"Mirada desde arriba",txt:"te mira desde 1,90 m con decepción"},{n:"Vaso de leche rebosante",txt:"te lanza un vaso de leche bien lleno"},{n:"Agacharse a tiempo",txt:"se agacha como con la lámpara"},{n:"Leche con galletas",txt:"se toma un vaso de leche con galletas"}],
   lines:["Desde aquí arriba veo todos tus errores de ortografía.","Me pegué con la lámpara otra vez.","Revisé tu gráfica. Le falta la leyenda… y el sentido."]},
  {id:"lucia",name:"Miss Annoying",room:"becarios",tag:"Brilla hasta en el sótano",
   look:{skin:"#ffe0bd",hs:"long",hc:"#f2c14e",fem:1,top:"#da77f2",pants:"#5f3dc4"},
   st:{fuerza:5,aguante:5,suerte:8,vista:4},mv:[{n:"¿Ya? ¿Ya? ¿Ya?",txt:"pregunta “¿ya?” cada tres segundos"},{n:"Insistencia infinita",txt:"te manda 14 mensajes seguidos con stickers"},{n:"Ignorar con estilo",txt:"se acomoda el pelo y te ignora con elegancia"},{n:"Café de desesperación",txt:"se toma un café que sabe a desesperación"}],
   lines:["¿Alguien ha visto mi bata? Ah, la tengo puesta.","Hoy el café sabe a desesperación. Me gusta.","Mi plan: publicar, dormir, repetir."]},
  {id:"valeria",name:"Gloria Isabel",room:"becarios",tag:"Detecta errores a 10 metros",
   look:{skin:"#f3c89f",hs:"ponytail",hc:"#3b2416",gl:"red",fem:1,top:"#4dabf7",pants:"#343a40"},
   st:{fuerza:6,aguante:4,suerte:5,vista:7},mv:[{n:"Mirada láser roja",txt:"te escanea con sus gafas rojas"},{n:"Tabla dinámica letal",txt:"te aplasta con una tabla dinámica de 40 columnas"},{n:"Control de cambios",txt:"activa el control de cambios y rechaza tu ataque"},{n:"Autoguardado",txt:"se autoguarda y vuelve a una versión anterior"}],
   lines:["Estas gafas rojas detectan mentiras y faltas de ortografía.","Corregí tu póster. Ya no queda nada del original.","Si no está en Excel, no existe."]},
  {id:"sofia",name:"Eli",room:"becarios",tag:"Pequeña pero peligrosa",
   look:{skin:"#f5cfa0",hs:"bun",hc:"#5a3825",fem:1,h:.86,top:"#ffa94d",pants:"#1864ab"},
   st:{fuerza:7,aguante:4,suerte:6,vista:5},mv:[{n:"Ataque sorpresa",txt:"aparece de la nada (nadie la vio venir)"},{n:"Centrífuga desequilibrada",txt:"suelta la centrífuga sin equilibrar"},{n:"Escondite tras la escalera",txt:"se esconde detrás de su escalera"},{n:"Mordisco de paper",txt:"muerde un paper y recupera energía"}],
   lines:["Soy pequeña pero llego a todo. Con escalera.","La centrífuga y yo tenemos una relación complicada.","No me subestimes: muerdo papers."]},
  {id:"diego",name:"Pablo Canario",room:"becarios",tag:"47 pestañas abiertas",
   look:{skin:"#eac08f",hs:"short2",hc:"#1f1a17",gl:"thin",w:.84,top:"#a9e34b",pants:"#495057"},
   st:{fuerza:4,aguante:4,suerte:6,vista:8},mv:[{n:"Cita bibliográfica",txt:"te lanza una cita en formato APA"},{n:"Avalancha de 47 pestañas",txt:"abre 47 pestañas a la vez y el sistema colapsa"},{n:"No es significativo",txt:"declara que tu ataque “no es significativo”"},{n:"Café y pánico",txt:"se toma un café con una pizca de pánico"}],
   lines:["Citando a mi otro yo: “eso no es significativo”.","Tengo 47 pestañas abiertas y todas son importantes.","Mi dieta: café y pánico."]},
  {id:"tomas",name:"Mr Jaimy",room:"becarios",tag:"Rizos con electricidad",
   look:{skin:"#e9b98e",hs:"curly",hc:"#3d2a1e",top:"#f783ac",pants:"#364fc7"},
   st:{fuerza:6,aguante:6,suerte:6,vista:4},mv:[{n:"Rizo eléctrico",txt:"carga electricidad estática en los rizos y ¡zas!"},{n:"Experimento nº 15",txt:"repite el experimento por decimoquinta vez y explota"},{n:"Pronóstico de lluvia",txt:"sus rizos predicen el ataque y se cubre"},{n:"Repetir y rezar",txt:"repite todo desde el principio y reza"}],
   lines:["Mi pelo predice la humedad mejor que el higrómetro.","¿Repetimos el experimento? Ya van 14.","Esto es ciencia: nadie sabe nada, pero con estilo."]},
  // ---- Oficina de estudiantes ----
  {id:"fernando",name:"Dr. Cumbia",room:"est",tag:"El que sabe qué fruta eres",
   look:{skin:"#ffd8a8",hs:"fern",hc:"#5c3d2e",gl:"round",gc:"#2b2d42",must:"#5c3d2e",coat:1,top:"#74c0fc",pants:"#343a40"},
   st:{fuerza:6,aguante:6,suerte:7,vista:6},mv:[{n:"Veredicto frutal",txt:"te dice qué fruta eres y te duele"},{n:"Lluvia de durianes",txt:"hace llover durianes. El olor también hace daño"},{n:"Teoría del Dr. Cumbia",txt:"si no lo mira, no existe: tu ataque no existe"},{n:"Café 30% fe",txt:"se toma un café 70% agua y 30% fe"}],
   lines:["Yo sé qué fruta eres. Tú todavía no.","El café de abajo es 70% agua y 30% fe.","Los profesores no muerden. Bueno, una sí.","Si me buscan, estoy en el laboratorio. Si no, también."]},
  {id:"paula",name:"Doña Bonsái",room:"est",tag:"Bajita, imparable",
   look:{skin:"#f6d2a8",hs:"long",hc:"#2b1a12",fem:1,h:.72,top:"#ff6b6b",pants:"#343a40"},
   st:{fuerza:6,aguante:4,suerte:7,vista:6},mv:[{n:"Ataque al tobillo",txt:"ataca donde nadie mira: el tobillo"},{n:"Galleta de 2021",txt:"lanza la galleta de 2021 que había debajo de la mesa"},{n:"Armario número 3",txt:"se esconde en el armario de reactivos número 3"},{n:"Media galleta",txt:"se come media galleta (no la del suelo)"}],
   lines:["Desde aquí abajo veo cosas que ustedes no.","No alcanzo el estante, pero alcanzo mis metas.","Me escondí en el armario de reactivos y nadie lo notó en 3 horas."]},
  {id:"nico",name:"Mister Azulejo",room:"est",tag:"La camiseta azul de la suerte",
   look:{skin:"#efc49a",hs:"short",hc:"#3b2a1d",h:.86,top:"#1c7ed6",pants:"#495057"},
   st:{fuerza:5,aguante:5,suerte:8,vista:5},mv:[{n:"Ola azul",txt:"desata una ola azul"},{n:"Golpe de la camiseta",txt:"la camiseta de la suerte hace su magia"},{n:"Plan perfecto (paso 1)",txt:"pone en marcha el paso 1 de su plan perfecto"},{n:"Lavado a mano",txt:"lava la camiseta a mano y recupera la suerte"}],
   lines:["Esta camiseta azul es mi uniforme de la suerte.","Tengo un plan perfecto. Bueno, un plan.","¿Alguien quiere mi turno en el microscopio? Lo ofrezco una sola vez."]},
  {id:"alex",name:"Irama",room:"est",tag:"Cambia bombillas sin escalera",
   look:{skin:"#d9a679",hs:"short2",hc:"#20160f",h:1.2,top:"#868e96",pants:"#212529"},
   st:{fuerza:7,aguante:7,suerte:4,vista:5},mv:[{n:"Bloqueo de altura",txt:"levanta el brazo y nadie alcanza nada"},{n:"Hit del verano",txt:"canta su hit del verano y a todos les duelen los oídos"},{n:"Bombilla cegadora",txt:"cambia una bombilla y te deslumbra"},{n:"Galleta del estante alto",txt:"alcanza las galletas del estante de arriba"}],
   lines:["Si necesitas algo del estante de arriba, cobro en galletas.","Mi superpoder: cambiar bombillas sin escalera.","Me agacho para entrar al laboratorio. Por respeto."]},
  {id:"marta",name:"Lady Plan B",room:"est",tag:"Siempre tiene un plan B",
   look:{skin:"#f0c8a0",hs:"long",hc:"#8a3b1d",fem:1,top:"#20c997",pants:"#343a40"},
   st:{fuerza:5,aguante:6,suerte:6,vista:6},mv:[{n:"Reserva a las 7 a.m.",txt:"reserva el equipo a las 7 y no te deja usarlo"},{n:"Plan B, C y D",txt:"saca un plan B, C y D de la manga"},{n:"Excelente pregunta",txt:"dice “excelente pregunta” y mira por la ventana"},{n:"Café de las 11",txt:"se toma el café de las 11 (lo reservó a las 7)"}],
   lines:["Tengo un plan B, un plan C y un café.","Reservé el equipo para las 7 a.m. Lo usaré a las 11.","¿Seminario a las 9? Mi alma llega a las 10."]},
];

/* NPC que no se puede elegir */
const BARISTA={id:"tinto",name:"Don Tinto",tag:"El de la cafetería",
  look:{skin:"#c68e5d",hs:"bald",hc:"#495057",must:"#343a40",top:"#fff4e6",apron:"#8d5524",pants:"#343a40",w:1.12},
  st:{fuerza:6,aguante:6,suerte:7,vista:5},mv:[{n:"Tinto hirviendo",txt:"sirve un tinto a temperatura volcánica"},{n:"Empanada de ayer",txt:"te lanza una empanada de ayer, durísima"},{n:"Fiado no",txt:"dice “fiado no” y se cruza de brazos"},{n:"Café de la casa",txt:"se sirve un café de la casa"}],
  lines:["Café 10, empanada 15, cerveza 20. Fiado no.","El café de hoy está fuerte. Tu tesis no tanto.","Los viernes la cerveza sabe a libertad."]};

/* Jefes: los profesores (personajes inventados) */
const BOSSES={
  deadline:{id:"deadline",name:"Dra. Deadline",title:"Señora de los plazos",room:"prof1",
    look:{skin:"#f1c9a5",hs:"bun",hc:"#adb5bd",gl:"cat",gc:"#7048e8",fem:1,top:"#862e9c",pants:"#343a40",h:1.02},
    hp:145,atk:9,def:6,
    intro:"¿Entregaste el informe? Era para AYER.",win:"…Bien. Pero el siguiente es para hoy.",lose:"Plazo vencido. Vuelve cuando estés listo.",
    moves:[{n:"Plazo adelantado",pow:20,acc:92,txt:"adelanta tu entrega dos semanas"},
           {n:"Correo a las 23:59",pow:12,acc:100,eff:"debuff",txt:"te manda un correo a las 23:59"},
           {n:"Reunión de 3 horas",pow:0,acc:80,eff:"stun",txt:"convoca una reunión de 3 horas"},
           {n:"Reloj implacable",pow:34,acc:85,eff:"charge",txt:"mira su reloj fijamente…"}]},
  revisor:{id:"revisor",name:"Dr. Revisor Nº 2",title:"Nunca está satisfecho",room:"prof2",
    look:{skin:"#e9c2a0",hs:"bald",hc:"#ced4da",gl:"thick",beard:"#ced4da",top:"#8d6e45",tie:"#c92a2a",pants:"#5c4326",w:1.1},
    hp:185,atk:11,def:8,
    intro:"He leído tu manuscrito. Tengo 74 comentarios. Empecemos.",win:"Aceptado… con cambios menores. Muy menores.",lose:"Rechazado. Reenvía cuando sepas qué es el estado del arte.",
    moves:[{n:"Correcciones en rojo",pow:22,acc:95,txt:"llena tu documento de tinta roja"},
           {n:"¿Y el estado del arte?",pow:10,acc:100,eff:"debuff",txt:"pregunta por el estado del arte"},
           {n:"Rechazo con comentarios",pow:40,acc:85,eff:"charge",txt:"prepara un rechazo de 12 páginas…"},
           {n:"Se autocita",pow:0,acc:100,eff:"heal",txt:"se cita a sí mismo 9 veces"}]},
  burocracia:{id:"burocracia",name:"Prof. Burocracia",title:"Guardián de los formularios",room:"prof3",
    look:{skin:"#f3d1b0",hs:"short2",hc:"#212529",must:"#212529",top:"#adb5bd",tie:"#1c7ed6",pants:"#495057",w:1.05,h:1.06},
    hp:230,atk:12,def:9,
    intro:"Para hablar conmigo necesitas el formulario 27-B. Firmado. Por triplicado.",win:"Trámite… aprobado. Qué raro.",lose:"Falta una firma. Vuelva mañana.",
    moves:[{n:"Formulario 27-B",pow:22,acc:95,txt:"te entrega un formulario de 40 páginas"},
           {n:"Falta una firma",pow:0,acc:80,eff:"stun",txt:"dice que falta una firma"},
           {n:"Sello rechazado",pow:44,acc:85,eff:"charge",txt:"levanta el sello lentamente…"},
           {n:"Vuelva mañana",pow:0,acc:100,eff:"heal",txt:"se toma el resto del día libre"}]},
  tribunal:{id:"tribunal",name:"El Tribunal de Tesis",title:"Jefe final",room:"aula",trio:["deadline","revisor","burocracia"],
    hp:280,atk:12,def:10,
    intro:"Bienvenido a tu defensa. Tienes 20 minutos. Ya van 25.",win:"…Por unanimidad: APTO CUM LAUDE. 🎓",lose:"El tribunal delibera… vuelva a intentarlo.",
    moves:[{n:"Pregunta imposible",pow:46,acc:88,eff:"charge",txt:"prepara una pregunta que nadie sabe responder…"},
           {n:"Silencio incómodo",pow:0,acc:80,eff:"stun",txt:"te mira en silencio durante 40 segundos"},
           {n:"Correcciones en rojo",pow:24,acc:95,txt:"te devuelve la tesis en rojo"},
           {n:"Plazo adelantado",pow:22,acc:92,txt:"pide la versión final para mañana"},
           {n:"¿Y el estado del arte?",pow:12,acc:100,eff:"debuff",txt:"pregunta por el estado del arte"}]},
};

/* Cómo se nombra a alguien en los textos: tu nombre si es tu personaje; si no, el suyo */
function nm(c,cap=true){const t=c.id===G.char?G.name:(c.name||"tu colega");return cap?t.charAt(0).toUpperCase()+t.slice(1):t}
const ALL_CHARS=[...ROSTER,BARISTA,...Object.values(BOSSES).filter(b=>!b.trio)];
const charById=id=>ALL_CHARS.find(c=>c.id===id)||BOSSES[id];

/* =========================================================
   DIBUJO DE PERSONAJES (SVG, mismo estilo que las frutas)
   ========================================================= */
let CUID=0;
function hairBack(hs,hc){const o=`stroke="${INK}" stroke-width="3"`;let s="";
  if(hs==="afro"){for(let a=0;a<360;a+=30){const r=a*Math.PI/180;s+=`<circle cx="${(43*Math.cos(r)).toFixed(1)}" cy="${(-12+38*Math.sin(r)).toFixed(1)}" r="11" fill="${hc}" ${o}/>`}
    s+=`<ellipse cx="0" cy="-12" rx="43" ry="38" fill="${hc}"/>`}
  if(hs==="curly"){for(let a=150;a<=390;a+=20){const r=a*Math.PI/180;s+=`<circle cx="${(31*Math.cos(r)).toFixed(1)}" cy="${(-4+31*Math.sin(r)).toFixed(1)}" r="10" fill="${hc}" ${o}/>`}
    s+=`<ellipse cx="0" cy="-8" rx="32" ry="28" fill="${hc}"/>`}
  if(hs==="long")s+=`<path d="M-32 -6C-37 -42 37 -42 32 -6L36 44Q0 52 -36 44Z" fill="${hc}" ${o}/>`;
  if(hs==="ponytail")s+=`<path d="M26 -16C44 -14 48 10 40 34C36 24 30 10 26 -2Z" fill="${hc}" ${o}/>`;
  if(hs==="bun")s+=`<circle cx="0" cy="-36" r="13" fill="${hc}" ${o}/>`;
  return s}
function hairFront(hs,hc){const o=`fill="${hc}" stroke="${INK}" stroke-width="3" stroke-linejoin="round"`;
  switch(hs){
    case"short":return`<path d="M-30 -4C-31 -32 31 -34 30 -4C24 -16 10 -20 -2 -16C-14 -22 -24 -16 -30 -4Z" ${o}/>`;
    case"short2":return`<path d="M-30 -2C-30 -34 30 -34 30 -6C20 -18 2 -20 -10 -12C-18 -16 -26 -10 -30 -2Z" ${o}/>`;
    case"long":case"ponytail":case"bun":return`<path d="M-31 2C-32 -34 32 -34 31 2C26 -14 14 -22 2 -20C-8 -12 -20 -10 -31 2Z" ${o}/>`;
    case"afro":return`<path d="M-30 -6Q-26 -16 -18 -11Q-12 -20 -4 -13Q4 -21 11 -13Q19 -20 24 -11Q30 -14 30 -6C30 -34 -30 -34 -30 -6Z" ${o}/>`;
    case"curly":return`<path d="M-29 -4Q-25 -13 -18 -8Q-13 -17 -6 -10Q1 -18 8 -10Q15 -17 20 -8Q27 -12 29 -4C29 -32 -29 -32 -29 -4Z" ${o}/>`;
    case"fern":return`<path d="M-28 -8C-27 -34 27 -37 28 -8C20 -19 10 -22 0 -15C-10 -22 -20 -19 -28 -8Z" ${o}/>`;
    case"bald":return`<path d="M-29 6Q-33 -8 -24 -16Q-24 -4 -26 6Z" ${o}/><path d="M29 6Q33 -8 24 -16Q24 -4 26 6Z" ${o}/>`;
  }return""}
function glasses(L){const gc=L.gc||INK;switch(L.gl){
  case"round":return`<g fill="rgba(255,255,255,.25)" stroke="${gc}" stroke-width="2.8"><circle cx="-11" cy="2" r="9"/><circle cx="11" cy="2" r="9"/></g><path d="M-2 1Q0 -1 2 1" stroke="${gc}" stroke-width="2.5" fill="none"/>`;
  case"thin":return`<g fill="none" stroke="${INK}" stroke-width="1.7"><circle cx="-11" cy="2" r="8.5"/><circle cx="11" cy="2" r="8.5"/><path d="M-2.5 1Q0 -1 2.5 1"/></g>`;
  case"thick":return`<g fill="rgba(255,255,255,.2)" stroke="${INK}" stroke-width="4"><circle cx="-11" cy="2" r="9.5"/><circle cx="11" cy="2" r="9.5"/><path d="M-2 1Q0 -1 2 1" fill="none"/></g>`;
  case"red":return`<g fill="rgba(255,255,255,.25)" stroke="#e03131" stroke-width="3.2"><rect x="-20.5" y="-5" width="18" height="14" rx="5"/><rect x="2.5" y="-5" width="18" height="14" rx="5"/></g><path d="M-2.5 1H2.5" stroke="#e03131" stroke-width="3"/>`;
  case"cat":return`<g fill="rgba(255,255,255,.25)" stroke="${gc}" stroke-width="3" stroke-linejoin="round"><path d="M-22 -4Q-12 -7 -3 -2Q-4 10 -12 10Q-20 9 -22 -4Z"/><path d="M22 -4Q12 -7 3 -2Q4 10 12 10Q20 9 22 -4Z"/></g><path d="M-3 0H3" stroke="${gc}" stroke-width="2.5"/>`;
  }return""}

function charSVG(c,opt={}){
  const L=c.look||c,h=L.h||1,w=L.w||1,mood=opt.mood||"happy",cx=60;
  const fy=214,leg=40*h,torso=48*(.55+.45*h),hip=fy-leg,sh=hip-torso,R=29,hcy=sh-R+8,hw=17*w,belly=w>1.15?14*(w-1):0;
  const sw=3,O=`stroke="${INK}" stroke-width="${sw}" stroke-linejoin="round" stroke-linecap="round"`;
  const shirt=L.top||"#74c0fc",pants=L.pants||"#495057",coat=!!L.coat;
  let s="";
  // piernas y zapatos
  const lw=12*Math.min(w,1.2),lx=hw*.5;
  [-1,1].forEach(k=>{s+=`<rect x="${(cx+k*lx-lw/2).toFixed(1)}" y="${(hip-8).toFixed(1)}" width="${lw.toFixed(1)}" height="${(leg+2).toFixed(1)}" rx="5" fill="${pants}" ${O}/>`;
    s+=`<ellipse cx="${(cx+k*(lx+3)).toFixed(1)}" cy="${fy-3}" rx="${(lw*.75).toFixed(1)}" ry="5.5" fill="#343a40" ${O}/>`});
  // brazos (detrás del cuerpo)
  const sleeve=coat?"#ffffff":shirt;
  [-1,1].forEach(k=>{const x0=cx+k*(hw-2),y0=sh+12,x1=cx+k*(hw+9+belly*.6),y1=hip-4,d=`M${x0.toFixed(1)} ${y0.toFixed(1)}Q${(x1+k*3).toFixed(1)} ${((y0+y1)/2).toFixed(1)} ${x1.toFixed(1)} ${y1.toFixed(1)}`;
    s+=`<path d="${d}" stroke="${INK}" stroke-width="15" fill="none" stroke-linecap="round"/><path d="${d}" stroke="${sleeve}" stroke-width="9" fill="none" stroke-linecap="round"/>`;
    s+=`<circle cx="${x1.toFixed(1)}" cy="${(y1+3).toFixed(1)}" r="5.5" fill="${L.skin}" ${O}/>`});
  // torso
  const body=(ext)=>`M${(cx-hw).toFixed(1)} ${(sh+10).toFixed(1)}Q${cx} ${(sh-6).toFixed(1)} ${(cx+hw).toFixed(1)} ${(sh+10).toFixed(1)}L${(cx+hw+belly).toFixed(1)} ${(hip-6+ext).toFixed(1)}Q${cx} ${(hip+6+ext).toFixed(1)} ${(cx-hw-belly).toFixed(1)} ${(hip-6+ext).toFixed(1)}Z`;
  s+=`<path d="${body(0)}" fill="${shirt}" ${O}/>`;
  if(coat){s+=`<path d="${body(16)}" fill="#ffffff" ${O}/><path d="M${cx-9} ${sh+4}L${cx} ${sh+26}L${cx+9} ${sh+4}Z" fill="${shirt}" ${O}/>`;
    s+=`<path d="M${cx} ${sh+26}V${hip+16}" stroke="${INK}" stroke-width="2"/><rect x="${cx+hw*.25}" y="${sh+30}" width="${hw*.5}" height="9" rx="2" fill="#fff" stroke="${INK}" stroke-width="2"/><circle cx="${cx-3}" cy="${sh+34}" r="1.8" fill="${INK}"/><circle cx="${cx-3}" cy="${sh+44}" r="1.8" fill="${INK}"/>`}
  if(L.apron)s+=`<path d="M${cx-hw*.7} ${sh+16}H${cx+hw*.7}L${cx+hw*.8} ${hip+12}H${cx-hw*.8}Z" fill="${L.apron}" ${O}/><path d="M${cx-hw*.7} ${sh+16}L${cx-6} ${sh+2}M${cx+hw*.7} ${sh+16}L${cx+6} ${sh+2}" stroke="${INK}" stroke-width="2.5"/>`;
  if(L.tie)s+=`<path d="M${cx-4} ${sh+4}H${cx+4}L${cx+6} ${sh+28}L${cx} ${sh+34}L${cx-6} ${sh+28}Z" fill="${L.tie}" ${O}/>`;
  // cuello
  s+=`<rect x="${cx-6}" y="${sh-4}" width="12" height="9" fill="${L.skin}" stroke="${INK}" stroke-width="2.5"/>`;
  // cabeza
  const back=hairBack(L.hs,L.hc);if(back)s=`<g transform="translate(${cx} ${hcy.toFixed(1)})">${back}</g>`+s;
  let hd=`<circle cx="-29" cy="5" r="6" fill="${L.skin}" ${O}/><circle cx="29" cy="5" r="6" fill="${L.skin}" ${O}/>`;
  hd+=`<circle cx="0" cy="0" r="${R}" fill="${L.skin}" ${O}/>`;
  if(L.hs==="none")hd+=`<ellipse cx="-10" cy="-17" rx="8" ry="4.5" fill="#fff" opacity=".35" transform="rotate(-25 -10 -17)"/>`;
  if(L.beard)hd+=`<path d="M-27 6C-26 36 26 36 27 6C20 20 -20 20 -27 6Z" fill="${L.beard}" ${O}/>`;
  hd+=hairFront(L.hs,L.hc);
  // cara
  const blush=`<circle cx="-18" cy="13" r="5" fill="#ff8fab" opacity=".55"/><circle cx="18" cy="13" r="5" fill="#ff8fab" opacity=".55"/>`;
  let eyes;
  if(mood==="ko")eyes=`<path d="M-15 -2L-7 6M-7 -2L-15 6M7 -2L15 6M15 -2L7 6" stroke="${INK}" stroke-width="3" stroke-linecap="round"/>`;
  else if(mood==="joy")eyes=`<path d="M-15 3Q-11 -4 -7 3M7 3Q11 -4 15 3" stroke="${INK}" stroke-width="3.2" fill="none" stroke-linecap="round"/>`;
  else eyes=`<g class="blink"><circle cx="-11" cy="2" r="3.4" fill="${INK}"/><circle cx="11" cy="2" r="3.4" fill="${INK}"/><circle cx="-10" cy="1" r="1.2" fill="#fff"/><circle cx="12" cy="1" r="1.2" fill="#fff"/></g>`;
  if(L.fem&&mood!=="ko")eyes+=`<path d="M-15 0l-4 -3M15 0l4 -3" stroke="${INK}" stroke-width="2" stroke-linecap="round"/>`;
  let brows="";if(mood==="angry")brows=`<path d="M-17 -9L-6 -5M17 -9L6 -5" stroke="${INK}" stroke-width="3.2" stroke-linecap="round"/>`;
  let mouth;
  if(mood==="angry")mouth=`<path d="M-7 17Q0 12 7 17" stroke="${INK}" stroke-width="3" fill="none" stroke-linecap="round"/>`;
  else if(mood==="ko")mouth=`<path d="M-6 17Q-3 14 0 17Q3 20 6 17" stroke="${INK}" stroke-width="2.6" fill="none"/>`;
  else if(mood==="joy")mouth=`<path d="M-9 11Q0 25 9 11Z" fill="#c92a2a" stroke="${INK}" stroke-width="2.6" stroke-linejoin="round"/>`;
  else mouth=`<path d="M-7 13Q0 20 7 13" stroke="${INK}" stroke-width="3" fill="none" stroke-linecap="round"/>`;
  if(L.must)mouth=`<path d="M-13 12Q-6 8 0 12Q6 8 13 12Q7 18 0 15Q-7 18 -13 12Z" fill="${L.must}" stroke="${INK}" stroke-width="2"/>`+(mood==="joy"?`<path d="M-5 17Q0 22 5 17" stroke="${INK}" stroke-width="2.4" fill="none"/>`:"");
  hd+=blush+eyes+brows+mouth+glasses(L);
  s+=`<g transform="translate(${cx} ${hcy.toFixed(1)})">${hd}</g>`;
  if(opt.prop)s+=`<text x="${cx+hw+14}" y="${hip-2}" font-size="26" text-anchor="middle">${opt.prop}</text>`;
  const vb=opt.head?`${cx-50} ${(hcy-54).toFixed(1)} 100 100`:"0 0 120 220";
  return`<svg viewBox="${vb}" xmlns="http://www.w3.org/2000/svg" class="chr" role="img" aria-label="${c.name||""}"><g filter="url(#wob)">${s}</g></svg>`;
}
/* Grupo del tribunal (3 profesores juntos) */
function trioSVG(ids,opt={}){return`<div class="trio-chars">${ids.map(id=>`<div>${charSVG(BOSSES[id],opt)}</div>`).join("")}</div>`}
function anySVG(c,opt){return c.trio?trioSVG(c.trio,opt):charSVG(c,opt)}
