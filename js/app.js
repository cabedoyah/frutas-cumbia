/* =========================================================
   LAB CUMBIA — lógica principal
   ========================================================= */
function $(s){return document.querySelector(s)}
const $$=s=>[...document.querySelectorAll(s)];
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const pick=a=>a[Math.random()*a.length|0];
const shuffle=a=>{for(let i=a.length-1;i>0;i--){const j=Math.random()*(i+1)|0;[a[i],a[j]]=[a[j],a[i]]}return a};
const esc=t=>String(t).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const art=c=>c&&c.look&&c.look.fem?"a":"o";

/* ---------------- estado (se guarda en este móvil) ---------------- */
const SAVE_KEY="lc.save.v1";
const FRESH=()=>({char:null,name:"",xp:0,coins:30,items:{cafe:1},badges:[],done:[],talked:[],visited:[],ach:[],
  st:{cafes:0,cervezas:0,rpsStreak:0,rpsBest:0,eagle:0,flawless:0,lost:0,won:0,tickles:0,ferCoins:0},pos:{floor:1,x:56,y:160},view:1,ch:1,seenCh:0,fruit:null,fruitTs:0,ended:false});
let G=FRESH();
try{const s=JSON.parse(localStorage.getItem(SAVE_KEY));if(s)G=Object.assign(FRESH(),s,{st:Object.assign(FRESH().st,s.st||{}),items:Object.assign({},s.items||{})})}catch(e){}
function save(){try{localStorage.setItem(SAVE_KEY,JSON.stringify(G))}catch(e){}}
const myChar=()=>ROSTER.find(c=>c.id===G.char)||ROSTER[0];

/* ---------------- utilidades de interfaz ---------------- */
let toastT;function toast(m,ms){const t=$("#toast");t.innerHTML=m;t.classList.add("show");clearTimeout(toastT);toastT=setTimeout(()=>t.classList.remove("show"),ms||2600)}
function updSoundBtn(){$("#btnSound").textContent=Sound.on?"🔊":"🔇"}
function show(id){$$(".screen").forEach(s=>s.classList.toggle("active",s.id===id));$("#btnBack").classList.toggle("hide",id==="s-hub"||id==="s-select"&&!G.char);
  const sc=$("#"+id);sc&&(sc.scrollTop=0);CUR=id}
let CUR="s-hub";
function hud(){const l=levelOf(G.xp),a=LEVELS[l-1],b=LEVELS[l]||a+1000,me=myChar();
  return`<div class="hud box"><div class="hud-face">${charSVG(me,{head:true})}</div><div class="hud-main"><b>${esc(G.name)}</b><small>Nv. ${l} · ${TITLES[l-1]}</small>
    <div class="xpbar"><i style="width:${Math.min(100,(G.xp-a)/(b-a)*100)}%"></i></div></div><div class="hud-coins">💰 ${G.coins}</div></div>`}
function refreshHud(){$$(".hud-slot").forEach(h=>h.innerHTML=G.char?hud():"")}

/* ---------------- confeti ---------------- */
const fx=$("#fx"),cx2=fx.getContext("2d");let parts=[],raf=0;
function sizeFx(){const r=$("#app").getBoundingClientRect(),d=window.devicePixelRatio||1;fx.width=r.width*d;fx.height=r.height*d;cx2.setTransform(d,0,0,d,0,0)}
addEventListener("resize",sizeFx);sizeFx();
function confetti(cols){const r=$("#app").getBoundingClientRect(),x=r.width/2,y=r.height/3;cols=cols||["#ffd43b","#ff8fab","#74c0fc","#8ce99a","#da77f2"];
  for(let i=0;i<150;i++){const a=Math.random()*Math.PI*2,sp=4+Math.random()*10;parts.push({x,y,vx:Math.cos(a)*sp,vy:Math.sin(a)*sp-6,r:4+Math.random()*5,rot:0,vr:(Math.random()-.5)*.4,c:cols[i%cols.length],s:i%3})}
  if(!raf)loopFx()}
function loopFx(){const d=window.devicePixelRatio||1,W=fx.width/d,H=fx.height/d;cx2.clearRect(0,0,W,H);
  parts.forEach(p=>{p.vy+=.32;p.vx*=.985;p.x+=p.vx;p.y+=p.vy;p.rot+=p.vr;cx2.save();cx2.translate(p.x,p.y);cx2.rotate(p.rot);cx2.fillStyle=p.c;cx2.strokeStyle=INK;cx2.lineWidth=1.5;cx2.beginPath();
    if(p.s===0)cx2.rect(-p.r,-p.r/2,p.r*2,p.r);else if(p.s===1)cx2.arc(0,0,p.r*.7,0,7);else{cx2.moveTo(0,-p.r);cx2.lineTo(p.r,p.r);cx2.lineTo(-p.r,p.r);cx2.closePath()}cx2.fill();cx2.stroke();cx2.restore()});
  parts=parts.filter(p=>p.y<H+40);raf=parts.length?requestAnimationFrame(loopFx):0;if(!raf)cx2.clearRect(0,0,W,H)}

