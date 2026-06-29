/* ═══════════════════════════════════════════════════
   SOLO LEVELING PORTFOLIO — FINAL JAVASCRIPT
   Blue Flames · Anime Scroll · Creative Project Anims
   ═══════════════════════════════════════════════════ */
(function(){
'use strict';
const $=s=>document.querySelector(s);
const $$=s=>document.querySelectorAll(s);

/* ═══ 1. LOADER BOOT ═══ */
const loader=$('#loader'),loaderMsg=$('#loaderMsg'),ariseFlash=$('#ariseFlash');
const msgs=['SYSTEM INITIALIZING...','SCANNING DATABASE...','PROFILE DETECTED...','LOADING DATA...','ARISE.'];
let mi=0;
const bi=setInterval(()=>{mi++;if(mi<msgs.length&&loaderMsg){loaderMsg.textContent=msgs[mi];if(mi===msgs.length-1){loaderMsg.style.color='#6fb3ff';loaderMsg.style.fontSize='1.1rem';loaderMsg.style.textShadow='0 0 20px rgba(79,156,247,.8)';}}if(mi>=msgs.length-1)clearInterval(bi);},700);

window.addEventListener('load',()=>{
    setTimeout(()=>{
        if(ariseFlash){ariseFlash.classList.add('active');setTimeout(()=>ariseFlash.classList.remove('active'),1000);}
        if(loader){loader.classList.add('hidden');setTimeout(()=>{loader.style.display='none';},1500);}
    },4000);
});

/* ═══ 2. BLUE FLAME CANVAS behind name ═══ */
const flameCanvas=$('#flameCanvas');
if(flameCanvas){
    const fc=flameCanvas.getContext('2d');
    let flames=[];
    function resizeFlame(){
        const hero=$('.hero');
        flameCanvas.width=700;
        flameCanvas.height=400;
    }
    resizeFlame();

    class Flame{
        constructor(){this.reset();}
        reset(){
            this.x=150+Math.random()*400;
            this.y=380;
            this.size=Math.random()*6+2;
            this.speedY=-Math.random()*3-1.5;
            this.speedX=(Math.random()-0.5)*1.2;
            this.life=Math.random()*60+30;
            this.age=0;
            this.hue=210+Math.random()*30;
        }
        update(){
            this.x+=this.speedX;
            this.y+=this.speedY;
            this.age++;
            this.size*=0.98;
            if(this.age>this.life||this.size<0.3)this.reset();
        }
        draw(){
            const alpha=Math.max(0,1-this.age/this.life);
            // Core
            fc.beginPath();
            fc.arc(this.x,this.y,this.size,0,Math.PI*2);
            fc.fillStyle=`hsla(${this.hue},90%,70%,${alpha*0.8})`;
            fc.fill();
            // Outer glow
            fc.beginPath();
            fc.arc(this.x,this.y,this.size*3,0,Math.PI*2);
            fc.fillStyle=`hsla(${this.hue},80%,60%,${alpha*0.15})`;
            fc.fill();
            // Hot core (white-ish center)
            fc.beginPath();
            fc.arc(this.x,this.y,this.size*0.4,0,Math.PI*2);
            fc.fillStyle=`hsla(${this.hue},60%,90%,${alpha*0.6})`;
            fc.fill();
        }
    }
    for(let i=0;i<80;i++)flames.push(new Flame());

    function animFlame(){
        fc.clearRect(0,0,flameCanvas.width,flameCanvas.height);
        flames.forEach(f=>{f.update();f.draw();});
        requestAnimationFrame(animFlame);
    }
    animFlame();
}

/* ═══ 3. SHADOW PARTICLES ═══ */
const shadowCanvas=$('#shadowCanvas');
if(shadowCanvas){
    const ctx=shadowCanvas.getContext('2d');
    let parts=[];
    function rsc(){shadowCanvas.width=window.innerWidth;shadowCanvas.height=window.innerHeight;}
    rsc();window.addEventListener('resize',rsc);

    class SP{
        constructor(){this.reset();}
        reset(){
            this.x=Math.random()*shadowCanvas.width;
            this.y=shadowCanvas.height+Math.random()*80;
            this.size=Math.random()*2+0.5;
            this.speedX=(Math.random()-0.5)*0.3;
            this.speedY=-Math.random()*0.5-0.1;
            this.opacity=Math.random()*0.3+0.08;
            this.fade=Math.random()*0.002+0.001;
            this.hue=200+Math.random()*60;
        }
        update(){this.x+=this.speedX;this.y+=this.speedY;this.opacity-=this.fade;if(this.opacity<=0)this.reset();}
        draw(){
            ctx.beginPath();ctx.arc(this.x,this.y,this.size,0,Math.PI*2);
            ctx.fillStyle=`hsla(${this.hue},80%,65%,${this.opacity})`;ctx.fill();
            ctx.beginPath();ctx.arc(this.x,this.y,this.size*3,0,Math.PI*2);
            ctx.fillStyle=`hsla(${this.hue},80%,65%,${this.opacity*0.1})`;ctx.fill();
        }
    }
    for(let i=0;i<40;i++)parts.push(new SP());
    function aS(){ctx.clearRect(0,0,shadowCanvas.width,shadowCanvas.height);parts.forEach(p=>{p.update();p.draw();});requestAnimationFrame(aS);}
    aS();
}

/* ═══ 4. HERO PARTICLES ═══ */
const hc=$('#heroParticles');
if(hc){
    const hx=hc.getContext('2d');let hp=[];
    function rh(){const p=hc.parentElement;hc.width=p.offsetWidth;hc.height=p.offsetHeight;}
    rh();window.addEventListener('resize',rh);
    class HP{
        constructor(){this.reset();}
        reset(){this.x=Math.random()*hc.width;this.y=hc.height+30;this.size=Math.random()*1.5+0.3;this.vy=-Math.random()*1-0.3;this.vx=(Math.random()-0.5)*0.4;this.op=Math.random()*0.4+0.15;this.life=Math.random()*180+80;this.age=0;this.hue=210+Math.random()*25;}
        update(){this.x+=this.vx;this.y+=this.vy;this.age++;if(this.age>this.life)this.op-=0.015;if(this.op<=0)this.reset();}
        draw(){hx.beginPath();hx.arc(this.x,this.y,this.size,0,Math.PI*2);hx.fillStyle=`hsla(${this.hue},90%,70%,${this.op})`;hx.fill();}
    }
    for(let i=0;i<45;i++)hp.push(new HP());
    function aH(){hx.clearRect(0,0,hc.width,hc.height);hp.forEach(p=>{p.update();p.draw();});requestAnimationFrame(aH);}
    aH();
}

/* ═══ 5. PER-PROJECT CREATIVE CANVAS ANIMATIONS ═══ */
$$('.quest__canvas').forEach(canvas=>{
    const c=canvas.getContext('2d');
    const anim=canvas.dataset.anim;
    let w=200,h=300,frame=0;

    function resize(){w=canvas.width=canvas.offsetWidth||200;h=canvas.height=canvas.offsetHeight||300;}
    resize();window.addEventListener('resize',resize);

    // === VPARK: Car scanning + parking grid ===
    function drawVpark(){
        c.clearRect(0,0,w,h);
        // Parking grid lines
        c.strokeStyle='rgba(79,156,247,0.15)';c.lineWidth=1;
        for(let i=0;i<5;i++){
            const y=60+i*50;
            c.strokeRect(20,y,w-40,40);
        }
        // Moving scan line
        const scanY=(frame*2)%h;
        c.beginPath();c.moveTo(0,scanY);c.lineTo(w,scanY);
        c.strokeStyle='rgba(79,156,247,0.6)';c.lineWidth=2;c.stroke();
        c.fillStyle='rgba(79,156,247,0.05)';c.fillRect(0,scanY-20,w,20);
        // Car shapes (rectangles)
        const cars=[{x:30,y:70},{x:30,y:170},{x:30,y:270}];
        cars.forEach((car,i)=>{
            const pulse=Math.sin(frame*0.05+i)*0.3+0.7;
            c.fillStyle=`rgba(79,156,247,${pulse*0.3})`;
            c.fillRect(car.x,car.y,w-60,30);
            // "ALLOCATED" text
            c.fillStyle=`rgba(52,211,153,${pulse*0.6})`;
            c.font='8px monospace';
            c.fillText('ALLOCATED',car.x+5,car.y+20);
        });
        // Scan result text
        c.fillStyle='rgba(0,212,255,0.5)';c.font='bold 9px monospace';
        c.fillText('SCANNING...',10,20);
        c.fillText(`VEHICLES: ${3+Math.floor(Math.sin(frame*0.02)*2)}`,10,35);
    }

    // === ANEMIA: Nail scan + diagnosis ===
    function drawAnemia(){
        c.clearRect(0,0,w,h);
        // Fingernail shape (rounded rect)
        const nx=w/2-30,ny=h/2-50,nw=60,nh=80;
        c.beginPath();
        c.moveTo(nx+10,ny);c.lineTo(nx+nw-10,ny);
        c.quadraticCurveTo(nx+nw,ny,nx+nw,ny+10);
        c.lineTo(nx+nw,ny+nh);c.lineTo(nx,ny+nh);
        c.lineTo(nx,ny+10);c.quadraticCurveTo(nx,ny,nx+10,ny);
        c.strokeStyle='rgba(79,156,247,0.4)';c.lineWidth=1.5;c.stroke();
        c.fillStyle='rgba(79,156,247,0.05)';c.fill();
        // Scan sweep across nail
        const sweep=(frame*3)%nw;
        c.fillStyle='rgba(0,212,255,0.15)';c.fillRect(nx+sweep,ny,3,nh);
        // Detection boxes
        const boxPulse=Math.sin(frame*0.06)*0.3+0.5;
        c.strokeStyle=`rgba(52,211,153,${boxPulse})`;c.lineWidth=1;
        c.strokeRect(nx+8,ny+10,nw-16,nh-20);
        // Status text
        c.fillStyle='rgba(0,212,255,0.6)';c.font='bold 8px monospace';
        c.fillText('ANALYZING...',10,20);
        c.fillText('NAIL DETECTED',10,35);
        // Result
        const resultAlpha=Math.max(0,Math.sin(frame*0.03-1)*0.8);
        c.fillStyle=`rgba(52,211,153,${resultAlpha})`;c.font='bold 10px monospace';
        c.fillText('HEALTHY ✓',w/2-30,h-30);
        // Accuracy
        c.fillStyle='rgba(79,156,247,0.4)';c.font='8px monospace';
        c.fillText('AUC: 0.98',10,h-15);
    }

    // === LEXCLOUD: Cloud nodes + data flow ===
    function drawLexcloud(){
        c.clearRect(0,0,w,h);
        // Cloud nodes
        const nodes=[
            {x:w/2,y:40,label:'API GW',r:16},
            {x:30,y:120,label:'Lambda',r:14},
            {x:w-30,y:120,label:'S3',r:14},
            {x:w/2,y:180,label:'DynamoDB',r:14},
            {x:w/2,y:260,label:'RAG',r:16}
        ];
        // Connection lines with flowing dots
        const connections=[[0,1],[0,2],[1,3],[2,3],[3,4]];
        connections.forEach(([a,b])=>{
            c.beginPath();c.moveTo(nodes[a].x,nodes[a].y);c.lineTo(nodes[b].x,nodes[b].y);
            c.strokeStyle='rgba(124,91,245,0.2)';c.lineWidth=1;c.stroke();
            // Flowing dot
            const t=(frame*0.02+a*0.3)%1;
            const dx=nodes[a].x+(nodes[b].x-nodes[a].x)*t;
            const dy=nodes[a].y+(nodes[b].y-nodes[a].y)*t;
            c.beginPath();c.arc(dx,dy,2,0,Math.PI*2);
            c.fillStyle='rgba(124,91,245,0.7)';c.fill();
        });
        // Nodes
        nodes.forEach((n,i)=>{
            const pulse=Math.sin(frame*0.04+i)*0.2+0.8;
            c.beginPath();c.arc(n.x,n.y,n.r,0,Math.PI*2);
            c.fillStyle=`rgba(124,91,245,${pulse*0.15})`;c.fill();
            c.strokeStyle=`rgba(124,91,245,${pulse*0.5})`;c.lineWidth=1;c.stroke();
            c.fillStyle=`rgba(200,180,255,${pulse*0.6})`;c.font='bold 7px monospace';
            c.textAlign='center';c.fillText(n.label,n.x,n.y+3);c.textAlign='left';
        });
    }

    // === SEPSIS: ECG heartbeat monitor ===
    function drawSepsis(){
        c.clearRect(0,0,w,h);
        // ECG line
        c.beginPath();
        c.strokeStyle='rgba(0,212,255,0.6)';c.lineWidth=1.5;
        const baseY=h/2;
        for(let x=0;x<w;x++){
            const t=(x+frame*2)%w;
            let y=baseY;
            const pos=t%80;
            if(pos>30&&pos<35)y=baseY-30;
            else if(pos>35&&pos<38)y=baseY+45;
            else if(pos>38&&pos<42)y=baseY-20;
            else if(pos>42&&pos<46)y=baseY+5;
            else y=baseY+Math.sin(x*0.1)*1;
            if(x===0)c.moveTo(x,y);else c.lineTo(x,y);
        }
        c.stroke();
        // Glow trail
        c.shadowColor='rgba(0,212,255,0.3)';c.shadowBlur=8;c.stroke();c.shadowBlur=0;
        // Vitals text
        c.fillStyle='rgba(0,212,255,0.5)';c.font='bold 9px monospace';
        c.fillText('HR: 72 BPM',10,20);
        c.fillText('SPO2: 98%',10,35);
        // AUC indicator
        const aucPulse=Math.sin(frame*0.04)*0.3+0.7;
        c.fillStyle=`rgba(52,211,153,${aucPulse})`;c.font='bold 10px monospace';
        c.fillText('AUC-ROC: 0.96',10,h-15);
        // Moving dot on ECG
        const dotX=(frame*2)%w;
        const dotPos=dotX%80;
        let dotY=baseY;
        if(dotPos>30&&dotPos<35)dotY=baseY-30;
        else if(dotPos>35&&dotPos<38)dotY=baseY+45;
        else if(dotPos>38&&dotPos<42)dotY=baseY-20;
        c.beginPath();c.arc(dotX,dotY,3,0,Math.PI*2);
        c.fillStyle='rgba(0,212,255,0.9)';c.fill();
        c.beginPath();c.arc(dotX,dotY,6,0,Math.PI*2);
        c.fillStyle='rgba(0,212,255,0.2)';c.fill();
    }

    const drawMap={vpark:drawVpark,anemia:drawAnemia,lexcloud:drawLexcloud,sepsis:drawSepsis};
    const drawFn=drawMap[anim];

    function animProj(){
        frame++;
        if(drawFn)drawFn();
        requestAnimationFrame(animProj);
    }
    animProj();
});

/* ═══ 6. SCROLL PROGRESS ═══ */
const sp=$('#scrollProgress');
function updateProg(){
    const t=window.scrollY,h=document.documentElement.scrollHeight-window.innerHeight;
    if(sp&&h>0)sp.style.width=(t/h*100)+'%';
}

/* ═══ 7. ANIME SECTION REVEAL — Sections fly in from below ═══ */
const sectionObs=new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
        if(e.isIntersecting)e.target.classList.add('in-view');
    });
},{threshold:0.08,rootMargin:'0px 0px -60px 0px'});
$$('.section-reveal').forEach(s=>sectionObs.observe(s));

