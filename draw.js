/* =========================================================
   COMPARTIDO entre el juego (index.html) y el panel (admin.html):
   tipos, rarezas, dibujo de frutas, carta Frutadex y probabilidades
   ========================================================= */
const DIMS=[{k:"Dulzura",e:"🍬",c:"#ff8fab",t:"Dulce"},{k:"Acidez",e:"🍋",c:"#ffd43b",t:"Ácido"},{k:"Caos",e:"🌀",c:"#9775fa",t:"Cósmico"},{k:"Oscuridad",e:"💀",c:"#868e96",t:"Sombrío"}];
const RAR=[null,{t:"Común",c:"#b2f2bb",s:"★"},{t:"Rara",c:"#a5d8ff",s:"★★"},{t:"Exótica",c:"#eebefa",s:"★★★"},{t:"Legendaria",c:"#ffe066",s:"★★★★"}];
const MOODS=["d","a","c","o"];

/* =========================================================
   DIBUJO DE FRUTAS (SVG generado)
   ========================================================= */
const INK="#2b2d42";let UID=0;
function shade(hex,amt){let n=parseInt(hex.slice(1),16),r=n>>16,g=n>>8&255,b=n&255,t=amt<0?0:255,p=Math.abs(amt);
  r=Math.round((t-r)*p+r);g=Math.round((t-g)*p+g);b=Math.round((t-b)*p+b);return"#"+((1<<24)+(r<<16)+(g<<8)+b).toString(16).slice(1)}
function rng(seed){let s=seed%2147483647;if(s<=0)s+=2147483646;return()=>(s=s*16807%2147483647)/2147483647}
const ell=(cx,cy,rx,ry)=>`M${cx-rx} ${cy}a${rx} ${ry} 0 1 0 ${2*rx} 0a${rx} ${ry} 0 1 0 ${-2*rx} 0Z`;

function geom(f){
  const w=f.w,h=f.h;
  switch(f.sh){
    case"round":{const rx=w||60,ry=h||57,cy=116;return{parts:[ell(100,cy,rx,ry)],e:[100,cy,rx,ry],top:[100,cy-ry+4],face:[[100,cy+6,1]]}}
    case"oval":{const rx=w||70,ry=h||50,cy=118;return{parts:[ell(100,cy,rx,ry)],e:[100,cy,rx,ry],top:[100,cy-ry+3],face:[[100,cy+4,.95]]}}
    case"tall":{const rx=w||50,ry=h||68,cy=114;return{parts:[ell(100,cy,rx,ry)],e:[100,cy,rx,ry],top:[100,cy-ry+3],face:[[100,cy+8,Math.min(1,rx/56)]]}}
    case"pear":return{parts:["M100 40C84 40 82 68 78 82C74 96 44 112 46 145C48 172 72 182 100 182C128 182 152 172 154 145C156 112 126 96 122 82C118 68 116 40 100 40Z"],e:[100,140,52,40],top:[100,42],face:[[100,146,.95]]};
    case"drop":return{parts:["M100 44C78 44 74 84 64 104C48 138 60 180 100 180C140 180 152 138 136 104C126 84 122 44 100 44Z"],e:[100,138,44,40],top:[100,46],face:[[100,138,.9]]};
    case"berry":return{parts:["M100 182C70 162 38 122 40 86C42 58 70 52 100 62C130 52 158 58 160 86C162 122 130 162 100 182Z"],e:[100,108,58,62],top:[100,64],face:[[100,112,.95]]};
    case"banana":return{parts:["M34 58C36 150 128 190 180 126C186 117 178 107 168 113C128 148 76 126 60 60C57 48 33 46 34 58Z"],e:[105,120,70,55],top:[46,52],face:[[104,153,.48]],bananaTip:true};
    case"star":{let d="",pts=[];for(let i=0;i<10;i++){const a=-Math.PI/2+i*Math.PI/5,r=i%2?36:76;pts.push([100+r*Math.cos(a),116+r*Math.sin(a)])}
      d="M"+pts.map(p=>p[0].toFixed(1)+" "+p[1].toFixed(1)).join("L")+"Z";return{parts:[d],e:[100,116,70,70],top:[100,42],face:[[100,120,.8]],starPts:pts}}
    case"bunch":{const P=[[46,74],[82,72],[118,72],[154,74],[64,106],[100,104],[136,106],[82,138],[118,138],[100,168]];const r=21;
      return{parts:P.map(p=>ell(p[0],p[1],r,r)),e:[100,116,70,60],top:[100,54],face:[[100,112,.82]],bunch:true}}
    case"cherry":return{parts:[ell(64,140,38,36),ell(138,132,40,38)],e:[100,136,80,40],top:null,face:[[64,146,.6],[138,138,.62]],cherry:true};
    case"hand":return{parts:[ell(100,152,50,34)],e:[100,152,50,34],top:null,face:[[100,156,.78]],hand:true};
    case"pine":return{parts:[ell(100,128,52,60)],e:[100,128,52,60],top:[100,72],face:[[100,138,.95]],pine:true};
  }
}