/* ---------------- diálogos ---------------- */
function say(c,text,choices){return new Promise(res=>{
  const d=$("#dlg");d.classList.add("open");
  $("#dlgFace").innerHTML=c?anySVG(c,{head:!c.trio}):"";$("#dlgName").textContent=c?(c.id===G.char?G.name:(c.name||"Colega")):"";
  const p=$("#dlgText"),ch=$("#dlgCh");ch.innerHTML="";p.textContent="";let i=0,typing=true;
  const full=text;const tick=setInterval(()=>{i+=2;p.textContent=full.slice(0,i);if(i>=full.length){clearInterval(tick);typing=false;showCh()}},22);
  function showCh(){if(choices&&choices.length){ch.innerHTML=choices.map((t,k)=>`<button class="btn small ${k?"ghost":""}" data-k="${k}">${t}</button>`).join("");
      ch.onclick=e=>{const b=e.target.closest("button");if(!b)return;Sound.tap();close(+b.dataset.k)}}
    else ch.innerHTML=`<span class="dlg-next">toca para seguir ▸</span>`}
  function close(k){clearInterval(tick);d.classList.remove("open");d.onclick=null;res(k)}
  d.onclick=e=>{if(e.target.closest(".dlg-ch button"))return;if(typing){clearInterval(tick);typing=false;p.textContent=full;showCh();return}if(!(choices&&choices.length))close(0)};
})}

/* ---------------- recompensas, niveles y logros ---------------- */
async function grant(rw,title){
  const l0=levelOf(G.xp),lines=[];
  if(rw.xp){G.xp+=rw.xp;lines.push(`⭐ +${rw.xp} XP`)}
  if(rw.coins){G.coins+=rw.coins;lines.push(`💰 +${rw.coins} monedas`)}
  if(rw.items)for(const[k,n]of Object.entries(rw.items)){G.items[k]=(G.items[k]||0)+n;lines.push(`${ITEMS[k].e} ${ITEMS[k].n}${ITEMS[k].key?"":" ×"+n}`)}
  if(rw.badge&&!G.badges.includes(rw.badge)){G.badges.push(rw.badge);lines.push(`${BADGES[rw.badge].e} <b>${BADGES[rw.badge].n}</b>`)}
  const l1=levelOf(G.xp);if(l1>l0)lines.push(`🆙 <b>¡Subiste al nivel ${l1}!</b> Ahora eres “${TITLES[l1-1]}”`);
  save();refreshHud();
  await modal(`<div class="rw-title">${title||"¡Recompensa!"}</div><div class="rw-list">${lines.map(l=>`<div>${l}</div>`).join("")}</div>`,"¡Genial!");
  await checkAch()}
async function checkAch(){for(const a of ACHS){if(!G.ach.includes(a.id)&&a.c(G)){G.ach.push(a.id);G.coins+=a.coins;save();refreshHud();
  Sound.tone(880,.15,"triangle",.12);Sound.tone(1320,.25,"triangle",.1,.12);toast(`🏆 Logro: <b>${a.e} ${a.n}</b>${a.coins?` · +${a.coins} 💰`:""}`,3200);await sleep(900)}}}
function modal(html,btn){return new Promise(res=>{const m=$("#modal");m.classList.add("open");
  $("#modalBox").innerHTML=html+(btn?`<div class="mbtns"><button class="btn" id="mOk">${btn}</button></div>`:"");
  confetti();Sound.fanfare();$("#mOk")&&($("#mOk").onclick=()=>{m.classList.remove("open");res()})})}

/* ---------------- misiones ---------------- */
const isDone=id=>G.done.includes(id);
function chapterNow(){return isDone("b2")?3:isDone("b1")?2:1}
function available(){const ch=chapterNow();return MISSIONS.filter(m=>{if(isDone(m.id)||m.ch>ch)return false;
  if(m.type==="boss"){const rest=MISSIONS.filter(x=>x.ch===m.ch&&x.type!=="boss");if(!rest.every(x=>isDone(x.id)))return false;if(m.final&&!isDone("b3"))return false}
  return true})}
function roomLocked(id){const r=ROOMS[id];if(r.type==="prof"){const m=MISSIONS.find(x=>x.boss===r.boss);return!(isDone(m.id)||available().includes(m))}
  if(id==="aula")return!(isDone("bf")||available().some(m=>m.id==="bf"));return false}
async function complete(m){if(isDone(m.id))return;G.done.push(m.id);save();await grant(m.rw,`✅ ${m.t}`);
  if(m.type==="boss"&&!m.final){G.ch=chapterNow();save();await chapterIntro()}
  if(m.final){G.ended=true;save();await ending()}}