/* ═══ 8. SCROLL REVEAL + STAT BAR ═══ */
const revObs=new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
        if(e.isIntersecting){
            e.target.classList.add('revealed');
            if(e.target.classList.contains('stat')){
                const f=e.target.querySelector('.stat__fill');
                if(f)f.style.width=f.style.getPropertyValue('--w');
            }
        }
    });
},{threshold:0.15,rootMargin:'0px 0px -30px 0px'});
$$('.scroll-reveal').forEach(el=>revObs.observe(el));

/* ═══ 9. STAT COUNTER + LEVEL UP ═══ */
let lvlShown=false;
const cObs=new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
        if(!e.isIntersecting)return;
        const el=e.target;if(el.dataset.counted)return;el.dataset.counted='1';
        const target=+el.dataset.target,divide=+el.dataset.divide||0,suffix=el.dataset.suffix||'',dur=1500,start=performance.now();
        function tick(now){
            const p=Math.min((now-start)/dur,1),eased=1-Math.pow(1-p,3);
            let v=Math.round(eased*target);
            el.textContent=divide?(v/divide).toFixed(2)+suffix:v+suffix;
            if(p<1)requestAnimationFrame(tick);
            else if(!lvlShown){lvlShown=true;showLvl();}
        }
        requestAnimationFrame(tick);
    });
},{threshold:0.5});
$$('.stat__number').forEach(el=>cObs.observe(el));

