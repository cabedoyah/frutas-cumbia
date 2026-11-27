/* =========================================================
   HISTORIA, OBJETIVOS Y RECOMPENSAS
   ========================================================= */
const LEVELS=[0,100,250,450,700,1000,1400,1900,2500,3200];
const TITLES=["Becario novato","Becario con café","Becario funcional","Doctorando","Doctorando con ojeras","Predoc legendario","Postdoc","Investigador/a","Profe en potencia","Doctor/a Cum Laude"];

const ITEMS={
  cafe:{e:"☕",n:"Café",price:10,desc:"Cura 30 PS en batalla."},
  empanada:{e:"🥟",n:"Empanada",price:15,desc:"Cura 60 PS en batalla."},
  cerveza:{e:"🍺",n:"Cerveza",price:20,desc:"Ataque ×1,5 durante 3 turnos… pero fallas más.",unlock:3},
  pipeta:{e:"🧪",n:"Pipeta de la suerte",key:1,desc:"Objeto especial: +10% de golpes críticos."},
  usb:{e:"💾",n:"USB con la tesis",key:1,desc:"Objeto especial: +10 PS máximos. No la pierdas."},
  sello:{e:"📮",n:"Formulario 27-B firmado",key:1,desc:"Objeto especial: reduce 10% el daño recibido."},
};
const BADGES={
  plazo:{e:"⏰",n:"Sello del Plazo",by:"Dra. Deadline"},
  revision:{e:"🖍️",n:"Sello de Revisión",by:"Dr. Revisor Nº 2"},
  tramite:{e:"📎",n:"Sello del Trámite",by:"Prof. Burocracia"},
  doctorado:{e:"🎓",n:"Título de Doctor/a Cum Laude",by:"El Tribunal de Tesis"},
};

const CHAPTERS=[
  {n:1,t:"Primer día de beca",intro:"Llegas al grupo de investigación con una mochila, cero contexto y muchas ganas. El Dr. Cumbia te va a explicar cómo funciona todo. Más o menos."},
  {n:2,t:"Los resultados no salen",intro:"Ya sobreviviste a tu primer plazo. Ahora los experimentos fallan, las muestras desaparecen y el Dr. Revisor afila su bolígrafo rojo."},
  {n:3,t:"Viernes de cerveza y tesis",intro:"Se acerca la defensa. Hay que terminar los últimos experimentos, conseguir una firma imposible… y brindar en la cafetería."},
];

/* tipo: talk | talkN | rps | find | buy | frutas | battle | boss */
const MISSIONS=[
  // ---- Capítulo 1 ----
  {id:"m1",ch:1,t:"Preséntate con el Dr. Cumbia",d:"Ve a la oficina de estudiantes y habla con el Dr. Cumbia.",room:"est",type:"talk",npc:"fernando",rw:{xp:30,coins:20,items:{cafe:1}}},
  {id:"m2",ch:1,t:"Conoce a los becarios",d:"Habla con 3 personas en la sala de becarios.",room:"becarios",type:"talkN",n:3,rw:{xp:40,coins:15}},
  {id:"m3",ch:1,t:"La última empanada",d:"Gana a piedra, papel o tijera por la última empanada de la mesa roja.",room:"becarios",type:"rps",rw:{xp:50,coins:20,items:{empanada:1}}},
  {id:"m4",ch:1,t:"El laboratorio desordenado",d:"Encuentra 5 cosas perdidas en el Laboratorio 1.",room:"lab1",type:"find",n:5,time:50,rw:{xp:60,coins:25,items:{pipeta:1}}},
  {id:"m5",ch:1,t:"Tu primer café",d:"Baja a la cafetería y cómprale un café a Don Tinto.",room:"cafe",type:"buy",item:"cafe",rw:{xp:30,coins:10}},
  {id:"b1",ch:1,t:"JEFE: Dra. Deadline",d:"Entra al Despacho 1 y sobrevive a la Dra. Deadline.",room:"prof1",type:"boss",boss:"deadline",rw:{xp:150,coins:60,badge:"plazo"}},
  // ---- Capítulo 2 ----
  {id:"m6",ch:2,t:"¿Qué fruta eres?",d:"El Dr. Cumbia insiste: juega a Frutas Cumbia y descubre tu fruta.",room:"est",type:"frutas",rw:{xp:60,coins:25}},
  {id:"m7",ch:2,t:"Muestras perdidas",d:"Encuentra 7 muestras en el Laboratorio 2 antes de que se calienten.",room:"lab2",type:"find",n:7,time:50,rw:{xp:80,coins:30,items:{usb:1}}},
  {id:"m8",ch:2,t:"Duelo por el enchufe",d:"Solo queda un enchufe libre en la sala de becarios. Gánalo en batalla.",room:"becarios",type:"battle",rw:{xp:90,coins:35,items:{cafe:2}}},
  {id:"m9",ch:2,t:"Apuesta con Don Tinto",d:"Reta a Don Tinto a piedra, papel o tijera: si ganas, 3 cafés gratis.",room:"cafe",type:"rps",npc:"tinto",rw:{xp:50,coins:0,items:{cafe:3}}},
  {id:"b2",ch:2,t:"JEFE: Dr. Revisor Nº 2",d:"Defiende tu manuscrito en el Despacho 2.",room:"prof2",type:"boss",boss:"revisor",rw:{xp:200,coins:80,badge:"revision"}},
  // ---- Capítulo 3 ----
  {id:"m10",ch:3,t:"La primera ronda",d:"Es viernes: invita una cerveza en la cafetería.",room:"cafe",type:"buy",item:"cerveza",rw:{xp:60,coins:15}},
  {id:"m11",ch:3,t:"Apagón en el laboratorio",d:"Se fue la luz en el Laboratorio 3. Encuentra 8 cosas a tiempo.",room:"lab3",type:"find",n:8,time:45,dark:1,rw:{xp:100,coins:40}},
  {id:"m12",ch:3,t:"Ensayo general",d:"Practica tu defensa en una batalla contra alguien de la oficina de estudiantes.",room:"est",type:"battle",pool:"est",rw:{xp:100,coins:40,items:{empanada:2}}},
  {id:"b3",ch:3,t:"JEFE: Prof. Burocracia",d:"Consigue la firma del Prof. Burocracia en el Despacho 3.",room:"prof3",type:"boss",boss:"burocracia",rw:{xp:250,coins:100,badge:"tramite",items:{sello:1}}},
  {id:"bf",ch:3,t:"JEFE FINAL: El Tribunal",d:"Baja al Aula Magna y defiende tu tesis ante el Tribunal.",room:"aula",type:"boss",boss:"tribunal",final:1,rw:{xp:400,coins:200,badge:"doctorado"}},
];