async function chapterIntro(){const ch=chapterNow();if(G.seenCh>=ch)return;G.seenCh=ch;save();const C=CHAPTERS[ch-1];
  await modal(`<div class="ch-num">Capítulo ${C.n}</div><div class="rw-title">${C.t}</div><p class="ch-intro">${C.intro}</p>`,"¡Vamos!")}

/* ---------------- INICIO (hub) ---------------- */
function renderHub(){const me=myChar(),fer=charById("fernando"),ch=chapterNow(),C=CHAPTERS[ch-1];
  const done=MISSIONS.filter(m=>m.ch===ch&&isDone(m.id)).length,tot=MISSIONS.filter(m=>m.ch===ch).length;
  $("#hubStage").innerHTML=`<div class="fer" id="fer">${charSVG(fer)}</div>${G.char!=="fernando"?`<div class="hub-me">${charSVG(me)}</div>`:""}
    <div class="bubble box" id="ferBub">${G.fruit?`¡Hola ${esc(G.name)}! Sigo pensando que eres ${esc(G.fruit)}. 😏`:pick(FER_LINES)}</div>
    <span class="deco d1">🧪</span><span class="deco d2">⚗️</span><span class="deco d3">🧬</span><span class="deco d4">🔬</span>`;
  $("#hubMenu").innerHTML=`<button class="card big" data-go="story"><span class="ci">📖</span><b>Modo historia</b><small>${G.ended?"¡Historia completada! 🎓":`Cap. ${ch}: ${C.t} · ${done}/${tot}`}</small></button>
    <button class="card" data-go="mini"><span class="ci">🎮</span><b>Minijuegos</b><small>Frutas, duelos y más</small></button>
    <button class="card" data-go="ach"><span class="ci">🏆</span><b>Logros</b><small>${G.ach.length}/${ACHS.length} · ${G.badges.length} sellos</small></button>
    <button class="card" data-go="bag"><span class="ci">🎒</span><b>Mochila</b><small>💰 ${G.coins}</small></button>
    <button class="card" data-go="char"><span class="ci">👤</span><b>Personaje</b><small>${esc(G.name)}</small></button>`;
  refreshHud();
  $("#fer").onclick=ferTap}
let ferBusy=0;
function ferTap(){const f=$("#fer");f.classList.remove("jump");void f.offsetWidth;f.classList.add(pick(["jump","spin","jump"]));
  Sound.tone(500+Math.random()*400,.12,"square",.08,0,900);G.st.tickles++;
  let line=pick(FER_LINES);const today=new Date().toDateString();
  if(G.st.ferDay!==today){G.st.ferDay=today;G.st.ferCoins=0}
  if(Math.random()<.12&&G.st.ferCoins<3){G.st.ferCoins++;G.coins+=5;line="Toma, 5 monedas para un café. No le digas a nadie. 🤫";refreshHud()}
  $("#ferBub").textContent=line;$("#ferBub").classList.remove("pop");void $("#ferBub").offsetWidth;$("#ferBub").classList.add("pop");save();
  if(G.st.tickles%5===0)checkAch()}
$("#hubMenu").onclick=e=>{const b=e.target.closest("[data-go]");if(!b)return;Sound.tap();const g=b.dataset.go;
  if(g==="story")openMap();if(g==="mini")openMini();if(g==="ach")openAch();if(g==="bag")openBag();if(g==="char")openSelect()};

/* ---------------- SELECCIÓN DE PERSONAJE ---------------- */
function openSelect(){$("#selList").innerHTML=`<div class="sel-grid">${ROSTER.map(c=>
    `<button class="sel-c ${c.id===G.char?"on":""}" data-id="${c.id}" aria-label="Personaje">${charSVG(c)}</button>`).join("")}</div>`;show("s-select")}
