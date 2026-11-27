/* =========================================================
   MINIJUEGOS — cada uno devuelve una Promise con el resultado
   ========================================================= */
function openGame(html,cls){const g=$("#game");g.className="game open "+(cls||"");g.innerHTML=html;g.scrollTop=0;return g}
function closeGame(){const g=$("#game");g.className="game";g.innerHTML=""}
function strHash(s){let h=7;for(const c of s)h=(h*31+c.charCodeAt(0))>>>0;return h}

/* ---------------- PIEDRA, PAPEL O TIJERA ---------------- */
const RPS=[{k:0,e:"✊",n:"Piedra"},{k:1,e:"✋",n:"Papel"},{k:2,e:"✌️",n:"Tijera"}];
const beats=(a,b)=>(a===0&&b===2)||(a===1&&b===0)||(a===2&&b===1);
function rpsGame(opp,opts={}){return new Promise(resolve=>{
  const me=myChar(),fav=strHash(opp.id)%3;let pw=0,ow=0,last=null,busy=false;
  const g=openGame(`<div class="g-wrap"><h2 class="g-title">Piedra, papel o tijera</h2><p class="g-sub">${esc(opts.stake||"Al mejor de 3")}</p>
    <div class="rps-arena"><div class="rps-side"><div class="rps-ch">${charSVG(opp)}</div><b>${esc(nm(opp))}</b><div class="hand opp" id="oh">✊</div></div>
    <div class="rps-score"><span id="ps">0</span><small>–</small><span id="os">0</span></div>
    <div class="rps-side"><div class="rps-ch">${charSVG(me)}</div><b>${esc(G.name)}</b><div class="hand" id="mh">✊</div></div></div>
    <div class="g-msg box" id="rmsg">Elige tu jugada</div>
    <div class="rps-btns">${RPS.map(r=>`<button class="btn rps-b" data-k="${r.k}"><span>${r.e}</span>${r.n}</button>`).join("")}</div></div>`,"g-rps");
  const msg=t=>$("#rmsg").innerHTML=t;
  const oppPick=()=>{if(last!==null&&Math.random()<.35)return(last+1)%3; // a veces juega a ganarle a tu última jugada
    const w=[1,1,1];w[fav]+=.9;const t=w[0]+w[1]+w[2];let r=Math.random()*t;for(let i=0;i<3;i++){if((r-=w[i])<0)return i}return 2};
  let next=oppPick();
  const hint=()=>{const p=.05+me.st.suerte*.045+(G.items.pipeta?.05:0);
    if(Math.random()<p){const real=Math.random()<.8?next:(next+1+(Math.random()*2|0))%3;msg(`🔮 Presientes que ${esc(nm(opp,false))} va a sacar <b>${RPS[real].n}</b>…`)}else msg("Elige tu jugada")};
  hint();
  g.querySelector(".rps-btns").onclick=async e=>{const b=e.target.closest(".rps-b");if(!b||busy)return;busy=true;
    const mine=+b.dataset.k,theirs=next;Sound.tap();
    const oh=$("#oh"),mh=$("#mh");oh.textContent=mh.textContent="✊";
    for(const w of["¡Piedra…","papel…","tijera!"]){msg(w);oh.classList.remove("shk");mh.classList.remove("shk");void oh.offsetWidth;oh.classList.add("shk");mh.classList.add("shk");Sound.tone(400,.08,"square",.06);await sleep(330)}
    oh.textContent=RPS[theirs].e;mh.textContent=RPS[mine].e;
    if(mine===theirs){msg("¡Empate! Otra vez.");Sound.tone(300,.15,"triangle",.1)}
    else if(beats(mine,theirs)){pw++;msg(`¡Ganaste la ronda! ${RPS[mine].n} gana a ${RPS[theirs].n}.`);Sound.pop()}
    else{ow++;msg(`${esc(nm(opp))} gana la ronda. ${RPS[theirs].n} gana a ${RPS[mine].n}.`);Sound.tone(220,.25,"sawtooth",.08,0,140)}
    $("#ps").textContent=pw;$("#os").textContent=ow;last=mine;next=oppPick();
    await sleep(1100);
    if(pw===2||ow===2){const win=pw===2;
      g.querySelector(".rps-btns").innerHTML=`<button class="btn" id="rpsEnd">${win?"¡Victoria! Continuar":"Continuar"}</button>`;
      msg(win?`🏆 ¡Le ganaste a ${esc(nm(opp,false))}!`:`😵 ${esc(nm(opp))}: “${esc(pick(["Otra vez será.","Practica más, becario.","Yo siempre saco eso, era obvio."]))}”`);
      if(win)Sound.fanfare();
      $("#rpsEnd").onclick=()=>{closeGame();resolve({win})};return}
    busy=false;hint()};
})}

