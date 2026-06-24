/* ============================================
   AFNAAN AHMED P — STRANGER THINGS PORTFOLIO
   Canvas project FX, touch support, Vecna clock,
   thunder shake, particles, text scramble, typing
   ============================================ */
(function(){
'use strict';
const $=(s,c=document)=>c.querySelector(s);
const $$=(s,c=document)=>[...c.querySelectorAll(s)];
const isMobile='ontouchstart' in window||navigator.maxTouchPoints>0;

/* ── LOADER ── */
const loader=$('#loader');
const rMsg=$('#loaderRetroMsg');
if(rMsg){
  setTimeout(()=>{rMsg.style.opacity=0;}, 2200);
  setTimeout(()=>{rMsg.textContent='HELLO FROM DEVELOPER AFNAAN';rMsg.style.color='#fff';rMsg.style.opacity=1;}, 2400);
}
window.addEventListener('load',()=>setTimeout(()=>loader.classList.add('hidden'),4500));

/* ── GREETING ── */
const greetEl=$('#heroGreeting');
if(greetEl){const h=new Date().getHours();let g='Hello';if(h>=5&&h<12)g='Good morning';else if(h>=12&&h<17)g='Good afternoon';else if(h>=17&&h<21)g='Good evening';else g='Late night? Same here';greetEl.textContent=g+". I'm"}

/* ── SCROLL PROGRESS & UPSIDE DOWN VIGNETTE ── */
const prog=$('#scrollProgress');
function updProg(){
  const s=window.scrollY,d=document.documentElement.scrollHeight-window.innerHeight;
  const p=d>0?s/d:0;
  prog.style.width=(p*100)+'%';
  document.body.style.setProperty('--scroll-y', p.toFixed(2));
}
window.addEventListener('scroll',updProg,{passive:true});

/* ── SCROLL VELOCITY CANVAS (Interactive Ash) ── */
const sCanvas=$('#scrollCanvas');
if(sCanvas){
  const ctx=sCanvas.getContext('2d');
  let w,h, particles=[];
  function resizeSC(){w=sCanvas.width=window.innerWidth;h=sCanvas.height=window.innerHeight;}
  resizeSC();window.addEventListener('resize',resizeSC);
  for(let i=0;i<40;i++){
    particles.push({
      x:Math.random()*w,y:Math.random()*h,
      r:Math.random()*2+.5,
      vx:(Math.random()-.5)*.4,
      vy:-(Math.random()*.5+.2),
      c:Math.random()>.2?'rgba(204,0,0,0.5)':'rgba(255,255,255,0.3)'
    });
  }
  let lastY=window.scrollY, velocity=0;
  window.addEventListener('scroll', ()=>{
    const curY=window.scrollY;
    velocity=curY-lastY;
    lastY=curY;
  },{passive:true});
  function animSC(){
    ctx.clearRect(0,0,w,h);
    velocity*=0.9;
    particles.forEach(p=>{
      p.x+=p.vx; p.y+=p.vy;
      p.y -= velocity * (p.r * 0.12);
      if(p.y<-50){p.y=h+50;p.x=Math.random()*w;}
      if(p.y>h+50){p.y=-50;p.x=Math.random()*w;}
      if(p.x<-10) p.x=w+10;
      if(p.x>w+10) p.x=-10;
      ctx.beginPath();
      const stretch = Math.min(Math.max(1, Math.abs(velocity)*0.15), 40);
      ctx.ellipse(p.x, p.y, p.r, stretch>p.r?stretch:p.r, 0, 0, Math.PI*2);
      ctx.fillStyle=p.c; ctx.fill();
    });
    requestAnimationFrame(animSC);
  }
  animSC();
}

/* ── NAV ── */
const nav=$('#nav'),ham=$('#hamburger'),mob=$('#mobileMenu'),navLinks=$$('.nav__link'),sects=$$('section[id]');
window.addEventListener('scroll',()=>nav.classList.toggle('scrolled',window.scrollY>50),{passive:true});
ham.addEventListener('click',()=>{ham.classList.toggle('open');mob.classList.toggle('open');document.body.style.overflow=mob.classList.contains('open')?'hidden':''});
$$('.mobile-menu__link').forEach(l=>l.addEventListener('click',()=>{ham.classList.remove('open');mob.classList.remove('open');document.body.style.overflow=''}));
function updNav(){const y=window.scrollY+200;sects.forEach(s=>{const t=s.offsetTop,h=s.offsetHeight,id=s.getAttribute('id');if(y>=t&&y<t+h)navLinks.forEach(l=>l.classList.toggle('active',l.dataset.section===id))})}
window.addEventListener('scroll',updNav,{passive:true});

/* ── SCROLL REVEAL ── */
const revObs=new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting){const p=e.target.parentElement;const sibs=$$('.scroll-reveal',p);const i=sibs.indexOf(e.target);setTimeout(()=>e.target.classList.add('visible'),i*120);revObs.unobserve(e.target)}})},{threshold:.08,rootMargin:'0px 0px -30px 0px'});
$$('.scroll-reveal').forEach(el=>revObs.observe(el));