$("#selList").onclick=e=>{const b=e.target.closest(".sel-c");if(!b)return;Sound.tap();const c=ROSTER.find(x=>x.id===b.dataset.id);
  const bar=(k,lab)=>`<div class="stat"><span>${lab}</span><div class="sbar"><i style="width:${c.st[k]*10}%"></i></div><b>${c.st[k]}</b></div>`;
  const m=$("#modal");m.classList.add("open");
  $("#modalBox").innerHTML=`<div class="sel-big">${charSVG(c,{mood:"joy"})}</div><div class="rw-title">${c.id===G.char?"Tu personaje":"¿Eres tú?"}</div><p class="sel-tag">“${esc(c.tag)}”</p>
    <label class="sel-lab">¿Cómo te llamas en el juego?<input id="selName" maxlength="16" placeholder="Escribe tu nombre" value="${esc(G.char===c.id&&G.name?G.name:"")}"></label>
    ${bar("fuerza","💪 Fuerza")}${bar("aguante","🛡️ Aguante")}${bar("suerte","🍀 Suerte")}${bar("vista","👓 Vista")}
    <p class="sel-sp">⚡ Ataque especial: <b>${esc(c.sp.n)}</b></p>
    <div class="mbtns"><button class="btn ghost" id="selNo">Volver</button><button class="btn" id="selOk">¡Soy yo!</button></div>`;
  $("#selNo").onclick=()=>m.classList.remove("open");
  $("#selOk").onclick=async()=>{const nmv=$("#selName").value.trim();if(!nmv){toast("✍️ Escribe tu nombre para empezar");$("#selName").focus();return}
    const first=!G.char;G.char=c.id;G.name=nmv.slice(0,16);save();m.classList.remove("open");Sound.pop();
    renderHub();show("s-hub");
    if(first){await say(charById("fernando"),`¡Bienvenid${art(c)} al Lab Cumbia, ${G.name}! Aquí hay laboratorios, profesores temibles y una cafetería donde se arregla todo con café. Empieza por el modo historia.`);await chapterIntro()}}};

/* ---------------- MAPA ---------------- */
function openMap(){G.view=G.pos.floor;renderMap();show("s-map");chapterIntro()}
function renderMap(){const av=available(),marks={},locked={};
  av.forEach(m=>marks[m.room]=1);Object.keys(ROOMS).forEach(id=>{if(roomLocked(id))locked[id]=1});
  $("#mapWrap").innerHTML=mapSVG(G.view,{marks,locked});
  $$(".ftab").forEach(t=>t.classList.toggle("on",+t.dataset.f===G.view));
  placeMe();
  const ch=chapterNow(),C=CHAPTERS[ch-1],list=MISSIONS.filter(m=>m.ch===ch);
  $("#objList").innerHTML=`<h3>Capítulo ${ch}: ${C.t}</h3>`+list.map(m=>{const d=isDone(m.id),a=av.includes(m);
    return`<div class="obj ${d?"done":a?"":"wait"}" data-room="${m.room}"><span>${d?"✅":a?"❗":"🔒"}</span><div><b>${esc(m.t)}</b><small>${esc(m.d)} · 📍 ${ROOMS[m.room].n}</small></div><em>${rwShort(m.rw)}</em></div>`}).join("")+
    (G.ended?`<p class="note">🎓 Historia completada. Puedes seguir paseando, jugando y comprando cafés.</p>`:"");
  refreshHud()}
const rwShort=r=>[r.xp?`⭐${r.xp}`:"",r.coins?`💰${r.coins}`:"",r.badge?BADGES[r.badge].e:"",...Object.keys(r.items||{}).map(k=>ITEMS[k].e)].filter(Boolean).join(" ");
function placeMe(){const g=$("#me");if(!g)return;if(G.pos.floor!==G.view){g.innerHTML="";return}
  g.innerHTML=charSVG(myChar(),{head:true}).replace("<svg ",'<svg x="-17" y="-20" width="34" height="34" ');g.setAttribute("transform",`translate(${G.pos.x} ${G.pos.y})`)}
let walking=false;
async function walkPts(pts){const g=$("#me");for(let i=1;i<pts.length;i++){const[a,b]=[pts[i-1],pts[i]],dist=Math.hypot(b[0]-a[0],b[1]-a[1]);if(dist<1)continue;
  const dur=dist/220*1000,t0=performance.now();
  await new Promise(r=>{function step(t){const k=Math.min(1,(t-t0)/dur),x=a[0]+(b[0]-a[0])*k,y=a[1]+(b[1]-a[1])*k;g.setAttribute("transform",`translate(${x} ${y-Math.abs(Math.sin(k*dist/9))*3})`);
    if(k<1)requestAnimationFrame(step);else r()}requestAnimationFrame(step)})}
  const e=pts[pts.length-1];G.pos.x=e[0];G.pos.y=e[1];save()}
async function goFloor(f){if(walking)return;walking=true;
  if(G.view!==G.pos.floor){G.view=G.pos.floor;renderMap()}
  await walkPts(corridorPath(G.pos.floor,[G.pos.x,G.pos.y],FLOORS[G.pos.floor].stairs));
  Sound.tone(300,.3,"triangle",.08,0,600);G.pos={floor:f,x:FLOORS[f].stairs[0],y:FLOORS[f].stairs[1]};G.view=f;save();
  $("#mapWrap").classList.add("fade");await sleep(250);renderMap();$("#mapWrap").classList.remove("fade");walking=false}
async function walkTo(id){if(walking)return;const r=ROOMS[id];
  if(roomLocked(id)){toast(r.type==="prof"?"🔒 La puerta está cerrada. Se escucha a alguien tecleando con furia… (termina antes las otras misiones del capítulo)":"🔒 El Aula Magna está cerrada hasta el día de tu defensa.");Sound.tone(150,.2,"square",.08);return}
  if(r.floor!==G.pos.floor)await goFloor(r.floor);
  walking=true;await walkPts(corridorPath(r.floor,[G.pos.x,G.pos.y],r.door));walking=false;enterRoom(id)}