function leafPoly(x,y,ang,len,wid){const a=ang*Math.PI/180,tx=x+len*Math.sin(a),ty=y-len*Math.cos(a),px=Math.cos(a)*wid,py=Math.sin(a)*wid,
  mx=(x+tx)/2,my=(y+ty)/2;return`M${(x-px).toFixed(1)} ${(y-py).toFixed(1)}Q${(mx-px*1.2).toFixed(1)} ${(my-py*1.2).toFixed(1)} ${tx.toFixed(1)} ${ty.toFixed(1)}Q${(mx+px*1.2).toFixed(1)} ${(my+py*1.2).toFixed(1)} ${(x+px).toFixed(1)} ${(y+py).toFixed(1)}Z`}

function perim(e,n,len,fn){const[cx,cy,rx,ry]=e;let out="";for(let i=0;i<n;i++){const t=i/n*Math.PI*2+.13,dt=Math.PI/n*.8;
  const P=a=>[cx+rx*.96*Math.cos(a),cy+ry*.96*Math.sin(a)];const nx=Math.cos(t)/rx,ny=Math.sin(t)/ry,nl=Math.hypot(nx,ny);
  out+=fn(P(t-dt),P(t+dt),P(t),[nx/nl,ny/nl],len,i)}return out}

function texture(f,G,R,sil){
  if(sil)return"";const c2=f.c2,[cx,cy,rx,ry]=G.e,x0=cx-rx-10,x1=cx+rx+10,y0=cy-ry-14,y1=cy+ry+14;let s="";
  switch(f.tx){
    case"seeds":for(let y=y0;y<y1;y+=17)for(let x=x0+((y/17|0)%2)*9;x<x1;x+=18)s+=`<ellipse cx="${x}" cy="${y}" rx="2.6" ry="4" fill="${c2}" stroke="${shade(c2,-.45)}" stroke-width="1"/>`;break;
    case"dots":for(let i=0;i<22;i++)s+=`<circle cx="${(x0+R()*(x1-x0)).toFixed(1)}" cy="${(y0+R()*(y1-y0)).toFixed(1)}" r="${(1.8+R()*2.4).toFixed(1)}" fill="${c2}" opacity=".6"/>`;break;
    case"fuzz":for(let i=0;i<55;i++){const x=x0+R()*(x1-x0),y=y0+R()*(y1-y0),a=R()*6.28;s+=`<path d="M${x.toFixed(1)} ${y.toFixed(1)}l${(5*Math.cos(a)).toFixed(1)} ${(5*Math.sin(a)).toFixed(1)}" stroke="${c2}" stroke-width="2.2" stroke-linecap="round" opacity=".7"/>`}break;
    case"bumps":for(let y=y0;y<y1;y+=15)for(let x=x0+((y/15|0)%2)*8;x<x1;x+=16)s+=`<circle cx="${x}" cy="${y}" r="5.5" fill="none" stroke="${c2}" stroke-width="2.4" opacity=".75"/>`;break;
    case"grid":for(let k=-200;k<260;k+=22){s+=`<path d="M${k} 0l200 200M${k+200} 0l-200 200" stroke="${c2}" stroke-width="3" opacity=".8"/>`}
      for(let y=y0;y<y1;y+=22)for(let x=x0;x<x1;x+=22)s+=`<circle cx="${x+11}" cy="${y+(Math.round(cx)%22)}" r="2.5" fill="${shade(c2,-.3)}"/>`;break;
    case"stripes":for(let x=x0;x<x1;x+=22)s+=`<path d="M${x} ${y0}Q${x+10} ${cy} ${x} ${y1}" stroke="${c2}" stroke-width="8" fill="none" opacity=".9"/>`;break;
    case"net":for(let i=0;i<9;i++){const y=y0+i*(y1-y0)/9;s+=`<path d="M${x0} ${y}Q${cx} ${y+18*(R()-.5)} ${x1} ${y+6}" stroke="${c2}" stroke-width="2" fill="none"/>`;
      const x=x0+i*(x1-x0)/9;s+=`<path d="M${x} ${y0}Q${x+18*(R()-.5)} ${cy} ${x+6} ${y1}" stroke="${c2}" stroke-width="2" fill="none"/>`}break;
    case"scales":case"bracts":for(let y=y0;y<y1;y+=14)for(let x=x0+((y/14|0)%2)*8;x<x1;x+=16)s+=`<path d="M${x-7} ${y}Q${x} ${y+12} ${x+7} ${y}" stroke="${f.tx=="scales"?c2:shade(f.c1,-.3)}" stroke-width="2.4" fill="none" opacity=".8"/>`;break;
    case"spikes":for(let y=y0;y<y1;y+=16)for(let x=x0+((y/16|0)%2)*8;x<x1;x+=16)s+=`<path d="M${x-4} ${y+3}L${x} ${y-4}L${x+4} ${y+3}" stroke="${shade(f.c1,-.35)}" stroke-width="2" fill="none"/>`;break;
    case"hairs":for(let i=0;i<30;i++){const x=x0+R()*(x1-x0),y=y0+R()*(y1-y0);s+=`<path d="M${x.toFixed(1)} ${y.toFixed(1)}q4 -6 0 -10" stroke="${c2}" stroke-width="2.4" fill="none" stroke-linecap="round"/>`}break;
    case"blush":s+=`<ellipse cx="${cx+rx*.45}" cy="${cy-ry*.1}" rx="${rx*.75}" ry="${ry*.8}" fill="${c2}" opacity=".55" filter="url(#soft)"/>`;break;
  }
  return s;
}

