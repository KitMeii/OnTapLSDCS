(function(){
'use strict';
/* V14 — Mục lục trang Tổ chức: các khối (Đảng, Nhà nước, Chính phủ…) thu gọn mặc định,
   bấm khối → xổ danh sách cơ quan; bấm cơ quan → hiện người đứng đầu (dùng lại nút của patch-v7).
   Máy tính: cột trái dính theo khi cuộn. Điện thoại: nằm đầu trang + nút "Mục lục" nổi để quay lại. */
var $=function(s,r){return (r||document).querySelector(s)}, $$=function(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))};
var esc=function(v){return String(v==null?'':v).replace(/[&<>'"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]})};
var reduceMotion=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
var MOBILE=window.matchMedia?window.matchMedia('(max-width:1100px)'):{matches:false};
var S={open:{},sig:'',fab:null};

function data(){return window.ORGANIZATION_DATA||{}}
function items(tab){var d=data()[tab]||{};return d.agencies||d.ministries||[]}
function person(h){h=String(h||'').trim();if(!h)return '';return /^(Đồng chí|Chủ tịch|Thủ tướng)/.test(h)?h:'Đồng chí '+h}
function current(){
  var g=$('#organizationMount .v7-org-group.active'),e=$('#organizationMount .v7-org-entity.active');
  return {tab:g?g.getAttribute('data-v7-orgtab'):'',idx:e?Number(e.getAttribute('data-v7-orgidx')):-1};
}

function render(){
  var cur=current(),tabs=data().tabs||[];
  var html='<div class="v13-toc-title"><span>Mục lục tổ chức</span></div><ol class="v13-toc-list">';
  tabs.forEach(function(t){
    var list=items(t.id),open=!!S.open[t.id],isCur=t.id===cur.tab;
    html+='<li class="v13-g'+(open?' is-open':'')+(isCur?' v14-cur':'')+'" data-g="'+esc(t.id)+'">'+
      '<div class="v13-row"><button type="button" class="v13-caret" data-v14-toggle="'+esc(t.id)+'" aria-label="Mở danh sách '+esc(t.label)+'" aria-expanded="'+open+'"></button>'+
      '<button type="button" class="v14-group" data-v14-toggle="'+esc(t.id)+'">'+esc(t.label)+'<small>'+list.length+'</small></button></div>'+
      '<ol class="v13-kids">'+list.map(function(a,i){var now=isCur&&i===cur.idx;
        return '<li><a href="#" data-v14-tab="'+esc(t.id)+'" data-v14-idx="'+i+'" class="'+(now?'is-now':'')+'"'+(now?' aria-current="true"':'')+'><b>'+esc(a.name)+'</b>'+(a.head?'<span>'+esc(person(a.head))+'</span>':'')+'</a></li>'}).join('')+
      '</ol></li>';
  });
  return html+'</ol>';
}

function build(){
  var mount=$('#organizationMount'),org=$('#organizationMount .v7-org');if(!org)return;
  var cur=current(),sig=cur.tab+'|'+cur.idx+'|'+JSON.stringify(S.open);
  var nav=$('.v14-org-toc',org);
  if(nav&&sig===S.sig)return;
  S.sig=sig;
  if(!nav){nav=document.createElement('nav');nav.className='v13-toc v14-org-toc';nav.setAttribute('aria-label','Mục lục tổ chức');org.insertBefore(nav,org.firstChild)}
  org.classList.add('v14-on');
  nav.innerHTML=render();
  sheet().querySelector('.v14-sheet-body').innerHTML=nav.innerHTML;
}

function choose(tab,idx){
  var cur=current(),inSheet=!sheet().hidden;
  closeSheet();
  if(tab!==cur.tab){var g=$('#organizationMount [data-v7-orgtab="'+tab+'"]');if(g)g.click()}
  var e=$('#organizationMount [data-v7-orgidx="'+idx+'"]');if(e)e.click();
  S.open[tab]=true;S.sig='';build();
  var detail=$('#organizationMount .v7-org-detail')||$('#organizationMount .v7-org-profile');if(!detail)return;
  var off=MOBILE.matches?(window.innerWidth<=720?84:96):96,y=detail.getBoundingClientRect().top+window.pageYOffset-off;
  if(inSheet||MOBILE.matches||detail.getBoundingClientRect().top<0)window.scrollTo({top:Math.max(0,y),behavior:(reduceMotion||inSheet)?'instant':'smooth'});
}

document.addEventListener('click',function(e){
  var t=e.target.closest('.v14-org-toc [data-v14-toggle]');
  if(t){e.preventDefault();var id=t.getAttribute('data-v14-toggle');S.open[id]=!S.open[id];build();return}
  var a=e.target.closest('.v14-org-toc a[data-v14-tab]');
  if(a){e.preventDefault();choose(a.getAttribute('data-v14-tab'),Number(a.getAttribute('data-v14-idx')));return}
  if(e.target.closest('.v14-sheet [data-v14-close]'))closeSheet();
});
document.addEventListener('keydown',function(e){if(e.key==='Escape')closeSheet()});

/* Điện thoại: giống trang Lịch sử — nút "Mục lục" nổi mở bảng trượt từ dưới lên */
function sheet(){
  if(S.sheet)return S.sheet;
  var s=document.createElement('div');s.className='v13-sheet v14-sheet';s.hidden=true;s.setAttribute('role','dialog');s.setAttribute('aria-label','Mục lục tổ chức');
  s.innerHTML='<div class="v13-sheet-scrim" data-v14-close="1"></div><div class="v13-sheet-panel"><div class="v13-sheet-top"><b>Mục lục tổ chức</b><button type="button" data-v14-close="1" aria-label="Đóng">✕</button></div><nav class="v13-toc v13-sheet-body v14-org-toc v14-sheet-body"></nav></div>';
  document.body.appendChild(s);S.sheet=s;return s;
}
function openSheet(){var s=sheet();s.hidden=false;document.documentElement.classList.add('v13-lock');var a=$('.v14-sheet-body a.is-now',s);if(a)a.scrollIntoView({block:'center'})}
function closeSheet(){if(S.sheet&&!S.sheet.hidden){S.sheet.hidden=true;document.documentElement.classList.remove('v13-lock')}}
function fab(){
  if(S.fab)return S.fab;
  var f=document.createElement('button');f.type='button';f.className='v13-fab v14-fab';f.innerHTML='<span aria-hidden="true">☰</span> Mục lục';f.setAttribute('aria-label','Mở mục lục tổ chức');
  f.addEventListener('click',openSheet);
  document.body.appendChild(f);S.fab=f;return f;
}
function fabState(){fab().classList.toggle('show',MOBILE.matches&&location.hash==='#to-chuc'&&!!$('#organizationMount .v7-org'))}
window.addEventListener('hashchange',function(){closeSheet();setTimeout(function(){build();fabState()},80)});
if(MOBILE.addEventListener)MOBILE.addEventListener('change',fabState);else if(MOBILE.addListener)MOBILE.addListener(fabState);

function init(){
  var mount=$('#organizationMount');if(!mount)return;
  var q=0;
  new MutationObserver(function(ms){
    if(ms.every(function(m){return m.target.closest&&m.target.closest('.v14-org-toc')}))return;
    if(q)return;q=setTimeout(function(){q=0;S.sig='';build();fabState()},60);
  }).observe(mount,{childList:true,subtree:true});
  build();fabState();
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',function(){setTimeout(init,50)});else setTimeout(init,50);
})();