/* ── SECTION DIVIDER ── */
const divObs=new IntersectionObserver(es=>{es.forEach(e=>e.target.classList.toggle('in-view',e.isIntersecting))},{threshold:.05});
$$('.section').forEach(s=>divObs.observe(s));

/* ── TEXT SCRAMBLE ── */
class TextScramble{constructor(el){this.el=el;this.chars='!<>-_\\/[]{}—=+*^?#ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';this.update=this.update.bind(this)}
setText(t){const old=this.el.innerText;const len=Math.max(old.length,t.length);this.queue=[];for(let i=0;i<len;i++){const f=old[i]||'';const to=t[i]||'';const s=Math.floor(Math.random()*20);const e=s+Math.floor(Math.random()*20);this.queue.push({from:f,to,start:s,end:e})}cancelAnimationFrame(this.frameReq);this.frame=0;this.update();return this}
update(){let o='';let c=0;for(let i=0;i<this.queue.length;i++){let{from,to,start,end,char}=this.queue[i];if(this.frame>=end){c++;o+=to}else if(this.frame>=start){if(!char||Math.random()<.28){char=this.chars[Math.floor(Math.random()*this.chars.length)];this.queue[i].char=char}o+=`<span style="color:var(--red);opacity:.7">${char}</span>`}else o+=from}
this.el.innerHTML=o;if(c<this.queue.length){this.frameReq=requestAnimationFrame(this.update);this.frame++}}}
const scrObs=new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting){const t=e.target.innerText;const fx=new TextScramble(e.target);setTimeout(()=>fx.setText(t),300);scrObs.unobserve(e.target)}})},{threshold:.3});
$$('.txt-scramble').forEach(el=>scrObs.observe(el));

/* ── TYPING ── */
const roles=['intelligent systems','production APIs','ML pipelines','real-time systems','AI applications','cloud infrastructure','full-stack products'];
const heroRole=$('#heroRole');let rI=0,cI=roles[0].length,del=true,spd=2000;
function typeR(){const cur=roles[rI];if(!del){heroRole.textContent=cur.substring(0,cI+1);cI++;if(cI===cur.length){del=true;spd=2200}else spd=55+Math.random()*35}else{heroRole.textContent=cur.substring(0,cI-1);cI--;if(cI===0){del=false;rI=(rI+1)%roles.length;spd=350}else spd=25}setTimeout(typeR,spd)}
setTimeout(typeR,3500);

/* ── COUNTERS ── */
const statObs=new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting){const el=e.target,tgt=parseInt(el.dataset.target),suf=el.dataset.suffix||'',div=el.dataset.divide?parseInt(el.dataset.divide):0,dur=1400,st=performance.now();
function upd(now){const p=Math.min((now-st)/dur,1),ea=1-Math.pow(1-p,3),v=Math.round(ea*tgt);el.textContent=div>0?(v/div).toFixed(2)+suf:v+suf;if(p<1)requestAnimationFrame(upd)}requestAnimationFrame(upd);statObs.unobserve(el)}})},{threshold:.5});
$$('.stat__number').forEach(el=>statObs.observe(el));

/* ── SMOOTH SCROLL ── */
$$('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{const t=document.querySelector(a.getAttribute('href'));if(t){e.preventDefault();window.scrollTo({top:t.offsetTop-64,behavior:'smooth'})}}));
$('#scrollTopBtn')?.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));