$("#mapWrap").onclick=e=>{const s=e.target.closest(".stairs");if(s){goFloor(G.pos.floor===1&&G.view===1?0:G.view===0&&G.pos.floor===0?1:G.view);return}
  const r=e.target.closest(".room");if(r){Sound.tap();walkTo(r.dataset.room)}};
$("#floorTabs").onclick=e=>{const t=e.target.closest(".ftab");if(!t)return;Sound.tap();G.view=+t.dataset.f;renderMap()};
$("#objList").onclick=e=>{const o=e.target.closest(".obj");if(o&&!o.classList.contains("done"))walkTo(o.dataset.room)};

/* ---------------- SALAS ---------------- */
let ROOM=null;
function dayRand(seed){return rng(strHash(seed+new Date().toDateString()))}
function npcsIn(id){const r=ROOMS[id],others=ROSTER.filter(c=>c.id!==G.char);
  if(r.type==="becarios")return others.filter(c=>c.room==="becarios");
  if(r.type==="office")return others.filter(c=>c.room==="est");
  if(r.type==="cafe"){const R=dayRand("cafe"),pool=others.slice().sort(()=>R()-.5);return[BARISTA,...pool.slice(0,chapterNow()>=3?5:3)]}
  if(r.type==="lab"){const R=dayRand(id),pool=others.slice().sort(()=>R()-.5);return pool.slice(0,2)}
  if(r.type==="prof"){return roomLocked(id)?[]:[BOSSES[r.boss]]}
  if(r.type==="aula")return roomLocked(id)?[]:[BOSSES.tribunal];return[]}
function enterRoom(id){ROOM=id;if(!G.visited.includes(id)){G.visited.push(id);save()}
  const r=ROOMS[id];$("#roomName").textContent=r.n;$("#roomScene").innerHTML=sceneSVG(r.type,id);
  const npcs=npcsIn(id);
  $("#roomNpcs").innerHTML=npcs.map(c=>`<button class="npc ${c.trio?"trio":""}" data-id="${c.id}" aria-label="${esc(nm(c))}">${anySVG(c,{mood:BOSSES[c.id]?"angry":"happy"})}${c.name?`<span>${esc(c.name)}</span>`:""}</button>`).join("");
  renderRoomActions();show("s-room");Sound.tone(660,.08,"triangle",.08);checkAch()}
function renderRoomActions(){const id=ROOM,ms=available().filter(m=>m.room===id);
  let h=ms.map(m=>`<button class="btn act" data-m="${m.id}">❗ ${esc(m.t)}<small>${esc(m.d)}</small></button>`).join("");
  if(ROOMS[id].type==="cafe")h+=`<button class="btn act mint" data-shop="1">🛒 Comprar en la barra<small>Café, empanadas${chapterNow()>=3?" y cerveza":""}</small></button>`;
  h+=`<p class="note">Toca a una persona para hablar, jugar o retarla.</p>`;
  $("#roomActs").innerHTML=h}
$("#roomNpcs").onclick=async e=>{const b=e.target.closest(".npc");if(!b)return;Sound.tap();const c=charById(b.dataset.id);
  const boss=BOSSES[c.id];
  if(boss){const m=available().find(x=>x.boss===c.id);if(m)return runMission(m);await say(c,isDone(MISSIONS.find(x=>x.boss===c.id).id)?pick(["Sigo esperando el informe del mes pasado.","Mi puerta siempre está abierta. Para cerrarla en tu cara.","¿Otra vez tú? Bien. Toma asiento. No, ese no."]):c.intro);return}
  const opts=["💬 Hablar","✊ Piedra, papel o tijera","⚔️ Batalla amistosa","Nada, solo saludaba"];
  const k=await say(c,pick(c.lines),opts);
  if(k===0){await talkTo(c)}if(k===1)await freeRps(c);if(k===2)await freeBattle(c)};
async function talkTo(c){if(!G.talked.includes(c.id)){G.talked.push(c.id);save()}
  const m1=available().find(m=>m.type==="talk"&&m.npc===c.id);
  if(m1&&c.id==="fernando"){await say(c,`¡Hola, ${G.name}! Te explico rápido: arriba están los laboratorios, la sala de becarios y los despachos de los profes. Abajo, la cafetería: allí Don Tinto vende café, empanadas y, los viernes, cerveza.`);
    await say(c,"Cada misión te da XP, monedas y objetos. Con monedas compras cosas que te salvan en las batallas contra los profesores. Y créeme: las vas a necesitar.");
    await say(c,"Ah, y otra cosa: algún día te diré qué fruta eres. Toma un café de bienvenida. ☕");await complete(m1)}
  else await converse(c)
  const mt=available().find(m=>m.type==="talkN"&&m.room===ROOM);
  if(mt){const n=npcsIn(ROOM).filter(x=>G.talked.includes(x.id)).length;if(n>=mt.n)await complete(mt);else toast(`🗣️ ${n}/${mt.n} personas saludadas`)}
  renderRoomActions();checkAch()}