/* Logros: cond recibe el estado G */
const ACHS=[
  {id:"cafe1",e:"☕",n:"Primer café",d:"Compra tu primer café.",c:G=>G.st.cafes>=1,coins:5},
  {id:"cafe10",e:"🫖",n:"Cafeína en vena",d:"Compra 10 cafés.",c:G=>G.st.cafes>=10,coins:30},
  {id:"cerv5",e:"🍻",n:"Alma de la fiesta",d:"Invita 5 cervezas.",c:G=>G.st.cervezas>=5,coins:30},
  {id:"social",e:"🗣️",n:"Animal social",d:"Habla con todas las personas del edificio.",c:G=>G.talked.length>=13,coins:40},
  {id:"tickle",e:"🤭",n:"Cosquillas",d:"Toca al Dr. Cumbia 20 veces en la pantalla de inicio.",c:G=>G.st.tickles>=20,coins:10},
  {id:"explorer",e:"🗺️",n:"Explorador/a",d:"Entra en todas las salas.",c:G=>G.visited.length>=Object.keys(ROOMS).length,coins:30},
  {id:"rps3",e:"✌️",n:"Racha de tijeras",d:"Gana 3 partidas de piedra, papel o tijera seguidas.",c:G=>G.st.rpsBest>=3,coins:25},
  {id:"eagle",e:"🦅",n:"Ojo de halcón",d:"Encuentra todo con 20 segundos o más de sobra.",c:G=>G.st.eagle>=1,coins:25},
  {id:"flawless",e:"🛡️",n:"Intocable",d:"Gana una batalla sin perder vida.",c:G=>G.st.flawless>=1,coins:30},
  {id:"loser",e:"🫠",n:"Lo importante es participar",d:"Pierde una batalla.",c:G=>G.st.lost>=1,coins:10},
  {id:"fruta",e:"🍍",n:"Ya sé qué fruta soy",d:"Juega a Frutas Cumbia.",c:G=>!!G.fruit,coins:15},
  {id:"dex10",e:"📖",n:"Frutólogo/a",d:"Descubre 10 frutas en la Frutadex.",c:()=>frutadexCount()>=10,coins:40},
  {id:"rich",e:"💰",n:"Beca completa",d:"Ten 200 monedas a la vez.",c:G=>G.coins>=200,coins:0},
  {id:"lvl5",e:"⭐",n:"Doctorando con ojeras",d:"Llega al nivel 5.",c:G=>levelOf(G.xp)>=5,coins:40},
  {id:"boss1",e:"⏰",n:"Plazo cumplido",d:"Derrota a la Dra. Deadline.",c:G=>G.badges.includes("plazo"),coins:0},
  {id:"doctor",e:"🎓",n:"Doctor/a Cum Laude",d:"Termina el modo historia.",c:G=>G.badges.includes("doctorado"),coins:100},
  {id:"night",e:"🌙",n:"Noctámbulo/a",d:"Juega después de medianoche.",c:()=>{const h=new Date().getHours();return h>=0&&h<5},coins:15},
  {id:"early",e:"🌅",n:"Madrugador/a",d:"Juega antes de las 8 de la mañana.",c:()=>{const h=new Date().getHours();return h>=5&&h<8},coins:15},
];
function levelOf(xp){let l=0;while(l+1<LEVELS.length&&xp>=LEVELS[l+1])l++;return l+1}
function frutadexCount(){try{return JSON.parse(localStorage.getItem("fc.dex")||"[]").length}catch(e){return 0}}

/* Frases del Dr. Cumbia (Fernando) en la pantalla de inicio */
const FER_LINES=["¡Bienvenido/a al Lab Cumbia! Aquí se investiga… a veces.","Yo sé qué fruta eres. Tú todavía no.","El café de abajo es 70% agua y 30% fe.","La Dra. Deadline no muerde. Solo adelanta plazos.","¿Ya revisaste el correo? Mejor no.","La tesis no se escribe sola. Pero tampoco la escribo yo.","Si el experimento falla, se repite. Si falla otra vez, es un hallazgo.","Toca otra vez y te cuento un secreto. Mentira, no tengo secretos.","Hoy es buen día para no hacer nada productivo.","El Dr. Revisor tiene 74 comentarios para ti. Y aún no le has enviado nada.","Dicen que en la cafetería los viernes se habla de ciencia. Mentira.","¡Ey! Que me haces cosquillas."];