/* ---------------- ENCUENTRA LOS OBJETOS ---------------- */
const FIND_POOL=[["🧪","Tubo de ensayo"],["🔬","Microscopio"],["🧫","Placa de Petri"],["⚗️","Matraz"],["🥼","Bata"],["🧤","Guantes"],["🥽","Gafas de seguridad"],["📓","Cuaderno de laboratorio"],["🧲","Imán"],["🔋","Pila"],["🌡️","Termómetro"],["💾","Disquete del 98"],["🍌","Banano (¿qué hace aquí?)"],["🧦","Calcetín perdido"],["🪴","Planta"],["📎","Clip"],["✏️","Lápiz"],["📏","Regla"],["☕","Taza de café"],["🦆","Pato de hule"],["🔑","Llave del armario"],["🎧","Audífonos"],["🍪","Galleta"],["📱","Móvil"],["🧬","ADN"],["🔭","Telescopio"],["🗂️","Carpeta"],["🖍️","Crayón"],["🍕","Pizza de ayer"],["⏰","Despertador"],["🎓","Birrete"],["🧸","Osito"],["🧻","Papel"],["🧃","Juguito"],["🪫","Pila sin carga"],["🧠","Cerebro (de plástico, esperamos)"]];
function findGame(opts={}){return new Promise(resolve=>{
  const me=myChar(),n=opts.n||5,total=Math.max(22,n+16),bonus=me.st.vista*2;let time=(opts.time||50)+bonus,left=time,done=false;
  const pool=shuffle(FIND_POOL.slice()),targets=pool.slice(0,n),others=pool.slice(n,total);
  const items=shuffle([...targets.map(t=>({t,target:1})),...others.map(t=>({t}))]);
  const cols=5,rows=Math.ceil(items.length/cols);
  const html=items.map((it,i)=>{const c=i%cols,r=i/cols|0,x=(c+.15+Math.random()*.7)/cols*100,y=(r+.15+Math.random()*.7)/rows*100,rot=(Math.random()*70-35)|0,sz=26+Math.random()*12|0;
    return`<button class="fitem" data-i="${i}" style="left:${x.toFixed(1)}%;top:${y.toFixed(1)}%;font-size:${sz}px;transform:translate(-50%,-50%) rotate(${rot}deg)">${it.t[0]}</button>`}).join("");
  const g=openGame(`<div class="g-wrap"><h2 class="g-title">${esc(opts.title||"Encuentra los objetos")}</h2>
    <div class="ftime"><i id="ftbar"></i><span id="ftnum">${time|0}s</span></div>
    <div class="ftargets">${targets.map((t,i)=>`<span class="ftg" id="ftg${i}">${t[0]} ${esc(t[1])}</span>`).join("")}</div>
    <div class="farea box ${opts.dark?"dark":""}" id="farea">${sceneSVG(opts.scene||"lab")}<div class="fitems">${html}</div>${opts.dark?'<div class="flash-light" id="flight"></div>':""}</div>
    <p class="g-sub">${bonus?`👓 Tu vista te da +${bonus}s. `:""}${opts.dark?"🔦 Mueve el dedo para alumbrar. ":""}Tocar algo que no es: −2s.</p></div>`,"g-find");
  let found=0;
  const area=$("#farea");
  if(opts.dark){const fl=$("#flight");const mv=e=>{const r=area.getBoundingClientRect(),p=e.touches?e.touches[0]:e;fl.style.setProperty("--x",(p.clientX-r.left)+"px");fl.style.setProperty("--y",(p.clientY-r.top)+"px")};
    area.addEventListener("pointermove",mv);area.addEventListener("pointerdown",mv);area.addEventListener("touchmove",mv,{passive:true})}
  const end=win=>{if(done)return;done=true;clearInterval(tm);
    setTimeout(()=>{g.querySelector(".g-wrap").insertAdjacentHTML("beforeend",`<div class="g-end box">${win?`🏆 ¡Lo encontraste todo con ${left|0}s de sobra!`:"⏰ Se acabó el tiempo. Fernando promete no contarle a nadie."}<br><button class="btn" id="fEnd">Continuar</button></div>`);
      $("#fEnd").onclick=()=>{closeGame();resolve({win,left})};if(win)Sound.fanfare();else Sound.tone(200,.4,"sawtooth",.1,0,90)},400)};
  const tm=setInterval(()=>{left-=.1;$("#ftbar").style.width=Math.max(0,left/time*100)+"%";$("#ftnum").textContent=Math.max(0,Math.ceil(left))+"s";if(left<=0)end(false)},100);
  area.querySelector(".fitems").onclick=e=>{const b=e.target.closest(".fitem");if(!b||done||b.classList.contains("got"))return;const it=items[+b.dataset.i];
    if(it.target){b.classList.add("got");found++;Sound.pop();const k=targets.indexOf(it.t);$("#ftg"+k).classList.add("ok");if(found===n)end(true)}
    else{left-=2;b.classList.remove("nope");void b.offsetWidth;b.classList.add("nope");Sound.tone(160,.12,"square",.08)}};
})}