function outward(f,G,sil){
  const out=sil?INK:shade(f.c1,-.2);
  if(f.tx==="spikes"){const L=f.sl||14;return perim(G.e,f.k||18,L,(a,b,m,n,len)=>`<path d="M${a[0].toFixed(1)} ${a[1].toFixed(1)}L${(m[0]+n[0]*len).toFixed(1)} ${(m[1]+n[1]*len).toFixed(1)}L${b[0].toFixed(1)} ${b[1].toFixed(1)}Z" fill="${out}"/>`)}
  if(f.tx==="hairs"){const col=sil?INK:f.c2;return perim(G.e,26,16,(a,b,m,n,len,i)=>{const tx=m[0]+n[0]*len,ty=m[1]+n[1]*len,cx=m[0]+n[0]*len*.5-n[1]*8*(i%2?1:-1),cy=m[1]+n[1]*len*.5+n[0]*8*(i%2?1:-1);
    const d=`M${m[0].toFixed(1)} ${m[1].toFixed(1)}Q${cx.toFixed(1)} ${cy.toFixed(1)} ${tx.toFixed(1)} ${ty.toFixed(1)}`;return`<path d="${d}" stroke="${INK}" stroke-width="7" fill="none" stroke-linecap="round"/><path d="${d}" stroke="${col}" stroke-width="3.5" fill="none" stroke-linecap="round"/>`})}
  if(f.tx==="bracts"){const col=sil?INK:f.c2;return perim(G.e,12,20,(a,b,m,n,len)=>{const ang=Math.atan2(n[0],-n[1])*180/Math.PI;return`<path d="${leafPoly(m[0],m[1],ang,len+6,7)}" fill="${col}"/>`})}
  return"";
}

