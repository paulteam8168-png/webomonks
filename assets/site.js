
(()=>{'use strict';
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>Array.from(r.querySelectorAll(s));
const reduced=window.matchMedia('(prefers-reduced-motion: reduce)'),coarse=window.matchMedia('(pointer:coarse)');
const nav=$('#mobileNav'),toggle=$('#menuToggle');
if(toggle&&nav){toggle.addEventListener('click',()=>{const open=!nav.classList.contains('open');nav.classList.toggle('open',open);toggle.setAttribute('aria-expanded',String(open));toggle.textContent=open?'×':'☰'});nav.addEventListener('click',e=>{if(e.target.closest('a')){nav.classList.remove('open');toggle.setAttribute('aria-expanded','false');toggle.textContent='☰'}});document.addEventListener('keydown',e=>{if(e.key==='Escape'){nav.classList.remove('open');toggle.setAttribute('aria-expanded','false');toggle.textContent='☰'}})}
$$('.dropdown').forEach(d=>document.addEventListener('click',e=>{if(!d.contains(e.target))d.open=false}));
const progress=$('#progress'),top=$('#toTop');let scrollScheduled=false;function onScroll(){if(scrollScheduled)return;scrollScheduled=true;requestAnimationFrame(()=>{const h=document.documentElement.scrollHeight-innerHeight,p=Math.max(0,Math.min(1,window.scrollY/Math.max(1,h)));if(progress)progress.style.width=p*100+'%';if(top)top.classList.toggle('visible',scrollY>650);scrollScheduled=false})}window.addEventListener('scroll',onScroll,{passive:true});onScroll();if(top)top.onclick=()=>scrollTo({top:0,behavior:reduced.matches?'instant':'smooth'});
if('IntersectionObserver'in window){const observer=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');observer.unobserve(e.target)}})},{rootMargin:'0px 0px -40px 0px',threshold:.08});$$('.reveal').forEach(x=>observer.observe(x))}else $$('.reveal').forEach(x=>x.classList.add('in'));
if(!reduced.matches&&!coarse.matches){$$('.card[data-tilt]').forEach(c=>{let tx=0,ty=0,frame=0;c.addEventListener('pointermove',e=>{const r=c.getBoundingClientRect();const x=(e.clientX-r.left)/r.width,y=(e.clientY-r.top)/r.height;tx=(.5-y)*5;ty=(x-.5)*6;c.style.setProperty('--mx',x*100+'%');c.style.setProperty('--my',y*100+'%');if(!frame)frame=requestAnimationFrame(()=>{c.style.transform='perspective(900px) rotateX('+tx+'deg) rotateY('+ty+'deg) translateY(-6px)';frame=0})});c.addEventListener('pointerleave',()=>{c.style.transform='';c.style.removeProperty('--mx');c.style.removeProperty('--my')})})}
$$('[data-filter]').forEach(btn=>btn.addEventListener('click',()=>{const value=btn.dataset.filter;$$('[data-filter]').forEach(b=>b.setAttribute('aria-pressed',String(b===btn)));$$('[data-category]').forEach(c=>{c.hidden=value!=='all'&&!c.dataset.category.split(' ').includes(value)})}));
const search=$('#insightsSearch');if(search)search.addEventListener('input',()=>{const q=search.value.trim().toLowerCase();$$('[data-insight]').forEach(x=>x.hidden=!x.textContent.toLowerCase().includes(q))});
const contactForm=$('#contactForm');if(contactForm){const select=$('#service'),params=new URLSearchParams(location.search);if(select&&params.has('service')){const val=params.get('service');if(Array.from(select.options).some(o=>o.value===val))select.value=val}const status=$('#formStatus');contactForm.addEventListener('submit',e=>{e.preventDefault();if(!contactForm.reportValidity())return;const v=new FormData(contactForm),body='Name: '+v.get('name')+'\nEmail: '+v.get('email')+'\nService: '+v.get('service')+'\nBudget: '+v.get('budget')+'\n\nProject:\n'+v.get('message');const subject='WEBOMONKS website enquiry — '+v.get('service');const receiver='';const mail='mailto:'+receiver+'?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(body);if(status)status.textContent='Email draft opening. Add WEBOMONKS business email as recipient and press Send. Direct form delivery requires connecting your actual business inbox.';window.location.href=mail});const copy=$('#copyEnquiry');if(copy)copy.onclick=async()=>{const v=new FormData(contactForm),summary=Array.from(v.entries()).map(([k,val])=>k+': '+val).join('\n');try{await navigator.clipboard.writeText(summary);if(status)status.textContent='Enquiry copied. Send it using your preferred contact method.'}catch(e){if(status)status.textContent='Copy is unavailable in this browser. Please use the email draft button.'}}}
if(reduced.matches)return;
// 3D sphere: mathematically projected, live-rendered particle system (not video)
const canvas=$('#scene3d');if(!canvas||!canvas.getContext)return;
const ctx=canvas.getContext('2d',{alpha:true});if(!ctx)return;
const count=coarse.matches?620:1150,points=[];for(let i=0;i<count;i++){const y=1-2*(i+.5)/count,r=Math.sqrt(Math.max(0,1-y*y)),a=i*Math.PI*(3-Math.sqrt(5));points.push([Math.cos(a)*r,y,Math.sin(a)*r])}
let w=0,h=0,angle=0,rotY=.35,rotX=0,px=0,py=0,drag=false,lastX=0,frame=0,visible=true,scrollVisible=true;
const parent=canvas.parentElement;
const size=()=>{const r=canvas.getBoundingClientRect(),d=Math.min(devicePixelRatio||1,1.65);w=r.width;h=r.height;canvas.width=Math.max(1,Math.round(w*d));canvas.height=Math.max(1,Math.round(h*d));ctx.setTransform(d,0,0,d,0,0)};
size();window.addEventListener('resize',size,{passive:true});
canvas.addEventListener('pointerdown',e=>{drag=true;lastX=e.clientX;canvas.setPointerCapture(e.pointerId)});
canvas.addEventListener('pointerup',()=>drag=false);canvas.addEventListener('pointercancel',()=>drag=false);
canvas.addEventListener('pointermove',e=>{const r=canvas.getBoundingClientRect();px=((e.clientX-r.left)/r.width-.5);py=((e.clientY-r.top)/r.height-.5);if(drag){angle+=(e.clientX-lastX)*.009;lastX=e.clientX}});
canvas.addEventListener('pointerleave',()=>{px*=.2;py*=.2});
document.addEventListener('visibilitychange',()=>{visible=!document.hidden;if(visible&&!frame)frame=requestAnimationFrame(draw)});
if('IntersectionObserver'in window){const ob=new IntersectionObserver(e=>{scrollVisible=e[0]?.isIntersecting??true;if(scrollVisible&&visible&&!frame)frame=requestAnimationFrame(draw)},{threshold:0});ob.observe(parent)}
const theme=document.body.dataset.theme||'violet';const rgb=theme==='blue'?'116,212,255':theme==='pink'?'251,153,228':theme==='mint'?'130,249,207':'205,157,255';
function draw(){frame=0;if(!visible||!scrollVisible||!w||!h)return;
ctx.clearRect(0,0,w,h);angle+=coarse.matches?.0025:.0035;const yaw=angle+px*.85,pitch=rotY+py*.55,ca=Math.cos(yaw),sa=Math.sin(yaw),cb=Math.cos(pitch),sb=Math.sin(pitch),radius=Math.min(w,h)*.32;
const arr=[];for(const [x,y,z] of points){const xx=x*ca-z*sa,zz=x*sa+z*ca,yy=y*cb-zz*sb,z2=y*sb+zz*cb;const perspective=2.8/(3-z2);arr.push([w*.5+xx*radius*perspective,h*.5+yy*radius*perspective,z2,perspective])}
arr.sort((a,b)=>a[2]-b[2]);for(const [x,y,z,p] of arr){const alpha=Math.max(.13,Math.min(.95,(z+1.35)/2.4));ctx.fillStyle='rgba('+rgb+','+alpha+')';ctx.beginPath();ctx.arc(x,y,Math.max(.52,1.55*p),0,Math.PI*2);ctx.fill()}
ctx.strokeStyle='rgba('+rgb+',.13)';ctx.lineWidth=.8;ctx.beginPath();ctx.ellipse(w/2,h/2,radius*1.33,radius*.33,-.37,0,Math.PI*2);ctx.stroke();frame=requestAnimationFrame(draw)}
frame=requestAnimationFrame(draw);
})();


// WEBOMONKS — restore original cinematic welcome and left-rail agency dashboard.
(()=>{'use strict';
const links=[
 ['index.html','⌂','Overview'],['about.html','◈','About'],['services.html','◇','All Services'],
 ['meta-ads.html','◎','Meta Ads'],['google-ads.html','G','Google Ads'],['seo.html','✳','SEO'],
 ['digital-marketing.html','✦','Digital Marketing'],['social-media.html','◉','Social Media'],
 ['landing-pages.html','▣','Landing Pages'],['strategy.html','⌘','Strategy'],
 ['insights.html','✧','Insights'],['contact.html','✉','Contact']
];
const current=location.pathname.split('/').pop()||'index.html';
const rail=document.createElement('aside');rail.className='wm-studio-rail';rail.setAttribute('aria-label','WEBOMONKS studio navigation');
rail.innerHTML='<a class="wm-rail-logo" href="index.html">webo<em>monks.</em></a><div class="wm-rail-head">The Studio</div><nav class="wm-rail-nav" aria-label="Studio pages">'+links.map(([url,icon,title])=>'<a class="wm-rail-link" href="'+url+'"'+(url===current?' aria-current="page"':'')+'><span aria-hidden="true">'+icon+'</span><span>'+title+'</span></a>').join('')+'</nav><div class="wm-rail-footer"><a href="contact.html">Start a Project ↗</a><p>CREATIVE × PERFORMANCE × GROWTH</p></div>';
document.body.insertBefore(rail,document.body.firstChild);
if(current!=='index.html')return;
const intro=document.createElement('div');intro.id='wmIntro';intro.className='wm-intro';intro.setAttribute('role','dialog');intro.setAttribute('aria-modal','true');intro.setAttribute('aria-labelledby','wmIntroTitle');
intro.innerHTML='<div class="wm-intro-stage"><div class="wm-intro-panel"><div class="wm-intro-logo" aria-hidden="true">✳</div><div class="wm-intro-kicker">The creative growth studio</div><h2 id="wmIntroTitle">Welcome to <span>WEBOMONKS.</span></h2><p>We make digital growth feel different. Explore Meta Ads, Google Ads, SEO and thoughtful creative marketing—all in one futuristic studio.</p><div class="wm-intro-actions"><button type="button" id="wmIntroEnter" class="btn btn-light">Enter the Studio ↗</button><a class="btn" href="contact.html">Plan My Growth ↗</a></div><div class="wm-intro-caption">STRATEGY × CREATIVITY × PERFORMANCE</div></div><span class="wm-intro-hint">A NEW WORLD OF DIGITAL GROWTH ✦</span></div><div class="wm-intro-foot">WEBOMONKS · DIGITAL EXPERIENCES · PERFORMANCE MARKETING</div>';
document.body.appendChild(intro);document.body.classList.add('wm-intro-active');
let closing=false;
const enter=()=>{if(closing)return;closing=true;intro.classList.add('leaving');document.body.classList.remove('wm-intro-active');setTimeout(()=>{intro.remove();const h=document.querySelector('main h1');if(h){h.setAttribute('tabindex','-1');h.focus({preventScroll:true})}},680)};
intro.querySelector('#wmIntroEnter').addEventListener('click',enter);
intro.addEventListener('keydown',e=>{if(e.key==='Escape')enter()});
if(!matchMedia('(prefers-reduced-motion:reduce)').matches&&!matchMedia('(pointer:coarse)').matches){
 intro.querySelector('.wm-intro-stage').addEventListener('pointermove',e=>{const x=(e.clientX/innerWidth-.5)*24,y=(e.clientY/innerHeight-.5)*16;intro.style.setProperty('--wm-x',x.toFixed(1)+'px');intro.style.setProperty('--wm-y',y.toFixed(1)+'px')});
}
requestAnimationFrame(()=>{intro.classList.add('ready');intro.querySelector('#wmIntroEnter').focus({preventScroll:true})});
})();