function showLvl(){
    const t=document.createElement('div');
    t.className='level-up-toast show';t.textContent='⚡ LEVEL UP ⚡';
    document.body.appendChild(t);setTimeout(()=>t.remove(),3000);
}

/* ═══ 10. SYS WINDOW ENTRANCE ═══ */
const wObs=new IntersectionObserver((entries)=>{
    entries.forEach(e=>{if(e.isIntersecting){e.target.style.opacity='1';e.target.style.transform='none';}});
},{threshold:0.1});
$$('.sys-window').forEach(w=>{w.style.opacity='0';w.style.transform='translateY(20px) scale(0.98)';w.style.transition='opacity .8s ease, transform .8s ease';wObs.observe(w);});

/* ═══ 11. TYPING ═══ */
const hr=$('#heroRole');
if(hr){
    const roles=['intelligent systems','ML pipelines','cloud-native APIs','real-time dashboards','computer vision models'];
    let ri=0,ci=0,del=false,spd=80;
    function type(){
        const cur=roles[ri];
        if(!del){hr.textContent=cur.substring(0,ci+1);ci++;if(ci===cur.length){del=true;spd=2000;}}
        else{hr.textContent=cur.substring(0,ci-1);ci--;spd=40;if(ci===0){del=false;ri=(ri+1)%roles.length;spd=200;}}
        setTimeout(type,spd);
    }
    setTimeout(type,5500);
}