/* ── PARALLAX ── */
const orbs=$$('.hero__orb');
window.addEventListener('scroll',()=>{const y=window.scrollY;orbs.forEach((o,i)=>{o.style.marginTop=-(y*(i+1)*.05)+'px'})},{passive:true});

/* ── MAGNETIC BUTTONS ── */
if(!isMobile){$$('.magnetic').forEach(btn=>{btn.addEventListener('mousemove',e=>{const r=btn.getBoundingClientRect();const x=e.clientX-r.left-r.width/2;const y=e.clientY-r.top-r.height/2;btn.style.transform=`translate(${x*.15}px,${y*.15}px)`});btn.addEventListener('mouseleave',()=>{btn.style.transform=''})})}

/* ── THUNDER SCREEN SHAKE ── */
function triggerShake(){document.body.style.animation='none';document.body.offsetHeight;document.body.style.animation=''}
// Sync shake with CSS thunder flashes (approximate timing)
setInterval(triggerShake,9000);setTimeout(()=>setInterval(triggerShake,13000),5000);

/* ============================================
   HERO PARTICLES — Upside Down ash
   ============================================ */
const pCanvas=$('#heroParticles');
if(pCanvas){
  const ctx=pCanvas.getContext('2d');let particles=[];
  const N=isMobile?25:50;
  const cols=['rgba(204,0,0,0.35)','rgba(196,163,90,0.2)','rgba(255,255,255,0.05)','rgba(204,0,0,0.15)'];
  function resizePC(){pCanvas.width=pCanvas.parentElement.offsetWidth;pCanvas.height=pCanvas.parentElement.offsetHeight}
  resizePC();window.addEventListener('resize',resizePC);
  function mkP(){return{x:Math.random()*pCanvas.width,y:Math.random()*pCanvas.height,s:Math.random()*2.5+.5,sx:(Math.random()-.5)*.3,sy:-(Math.random()*.4+.1),c:cols[Math.floor(Math.random()*cols.length)]}}
  for(let i=0;i<N;i++)particles.push(mkP());
  function animP(){ctx.clearRect(0,0,pCanvas.width,pCanvas.height);
    particles.forEach(p=>{p.x+=p.sx;p.y+=p.sy;if(p.x<0||p.x>pCanvas.width)p.sx*=-1;if(p.y<-10){p.y=pCanvas.height+10;p.x=Math.random()*pCanvas.width}
      ctx.beginPath();ctx.arc(p.x,p.y,p.s,0,Math.PI*2);ctx.fillStyle=p.c;ctx.fill()});
    for(let i=0;i<particles.length;i++)for(let j=i+1;j<particles.length;j++){const dx=particles[i].x-particles[j].x,dy=particles[i].y-particles[j].y,d=Math.sqrt(dx*dx+dy*dy);if(d<100){ctx.beginPath();ctx.moveTo(particles[i].x,particles[i].y);ctx.lineTo(particles[j].x,particles[j].y);ctx.strokeStyle='rgba(204,0,0,'+(0.05*(1-d/100))+')';ctx.lineWidth=.5;ctx.stroke()}}
    requestAnimationFrame(animP)}animP()}

/* ============================================
   PROJECT CANVAS HOVER ANIMATIONS
   + MOBILE TOUCH SUPPORT
   ============================================ */
$$('.pmod__canvas').forEach(canvas=>{
  const anim=canvas.dataset.anim;
  const pmod=canvas.closest('.pmod');
  const ctx=canvas.getContext('2d');
  let running=false,frameId=null;
  function resize(){const r=canvas.parentElement.getBoundingClientRect();canvas.width=Math.min(320,r.width);canvas.height=r.height||200}
  function start(){if(running)return;running=true;resize();loop()}
  function stop(){running=false;if(frameId)cancelAnimationFrame(frameId);ctx.clearRect(0,0,canvas.width,canvas.height)}
  function loop(){if(!running)return;const t=performance.now();ctx.clearRect(0,0,canvas.width,canvas.height);
    switch(anim){case 'vpark':drawVPark(ctx,canvas.width,canvas.height,t);break;case 'anemia':drawAnemia(ctx,canvas.width,canvas.height,t);break;case 'lexcloud':drawLexCloud(ctx,canvas.width,canvas.height,t);break;case 'sepsis':drawSepsis(ctx,canvas.width,canvas.height,t);break}
    frameId=requestAnimationFrame(loop)}
  // Desktop hover
  pmod.addEventListener('mouseenter',start);pmod.addEventListener('mouseleave',stop);
  // Mobile touch — show for 4s on tap
  if(isMobile){
    pmod.addEventListener('touchstart',()=>{pmod.classList.add('touch-active');start()});
    pmod.addEventListener('touchend',()=>{setTimeout(()=>{pmod.classList.remove('touch-active');stop()},4000)});
    // Auto-start for featured on mobile
    if(pmod.classList.contains('pmod--featured')){start()}
  }
});