/* ---------------- BATALLA POR TURNOS ---------------- */
function fighterStats(c,lvl,isBoss){
  if(isBoss)return{hp:c.hp,atk:c.atk,def:c.def,crit:.06};
  const st=c.st;return{hp:Math.round(70+lvl*8+st.aguante*6),atk:8+lvl*1.2+st.fuerza*.9,def:6+lvl*.8+st.aguante*.6,crit:.05+st.suerte*.012};
}
function playerMoves(c){return[
  {n:"Golpe de pipeta",pow:18,acc:95,txt:"te da con la pipeta"},
  {n:c.sp.n,pow:30,acc:82,pp:5,txt:c.sp.txt,sp:1},
  {n:"Excusa elaborada",eff:"guard",acc:100,txt:"pone una excusa tan buena que el próximo golpe dolerá la mitad"},
  {n:"Respirar hondo",eff:"heal",pct:.22,acc:100,pp:3,txt:"respira hondo y recupera fuerzas"}]}
function battleGame(opp,opts={}){return new Promise(resolve=>{
  const me=myChar(),lvl=levelOf(G.xp),isBoss=!!opts.boss;
  const P=fighterStats(me,lvl);P.hp+=G.items.usb?10:0;P.crit+=G.items.pipeta?.1:0;
  const O=fighterStats(opp,Math.max(1,lvl-(opts.easy?1:0)),isBoss);if(!isBoss)O.hp=Math.round(O.hp*.85);
  const pm=playerMoves(me),om=isBoss?opp.moves:playerMoves(opp);
  const S={php:P.hp,ohp:O.hp,guard:false,stun:false,debuff:0,beer:0,charge:null,oheals:0,opp:{},pp:{},taken:0};
  pm.forEach((m,i)=>{if(m.pp)S.pp[i]=m.pp});om.forEach((m,i)=>{if(m.pp)S.opp[i]=m.pp});
  const g=openGame(`<div class="g-wrap"><div class="bt-field">
     <div class="bt-row top"><div class="bt-info box"><b>${esc(nm(opp))}</b>${opp.title||opp.tag?`<small>${esc(opp.title||opp.tag)}</small>`:""}<div class="hpbar"><i id="ohb"></i></div><span id="ohn"></span></div>
       <div class="bt-sprite ${opp.trio?"trio":""}" id="oS">${anySVG(opp,{mood:isBoss?"angry":"happy"})}<div class="plat"></div></div></div>
     <div class="bt-row bot"><div class="bt-sprite me" id="mS">${charSVG(me)}<div class="plat"></div></div>
       <div class="bt-info box"><b>${esc(G.name)}</b><small>Nivel ${lvl}</small><div class="hpbar"><i id="mhb"></i></div><span id="mhn"></span></div></div></div>
    <div class="bt-msg box" id="bmsg"></div><div class="bt-menu" id="bmenu"></div></div>`,"g-battle");
  const hp=()=>{$("#ohb").style.width=Math.max(0,S.ohp/O.hp*100)+"%";$("#mhb").style.width=Math.max(0,S.php/P.hp*100)+"%";
    $("#ohb").className=S.ohp/O.hp<.25?"low":"";$("#mhb").className=S.php/P.hp<.25?"low":"";$("#ohn").textContent=`${Math.max(0,S.ohp)}/${O.hp} PS`;$("#mhn").textContent=`${Math.max(0,S.php)}/${P.hp} PS`};
  const say=t=>new Promise(r=>{const m=$("#bmsg");m.innerHTML=t;let k=setTimeout(go,1050);function go(){clearTimeout(k);m.onclick=null;r()}m.onclick=go});
  const anim=(el,c)=>{el.classList.remove(c);void el.offsetWidth;el.classList.add(c)};
  const pop=(el,txt,cls)=>{el.insertAdjacentHTML("beforeend",`<span class="dmg ${cls||""}">${txt}</span>`);setTimeout(()=>{const d=el.querySelector(".dmg");d&&d.remove()},900)};
  const dmgCalc=(pow,a,d,crit,mult)=>{const isC=Math.random()<crit;let v=pow*(a/(a+d))*2*(.85+Math.random()*.15)*mult*(isC?1.6:1);return{v:Math.max(1,Math.round(v)),isC}};
  hp();
  async function act(who,m,idx){
    const mine=who==="me",A=mine?P:O,D=mine?O:P,name=mine?esc(G.name):esc(nm(opp)),me_el=$(mine?"#mS":"#oS"),them_el=$(mine?"#oS":"#mS");
    if(mine&&m.pp){S.pp[idx]--}if(!mine&&m.pp){S.opp[idx]--}
    await say(`${name} usó <b>${esc(m.n)}</b>${m.txt?`: ${esc(m.txt)}`:""}.`);
    let acc=m.acc;if(mine&&S.beer)acc-=15;
    if(m.eff==="charge"&&!mine&&!S.charge){S.charge={m,idx};anim(me_el,"glow");Sound.tone(220,.5,"sawtooth",.07,0,440);await say(`⚠️ ¡${name} está preparando algo grande! Defiéndete…`);return}
    if(m.eff==="heal"){const amt=Math.round((mine?P.hp*(m.pct||.22):O.hp*.15));if(mine)S.php=Math.min(P.hp,S.php+amt);else{S.ohp=Math.min(O.hp,S.ohp+amt);S.oheals++}
      pop(me_el,"+"+amt,"heal");Sound.tone(520,.3,"triangle",.12,0,880);hp();await say(`${name} recupera ${amt} PS.`);return}
    if(m.eff==="guard"){if(mine)S.guard=true;else S.oguard=true;Sound.tone(600,.15,"triangle",.1);await say(`🛡️ ${name} se protege.`);return}
    if(Math.random()*100>acc){Sound.tone(180,.15,"square",.06);await say(`¡Pero falló!`);return}
    if(m.eff==="stun"&&!mine){S.stun=true;anim(them_el,"hit");Sound.tone(150,.4,"sine",.15,0,80);await say(`😴 Te quedaste dormido… pierdes el siguiente turno.`);return}
    let mult=1;if(mine){if(S.beer)mult*=1.5;if(S.debuff)mult*=.75}else{if(S.guard){mult*=.5}if(G.items.sello)mult*=.9}
    if(!mine&&S.guard)S.guard=false;if(mine&&S.oguard){mult*=.5;S.oguard=false}
    const{v,isC}=dmgCalc(m.pow,A.atk,D.def,A.crit,mult);
    anim(me_el,"lunge");await sleep(220);anim(them_el,"hit");pop(them_el,"-"+v,isC?"crit":"");Sound.tone(isC?120:180,.18,"square",.16,0,60);
    if(mine)S.ohp-=v;else{S.php-=v;S.taken+=v}hp();
    if(isC)await say("💥 ¡Golpe crítico! ¡Es muy eficaz!");else if(v<8)await say("No es muy eficaz…");
    if(m.eff==="debuff"&&!mine){S.debuff=3;await say(`📉 Tu ánimo baja: tu ataque se reduce durante 3 turnos.`)}
  }
  function oppMove(){
    if(S.charge){const c=S.charge;S.charge=null;return[{...c.m,eff:null},c.idx]}
    if(!isBoss){if(S.ohp<O.hp*.35&&S.opp[3]>0&&Math.random()<.6)return[om[3],3];if(S.opp[1]>0&&Math.random()<.35)return[om[1],1];if(Math.random()<.12)return[om[2],2];return[om[0],0]}
    let opts2=om.map((m,i)=>[m,i]).filter(([m])=>!(m.eff==="heal"&&(S.oheals>=2||S.ohp>O.hp*.6)));
    if(S.stun)opts2=opts2.filter(([m])=>m.eff!=="stun");
    return pick(opts2)}
  async function turn(i,item){
    menu(false);
    if(item){await useItem(item)}else{await act("me",pm[i],i)}
    if(S.beer)S.beer--;
    if(S.ohp<=0)return finish(true);
    await sleep(200);const[m,idx]=oppMove();await act("opp",m,idx);
    if(S.debuff)S.debuff--;
    if(S.php<=0)return finish(false);
    if(S.stun){S.stun=false;await say("…zzz…");await sleep(200);const[m2,i2]=oppMove();await act("opp",m2,i2);if(S.php<=0)return finish(false)}
    menu(true)}
  async function useItem(k){G.items[k]--;save();const el=$("#mS");
    if(k==="cafe"||k==="empanada"){const amt=k==="cafe"?30:60;S.php=Math.min(P.hp,S.php+amt);pop(el,"+"+amt,"heal");Sound.tone(520,.3,"triangle",.12,0,880);hp();await say(`${ITEMS[k].e} Usaste ${ITEMS[k].n}: +${amt} PS.`)}
    if(k==="cerveza"){S.beer=3;anim(el,"glow");Sound.tone(300,.4,"sawtooth",.08,0,600);await say("🍺 ¡Salud! Tu ataque sube ×1,5 durante 3 turnos… y tu puntería baja un poco.")}}
  function menu(on){const b=$("#bmenu");if(!on){b.innerHTML="";return}
    $("#bmsg").innerHTML=`¿Qué hará ${esc(G.name)}?`;
    b.innerHTML=pm.map((m,i)=>`<button class="btn mv ${m.sp?"sp":""}" data-i="${i}" ${m.pp&&S.pp[i]<=0?"disabled":""}>${esc(m.n)}${m.pp?`<small>${S.pp[i]}/${m.pp}</small>`:""}</button>`).join("")+
      `<button class="btn mv bag" data-bag="1">🎒 Mochila</button><button class="btn mv run" data-run="1">🏳️ Rendirse</button>`;
    b.onclick=async e=>{const t=e.target.closest(".mv");if(!t||t.disabled)return;Sound.tap();
      if(t.dataset.run){finish(false,true);return}
      if(t.dataset.bag){const usable=["cafe","empanada","cerveza"].filter(k=>(G.items[k]||0)>0);
        if(!usable.length){await say("Tu mochila está vacía. Compra cosas en la cafetería.");menu(true);return}
        b.innerHTML=usable.map(k=>`<button class="btn mv" data-item="${k}">${ITEMS[k].e} ${ITEMS[k].n} ×${G.items[k]}</button>`).join("")+`<button class="btn mv run" data-back="1">↩ Volver</button>`;
        b.onclick=e2=>{const t2=e2.target.closest(".mv");if(!t2)return;if(t2.dataset.back)return menu(true);turn(null,t2.dataset.item)};return}
      turn(+t.dataset.i)}}
  async function finish(win,ran){menu(false);
    $("#oS").innerHTML=anySVG(opp,{mood:win?"ko":"joy"})+'<div class="plat"></div>';$("#mS").innerHTML=charSVG(me,{mood:win?"joy":"ko"})+'<div class="plat"></div>';
    if(win){Sound.fanfare();await say(isBoss?`${esc(nm(opp))}: “${esc(opp.win)}”`:`🏆 ¡Le ganaste a ${esc(nm(opp,false))}!`)}
    else{Sound.tone(260,.6,"sawtooth",.1,0,90);await say(ran?"Te retiras con dignidad. Más o menos.":(isBoss?`${esc(nm(opp))}: “${esc(opp.lose)}”`:`😵 ${esc(nm(opp))} te ganó esta vez.`))}
    $("#bmenu").innerHTML=`<button class="btn" id="bEnd">Continuar</button>`;
    $("#bEnd").onclick=()=>{closeGame();resolve({win,flawless:win&&S.taken===0})}}
  (async()=>{menu(false);if(opts.intro)await say(`${esc(nm(opp))}: “${esc(opts.intro)}”`);else await say(`¡${esc(nm(opp))} te reta a una batalla!`);menu(true)})();
})}