function topDeco(f,G,sil){
  const leafC=sil?INK:"#51cf66",stemC=sil?INK:"#8d5524";let s="";
  if(G.cherry){return`<path d="M64 106Q70 60 104 30M138 96Q128 58 104 30" stroke="${INK}" stroke-width="9" fill="none" stroke-linecap="round"/><path d="M64 106Q70 60 104 30M138 96Q128 58 104 30" stroke="${sil?INK:'#5c940d'}" stroke-width="4.5" fill="none" stroke-linecap="round"/><path d="${leafPoly(104,32,55,40,11)}" fill="${leafC}"/>`}
  if(!G.top||f.tp==="none")return"";const[x,y]=G.top;
  if(f.tp==="stem"||f.tp==="leaf"){const dx=G.bananaTip?-4:4;s+=`<path d="M${x} ${y+4}Q${x+dx*.5} ${y-10} ${x+dx} ${y-20}" stroke="${INK}" stroke-width="10" fill="none" stroke-linecap="round"/><path d="M${x} ${y+4}Q${x+dx*.5} ${y-10} ${x+dx} ${y-20}" stroke="${stemC}" stroke-width="5" fill="none" stroke-linecap="round"/>`;
    if(f.tp==="leaf")s+=`<path d="${leafPoly(x+3,y-12,62,42,12)}" fill="${leafC}"/><path d="M${x+5} ${y-13}l26 -14" stroke="${INK}" stroke-width="2" fill="none" opacity=".6"/>`}
  if(f.tp==="calyx"){const cc=sil?INK:(f.cc||"#40c057"),L=f.cl||26;[-120,-70,-25,25,70,120].forEach(a=>s+=`<path d="${leafPoly(x,y+2,a,L,L>30?10:6)}" fill="${cc}"/>`);
    s+=`<path d="M${x} ${y}l2 -12" stroke="${INK}" stroke-width="7" stroke-linecap="round"/><path d="M${x} ${y}l2 -12" stroke="${sil?INK:'#5c940d'}" stroke-width="3" stroke-linecap="round"/>`}
  return s;
}

function crown(f,G,sil){if(!G.pine)return"";const c=sil?INK:"#40c057",c2=sil?INK:"#2f9e44";let s="";
  [[-52,52,c2],[52,52,c2],[-30,64,c],[30,64,c],[-12,72,c2],[12,72,c2],[0,78,c]].forEach(([a,l,col])=>s+=`<path d="${leafPoly(100,84,a,l,9)}" fill="${col}"/>`);return s}

function fingers(f,G,sil){if(!G.hand)return"";const c=sil?INK:f.c1;let s="";
  const F=[[34,78,50,112],[52,44,66,96],[86,28,88,86],[118,30,114,86],[150,48,138,98],[168,84,152,116],[120,198,112,176]];
  F.forEach(([tx,ty,mx,my])=>{const d=`M100 150Q${mx} ${my} ${tx} ${ty}`;s+=`<path d="${d}" stroke="${INK}" stroke-width="27" fill="none" stroke-linecap="round"/><path d="${d}" stroke="${c}" stroke-width="19" fill="none" stroke-linecap="round"/>`});return s}