function drawLabel(ctx,x,y,text,color){ctx.fillStyle=color;ctx.font='bold 6px "JetBrains Mono",monospace';ctx.fillText(text,x,y)}
function roundRect(ctx,x,y,w,h,r,fill,stroke){ctx.beginPath();ctx.moveTo(x+r,y);ctx.lineTo(x+w-r,y);ctx.quadraticCurveTo(x+w,y,x+w,y+r);ctx.lineTo(x+w,y+h-r);ctx.quadraticCurveTo(x+w,y+h,x+w-r,y+h);ctx.lineTo(x+r,y+h);ctx.quadraticCurveTo(x,y+h,x,y+h-r);ctx.lineTo(x,y+r);ctx.quadraticCurveTo(x,y,x+r,y);ctx.closePath();if(fill)ctx.fill();if(stroke)ctx.stroke()}

/* ── VPARK ── */
function drawVPark(ctx,w,h,t){
  const cy=h/2;
  ctx.strokeStyle='rgba(204,0,0,0.08)';ctx.lineWidth=1;
  for(let i=0;i<8;i++)ctx.strokeRect(20+i*38,cy-40,30,80);
  ctx.fillStyle='rgba(255,255,255,0.06)';
  [0,2,4,6].forEach(i=>ctx.fillRect(24+i*38,cy-36,22,72));
  const cp=(t*0.0003)%2;
  if(cp<1){const carY=cy-36+(1-cp)*h;ctx.fillStyle='rgba(204,0,0,0.25)';ctx.fillRect(27+38,carY+5,16,25);ctx.fillStyle='rgba(255,255,255,0.1)';ctx.fillRect(25+38,carY+2,4,6);ctx.fillRect(40+38,carY+2,4,6);ctx.fillRect(25+38,carY+27,4,6);ctx.fillRect(40+38,carY+27,4,6)}
  const sx=(t*0.15)%(w+40)-20;
  const grad=ctx.createLinearGradient(sx-15,0,sx+15,0);grad.addColorStop(0,'transparent');grad.addColorStop(.5,'rgba(204,0,0,0.5)');grad.addColorStop(1,'transparent');
  ctx.fillStyle=grad;ctx.fillRect(sx-15,0,30,h);
  ctx.strokeStyle='rgba(204,0,0,0.7)';ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(sx,0);ctx.lineTo(sx,h);ctx.stroke();
  ctx.strokeStyle='#00ff00';ctx.lineWidth=1.5;ctx.setLineDash([3,3]);
  if(sx>60){ctx.strokeRect(22,cy-38,26,76);drawLabel(ctx,22,cy-44,'DETECTED','#00ff00')}
  if(sx>140){ctx.strokeRect(22+76,cy-38,26,76);drawLabel(ctx,22+76,cy-44,'DETECTED','#00ff00')}
  if(sx>220){ctx.strokeRect(22+152,cy-38,26,76);drawLabel(ctx,22+152,cy-44,'DETECTED','#00ff00')}
  ctx.setLineDash([]);
  ctx.fillStyle='rgba(204,0,0,0.8)';ctx.font='bold 9px "JetBrains Mono",monospace';ctx.fillText('YOLOv8 · LIVE',10,16);
  ctx.fillStyle='rgba(0,255,0,0.6)';ctx.fillText('3/6 SLOTS OCCUPIED',10,h-10);
}

