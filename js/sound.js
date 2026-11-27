/* Motor de sonido compartido (copiado de Frutas Cumbia): efectos + loop de cumbia */
/* WAV silencioso: en iPhone, mantener un <audio> sonando hace que el sonido web
   se escuche aunque el interruptor de silencio esté activado */
function silentWav(){const n=4000,buf=new ArrayBuffer(44+n),v=new DataView(buf),w=(o,t)=>{for(let i=0;i<t.length;i++)v.setUint8(o+i,t.charCodeAt(i))};
  w(0,"RIFF");v.setUint32(4,36+n,true);w(8,"WAVE");w(12,"fmt ");v.setUint32(16,16,true);v.setUint16(20,1,true);v.setUint16(22,1,true);
  v.setUint32(24,8000,true);v.setUint32(28,8000,true);v.setUint16(32,1,true);v.setUint16(34,8,true);w(36,"data");v.setUint32(40,n,true);
  for(let i=0;i<n;i++)v.setUint8(44+i,128);return URL.createObjectURL(new Blob([buf],{type:"audio/wav"}))}
const IS_IOS=/iP(hone|ad|od)/.test(navigator.userAgent)||(navigator.platform==="MacIntel"&&navigator.maxTouchPoints>1);
const Sound={ctx:null,on:true,m:null,timer:null,next:0,step:0,primed:false,silent:null,
  init(){if(this.ctx)return;try{const AC=window.AudioContext||window.webkitAudioContext;this.ctx=new AC();
    const comp=this.ctx.createDynamicsCompressor();comp.threshold.value=-20;comp.ratio.value=4;comp.connect(this.ctx.destination);
    this.m=this.ctx.createGain();this.m.gain.value=this.on?.9:0;this.m.connect(comp)}catch(e){this.ctx=null}},
  resume(){try{if(this.ctx&&this.ctx.state!=="running")this.ctx.resume()}catch(e){}},
  /* se llama dentro de un toque del usuario */
  unlock(){if(!this.on){this.init();return}
    try{if(navigator.audioSession)navigator.audioSession.type="playback"}catch(e){}
    if(IS_IOS){try{if(!this.silent){this.silent=new Audio(silentWav());this.silent.loop=true;this.silent.setAttribute("playsinline","")}this.silent.play().catch(()=>{})}catch(e){}}
    this.init();this.resume();
    if(this.ctx&&!this.primed){try{const s=this.ctx.createBufferSource();s.buffer=this.ctx.createBuffer(1,1,22050);s.connect(this.ctx.destination);s.start(0);this.primed=true}catch(e){}}
    this.startLoop()},
  tone(f,d,type="sine",v=.2,t=0,f2){if(!this.ctx||!this.on)return;const c=this.ctx,o=c.createOscillator(),g=c.createGain(),T=c.currentTime+t;
    o.type=type;o.frequency.setValueAtTime(f,T);if(f2)o.frequency.exponentialRampToValueAtTime(f2,T+d);
    g.gain.setValueAtTime(0,T);g.gain.linearRampToValueAtTime(v,T+.01);g.gain.exponentialRampToValueAtTime(.0008,T+d);o.connect(g);g.connect(this.m);o.start(T);o.stop(T+d+.05)},
  noise(d,v,T,fq=4000,q=1.2){const c=this.ctx;if(!this.nb){this.nb=c.createBuffer(1,c.sampleRate,c.sampleRate);const a=this.nb.getChannelData(0);for(let i=0;i<a.length;i++)a[i]=Math.random()*2-1}
    const s=c.createBufferSource(),bp=c.createBiquadFilter(),g=c.createGain();s.buffer=this.nb;bp.type="bandpass";bp.frequency.value=fq;bp.Q.value=q;
    g.gain.setValueAtTime(0,T);g.gain.linearRampToValueAtTime(v,T+.008);g.gain.exponentialRampToValueAtTime(.0008,T+d);s.connect(bp);bp.connect(g);g.connect(this.m);s.start(T,Math.random()*.5);s.stop(T+d+.02)},
  tap(){this.tone(520,.09,"square",.08,0,880)},
  pop(){this.tone(400,.18,"triangle",.3,0,1000);this.tone(900,.1,"square",.06,.05,1400)},
  crack(){if(!this.ctx||!this.on)return;this.noise(.12,.6,this.ctx.currentTime,2200,.8);this.tone(260,.12,"square",.1,0,140)},
  fanfare(){[523,659,784,1047].forEach((f,i)=>this.tone(f,.25,"square",.1,i*.09));[523,659,784].forEach(f=>this.tone(f,.9,"square",.05,.4));this.tone(1568,.6,"triangle",.12,.4)},
  startLoop(){if(!this.ctx||this.timer)return;this.next=this.ctx.currentTime+.08;this.step=0;
    this.timer=setInterval(()=>{if(!this.on||!this.ctx)return;const now=this.ctx.currentTime;if(this.next<now-.2)this.next=now+.05;
      while(this.next<now+.15){this.sched(this.step,this.next);this.next+=60/96/2;this.step++}},30)},
  stopLoop(){clearInterval(this.timer);this.timer=null},
  /* cumbia I–V7–V7–I a ~96 bpm, en registros que sí suenan en el parlante del móvil:
     bajo, güiro largo-corto, acordeón a contratiempo y una melodía de 8 compases */
  MEL:[[659,0,784,0,659,587,523,0],[587,0,698,0,587,523,494,0],[494,523,587,0,698,0,587,0],[523,0,659,0,523,0,0,0],
       [784,0,880,784,659,0,523,0],[698,0,784,698,587,0,494,0],[587,0,494,0,392,0,494,0],[523,0,0,0,523,0,659,0]],
  sched(st,T){const c=this.ctx,b=st%8,bar=Math.floor(st/8)%8,dom=bar%4===1||bar%4===2;
    const root=dom?196:261.63,fifth=dom?293.66:392,chord=dom?[493.88,587.33,698.46]:[523.25,659.25,783.99];
    const voice=(type,f,v,d,lp)=>{const o=c.createOscillator(),g=c.createGain();o.type=type;o.frequency.value=f;let n=o;
      if(lp){const fl=c.createBiquadFilter();fl.type="lowpass";fl.frequency.value=lp;o.connect(fl);n=fl}
      g.gain.setValueAtTime(0,T);g.gain.linearRampToValueAtTime(v,T+.012);g.gain.exponentialRampToValueAtTime(.0008,T+d);n.connect(g);g.connect(this.m);o.start(T);o.stop(T+d+.05)};
    if(b===0)voice("sawtooth",root,.2,.3,1000);
    if(b===4)voice("sawtooth",fifth,.2,.3,1000);
    if(b===6)voice("sawtooth",root,.13,.14,1000);
    if(b===0||b===4){const k=c.createOscillator(),g=c.createGain();k.frequency.setValueAtTime(160,T);k.frequency.exponentialRampToValueAtTime(50,T+.14);
      g.gain.setValueAtTime(.5,T);g.gain.exponentialRampToValueAtTime(.0008,T+.16);k.connect(g);g.connect(this.m);k.start(T);k.stop(T+.2)}
    this.noise(b%2?.05:.17,b%2?.24:.16,T,b%2?5200:3800,1.4);
    if(b%2)chord.forEach(fq=>voice("square",fq,.04,.12,2400));
    const note=this.MEL[bar][b];if(note){voice("square",note,.075,.24,2800);voice("triangle",note*2,.03,.18)}
  },
  toggle(){this.on=!this.on;try{localStorage.setItem("fc.sound",this.on?"1":"0")}catch(e){}
    if(this.on){this.unlock();if(this.m)this.m.gain.value=.9}else{this.stopLoop();if(this.m)this.m.gain.value=0;try{this.silent&&this.silent.pause()}catch(e){}}
    (window.updSoundBtn&&updSoundBtn())}
};
/* la música empieza con el primer toque en cualquier parte */
function firstTouch(){Sound.unlock();removeEventListener("touchend",firstTouch,true);removeEventListener("click",firstTouch,true)}
addEventListener("touchend",firstTouch,true);addEventListener("click",firstTouch,true);
document.addEventListener("visibilitychange",()=>{if(!Sound.ctx)return;
  if(document.hidden){try{Sound.ctx.suspend()}catch(e){}try{Sound.silent&&Sound.silent.pause()}catch(e){}}
  else if(Sound.on){Sound.resume();try{Sound.silent&&Sound.silent.play().catch(()=>{})}catch(e){}}});
try{if(localStorage.getItem("fc.sound")==="0")Sound.on=false}catch(e){}