/* ═══ 12. GREETING ═══ */
const sg=$('#sysGreeting');
if(sg){const h=new Date().getHours();if(h>=5&&h<12)sg.textContent='GOOD MORNING — WELCOME';else if(h>=12&&h<17)sg.textContent='GOOD AFTERNOON — WELCOME';else if(h>=17&&h<21)sg.textContent='GOOD EVENING — WELCOME';else sg.textContent='LATE NIGHT SESSION DETECTED';}

/* ═══ 13. QUEST HOVER GLOW ═══ */
$$('.quest').forEach(card=>{
    card.addEventListener('mousemove',e=>{const r=card.getBoundingClientRect(),x=e.clientX-r.left,y=e.clientY-r.top;card.style.background=`radial-gradient(400px circle at ${x}px ${y}px,rgba(79,156,247,.06),transparent),var(--bg-card-hover)`;});
    card.addEventListener('mouseleave',()=>{card.style.background='';});
});

/* ═══ 14. NAV + PARALLAX BG TEXT ═══ */
const nav=$('#nav');
function handleNav(){if(nav)nav.style.background=window.scrollY>80?'rgba(6,10,19,.95)':'rgba(6,10,19,.85)';}
function parallax(){$$('.section__bg-text').forEach(el=>{const r=el.parentElement.getBoundingClientRect();el.style.transform=`translate(-50%,calc(-50% + ${r.top*0.06}px))`;});}

/* ═══ 15. SCROLL TOP + SMOOTH ═══ */
const stb=$('#scrollTopBtn');
if(stb)stb.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));
$$('a[href^="#"]').forEach(l=>{l.addEventListener('click',e=>{const h=l.getAttribute('href');if(h&&h.startsWith('#')){e.preventDefault();const t=document.querySelector(h);if(t)t.scrollIntoView({behavior:'smooth',block:'start'});}});});

/* ═══ 16. UNIFIED SCROLL ═══ */
let ticking=false;
window.addEventListener('scroll',()=>{if(!ticking){requestAnimationFrame(()=>{updateProg();handleNav();parallax();ticking=false;});ticking=true;}});

})();