function face(x,y,s,mood,c1){
  const W="#fff",blush=`<circle cx="-30" cy="10" r="7.5" fill="#ff8fab" opacity=".65"/><circle cx="30" cy="10" r="7.5" fill="#ff8fab" opacity=".65"/>`;let g="";
  if(mood==="d"){g=blush+`<g class="blink"><path d="M-27 -2Q-19 -14 -11 -2M11 -2Q19 -14 27 -2" stroke="${INK}" stroke-width="4.5" fill="none" stroke-linecap="round"/></g>
    <path d="M-12 7Q0 26 12 7Z" fill="#c92a2a" stroke="${INK}" stroke-width="3.5" stroke-linejoin="round"/><path d="M-5 15Q0 20 5 15Q0 12 -5 15Z" fill="#ff8fab"/>`}
  else if(mood==="a"){g=`<g class="blink"><circle cx="-18" cy="-2" r="8.5" fill="${W}" stroke="${INK}" stroke-width="3"/><circle cx="18" cy="-2" r="8.5" fill="${W}" stroke="${INK}" stroke-width="3"/>
    <circle cx="-14" cy="0" r="4" fill="${INK}"/><circle cx="22" cy="0" r="4" fill="${INK}"/><path d="M-27 -5H-9M9 -5H27" stroke="${INK}" stroke-width="4" stroke-linecap="round"/></g>
    <path d="M-28 -16L-10 -13M10 -18Q19 -25 28 -17" stroke="${INK}" stroke-width="3.5" fill="none" stroke-linecap="round"/><path d="M-9 14Q5 18 14 8" stroke="${INK}" stroke-width="4" fill="none" stroke-linecap="round"/>`}
  else if(mood==="c"){g=blush+`<g class="blink"><circle cx="-17" cy="-3" r="11" fill="${W}" stroke="${INK}" stroke-width="3"/><circle cx="-14" cy="-1" r="5" fill="${INK}"/><circle cx="-12" cy="-3" r="1.6" fill="${W}"/>
    <circle cx="19" cy="-1" r="6" fill="${W}" stroke="${INK}" stroke-width="3"/><circle cx="20" cy="1" r="2.6" fill="${INK}"/></g>
    <path d="M-11 10Q0 6 11 10Q8 22 0 22Q-8 22 -11 10Z" fill="#c92a2a" stroke="${INK}" stroke-width="3.5" stroke-linejoin="round"/><path d="M2 18Q6 30 12 24Q12 18 6 17Z" fill="#ff8fab" stroke="${INK}" stroke-width="2.5"/>`}
  else{g=`<g class="blink"><path d="M-27 -3A9 9 0 0 0 -9 -3Z" fill="${W}" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/><path d="M9 -3A9 9 0 0 0 27 -3Z" fill="${W}" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
    <circle cx="-18" cy="0" r="3.2" fill="${INK}"/><circle cx="18" cy="0" r="3.2" fill="${INK}"/><path d="M-29 -4H-7M7 -4H29" stroke="${INK}" stroke-width="4.5" stroke-linecap="round"/></g>
    <path d="M-25 9Q-18 12 -11 9M11 9Q18 12 25 9" stroke="${INK}" stroke-width="2" fill="none" opacity=".55"/><path d="M-9 17Q0 13 9 17" stroke="${INK}" stroke-width="4" fill="none" stroke-linecap="round"/>
    <path d="M30 -16q4 7 0 10q-4 -3 0 -10Z" fill="#74c0fc" stroke="${INK}" stroke-width="2"/>`}
  return`<g transform="translate(${x} ${y}) scale(${s})">${g}</g>`;
}

function dominant(p){let m=0;p.forEach((v,i)=>{if(v>p[m])m=i});return m}