/* ── ANEMIA ── */
function drawAnemia(ctx,w,h,t){
  const cx=w/2-20,cy=h/2;
  ctx.fillStyle='rgba(16,185,129,0.03)';roundRect(ctx,cx-35,cy-30,70,60,12,true);
  ctx.strokeStyle='rgba(16,185,129,0.2)';ctx.lineWidth=1;roundRect(ctx,cx-35,cy-30,70,60,12,false,true);
  ctx.fillStyle='rgba(16,185,129,0.06)';roundRect(ctx,cx-28,cy-22,56,44,8,true);
  const scanY=cy-30+((t*0.04)%60);
  ctx.strokeStyle='rgba(16,185,129,0.7)';ctx.lineWidth=1.5;ctx.beginPath();ctx.moveTo(cx-35,scanY);ctx.lineTo(cx+35,scanY);ctx.stroke();
  const grd=ctx.createLinearGradient(0,scanY-8,0,scanY+8);grd.addColorStop(0,'transparent');grd.addColorStop(.5,'rgba(16,185,129,0.12)');grd.addColorStop(1,'transparent');ctx.fillStyle=grd;ctx.fillRect(cx-35,scanY-8,70,16);
  const bx=cx+50;ctx.fillStyle='rgba(255,255,255,0.04)';ctx.fillRect(bx,cy-25,40,50);
  const hl=0.6+0.3*Math.sin(t*.001);ctx.fillStyle=hl>.7?'rgba(16,185,129,0.5)':'rgba(204,0,0,0.5)';ctx.fillRect(bx+4,cy+25-hl*46,12,hl*46);
  ctx.fillStyle='rgba(255,255,255,0.3)';ctx.font='6px monospace';ctx.fillText('Hb',bx+5,cy+34);
  const rl=0.5+0.3*Math.cos(t*.0012);ctx.fillStyle=rl>.6?'rgba(16,185,129,0.4)':'rgba(204,0,0,0.4)';ctx.fillRect(bx+22,cy+25-rl*46,12,rl*46);
  ctx.fillStyle='rgba(255,255,255,0.3)';ctx.fillText('RBC',bx+22,cy+34);
  ctx.font='bold 9px "JetBrains Mono",monospace';
  if(Math.sin(t*.003)>0){ctx.fillStyle='rgba(204,0,0,0.8)';ctx.fillText('⚠ ANEMIC DETECTED',10,16)}
  else{ctx.fillStyle='rgba(16,185,129,0.6)';ctx.fillText('🔬 SCANNING...',10,16)}
  ctx.fillStyle='rgba(255,255,255,0.4)';ctx.font='7px monospace';ctx.fillText('CONFIDENCE: 96.2%',10,h-10);
}

/* ── LEXCLOUD ── */
function drawLexCloud(ctx,w,h,t){
  const nodes=[{x:30,y:h/2,l:'REQ',c:'rgba(196,163,90,0.4)'},{x:90,y:h/2,l:'API',c:'rgba(196,163,90,0.5)'},{x:150,y:h/2-25,l:'λ',c:'rgba(196,163,90,0.6)'},{x:150,y:h/2+25,l:'S3',c:'rgba(196,163,90,0.5)'},{x:210,y:h/2-25,l:'DB',c:'rgba(196,163,90,0.5)'},{x:210,y:h/2+25,l:'RAG',c:'rgba(196,163,90,0.6)'},{x:270,y:h/2,l:'RES',c:'rgba(196,163,90,0.4)'}];
  const conns=[[0,1],[1,2],[1,3],[2,4],[3,5],[4,6],[5,6]];
  ctx.strokeStyle='rgba(196,163,90,0.12)';ctx.lineWidth=1;
  conns.forEach(([a,b])=>{ctx.beginPath();ctx.moveTo(nodes[a].x,nodes[a].y);ctx.lineTo(nodes[b].x,nodes[b].y);ctx.stroke()});
  conns.forEach(([a,b],ci)=>{const p=((t*.001+ci*.3)%1.5)/1.5;if(p<=1){const dx=nodes[b].x-nodes[a].x,dy=nodes[b].y-nodes[a].y;const px=nodes[a].x+dx*p,py=nodes[a].y+dy*p;ctx.beginPath();ctx.arc(px,py,3,0,Math.PI*2);ctx.fillStyle='rgba(196,163,90,0.8)';ctx.fill();ctx.beginPath();ctx.arc(px-dx*.05,py-dy*.05,2,0,Math.PI*2);ctx.fillStyle='rgba(196,163,90,0.3)';ctx.fill()}});
  nodes.forEach((n,i)=>{const p=1+.08*Math.sin(t*.003+i);ctx.beginPath();ctx.arc(n.x,n.y,14*p,0,Math.PI*2);ctx.fillStyle='rgba(196,163,90,0.04)';ctx.fill();ctx.strokeStyle=n.c;ctx.lineWidth=1.5;ctx.stroke();ctx.fillStyle='rgba(196,163,90,0.8)';ctx.font='bold 8px "JetBrains Mono",monospace';ctx.textAlign='center';ctx.fillText(n.l,n.x,n.y+3)});ctx.textAlign='left';
  ctx.fillStyle='rgba(196,163,90,0.7)';ctx.font='bold 9px "JetBrains Mono",monospace';ctx.fillText('☁ AWS PIPELINE · LIVE',10,16);
  ctx.fillStyle='rgba(196,163,90,0.4)';ctx.font='7px monospace';ctx.fillText('200 OK · 43ms',10,h-10);
}