/* conversación con opciones: el personaje dice algo, eliges qué responder y te contesta (a veces hay 2 rondas) */
async function converse(c){
  const own=TALKS[c.id]||[],pool=[...own,...(c.id==="fernando"||c.id==="tinto"?[]:TALKS._all)];if(!pool.length)return say(c,pick(c.lines));
  G.ti=G.ti||{};if(G.ti[c.id]==null)G.ti[c.id]=Math.random()*pool.length|0;
  let node=pool[G.ti[c.id]%pool.length];G.ti[c.id]++;save();
  while(node){const k=await say(c,node.t,node.o.map(o=>"💬 "+o[0]));const op=node.o[k];await say(c,op[1]);node=op[2]||null}
  const today=new Date().toDateString();G.chat=G.chat||{};
  if(G.chat[c.id]!==today){G.chat[c.id]=today;const l0=levelOf(G.xp);G.xp+=5;save();refreshHud();
    toast(levelOf(G.xp)>l0?`🆙 ¡Subiste al nivel ${levelOf(G.xp)}!`:"🗣️ +5 XP por charlar")}}
$("#roomActs").onclick=e=>{const b=e.target.closest(".act");if(!b)return;Sound.tap();if(b.dataset.shop)return openShop();const m=MISSIONS.find(x=>x.id===b.dataset.m);runMission(m)};

async function runMission(m){
  const here=npcsIn(ROOM).filter(c=>!BOSSES[c.id]&&c.id!=="tinto");
  if(m.type==="talk"){const c=charById(m.npc);toast(`💬 Toca a ${c.name} para hablar.`);$$(`.npc[data-id="${m.npc}"]`).forEach(n=>{n.classList.remove("hint");void n.offsetWidth;n.classList.add("hint")});return}
  if(m.type==="talkN"){toast(`🗣️ Toca a ${m.n} personas de la sala para saludarlas.`);$$(".npc").forEach(n=>{n.classList.remove("hint");void n.offsetWidth;n.classList.add("hint")});return}
  if(m.type==="rps"){const opp=m.npc?charById(m.npc):pick(here);
    await say(opp,m.npc==="tinto"?"¿Tres cafés gratis? Ja. Si me ganas, te los regalo. Si pierdes, me lavas las tazas.":"¿La última empanada? Es mía. Bueno… te la juego a piedra, papel o tijera.");
    const r=await rpsGame(opp,{stake:m.t});rpsStats(r.win);if(r.win)await complete(m);else await say(opp,"Jajaja. Vuelve a intentarlo cuando quieras.");return}
  if(m.type==="find"){const r=await findGame({n:m.n,time:m.time,dark:m.dark,scene:"lab",title:m.t});if(r.win){if(r.left>=20)G.st.eagle++;await complete(m)}else toast("Inténtalo otra vez: las cosas no se van a encontrar solas.");return}
  if(m.type==="buy"){openShop();toast(`🛒 Compra ${ITEMS[m.item].e} ${ITEMS[m.item].n} para completar la misión.`);return}
  if(m.type==="frutas"){await say(charById("fernando"),"Antes de seguir, necesito saber algo importante: ¿qué fruta eres? Juega a Frutas Cumbia y vuelve. Aquí te espero.",["🍍 ¡Vamos!","Luego"]).then(k=>{if(k===0){G.pendingFruit=1;save();location.href="frutas.html"}});return}
  if(m.type==="battle"){const pool=m.pool==="est"?ROSTER.filter(c=>c.room==="est"&&c.id!==G.char):here;const opp=pick(pool);
    await say(opp,m.id==="m8"?"Ese enchufe es mío. Mi portátil tiene 3% de batería y mucho rencor.":"¿Ensayo de la defensa? Perfecto. Yo seré el tribunal. Y no tendré piedad.");
    const r=await battleGame(opp,{});battleStats(r);if(r.win)await complete(m);return}
  if(m.type==="boss"){const b=BOSSES[m.boss];await say(b,b.intro);
    const r=await battleGame(b,{boss:true,intro:b.intro});battleStats(r);if(r.win)await complete(m);else await say(charById("fernando"),"Tranquilo, a mí me reprobaron tres veces. Compra cafés y empanadas en la cafetería y vuelve a intentarlo.");return}
}
function rpsStats(win){if(win){G.st.rpsStreak++;G.st.rpsBest=Math.max(G.st.rpsBest,G.st.rpsStreak)}else G.st.rpsStreak=0;save()}
function battleStats(r){if(r.win){G.st.won++;if(r.flawless)G.st.flawless++}else G.st.lost++;save();refreshHud()}