function fruitSVG(f,opt={}){
  const sil=!!opt.sil,G=geom(f),id="f"+(++UID),R=rng(f.id*97+13),mood=MOODS[dominant(f.p)];
  const base=sil?INK:f.c1,dark=shade(f.c1,-.22),light=shade(f.c1,.35);
  const fill=sil?INK:`url(#${id}g)`;
  let defs=`<defs><radialGradient id="${id}g" cx="35%" cy="30%" r="80%"><stop offset="0" stop-color="${light}"/><stop offset=".55" stop-color="${base}"/><stop offset="1" stop-color="${dark}"/></radialGradient>
    <clipPath id="${id}c">${G.parts.map(d=>`<path d="${d}"/>`).join("")}</clipPath></defs>`;
  let body=G.parts.map(d=>`<path d="${d}" fill="${fill}" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/>`).join("");
  if(G.starPts&&!sil){body+=G.starPts.filter((_,i)=>i%2==0).map(p=>`<path d="M100 116L${p[0].toFixed(1)} ${p[1].toFixed(1)}" stroke="${shade(f.c1,-.25)}" stroke-width="3" opacity=".6"/>`).join("")}
  const shine=sil?"":G.parts.slice(0,G.bunch?10:2).map((d,i)=>{if(G.bunch){const m=d.match(/M([\d.]+) ([\d.]+)a([\d.]+)/);const cx=+m[1]+(+m[3]),cy=+m[2];return`<ellipse cx="${cx-8}" cy="${cy-9}" rx="5" ry="3.5" fill="#fff" opacity=".7" transform="rotate(-30 ${cx-8} ${cy-9})"/>`}
      const[cx,cy,rx,ry]=G.cherry?(i==0?[64,140,38,36]:[138,132,40,38]):G.e;return`<ellipse cx="${cx-rx*.48}" cy="${cy-ry*.5}" rx="${rx*.2}" ry="${ry*.12}" fill="#fff" opacity=".75" transform="rotate(-35 ${cx-rx*.48} ${cy-ry*.5})"/>`}).join("");
  const tex=`<g clip-path="url(#${id}c)">${texture(f,G,R,sil)}</g>`;
  const faces=(sil||opt.noFace)?"":G.face.map(([x,y,s])=>face(x,y,s,mood,f.c1)).join("");
  const filt=opt.anim?"wobA":"wob";
  const q=sil?`<text x="100" y="${G.e[1]+14}" text-anchor="middle" font-family="Chewy" font-size="44" fill="#fff">?</text>`:"";
  return`<svg viewBox="0 0 200 210" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${sil?"Fruta sin descubrir":f.n}">${defs}<g filter="url(#${filt})" stroke-linejoin="round">${crown(f,G,sil)}${fingers(f,G,sil)}${outward(f,G,sil)}${body}${tex}${shine}${topDeco(f,G,sil)}${faces}${q}</g></svg>`;
}
/* desenfoque suave para el rubor */
(function ensureDefs(){let defs=document.querySelector("svg defs");
  if(!defs){document.body.insertAdjacentHTML("afterbegin",`<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>
    <filter id="wob" x="-10%" y="-10%" width="120%" height="120%"><feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="2" seed="4"/><feDisplacementMap in="SourceGraphic" scale="4"/></filter>
    <filter id="wobA" x="-10%" y="-10%" width="120%" height="120%"><feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="2" seed="1"/><feDisplacementMap in="SourceGraphic" scale="4.5"/></filter></defs></svg>`);defs=document.querySelector("svg defs")}
  defs.insertAdjacentHTML("beforeend",`<filter id="soft" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="9"/></filter>`)})();

/* Avatar del "Profesor" Cañamero (caricatura genérica) */
const PROF=`<svg viewBox="0 0 60 64"><g filter="url(#wob)" stroke="${INK}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
<path d="M8 64C8 50 18 46 30 46C42 46 52 50 52 64Z" fill="#fff"/><path d="M30 46L24 56L30 54L36 56Z" fill="#74c0fc"/>
<circle cx="30" cy="28" r="18" fill="#ffd8a8"/><path d="M13 22C14 8 46 6 47 22C42 16 36 14 30 18C24 14 18 16 13 22Z" fill="#5c3d2e"/>
<circle cx="22" cy="28" r="6" fill="#fff"/><circle cx="38" cy="28" r="6" fill="#fff"/><path d="M28 28H32" />
<circle cx="22" cy="29" r="2" fill="${INK}" stroke="none"/><circle cx="38" cy="29" r="2" fill="${INK}" stroke="none"/>
<path d="M22 38Q26 35 30 38Q34 35 38 38Q34 41 30 39Q26 41 22 38Z" fill="#5c3d2e"/></g></svg>`;