/* ── SEPSIS ── */
function drawSepsis(ctx,w,h,t){
  const cy=h/2;
  ctx.strokeStyle='rgba(6,182,212,0.04)';ctx.lineWidth=.5;
  for(let x=0;x<w;x+=15){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,h);ctx.stroke()}
  for(let y=0;y<h;y+=15){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(w,y);ctx.stroke()}
  ctx.strokeStyle='rgba(6,182,212,0.8)';ctx.lineWidth=2;ctx.shadowColor='rgba(6,182,212,0.4)';ctx.shadowBlur=6;ctx.beginPath();
  for(let x=0;x<w;x++){const phase=(x+t*.06)%120/120;let y=cy;if(phase<.1)y=cy;else if(phase<.15)y=cy-8;else if(phase<.2)y=cy;else if(phase<.22)y=cy+10;else if(phase<.28)y=cy-h*.35;else if(phase<.32)y=cy+15;else if(phase<.36)y=cy;else if(phase<.45)y=cy-6;else if(phase<.5)y=cy;if(x===0)ctx.moveTo(x,y);else ctx.lineTo(x,y)}
  ctx.stroke();ctx.shadowBlur=0;
  const bpm=72+Math.floor(Math.sin(t*.001)*5);ctx.fillStyle='rgba(6,182,212,0.8)';ctx.font='bold 20px "JetBrains Mono",monospace';ctx.fillText(bpm,w-70,30);ctx.font='9px "JetBrains Mono",monospace';ctx.fillText('BPM',w-30,30);
  if(Math.sin(t*.0005)>.95){ctx.fillStyle='rgba(204,0,0,0.15)';ctx.fillRect(0,0,w,h);ctx.fillStyle='rgba(204,0,0,0.9)';ctx.font='bold 10px "JetBrains Mono",monospace';ctx.fillText('⚠ SEPSIS RISK ELEVATED',10,h-10)}else{ctx.fillStyle='rgba(6,182,212,0.4)';ctx.font='7px monospace';ctx.fillText('ICU MONITOR · 43 SIGNALS',10,h-10)}
  ctx.fillStyle='rgba(6,182,212,0.3)';ctx.font='7px monospace';ctx.fillText('SpO2: 97%',w-75,52);ctx.fillText('TEMP: 38.2°C',w-75,64);ctx.fillText('MAP: 65',w-75,76);
  if((t*.003)%2<.1){ctx.beginPath();ctx.arc(w-15,15,4,0,Math.PI*2);ctx.fillStyle='rgba(6,182,212,0.8)';ctx.fill()}
}

/* ============================================
   VECNA CLOCK — Real-time hands
   ============================================ */
function updateVecnaClock(){
  const now=new Date();
  const s=now.getSeconds()+now.getMilliseconds()/1000;
  const m=now.getMinutes()+s/60;
  const h=(now.getHours()%12)+m/60;
  const secEl=$('#vBigSec'),minEl=$('#vBigMin'),hrEl=$('#vBigHr');
  if(secEl)secEl.style.transform=`rotate(${s*6}deg)`;
  if(minEl)minEl.style.transform=`rotate(${m*6}deg)`;
  if(hrEl)hrEl.style.transform=`rotate(${h*30}deg)`;
  requestAnimationFrame(updateVecnaClock);
}
updateVecnaClock();

/* ── INIT ── */
window.addEventListener('load',()=>{updNav();updProg()});
})();