/* ---------------- juego libre ---------------- */
async function freeRps(c){const r=await rpsGame(c,{stake:"Partida amistosa"});rpsStats(r.win);if(r.win)await grant({xp:10,coins:8},"Partida ganada");else checkAch()}
async function freeBattle(c){const r=await battleGame(c,{easy:1});battleStats(r);if(r.win)await grant({xp:20,coins:15},"Batalla ganada");else checkAch()}
async function freeFind(){const r=await findGame({n:6,time:45,scene:"lab",title:"Encuentra los objetos"});if(r.win){if(r.left>=20)G.st.eagle++;await grant({xp:15,coins:10},"¡Todo encontrado!")}else checkAch()}

/* ---------------- TIENDA ---------------- */
function openShop(){const m=$("#modal");m.classList.add("open");const ch=chapterNow();
  const row=k=>{const it=ITEMS[k],lock=it.unlock&&ch<it.unlock;return`<div class="shop-row"><span class="se">${it.e}</span><div><b>${it.n}</b><small>${lock?"Solo los viernes (capítulo 3)":it.desc}</small></div>
    <button class="btn small" data-buy="${k}" ${lock?"disabled":""}>${it.price} 💰</button></div>`};
  $("#modalBox").innerHTML=`<div class="shop-head">${charSVG(BARISTA,{head:true})}<div><div class="rw-title">Barra de Don Tinto</div><small>Tienes 💰 <b id="shopC">${G.coins}</b> · En mochila: ${["cafe","empanada","cerveza"].map(k=>`${ITEMS[k].e}${G.items[k]||0}`).join(" ")}</small></div></div>
    ${["cafe","empanada","cerveza"].map(row).join("")}<div class="mbtns"><button class="btn ghost" id="shopX">Cerrar</button></div>`;
  $("#shopX").onclick=()=>{m.classList.remove("open");renderRoomActions()};
  $("#modalBox").onclick=async e=>{const b=e.target.closest("[data-buy]");if(!b||b.disabled)return;const k=b.dataset.buy,it=ITEMS[k];
    if(G.coins<it.price){toast("💸 No te alcanza. Don Tinto: “Fiado no.”");Sound.tone(150,.2,"square",.08);return}
    G.coins-=it.price;G.items[k]=(G.items[k]||0)+1;if(k==="cafe")G.st.cafes++;if(k==="cerveza")G.st.cervezas++;save();refreshHud();Sound.pop();
    $("#modalBox").onclick=null;m.classList.remove("open");toast(`${it.e} Compraste ${it.n}. Don Tinto: “${pick(["Buena elección.","Eso cura todo menos la tesis.","Vuelva pronto. O no."])}”`);
    const bm=available().find(x=>x.type==="buy"&&x.item===k);if(bm){await complete(bm);renderRoomActions()}else{await checkAch();openShop()}}}

/* ---------------- MINIJUEGOS ---------------- */
function openMini(){const fr=FRUITS[(Date.now()/86400000|0)%FRUITS.length];
  $("#miniList").innerHTML=`<button class="mcard box" data-mini="frutas"><div class="mimg">${fruitSVG(fr)}</div><div><b>Frutas Cumbia</b><small>¿Qué fruta eres según Fernando Cañamero? 100 preguntas absurdas.</small>${G.fruit?`<em>Tu última fruta: ${esc(G.fruit)}</em>`:""}</div></button>
   <button class="mcard box" data-mini="rps"><div class="mimg big">✊✋✌️</div><div><b>Piedra, papel o tijera</b><small>Contra alguien al azar del grupo. Al mejor de 3.</small><em>Racha récord: ${G.st.rpsBest}</em></div></button>
   <button class="mcard box" data-mini="find"><div class="mimg big">🔎🧪</div><div><b>Encuentra los objetos</b><small>El laboratorio es un caos. Encuentra 6 cosas a tiempo.</small></div></button>
   <button class="mcard box" data-mini="battle"><div class="mimg big">⚔️</div><div><b>Batalla de becarios</b><small>Combate por turnos contra alguien del grupo.</small><em>Victorias: ${G.st.won}</em></div></button>
   <div class="mcard box soon"><div class="mimg big">🚧</div><div><b>Próximamente…</b><small>Más minijuegos en camino.</small></div></div>`;show("s-mini")}
$("#miniList").onclick=e=>{const b=e.target.closest("[data-mini]");if(!b)return;Sound.tap();const k=b.dataset.mini,opp=()=>pick(ROSTER.filter(c=>c.id!==G.char));
  if(k==="frutas")location.href="frutas.html";if(k==="rps")freeRps(opp());if(k==="find")freeFind();if(k==="battle")freeBattle(opp())};