function cardHTML(f,v,owner){
  const rar=RAR[f.r],dom=DIMS[dominant(f.p)],hp=40+f.r*25+(f.id*7)%30,dmg=10*(f.r+3)+(f.id%4)*10,vals=v||f.p;
  return`<div class="dexcard box"><div class="hd" style="background:${shade(f.c1,.55)}"><span>#${String(f.id).padStart(3,"0")} · ${f.n}</span><span class="hp">❤️ ${hp} PS</span></div>
  <div class="bd"><div class="badges"><span class="badge" style="background:${rar.c}">${rar.s} ${rar.t}</span><span class="badge" style="background:${dom.c}">${dom.e} Tipo ${dom.t}</span></div>
  <div class="sci">${f.sci}</div>
  ${DIMS.map((d,i)=>{const w=vals[i]/5*100;return`<div class="stat"><span>${d.e} ${d.k}</span><div class="bar"><i class="${w?"":"zero"}" style="--w:${w}%;background:${d.c}"></i></div><b>${vals[i]}</b></div>`}).join("")}
  <div class="verdict">${PROF}<div class="bub"><small>FERNANDO CAÑAMERO DICE:</small>${f.v}</div></div>
  <div class="move"><span>⚡ <b>${f.m}</b></span><span>${dmg} de daño</span></div>
  <div class="move"><span>🚫 Debilidad: ${f.wk}</span></div></div></div>`}


/* =========================================================
   CÓMO SE ELIGE LA FRUTA
   1) Tus 5 respuestas dan un reparto (🍬,🍋,🌀,💀), p. ej. 1-2-0-2.
   2) Candidatas: la fruta de ese reparto exacto (peso 10) y las que
      difieren en una sola respuesta (peso 3), cada una × su peso calibrado.
   3) Cuál sale lo deciden tus respuestas concretas (qué preguntas y qué
      opciones): mismas respuestas → misma fruta; mismo reparto con otras
      respuestas → puede salir una vecina.
   ========================================================= */
const KERNEL={0:10,2:3};
function resultCandidates(v){let best=[],bd=1e9;FRUITS.forEach(f=>{const d=f.p.reduce((s,x,i)=>s+(x-v[i])**2,0);if(d<bd){bd=d;best=[f]}else if(d===bd)best.push(f)});return best}
function fruitWeights(v){const W=(typeof FRUIT_WEIGHTS!=="undefined")?FRUIT_WEIGHTS:{},out=[];
  FRUITS.forEach(f=>{const d=f.p.reduce((s,x,i)=>s+(x-v[i])**2,0),k=KERNEL[d];if(k)out.push([f,k*(W[f.n]||1)])});
  if(!out.length)resultCandidates(v).forEach(f=>out.push([f,1]));return out}
function hash01(str){let h=2166136261;for(const c of str){h^=c.codePointAt(0);h=Math.imul(h,16777619)}
  h^=h>>>15;h=Math.imul(h,2246822507);h^=h>>>13;h=Math.imul(h,3266489909);h^=h>>>16;return(h>>>0)/4294967296}
function pickFruit(v,seed){const w=fruitWeights(v),t=w.reduce((s,x)=>s+x[1],0);let r=hash01(seed)*t;for(const[f,x]of w){if((r-=x)<0)return f}return w[w.length-1][0]}
/* Probabilidad teórica de cada fruta si alguien respondiera al azar */
function fruitOdds(){const fact=n=>n<2?1:n*fact(n-1),P={};FRUITS.forEach(f=>P[f.n]=0);
  for(let a=0;a<=5;a++)for(let b=0;a+b<=5;b++)for(let c=0;a+b+c<=5;c++){const d=5-a-b-c,p=fact(5)/(fact(a)*fact(b)*fact(c)*fact(d))/1024,w=fruitWeights([a,b,c,d]),t=w.reduce((s,x)=>s+x[1],0);
    w.forEach(([f,x])=>P[f.n]+=p*x/t)}return P}
