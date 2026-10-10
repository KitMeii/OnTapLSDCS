(function(){
'use strict';
/* V15 — Xem bài giảng dạng video toàn màn hình kiểu YouTube.
   - Nút ⛶ luôn hiện. Máy hỗ trợ Fullscreen API (Android, máy tính, iPad): dùng toàn màn hình thật + khóa ngang.
     iPhone (không hỗ trợ cho phần tử thường): phóng tràn màn hình, đang cầm dọc thì xoay 90° như YouTube.
   - Thanh điều khiển nổi trên video, tự ẩn sau 3 giây; chạm video để hiện/ẩn.
   - Chạm 2 lần nửa trái/phải: lùi/tới 10 giây. Phím F: bật/tắt toàn màn hình. */
var $=function(s,r){return (r||document).querySelector(s)};
var FS={on:false,native:false,idleT:0,el:null};

function root(){return $('.v12v')}
function nativeOK(el){return !!(el.requestFullscreen||el.webkitRequestFullscreen)}
function fsElement(){return document.fullscreenElement||document.webkitFullscreenElement}

/* ---------- Bố cục: phóng sân khấu 1280×720 vừa khung (có tính trường hợp xoay) ---------- */
function layout(){
  var el=root();if(!el||!FS.on)return;
  var rot=!FS.native&&window.innerHeight>window.innerWidth;
  el.classList.toggle('v15-rot',rot);
  var W=rot?window.innerHeight:window.innerWidth,H=rot?window.innerWidth:window.innerHeight;
  if(rot){el.style.width=W+'px';el.style.height=H+'px';el.style.left=window.innerWidth+'px';el.style.top='0px'}
  else{el.style.width='';el.style.height='';el.style.left='';el.style.top=''}
  var s=Math.min(W/1280,H/720),st=$('.v12v-stage',el),wr=$('.v12v-wrap',el);
  if(st)st.style.transform='scale('+s+')';
  if(wr){wr.style.width=(1280*s)+'px';wr.style.height=(720*s)+'px'}
}
function relayout(){if(FS.on)setTimeout(layout,30)} // chạy sau fitStage của patch-v12
window.addEventListener('resize',relayout);
window.addEventListener('orientationchange',function(){setTimeout(layout,250)});

/* ---------- Thanh điều khiển tự ẩn ---------- */
function wake(){
  var el=root();if(!el||!FS.on)return;
  el.classList.remove('v15-idle');clearTimeout(FS.idleT);
  FS.idleT=setTimeout(function(){if(FS.on&&!$('.v12v-ui:hover'))el.classList.add('v15-idle')},3000); // giữ thanh khi chuột đang ở trên
}

/* ---------- Bật / tắt ---------- */
function enter(){
  var el=root();if(!el||FS.on)return;
  FS.on=true;FS.native=nativeOK(el)&&!/iPhone|iPod/.test(navigator.userAgent);
  el.classList.add('v15-fs');setBtn();
  if(FS.native){
    var req=el.requestFullscreen||el.webkitRequestFullscreen;
    try{var p=req.call(el);if(p&&p.then)p.then(function(){if(screen.orientation&&screen.orientation.lock)screen.orientation.lock('landscape').catch(function(){})}).catch(function(){FS.native=false;layout()})}catch(e){FS.native=false}
  }
  layout();wake();
}
function exit(){
  var el=root();if(!FS.on)return;
  FS.on=false;clearTimeout(FS.idleT);
  if(el){el.classList.remove('v15-fs','v15-rot','v15-idle');el.style.width=el.style.height=el.style.left=el.style.top=''}
  if(fsElement())(document.exitFullscreen||document.webkitExitFullscreen).call(document);
  try{if(screen.orientation&&screen.orientation.unlock)screen.orientation.unlock()}catch(e){}
  setBtn();window.dispatchEvent(new Event('resize')); // patch-v12 tự canh lại khung thường
}
function toggle(){FS.on?exit():enter()}
function setBtn(){
  var b=$('.v12v [data-v="fs"]');if(!b)return;
  b.style.display='';b.textContent=FS.on?'⤡':'⛶';
  b.setAttribute('aria-label',FS.on?'Thoát toàn màn hình':'Xem toàn màn hình');b.title=FS.on?'Thoát toàn màn hình (F)':'Toàn màn hình (F)';
}
function onFsChange(){if(FS.on&&FS.native&&!fsElement())exit()}
document.addEventListener('fullscreenchange',onFsChange);document.addEventListener('webkitfullscreenchange',onFsChange);

/* ---------- Sự kiện ---------- */
// Bắt nút ⛶ trước handler của patch-v12 (pha capture) để dùng cách bật toàn màn hình mới
document.addEventListener('click',function(e){
  var b=e.target.closest&&e.target.closest('.v12v [data-v="fs"]');
  if(b){e.preventDefault();e.stopImmediatePropagation();toggle();return}
  if(e.target.closest&&e.target.closest('.v12v [data-v="close"]'))exit();
},true);
// Mở video lần đầu: patch-v12 mới tạo khung → hiện nút ⛶
document.addEventListener('click',function(e){if(e.target.closest&&e.target.closest('.v12-lec-video'))setTimeout(setBtn,60)});

// Chạm vào video: hiện/ẩn thanh điều khiển; chạm 2 lần nửa trái/phải: lùi/tới 10 giây
var lastTap=0,tapT=0;
document.addEventListener('click',function(e){
  if(!FS.on)return;var st=e.target.closest&&e.target.closest('.v12v-wrap');if(!st)return;
  var now=Date.now(),r=st.getBoundingClientRect(),el=root();
  var rot=el&&el.classList.contains('v15-rot');
  var pos=rot?(e.clientY-r.top)/r.height:(e.clientX-r.left)/r.width; // khi xoay 90°, trục ngang của video là trục dọc màn hình
  if(now-lastTap<300){clearTimeout(tapT);lastTap=0;
    if(pos<0.4)seek('back',st);else if(pos>0.6)seek('fwd',st);
    return}
  lastTap=now;
  tapT=setTimeout(function(){if(el.classList.contains('v15-idle'))wake();else{el.classList.add('v15-idle');clearTimeout(FS.idleT)}},300);
});
function seek(dir,st){
  var b=$('.v12v [data-v="'+dir+'"]');if(b)b.click();
  var f=document.createElement('div');f.className='v15-flash '+dir;f.textContent=dir==='back'?'« 10 giây':'10 giây »';
  st.appendChild(f);setTimeout(function(){f.remove()},650);wake();
}
['mousemove','touchstart'].forEach(function(t){document.addEventListener(t,function(e){if(FS.on&&e.target.closest&&e.target.closest('.v12v-ui'))wake()},{passive:true})});
document.addEventListener('mousemove',function(e){if(FS.on&&e.target.closest&&e.target.closest('.v12v'))wake()},{passive:true});
document.addEventListener('keydown',function(e){
  var el=root();if(!el||el.hidden)return;
  if(e.key==='f'||e.key==='F'){e.preventDefault();toggle()}
  else if(e.key==='Escape'&&FS.on&&!FS.native){e.stopImmediatePropagation();exit()}
},true);
})();