/* ---------------- LOGROS y MOCHILA ---------------- */
function openAch(){
  $("#achList").innerHTML=`<h3 class="sel-h">🏅 Sellos de los profesores</h3><div class="badges">${Object.entries(BADGES).map(([k,b])=>`<div class="badge-c ${G.badges.includes(k)?"on":""}"><span>${G.badges.includes(k)?b.e:"❔"}</span><b>${b.n}</b><small>${b.by}</small></div>`).join("")}</div>
   <h3 class="sel-h">🏆 Logros (${G.ach.length}/${ACHS.length})</h3>`+ACHS.map(a=>{const on=G.ach.includes(a.id);return`<div class="ach ${on?"on":""}"><span>${on?a.e:"🔒"}</span><div><b>${a.n}</b><small>${a.d}</small></div><em>${a.coins?`+${a.coins}💰`:""}</em></div>`}).join("");show("s-ach")}
function openBag(){const me=myChar(),l=levelOf(G.xp);
  const items=Object.entries(G.items).filter(([,n])=>n>0);
  $("#bagList").innerHTML=`<div class="bag-me box"><div class="bag-c">${charSVG(me)}</div><div><div class="rw-title">${esc(G.name)}</div><small>${TITLES[l-1]} · Nivel ${l} · ${G.xp} XP</small>
     <p>💰 ${G.coins} monedas<br>⚔️ ${G.st.won} victorias · ${G.st.lost} derrotas<br>☕ ${G.st.cafes} cafés · 🍺 ${G.st.cervezas} cervezas${G.fruit?`<br>🍍 Fruta: ${esc(G.fruit)}`:""}</p></div></div>
   <h3 class="sel-h">🎒 Objetos</h3>${items.length?items.map(([k,n])=>`<div class="ach on"><span>${ITEMS[k].e}</span><div><b>${ITEMS[k].n}${ITEMS[k].key?"":` ×${n}`}</b><small>${ITEMS[k].desc}</small></div></div>`).join(""):`<p class="note">Vacía. Compra cosas en la cafetería (planta baja).</p>`}
   <h3 class="sel-h">⚙️ Partida</h3><button class="btn small ghost" id="resetBtn">🗑️ Empezar de cero</button>`;
  show("s-bag");
  let armed=0;$("#resetBtn").onclick=()=>{if(!armed){armed=1;$("#resetBtn").textContent="⚠️ ¿Seguro? Toca otra vez";setTimeout(()=>{armed=0;$("#resetBtn")&&($("#resetBtn").textContent="🗑️ Empezar de cero")},3000);return}
    localStorage.removeItem(SAVE_KEY);location.reload()}}

/* ---------------- FINAL ---------------- */
async function ending(){const me=myChar();
  $("#endBox").innerHTML=`<div class="end-c">${charSVG(me,{mood:"joy",prop:"🎓"})}</div><h2 class="end-t">¡${esc(G.name)}, ya eres Doctor${art(me)==="a"?"a":""} Cumbia!</h2>
   <p>Sobreviviste a la Dra. Deadline, al Dr. Revisor Nº 2, al Prof. Burocracia y al mismísimo Tribunal de Tesis.</p>
   <p class="note">Nivel ${levelOf(G.xp)} · ${G.st.cafes} cafés · ${G.st.won} batallas ganadas · ${G.ach.length} logros</p>
   <button class="btn" id="endOk">Seguir jugando</button>`;
  show("s-end");confetti();Sound.fanfare();setTimeout(()=>confetti(),900);
  await new Promise(r=>$("#endOk").onclick=r);renderHub();show("s-hub")}

/* ---------------- volver de Frutas Cumbia ---------------- */
async function checkFruta(){let f=null;try{f=JSON.parse(localStorage.getItem("lc.fruta")||"null")}catch(e){}
  if(!f||!f.t||f.t<=G.fruitTs)return;G.fruitTs=f.t;G.fruit=`${f.a} ${f.n}`;save();
  const m=available().find(x=>x.type==="frutas");
  if(m&&G.char){await say(charById("fernando"),`¿Así que eres ${G.fruit}? Lo sabía. Lo supe desde el primer día. 🍍`);await complete(m)}else checkAch()}

/* ---------------- navegación ---------------- */
$("#btnBack").onclick=()=>{Sound.tap();if(CUR==="s-room"){openMap();return}if(CUR==="s-select"&&!G.char)return;renderHub();show("s-hub")};
$("#btnSound").onclick=()=>Sound.toggle();
updSoundBtn();
(async()=>{if(!G.char){openSelect();await sleep(300);toast("👋 Elige tu personaje para empezar",3500)}else{renderHub();show("s-hub");await checkFruta();checkAch()}})();
