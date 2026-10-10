(function(){
'use strict';
/* V13 — Mục lục (navigation pane kiểu Word) cho trang Lịch sử.
   Máy tính: nằm trong cột thời kỳ, ngay dưới thời kỳ đang chọn. Điện thoại/tablet: nút "Mục lục" mở bảng trượt.
   Bấm mục → cuộn tới khối tương ứng (mở sẵn accordion nếu cần); mục đang đọc được tô sáng. */
var $=function(s,r){return (r||document).querySelector(s)}, $$=function(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))};
var esc=function(v){return String(v==null?'':v).replace(/[&<>'"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]})};
var reduceMotion=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
var MOBILE=window.matchMedia?window.matchMedia('(max-width:1100px)'):{matches:false};
var T={items:[],sig:'',open:{},active:-1,sheet:null,fab:null,popen:true};

function txt(el){return el?el.textContent.replace(/\s+/g,' ').trim():''}
function short(s,n){n=n||70;return s.length>n?s.slice(0,n-1)+'…':s}

/* ---------- Dựng danh sách mục từ nội dung đang hiển thị ---------- */
function collect(main){
  var groups=[];
  function g(label,el,kids){if(el)groups.push({label:label,el:el,kids:kids||[]})}
  var twos=$$('#historyMount .v7-history-main > .v7-two');
  g('Tổng quan thời kỳ',$('.v7-history-hero',main));
  g('Bối cảnh – đường lối',twos[0],$$('.v7-card',twos[0]).map(function(c){return {label:txt($('h3',c)),el:c}}));
  var deep=$('.v9-deep',main);
  g('Học sâu theo thời kỳ',deep,$$('.v9-accordion',deep).map(function(d){return {label:txt($('summary b',d)),el:d,details:d}}));
  var ex=$('.v10-expert',main);
  if(ex){
    var kids=[];
    var depth=$('.v10-depth-grid',ex); if(depth)kids.push({label:'Mạch phân tích',el:depth});
    var line=$('.v10-keyline',ex); if(line)kids.push({label:'Dòng sự kiện chi tiết',el:line,head:true});
    $$('.v10-event',ex).forEach(function(e){kids.push({label:txt($('time',e))+' · '+txt($('b',e)),el:e,sub:true})});
    var war=$('.v10-war',ex); if(war)kids.push({label:txt($('h4',war)).replace(/^⚔\s*/,''),el:war});
    var rem=$('.v10-remember',ex); if(rem)kids.push({label:'Ghi nhớ – mốc son',el:rem});
    g('Phân tích chuyên sâu',ex,kids);
  }
  g('Tuyên ngôn Độc lập 2/9/1945',$('.v10-declaration',main));
  $$('.v7-section',main).forEach(function(s){
    var dos=$$('.v7-dossier',s),mov=$$('.v7-movement',s),con=$$('.v7-concept',s);
    if(mov.length)g('Phong trào – kháng chiến',s,mov.map(function(m){return {label:txt($('h4',m)),el:m}}));
    else if(con.length)g('Khái niệm',s,con.map(function(c){return {label:txt($('h4',c)),el:c}}));
    else if(dos.length){
      var isCong=/^Đại hội/.test(txt($('.v7-dossier h4',s)));
      g(isCong?'Đại hội của Đảng':'Hồ sơ tư liệu',s,dos.map(function(d){var t=txt($('time',d)),h=txt($('h4',d));return {label:(isCong?'':(t?t+' · ':''))+h,el:d}}));
    }
  });
  if(twos.length>1)g('Thành quả – hạn chế',twos[twos.length-1]);
  return groups;
}

function render(groups){
  var html='<div class="v13-toc-title"><span>Mục lục thời kỳ</span></div><ol class="v13-toc-list">';
  T.items=[];
  groups.forEach(function(gr,gi){
    var gIdx=T.items.push({el:gr.el,g:gi})-1, has=gr.kids.length>0, open=!!T.open[gi];
    html+='<li class="v13-g'+(open?' is-open':'')+'" data-g="'+gi+'">'+
      '<div class="v13-row">'+(has?'<button type="button" class="v13-caret" data-caret="'+gi+'" aria-label="Mở rộng" aria-expanded="'+open+'"></button>':'<span class="v13-caret-sp"></span>')+
      '<a href="#" data-i="'+gIdx+'">'+esc(gr.label)+'</a></div>';
    if(has){
      html+='<ol class="v13-kids">';
      gr.kids.forEach(function(k){var i=T.items.push({el:k.el,g:gi,details:k.details})-1;
        html+='<li class="'+(k.sub?'v13-sub':'')+(k.head?' v13-head':'')+'"><a href="#" data-i="'+i+'" title="'+esc(k.label)+'">'+esc(short(k.label,k.sub?64:70))+'</a></li>'});
      html+='</ol>';
    }
    html+='</li>';
  });
  return html+'</ol>';
}

// Dải thời kỳ nằm ngang (điện thoại/tablet) bị vẽ lại và cuộn về đầu sau mỗi lần chọn → đưa thời kỳ đang chọn ra giữa.
function centerPeriod(aside){
  if(!MOBILE.matches)return;var act=$('.v7-period-btn.active',aside);if(!act)return;
  var a=act.getBoundingClientRect(),b=aside.getBoundingClientRect();
  aside.scrollLeft=Math.max(0,aside.scrollLeft+(a.left-b.left)-(b.width-a.width)/2);
}
function pane(){var p=document.createElement('nav');p.className='v13-toc';p.setAttribute('aria-label','Mục lục thời kỳ');return p}

function build(){
  var mount=$('#historyMount'),main=$('#historyMount .v7-history-main'),aside=$('#historyMount .v7-periods');
  if(!main||!aside)return;
  var groups=collect(main);
  var sig=($('#historyMount .v7-period-btn.active')||{}).textContent+'|'+groups.map(function(g){return g.label+g.kids.length}).join(',');
  var inAside=$('.v13-toc',aside);
  if(sig===T.sig&&inAside)return;
  centerPeriod(aside);
  if(sig.split('|')[0]!==T.sig.split('|')[0]){T.open={};T.active=-1;T.popen=true}
  T.sig=sig;
  var html=render(groups);
  if(!inAside){inAside=pane();var act=$('.v7-period-btn.active',aside);(act&&act.nextSibling)?aside.insertBefore(inAside,act.nextSibling):aside.appendChild(inAside)}
  else{var act2=$('.v7-period-btn.active',aside);if(act2&&act2.nextSibling!==inAside)aside.insertBefore(inAside,act2.nextSibling)}
  inAside.innerHTML=html;
  sheet().querySelector('.v13-sheet-body').innerHTML=sheetHtml(html);
  spy();
}

/* ---------- Bảng trượt cho điện thoại ---------- */
function sheet(){
  if(T.sheet)return T.sheet;
  var s=document.createElement('div');s.className='v13-sheet';s.hidden=true;s.setAttribute('role','dialog');s.setAttribute('aria-label','Mục lục thời kỳ');
  s.innerHTML='<div class="v13-sheet-scrim" data-close="1"></div><div class="v13-sheet-panel"><div class="v13-sheet-top"><b>Mục lục thời kỳ</b><button type="button" data-close="1" aria-label="Đóng">✕</button></div><nav class="v13-toc v13-sheet-body"></nav></div>';
  document.body.appendChild(s);T.sheet=s;
  var f=document.createElement('button');f.type='button';f.className='v13-fab';f.innerHTML='<span aria-hidden="true">☰</span> Mục lục';f.setAttribute('aria-label','Mở mục lục thời kỳ');
  f.addEventListener('click',function(){s.hidden=false;document.documentElement.classList.add('v13-lock');var a=$('.v13-sheet-body a.is-now',s);if(a)a.scrollIntoView({block:'center'})});
  document.body.appendChild(f);T.fab=f;fabState();
  return s;
}
// Bảng trượt (điện thoại): cây 2 tầng giống mục lục Tổ chức — tầng 1: 11 thời kỳ; tầng 2: các phần của thời kỳ đang xem
function sheetHtml(outline){
  var ps=(window.HISTORY_INTEGRATED||{}).periods||[],a=$('#historyMount .v7-period-btn.active'),act=a?a.getAttribute('data-v7-period'):'';
  var inner=outline.replace(/^<div class="v13-toc-title">[\s\S]*?<\/div>/,'');
  return '<ol class="v13-toc-list v13-ptree">'+ps.map(function(p,i){
    var cur=p.id===act,open=cur&&T.popen;
    return '<li class="v13-pg'+(open?' is-open':'')+(cur?' v13-pcur':'')+'" data-p="'+esc(p.id)+'"><div class="v13-row">'+
      '<button type="button" class="v13-caret" data-v13-pick="'+esc(p.id)+'" aria-label="'+(cur?'Thu gọn / mở ':'Mở ')+esc(p.label)+'" aria-expanded="'+open+'"></button>'+
      '<button type="button" class="v13-pbtn" data-v13-pick="'+esc(p.id)+'"'+(cur?' aria-current="true"':'')+'><span class="v13-pl"><b>'+esc(p.label)+'</b><small>'+esc(p.title)+'</small></span><i>'+(i+1)+'</i></button></div>'+
      (cur?'<div class="v13-psecs">'+inner+'</div>':'')+'</li>'}).join('')+'</ol>';
}
function closeSheet(){if(T.sheet&&!T.sheet.hidden){T.sheet.hidden=true;document.documentElement.classList.remove('v13-lock')}}
function fabState(){if(T.fab)T.fab.classList.toggle('show',MOBILE.matches&&location.hash==='#lich-su'&&!!$('#historyMount .v7-history-main'))}

/* ---------- Tương tác ---------- */
function offset(){return MOBILE.matches?(window.innerWidth<=720?150:160):96}
var lockUntil=0;
function go(i){
  var it=T.items[i];if(!it||!it.el)return;
  if(it.details&&!it.details.open)it.details.open=true;
  var el=it.el;el.classList.add('v13-flash');setTimeout(function(){el.classList.remove('v13-flash')},1400);
  // Cuộn tới vị trí tính sẵn, rồi chỉnh lại vì ảnh tải trễ có thể làm trang xê dịch trong lúc cuộn.
  var target=function(){return Math.max(0,el.getBoundingClientRect().top+window.pageYOffset-offset())};
  lockUntil=Date.now()+1600; setActive(i);
  window.scrollTo({top:target(),behavior:reduceMotion?'instant':'smooth'});
  [120,700,1500].forEach(function(ms){setTimeout(function(){var t=target();if(ms>120&&Math.abs(window.pageYOffset-t)>6)window.scrollTo({top:t,behavior:'instant'});revealInView();if(ms===1500){lockUntil=0;setActive(i)}},ms)});
}
// Các khối có hiệu ứng "hiện dần" (patch-v12) phải hiện ngay khi nhảy tới, không chờ IntersectionObserver.
function revealInView(){
  var h=window.innerHeight;
  $$('#historyMount .v12-reveal:not(.v12-in)').forEach(function(el){var r=el.getBoundingClientRect();if(r.bottom>-200&&r.top<h+200)el.classList.add('v12-in')});
}
document.addEventListener('click',function(e){
  var c=e.target.closest('.v13-toc [data-caret]');
  if(c){e.preventDefault();var gi=c.getAttribute('data-caret');T.open[gi]=!T.open[gi];
    $$('.v13-g[data-g="'+gi+'"]').forEach(function(li){li.classList.toggle('is-open',!!T.open[gi]);var b=$('[data-caret]',li);if(b)b.setAttribute('aria-expanded',String(!!T.open[gi]))});return}
  var a=e.target.closest('.v13-toc a[data-i]');
  if(a){e.preventDefault();var inSheet=!!a.closest('.v13-sheet');closeSheet();var i=Number(a.getAttribute('data-i'));setTimeout(function(){go(i)},inSheet?60:0);return}
  var pk=e.target.closest('.v13-sheet [data-v13-pick]');
  if(pk){e.preventDefault();var id=pk.getAttribute('data-v13-pick'),btn=$('#historyMount [data-v7-period="'+id+'"]');
    if(btn&&btn.classList.contains('active')){T.popen=!T.popen;T.sig+='#';build();return}   // thời kỳ đang xem: thu gọn / mở
    if(btn){T.popen=true;btn.click();                                                     // thời kỳ khác: chuyển trang phía sau, bảng vẫn mở để chọn phần
      setTimeout(function(){var h=$('#historyMount .v7-history-main');if(h)window.scrollTo({top:Math.max(0,h.getBoundingClientRect().top+window.pageYOffset-offset()),behavior:'instant'});
        var li=$('.v13-sheet .v13-pg.v13-pcur');if(li)li.scrollIntoView({block:'start'})},350)}
    return}
  if(e.target.closest('.v13-sheet [data-close]'))closeSheet();
});
document.addEventListener('keydown',function(e){if(e.key==='Escape')closeSheet()});

/* ---------- Tô sáng mục đang đọc ---------- */
function setActive(i,force){
  if(i===T.active&&!force)return;T.active=i;
  $$('.v13-toc a.is-now').forEach(function(a){a.classList.remove('is-now')});
  if(i<0)return;
  var gi=T.items[i].g;
  if(!T.open[gi]){T.open[gi]=true;$$('.v13-g[data-g="'+gi+'"]').forEach(function(li){li.classList.add('is-open');var b=$('[data-caret]',li);if(b)b.setAttribute('aria-expanded','true')})}
  $$('.v13-toc a[data-i="'+i+'"]').forEach(function(a){a.classList.add('is-now')});
  var side=$('#historyMount .v7-periods .v13-toc a.is-now'),box=$('#historyMount .v7-periods');
  if(side&&box&&!MOBILE.matches){var r=side.getBoundingClientRect(),b=box.getBoundingClientRect();if(r.top<b.top+40||r.bottom>b.bottom-20)box.scrollTop+=r.top-b.top-b.height/2}
}
function spy(){
  if(!T.items.length||location.hash!=='#lich-su'||Date.now()<lockUntil)return;
  var line=offset()+24,cur=-1;
  for(var i=0;i<T.items.length;i++){var el=T.items[i].el;if(!el||!el.offsetParent)continue;if(el.getBoundingClientRect().top<=line)cur=i}
  setActive(cur);
}
var tick=false;
window.addEventListener('scroll',function(){if(!tick){tick=true;requestAnimationFrame(function(){tick=false;spy()})}},{passive:true});
window.addEventListener('hashchange',function(){closeSheet();fabState();setTimeout(build,120)});
if(MOBILE.addEventListener)MOBILE.addEventListener('change',fabState);else if(MOBILE.addListener)MOBILE.addListener(fabState);

function init(){
  var mount=$('#historyMount');if(!mount)return;
  var q=0;
  new MutationObserver(function(ms){
    if(ms.every(function(m){return m.target.closest&&m.target.closest('.v13-toc')}))return; // bỏ qua thay đổi do chính mục lục
    if(q)return;q=setTimeout(function(){q=0;build();fabState()},150);
  }).observe(mount,{childList:true,subtree:true});
  build();fabState();
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',function(){setTimeout(init,50)});else setTimeout(init,50);
})();
