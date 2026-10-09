(function(){
'use strict';
/* V12 — (1) Bài giảng audio cho từng thời kỳ Lịch sử (MP3 giọng đọc neural, có chương, phụ đề, tự cuộn & tô sáng).
         (2) Hiệu ứng cuộn trang: hiện dần nội dung, thanh tiến độ đọc, nút lên đầu trang.
   Không dùng regex lookbehind để chạy được trên Safari/iOS đời cũ. */
var $=function(s,r){return (r||document).querySelector(s)}, $$=function(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))};
var esc=function(v){return String(v==null?'':v).replace(/[&<>'"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]})};
var reduceMotion=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
var ICON='<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path fill="currentColor" d="M3 10v4h4l5 4V6L7 10H3zm13.5 2A4.5 4.5 0 0 0 14 8v8a4.5 4.5 0 0 0 2.5-4zM14 3.2v2.1a7 7 0 0 1 0 13.4v2.1a9 9 0 0 0 0-17.6z"/></svg>';
function pad2(n){n=String(n);return n.length<2?'0'+n:n}
function fmt(t){t=Math.max(0,Math.floor(t||0));return Math.floor(t/60)+':'+pad2(t%60)}
function lectures(){return window.LECTURES||{}}
function timingFor(id,voice){return voice==='nam'?((window.LECTURE_TIMING_NAM||{})[id]||null):((window.LECTURE_TIMING||{})[id]||null)}
function timing(id){return timingFor(id,P.voice)}
function currentPeriod(){var b=$('#historyMount .v7-period-btn.active');return b?b.getAttribute('data-v7-period'):null}
function periodLabel(id){return id==='pre1930'?'1858–1930':id.replace('-','–')}

/* ---------- Khối trên trang tương ứng với từng chương ---------- */
function sectionWith(main,test){return $$('.v7-section',main).filter(test)[0]||null}
function targetEl(name){
  var main=$('#historyMount .v7-history-main'); if(!main)return null;
  var twos=$$('#historyMount .v7-history-main > .v7-two'); var el=null;
  if(name==='hero')el=$('.v7-history-hero',main);
  else if(name==='context')el=twos[0];
  else if(name==='results')el=twos[twos.length-1];
  else if(name==='deep')el=$('.v9-deep',main);
  else if(name==='expert')el=$('.v10-expert',main);
  else if(name==='declaration')el=$('.v10-declaration',main);
  else if(name==='movements')el=sectionWith(main,function(s){return !!$('.v7-movement',s)});
  else if(name==='congress')el=sectionWith(main,function(s){var h=$('.v7-dossier h4',s);return h&&/^Đại hội/.test(h.textContent.trim())});
  else if(name==='dossiers')el=sectionWith(main,function(s){var h=$('.v7-dossier h4',s);return h&&!/^Đại hội/.test(h.textContent.trim())});
  return el||$('.v7-history-hero',main);
}

/* ---------- Trình phát ---------- */
var P={id:null,voice:'nu',audio:null,ch:-1,cue:-1,tts:false,ttsOn:false,ttsIdx:0,q:[]};
var player=null;
function buildPlayer(){
  if(player)return player;
  player=document.createElement('div');
  player.className='v12-player';player.hidden=true;player.setAttribute('role','region');player.setAttribute('aria-label','Trình phát bài giảng');
  player.innerHTML='<div class="v12-player-in">'+
   '<div class="v12-ctrl">'+
    '<button type="button" data-act="prevch" title="Chương trước" aria-label="Chương trước">⏮</button>'+
    '<button type="button" data-act="back" title="Lùi 10 giây" aria-label="Lùi 10 giây">−10</button>'+
    '<button type="button" data-act="toggle" class="v12-main" aria-label="Phát">▶</button>'+
    '<button type="button" data-act="fwd" title="Tới 10 giây" aria-label="Tới 10 giây">+10</button>'+
    '<button type="button" data-act="nextch" title="Chương sau" aria-label="Chương sau">⏭</button>'+
   '</div>'+
   '<div class="v12-info"><div class="v12-meta"><b class="v12-title"></b><span class="v12-time">0:00 / 0:00</span></div>'+
    '<div class="v12-bar" data-act="seek" title="Bấm để tua"><i></i></div>'+
    '<p class="v12-chapter"></p><p class="v12-caption" aria-live="polite"></p></div>'+
   '<div class="v12-side"><label class="v12-rate"><span>Tốc độ</span><select data-act="rate"><option value="1">1×</option><option value="1.15">1.15×</option><option value="1.25">1.25×</option><option value="1.5">1.5×</option></select></label>'+
    '<button type="button" data-act="stop" class="v12-close" aria-label="Đóng trình phát">✕</button></div></div>';
  document.body.appendChild(player);
  player.addEventListener('click',function(e){
    var t=e.target.closest('[data-act]'); if(!t)return; var a=t.getAttribute('data-act'); var au=P.audio;
    if(a==='toggle'){ if(P.tts){ttsToggle();return} if(!au)return; if(au.paused)au.play(); else au.pause(); }
    if(a==='back'&&au)au.currentTime=Math.max(0,au.currentTime-10);
    if(a==='fwd'&&au)au.currentTime=Math.min(au.duration||0,au.currentTime+10);
    if(a==='prevch')gotoChapter(Math.max(0,P.ch-((au&&au.currentTime-chStart(P.ch)>3)?0:1)));
    if(a==='nextch')gotoChapter(P.ch+1);
    if(a==='seek'&&au&&au.duration){var r=t.getBoundingClientRect();au.currentTime=au.duration*Math.min(1,Math.max(0,(e.clientX-r.left)/r.width));}
    if(a==='stop')stop();
  });
  player.querySelector('[data-act="rate"]').addEventListener('change',function(e){if(P.audio)P.audio.playbackRate=Number(e.target.value)||1});
  return player;
}
function chStart(i){var tm=timing(P.id);return tm&&tm.chapters[i]?tm.chapters[i].start:0}
function gotoChapter(i){
  if(P.tts){ttsChapter(i);return}
  var tm=timing(P.id),au=P.audio; if(!tm||!au||i<0||i>=tm.chapters.length)return;
  var t=tm.chapters[i].start+0.05;
  setChapter(i);                                   // cập nhật giao diện ngay, kể cả khi MP3 chưa tải xong
  if(au.readyState<1){au.addEventListener('loadedmetadata',function once(){au.removeEventListener('loadedmetadata',once);au.currentTime=t})}
  else au.currentTime=t;
  if(au.paused){var pr=au.play(); if(pr&&pr.catch)pr.catch(function(){})}
}
function setChapter(i){
  if(i===P.ch)return; P.ch=i;
  var L=lectures()[P.id]; var c=L&&L.chapters[i]; if(!c)return;
  $$('.v12-reading').forEach(function(x){x.classList.remove('v12-reading')});
  var el=targetEl(c.target);
  if(el){el.classList.add('v12-reading');el.classList.add('v12-in');el.scrollIntoView({behavior:reduceMotion?'auto':'smooth',block:'start'});}
  player.querySelector('.v12-chapter').textContent='Chương '+(i+1)+'/'+L.chapters.length+': '+c.title;
  $$('.v12-lec-chapters li').forEach(function(li,k){li.classList.toggle('is-now',k===i)});
}
function onTime(){
  var au=P.audio,tm=timing(P.id); if(!au||!tm)return; var t=au.currentTime,d=au.duration||tm.duration;
  player.querySelector('.v12-time').textContent=fmt(t)+' / '+fmt(d);
  player.querySelector('.v12-bar i').style.width=(t/d*100)+'%';
  var ci=0,k; for(k=0;k<tm.chapters.length;k++){if(tm.chapters[k].start<=t+0.05)ci=k}
  setChapter(ci);
  var cues=tm.cues,cur=-1; for(k=0;k<cues.length;k++){if(cues[k].s<=t)cur=k;else break}
  if(cur!==P.cue){P.cue=cur;player.querySelector('.v12-caption').textContent=cur>=0?cues[cur].t:''}
}
function syncBtn(){
  var playing=P.tts?P.ttsOn:!!(P.audio&&!P.audio.paused);
  var b=player&&player.querySelector('[data-act="toggle"]'); if(b){b.textContent=playing?'❚❚':'▶';b.setAttribute('aria-label',playing?'Tạm dừng':'Phát')}
  $$('.v12-lec-play').forEach(function(x){var me=x.getAttribute('data-id')===P.id&&P.voice==='nu'&&playing;x.classList.toggle('is-playing',me);x.querySelector('span').textContent=me?' Đang giảng — bấm để tạm dừng':' Nghe bài giảng'});
}
function start(id,chapter,voice){
  var L=lectures()[id]; if(!L)return;
  voice=(voice==='nam'&&timingFor(id,'nam'))?'nam':'nu';     // video dùng giọng nam nếu đã có
  buildPlayer().hidden=false; document.body.classList.add('v12-has-player');
  if(P.id!==id||P.voice!==voice){
    stopAudio(); P.id=id; P.voice=voice; P.ch=-1; P.cue=-1; P.tts=false;
    player.querySelector('.v12-title').textContent=L.title;
    player.querySelector('.v12-caption').textContent='';
    if(!timing(id)){startTTS(chapter||0);return}
    var au=new Audio('assets/audio/lich-su-'+id+(voice==='nam'?'-nam':'')+'.mp3'); au.preload='auto';
    au.playbackRate=Number(player.querySelector('[data-act="rate"]').value)||1;
    au.addEventListener('timeupdate',onTime); au.addEventListener('play',syncBtn); au.addEventListener('pause',syncBtn);
    au.addEventListener('ended',function(){syncBtn();player.querySelector('.v12-caption').textContent='Hết bài giảng. Chọn thời kỳ khác để nghe tiếp.'});
    au.addEventListener('error',function(){ if(P.audio===au){P.audio=null;startTTS(Math.max(0,P.ch))} });
    P.audio=au;
  }
  if(P.tts){ttsChapter(chapter||0);return}
  if(chapter!=null)gotoChapter(chapter); else { var pr=P.audio.play(); if(pr&&pr.catch)pr.catch(function(){}); }
  syncBtn();
}
function stopAudio(){if(P.audio){P.audio.pause();P.audio.removeAttribute('src');P.audio=null} ttsStop()}
function stop(){stopAudio();P.id=null;P.ch=-1;P.tts=false;$$('.v12-reading').forEach(function(x){x.classList.remove('v12-reading')});$$('.v12-lec-chapters li').forEach(function(li){li.classList.remove('is-now')});if(player)player.hidden=true;document.body.classList.remove('v12-has-player');syncBtn()}

/* Dự phòng: chưa có file MP3 → đọc kịch bản bằng giọng của trình duyệt */
function viVoice(){if(!('speechSynthesis' in window))return null;var v=speechSynthesis.getVoices().filter(function(x){return /^vi/i.test(x.lang)});return v.filter(function(x){return /HoaiMy|NamMinh|Natural|Online/i.test(x.name)})[0]||v[0]||null}
function ttsQueue(){
  var L=lectures()[P.id],q=[];
  L.chapters.forEach(function(c,ci){
    if(ci>0)q.push({c:ci,t:c.title+'.'});
    c.paras.forEach(function(p){(p.match(/[^.!?]+[.!?]*/g)||[p]).forEach(function(s){s=s.trim();if(s)q.push({c:ci,t:s})})});
  });
  return q;
}
function startTTS(ch){P.tts=true;P.q=ttsQueue();ttsChapter(ch)}
function ttsChapter(ch){P.ttsIdx=0;for(var i=0;i<P.q.length;i++){if(P.q[i].c===ch){P.ttsIdx=i;break}}P.ttsOn=true;ttsSpeak()}
function ttsSpeak(){
  if(!('speechSynthesis' in window)){player.querySelector('.v12-caption').textContent='Trình duyệt không hỗ trợ phát bài giảng.';return}
  speechSynthesis.cancel(); var it=P.q[P.ttsIdx]; if(!it){P.ttsOn=false;syncBtn();return}
  setChapter(it.c); player.querySelector('.v12-caption').textContent=it.t;
  player.querySelector('.v12-time').textContent='Câu '+(P.ttsIdx+1)+'/'+P.q.length;
  player.querySelector('.v12-bar i').style.width=((P.ttsIdx+1)/P.q.length*100)+'%';
  var u=new SpeechSynthesisUtterance(it.t); u.lang='vi-VN'; var v=viVoice(); if(v)u.voice=v; u.rate=1.1;
  var my=P.id; u.onend=function(){if(P.ttsOn&&P.id===my){P.ttsIdx++;ttsSpeak()}};
  speechSynthesis.speak(u); syncBtn();
}
function ttsToggle(){if(P.ttsOn){P.ttsOn=false;speechSynthesis.cancel()}else{P.ttsOn=true;ttsSpeak()}syncBtn()}
function ttsStop(){P.ttsOn=false;if('speechSynthesis' in window)speechSynthesis.cancel()}

/* ---------- Thẻ bài giảng trong khối đầu mỗi thời kỳ ---------- */
function lectureCard(){
  var hero=$('#historyMount .v7-history-hero'); var id=currentPeriod();
  if(!hero||!id||hero.querySelector('.v12-lecture'))return;
  var L=lectures()[id]; if(!L)return; var tm=timing(id);
  var box=document.createElement('section'); box.className='v12-lecture';
  box.innerHTML='<div class="v12-lec-head"><button type="button" class="v12-lec-play" data-id="'+esc(id)+'">'+ICON+'<span> Nghe bài giảng</span></button>'+
    (tm?'<button type="button" class="v12-lec-video" data-id="'+esc(id)+'"><svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path fill="currentColor" d="M4 5h11a2 2 0 0 1 2 2v2.5l4-2.5v10l-4-2.5V17a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2zm4 3.5v7l5-3.5-5-3.5z"/></svg><span> Xem dạng video</span></button>':'')+
    '<div class="v12-lec-meta"><b>Bài giảng thời kỳ '+esc(periodLabel(id))+'</b><small>'+(tm?(Math.round(tm.duration/60)+' phút · '):'')+L.chapters.length+' chương · có phụ đề, tự cuộn theo nội dung</small></div></div>'+
    '<ol class="v12-lec-chapters">'+L.chapters.map(function(c,i){return '<li><button type="button" data-ch="'+i+'"><span>'+(i+1)+'</span><em>'+esc(c.title)+'</em>'+(tm&&tm.chapters[i]?'<time>'+fmt(tm.chapters[i].start)+'</time>':'')+'</button></li>'}).join('')+'</ol>'+
    '<details class="v12-lec-script"><summary>Xem toàn văn lời giảng</summary>'+L.chapters.map(function(c){return '<h4>'+esc(c.title)+'</h4>'+c.paras.map(function(p){return '<p>'+esc(p)+'</p>'}).join('')}).join('')+'</details>';
  hero.appendChild(box);
  if(P.id===id){$$('li',box).forEach(function(li,k){li.classList.toggle('is-now',k===P.ch)});syncBtn()}
}
document.addEventListener('click',function(e){
  var b=e.target.closest('.v12-lec-play');
  if(b){e.preventDefault();var id=b.getAttribute('data-id');
    if(P.id===id&&P.voice==='nu'&&(P.audio||P.tts)){ if(P.tts)ttsToggle(); else if(P.audio.paused)P.audio.play(); else P.audio.pause(); }
    else start(id,null,'nu');
    return}
  var c=e.target.closest('.v12-lec-chapters [data-ch]'); if(c){e.preventDefault();start(currentPeriod(),Number(c.getAttribute('data-ch')),'nu');return}
  if(e.target.closest('.v7-period-btn')&&P.id)stop();
});
window.addEventListener('hashchange',function(){if(location.hash!=='#lich-su'&&P.id)stop()});

/* ---------- Hiệu ứng cuộn ---------- */
var REVEAL='.v7-section,.v7-card,.v7-dossier,.v7-movement,.v7-concept,.v9-deep,.v10-expert,.v10-declaration,.v7-econ-row,.v7-leader,.question-card,.exam-set,.v7-org-profile,.v7-org-history,.quiz-rule,.quiz-research';
var io=('IntersectionObserver' in window&&!reduceMotion)?new IntersectionObserver(function(es){es.forEach(function(en){if(en.isIntersecting){en.target.classList.add('v12-in');io.unobserve(en.target)}})},{rootMargin:'0px 0px -5% 0px',threshold:0.02}):null;
function reveal(){
  if(!io)return;
  $$(REVEAL).forEach(function(el){
    if(el.getAttribute('data-v12r'))return;
    if(!el.offsetParent)return;                         // trang đang ẩn: xử lý khi được mở
    el.setAttribute('data-v12r','1');
    var r=el.getBoundingClientRect(); if(r.top<window.innerHeight*0.92&&r.bottom>0)return; // đang trong màn hình: hiện ngay
    el.classList.add('v12-reveal'); io.observe(el);
  });
}
function scrollUI(){
  var bar=document.createElement('div');bar.className='v12-progress';bar.innerHTML='<i></i>';document.body.appendChild(bar);
  var top=document.createElement('button');top.type='button';top.className='v12-top';top.setAttribute('aria-label','Lên đầu trang');top.innerHTML='↑';document.body.appendChild(top);
  top.addEventListener('click',function(){window.scrollTo({top:0,behavior:reduceMotion?'auto':'smooth'})});
  var hdr=$('.app-header'),tick=false;
  function upd(){tick=false;var h=document.documentElement,max=h.scrollHeight-h.clientHeight,y=window.pageYOffset||h.scrollTop;
    bar.firstChild.style.width=(max>0?y/max*100:0)+'%'; top.classList.toggle('show',y>600); if(hdr)hdr.classList.toggle('v12-scrolled',y>8)}
  window.addEventListener('scroll',function(){if(!tick){tick=true;requestAnimationFrame(upd)}},{passive:true}); upd();
}

/* =====================================================================
   CHẾ ĐỘ VIDEO — sân khấu 16:9 chạy theo audio: mỗi câu đang đọc sinh ra một
   "nhịp hình" (chân dung, mốc thời gian, văn kiện, Đại hội, số liệu, trích dẫn,
   danh sách ý, chữ hiện dần). Không cần file video: nhẹ, khớp từng câu.
   ===================================================================== */
var V={open:false,cue:-2,ch:-1,points:[],beats:null,bgIdx:0,el:null};
var ALIAS={'Nguyễn Ái Quốc':'Hồ Chí Minh','Nguyễn Tất Thành':'Hồ Chí Minh','Bác Hồ':'Hồ Chí Minh','Hồ Chí Minh':'Hồ Chí Minh'};
var QUOTES=[
 ['không có gì quý hơn độc lập, tự do','Không có gì quý hơn độc lập, tự do','Chủ tịch Hồ Chí Minh'],
 ['thà hy sinh tất cả','Chúng ta thà hy sinh tất cả, chứ nhất định không chịu mất nước, nhất định không chịu làm nô lệ','Lời kêu gọi toàn quốc kháng chiến, 19/12/1946'],
 ['đem sức ta mà tự giải phóng','Toàn quốc đồng bào hãy đứng dậy đem sức ta mà tự giải phóng cho ta','Chủ tịch Hồ Chí Minh, 8/1945'],
 ['hãy giữ vững chí khí chiến đấu','Hãy giữ vững chí khí chiến đấu','Tổng Bí thư Trần Phú, 1931'],
 ['quyền hưởng tự do và độc lập','Nước Việt Nam có quyền hưởng tự do và độc lập, và sự thật đã thành một nước tự do, độc lập','Tuyên ngôn Độc lập, 2/9/1945'],
 ['tất cả các dân tộc trên thế giới đều sinh ra bình đẳng','Tất cả các dân tộc trên thế giới đều sinh ra bình đẳng','Tuyên ngôn Độc lập, 2/9/1945'],
 ['đen tối như không có đường ra','Tình hình đen tối như không có đường ra','Chủ tịch Hồ Chí Minh'],
 ['dân ta phải biết sử ta','Dân ta phải biết sử ta, cho tường gốc tích nước nhà Việt Nam','Chủ tịch Hồ Chí Minh, 1942'],
 ['kiếp ngựa trâu','Nếu không giải quyết được vấn đề dân tộc giải phóng… thì quyền lợi của bộ phận, giai cấp đến vạn năm cũng không đòi lại được','Hội nghị Trung ương 8, 5/1941'],
 ['đổi mới hay là chết','Đổi mới hay là chết','Tinh thần trước Đại hội VI, 1986'],
 ['nhìn thẳng vào sự thật','Nhìn thẳng vào sự thật, đánh giá đúng sự thật, nói rõ sự thật','Đại hội VI, 12/1986'],
 ['muốn là bạn với tất cả các nước','Việt Nam muốn là bạn với tất cả các nước','Đại hội VII, 1991'],
 ['kỷ nguyên vươn mình','Kỷ nguyên vươn mình của dân tộc','Tổng Bí thư Tô Lâm'],
 ['khoét núi, ngủ hầm','Khoét núi, ngủ hầm, mưa dầm, cơm vắt','Điện Biên Phủ, 1954'],
 ['thần tốc, táo bạo, bất ngờ, chắc thắng','Thần tốc, táo bạo, bất ngờ, chắc thắng','Chiến dịch Hồ Chí Minh, 4/1975'],
 ['đánh chắc tiến chắc','Đánh chắc, tiến chắc','Phương châm Chiến dịch Điện Biên Phủ']
];
var COUNTS=[
 ['bảy trăm bảy mươi tư phẩy bảy phần trăm',774.7,1,'%','Lạm phát năm 1986'],
 ['hai mươi ba phẩy mười hai phần trăm',23.12,2,'%','Lạm phát năm 2008'],
 ['mười tám phẩy sáu mươi tám phần trăm',18.68,2,'%','Lạm phát năm 2011'],
 ['ba phẩy hai mươi ba phần trăm',3.23,2,'%','Lạm phát năm 2020'],
 ['chín mươi phần trăm',90,0,'%','dân số mù chữ (1945)'],
 ['hai triệu đồng bào',2,0,' triệu','đồng bào chết đói (1945)'],
 ['năm mươi sáu ngày đêm',56,0,' ngày đêm','Chiến dịch Điện Biên Phủ'],
 ['mười hai ngày đêm',12,0,' ngày đêm','Điện Biên Phủ trên không, 12/1972'],
 ['mười lăm ngày',15,0,' ngày','giành chính quyền trên cả nước'],
 ['hai mươi mốt năm',21,0,' năm','kháng chiến chống Mỹ, cứu nước'],
 ['hai vạn rưỡi',25000,0,' người','Mít tinh 1/5/1938, khu Đấu xảo Hà Nội'],
 ['một trăm năm mươi',150,0,'','thành viên thứ 150 của WTO'],
 ['hai phần ba thế kỷ',2,0,'/3 thế kỷ','khủng hoảng đường lối cứu nước'],
 ['hơn tám mươi năm',80,0,'+ năm','ách thống trị của thực dân'],
 ['hai mươi vạn quân Tưởng',200000,0,' quân','quân Tưởng kéo vào miền Bắc']
];
var DOCS=[[/Cương lĩnh chính trị đầu tiên/,'Cương lĩnh chính trị đầu tiên','2/1930'],[/Cương lĩnh xây dựng đất nước[^.,]*2011|bổ sung, phát triển năm 2011/,'Cương lĩnh 2011 (bổ sung, phát triển)','Đại hội XI'],[/Cương lĩnh xây dựng đất nước/,'Cương lĩnh xây dựng đất nước (1991)','Đại hội VII'],
 [/Luận cương chính trị/,'Luận cương chính trị','10/1930'],[/Chánh cương vắn tắt/,'Chánh cương vắn tắt · Sách lược vắn tắt','2/1930'],[/Chính cương/,'Chính cương Đảng Lao động Việt Nam','2/1951'],
 [/Kháng chiến kiến quốc/,'Chỉ thị Kháng chiến kiến quốc','25/11/1945'],[/Toàn dân kháng chiến/,'Chỉ thị Toàn dân kháng chiến','12/12/1946'],[/Lời kêu gọi/,'Lời kêu gọi toàn quốc kháng chiến','19/12/1946'],
 [/Nhật, Pháp bắn nhau/,'Chỉ thị “Nhật – Pháp bắn nhau và hành động của chúng ta”','12/3/1945'],[/Chỉ thị 100/,'Chỉ thị 100 — khoán sản phẩm','1/1981'],[/Nghị quyết 10/,'Nghị quyết 10 — khoán 10','4/1988'],
 [/Nghị quyết 57/,'Nghị quyết 57-NQ/TW','12/2024'],[/Nghị quyết 59/,'Nghị quyết 59-NQ/TW','1/2025'],[/Nghị quyết 66/,'Nghị quyết 66-NQ/TW','4/2025'],[/Nghị quyết 68/,'Nghị quyết 68-NQ/TW','5/2025'],
 [/Hội nghị Trung ương 15|Nghị quyết 15/,'Nghị quyết Trung ương 15','1/1959'],[/Hội nghị Trung ương 8/,'Hội nghị Trung ương 8','5/1941'],[/Hội nghị Trung ương 6/,'Hội nghị Trung ương 6','11/1939'],
 [/Tuyên ngôn Độc lập/,'Tuyên ngôn Độc lập','2/9/1945'],[/Hiệp định Sơ bộ/,'Hiệp định Sơ bộ','6/3/1946'],[/Hiệp định Giơ ne vơ/,'Hiệp định Genève','21/7/1954'],[/Hiệp định Pa ri/,'Hiệp định Paris','27/1/1973'],
 [/Hiến pháp/,'Hiến pháp','Văn bản pháp lý cao nhất'],[/Đường Kách mệnh/,'Đường Kách mệnh','1927'],[/Kháng chiến nhất định thắng lợi/,'Kháng chiến nhất định thắng lợi','Trường Chinh, 1947'],
 [/Tổ chức Thương mại Thế giới/,'Gia nhập WTO','11/1/2007'],[/Hội nghị hợp nhất/,'Hội nghị hợp nhất các tổ chức cộng sản','1–2/1930'],[/Hội Việt Nam Cách mạng Thanh niên/,'Hội Việt Nam Cách mạng Thanh niên','6/1925'],
 [/Mặt trận Việt Minh/,'Mặt trận Việt Minh','19/5/1941'],[/bốn nguy cơ/,'Bốn nguy cơ','Hội nghị giữa nhiệm kỳ, 1/1994'],[/ba khâu đột phá/,'Ba khâu đột phá chiến lược','2011–2020']
];
var ORDW={'nhất':'I','hai':'II','ba':'III','tư':'IV','năm':'V','sáu':'VI','bảy':'VII','tám':'VIII','chín':'IX','mười':'X','mười một':'XI','mười hai':'XII','mười ba':'XIII','mười bốn':'XIV'};
var POINT=/^(?:Và )?(?:[Tt]hứ (?:nhất|hai|ba|tư|năm|sáu)|Một là|Hai là|Ba là|Bốn là|Năm là)[,:]\s*/;
var MEDIA={ // ảnh nền theo thời kỳ (ảnh tư liệu trực tuyến, có ảnh minh họa local dự phòng)
 'pre1930':['https://baotanglichsu.vn/DataFiles/Uploaded/image/dong%20du/Anh-2t.jpg','https://cdn.nhandan.vn/images/6774a2cbcc5a73e70778c5dc99702adb374322a7382947e0f8c918ebdfd8976382f19e8ff75991d42dd1593e8ba83ba1e667d376bf869970b83bd2a9ea12e0ea/ham-nghi-1.jpg.avif'],
 '1930-1935':['https://bna.1cdn.vn/2024/10/18/26.-chu-tich-ho-chi-minh-chup-anh-voi-cac-chien-si-xo-viet.-tu-lieu-cua-bao-tang.jpg.jpg'],
 '1936-1939':['https://sohanews.sohacdn.com/thumb_w/1200/2019/5/19/photo-1-15582322743631355188207-crop-15582325181741729769166.jpg'],
 '1939-1945':['https://nhandan.vn/special/motquangtruonglichsu/assets/41P4plCxMN/undefined-1369x1022.jpeg','https://cdn2.tuoitre.vn/zoom/700_525/tto/i/s626/2016/09/09/aa65a224.jpg'],
 '1945-1954':['https://resource.kinhtedothi.vn/2024/04/2008c0325e-24e0-4761-b866-ae1528e345c8.png','https://file3.qdnd.vn/data/images/0/2022/09/17/tuanson/13.jpg'],
 '1954-1975':['https://file3.qdnd.vn/data/images/0/2022/04/26/thuyanh/30-4.jpg?dpi=150&quality=100&w=870','https://media.vov.vn/sites/default/files/styles/front_medium/public/2025-04/ben_tre_1960.jpg']
};
function slugify(s){return String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/đ/g,'d').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')}
function bgList(id){
  var list=(MEDIA[id]||[]).slice();
  var per=((window.HISTORY_INTEGRATED||{}).periods||[]).filter(function(p){return p.id===id})[0];
  (per&&per.movements||[]).forEach(function(m){list.push('assets/images/movements/'+slugify(m.name).slice(0,60)+'.svg')});
  list.push('assets/images/official/overview/33.jpg');
  return list;
}
function yearsOf(id){var m=periodLabel(id).match(/(\d{4})\D+(\d{4})/);return m?[+m[1],+m[2]]:[1930,2026]}
function leaderIn(t){
  var names=Object.keys(ALIAS).concat(Object.keys(window.PORTRAITS||{}));
  for(var i=0;i<names.length;i++){if(t.indexOf(names[i])>=0){var n=ALIAS[names[i]]||names[i];if((window.PORTRAITS||{})[n])return n}}
  return null;
}
function dateIn(t,last){
  var r=t.match(/[Tt]ừ ngày (\d{1,2}) đến (?:ngày )?(\d{1,2}) tháng (\d{1,2})(?! năm)/);if(r&&last)return {big:r[1]+'–'+r[2]+'.'+r[3]+'.'+last,year:last};
  r=t.match(/[Nn]gày (\d{1,2}) tháng (\d{1,2})(?! năm)/);if(r&&last)return {big:r[1]+'.'+r[2]+'.'+last,year:last};
  var m=t.match(/[Nn]gày (\d{1,2}) tháng (\d{1,2}) năm (\d{4})/);if(m)return {big:m[1]+'.'+m[2]+'.'+m[3],year:+m[3]};
  m=t.match(/[Tt]ừ ngày (\d{1,2}) đến ngày (\d{1,2}) tháng (\d{1,2}) năm (\d{4})/);if(m)return {big:m[1]+'–'+m[2]+'.'+m[3]+'.'+m[4],year:+m[4]};
  m=t.match(/[Tt]háng (\d{1,2}) năm (\d{4})/);if(m)return {big:(m[1].length<2?'0':'')+m[1]+'/'+m[2],year:+m[2]};
  m=t.match(/[Nn]ăm (\d{4})/);if(m)return {big:m[1],year:+m[1]};
  m=t.match(/(?:^|\D)(1[89]\d\d|20[0-4]\d)(?!\d)/);if(m)return {big:m[1],year:+m[1]};
  return null;
}
var lastYear=null;
function beatFor(cue,idx,cues,id){
  if(idx===0)lastYear=null;
  var t=cue.t, low=t.toLowerCase(), first=idx===0||cues[idx-1].c!==cue.c;
  var d=dateIn(t,lastYear); if(d)lastYear=d.year; var b={text:t,year:d?d.year:null};
  if(first){b.type=cue.c===0?'open':'chapter';return b}
  for(var i=0;i<QUOTES.length;i++)if(low.indexOf(QUOTES[i][0])>=0){b.type='quote';b.q=QUOTES[i][1];b.by=QUOTES[i][2];return b}
  for(i=0;i<COUNTS.length;i++)if(low.indexOf(COUNTS[i][0].toLowerCase())>=0){b.type='count';b.n=COUNTS[i];return b}
  var cg=t.match(/Đại hội (?:đại biểu toàn quốc )?lần thứ (mười một|mười hai|mười ba|mười bốn|nhất|hai|ba|tư|năm|sáu|bảy|tám|chín|mười)/);
  if(cg&&!/Quốc tế/.test(t.slice(cg.index,cg.index+cg[0].length+20))){b.type='congress';b.no=ORDW[cg[1]];return b}
  if(POINT.test(t)){var it=t.replace(POINT,'');b.type='point';b.item=it.charAt(0).toUpperCase()+it.slice(1);return b}
  var ld=leaderIn(t); if(ld){b.type='leader';b.name=ld;return b}
  for(i=0;i<DOCS.length;i++)if(DOCS[i][0].test(t)){b.type='doc';b.doc=DOCS[i];return b}
  if(d){b.type='date';b.date=d;return b}
  b.type='text';return b;
}
function buildVideo(){
  if(V.el)return V.el;
  var el=document.createElement('div');el.className='v12v';el.hidden=true;el.setAttribute('role','dialog');el.setAttribute('aria-label','Bài giảng dạng video');
  el.innerHTML='<div class="v12v-wrap"><div class="v12v-stage">'+
    '<div class="v12v-bg"><img alt=""></div><div class="v12v-shade"></div>'+
    '<div class="v12v-top"><span class="v12v-brand">LỊCH SỬ ĐẢNG CỘNG SẢN VIỆT NAM</span><span class="v12v-chap"></span></div>'+
    '<div class="v12v-main"></div>'+
    '<div class="v12v-tl"><span class="a"></span><div class="line"><i class="fill"></i><b class="dot"><em></em></b></div><span class="z"></span></div>'+
    '</div></div>'+
    '<div class="v12v-ui"><button type="button" data-v="toggle" class="main" aria-label="Phát/Tạm dừng">❚❚</button><button type="button" data-v="back" aria-label="Lùi 10 giây">−10</button><button type="button" data-v="fwd" aria-label="Tới 10 giây">+10</button>'+
    '<div class="v12v-seek" data-v="seek"><i></i></div><span class="v12v-time">0:00</span>'+
    '<select data-v="ch" aria-label="Chọn chương"></select><button type="button" data-v="fs" aria-label="Toàn màn hình">⛶</button><button type="button" data-v="close" aria-label="Đóng video">✕</button></div>'+
    '<p class="v12v-rotate">Xoay ngang điện thoại để xem video rõ hơn</p>';
  document.body.appendChild(el);V.el=el;
  el.addEventListener('click',function(e){
    var b=e.target.closest('[data-v]');if(!b)return;var a=b.getAttribute('data-v'),au=P.audio;
    if(a==='toggle'&&au){if(au.paused)au.play();else au.pause()}
    if(a==='back'&&au)au.currentTime=Math.max(0,au.currentTime-10);
    if(a==='fwd'&&au)au.currentTime=Math.min(au.duration||0,au.currentTime+10);
    if(a==='seek'&&au&&au.duration){var r=b.getBoundingClientRect();au.currentTime=au.duration*Math.min(1,Math.max(0,(e.clientX-r.left)/r.width))}
    if(a==='fs'){var f=el.requestFullscreen||el.webkitRequestFullscreen;if(document.fullscreenElement||document.webkitFullscreenElement){(document.exitFullscreen||document.webkitExitFullscreen).call(document)}else if(f)f.call(el)}
    if(a==='close')closeVideo();
  });
  el.querySelector('[data-v="ch"]').addEventListener('change',function(e){gotoChapter(Number(e.target.value))});
  window.addEventListener('resize',fitStage);
  document.addEventListener('keydown',function(e){if(!V.open)return;var au=P.audio;
    if(e.key==='Escape')closeVideo(); else if(e.key===' '&&au){e.preventDefault();if(au.paused)au.play();else au.pause()}
    else if(e.key==='ArrowLeft'&&au)au.currentTime=Math.max(0,au.currentTime-10); else if(e.key==='ArrowRight'&&au)au.currentTime+=10;});
  if(!(el.requestFullscreen||el.webkitRequestFullscreen))el.querySelector('[data-v="fs"]').style.display='none';
  return el;
}
function fitStage(){
  if(!V.el||!V.open)return;var w=window.innerWidth,h=window.innerHeight-(V.el.querySelector('.v12v-ui').offsetHeight||56);
  var s=Math.min(w/1280,h/720);var st=V.el.querySelector('.v12v-stage');st.style.transform='scale('+s+')';
  var wr=V.el.querySelector('.v12v-wrap');wr.style.width=(1280*s)+'px';wr.style.height=(720*s)+'px';
}
function openVideo(id){
  if(!timingFor(id,'nu')&&!timingFor(id,'nam')){alert('Bài giảng này chưa có file audio để dựng video.');return}
  buildVideo();
  var want=timingFor(id,'nam')?'nam':'nu';
  if(P.id!==id||P.voice!==want)start(id,null,'nam'); else if(P.audio&&P.audio.paused)P.audio.play();
  var tm=timing(id),L=lectures()[id];
  var tl=V.el.querySelector('.v12v-tl');tl.classList.remove('on');tl.querySelector('.fill').style.width='0';tl.querySelector('.dot').style.left='0';tl.querySelector('.dot em').textContent='';
  V.open=true;V.cue=-2;V.ch=-1;V.points=[];V.bgIdx=0;V.id=id;
  V.beats=tm.cues.map(function(c,i){return beatFor(c,i,tm.cues,id)});
  V.bgs=bgList(id);
  var yy=yearsOf(id);V.y0=yy[0];V.y1=yy[1];
  V.el.querySelector('.v12v-tl .a').textContent=yy[0];V.el.querySelector('.v12v-tl .z').textContent=yy[1];
  V.el.querySelector('[data-v="ch"]').innerHTML=L.chapters.map(function(c,i){return '<option value="'+i+'">Chương '+(i+1)+': '+esc(c.title)+'</option>'}).join('');
  V.el.hidden=false;document.documentElement.classList.add('v12v-lock');fitStage();
  V.bgs.forEach(function(u){var im=new Image();im.src=u});
  videoTick(P.audio?P.audio.currentTime:0);
}
function closeVideo(){
  if(!V.el||!V.open)return;V.open=false;V.el.hidden=true;document.documentElement.classList.remove('v12v-lock');
  if(document.fullscreenElement||document.webkitFullscreenElement)(document.exitFullscreen||document.webkitExitFullscreen).call(document);
  if(P.voice==='nam')stop();   // tắt giọng của video khi đóng video
}
function setBg(i){
  var img=V.el.querySelector('.v12v-bg img'),u=V.bgs[i%V.bgs.length];
  var bg=V.el.querySelector('.v12v-bg');bg.classList.remove('kb');void bg.offsetWidth;bg.classList.add('kb');
  img.onerror=function(){this.onerror=null;this.src='assets/images/official/overview/33.jpg'};img.src=u;
}
function moveTimeline(year){
  if(!year)return;var p=(year-V.y0)/Math.max(1,V.y1-V.y0),tl0=V.el.querySelector('.v12v-tl');if(p<-0.05||p>1.05){tl0.classList.remove('on');return}p=Math.min(1,Math.max(0,p));
  var tl=V.el.querySelector('.v12v-tl');tl.querySelector('.dot').style.left=(p*100)+'%';tl.querySelector('.fill').style.width=(p*100)+'%';tl.querySelector('.dot em').textContent=year;tl.classList.add('on');
}
function countUp(el,n,dur){
  var target=n[1],dec=n[2],t0=null;
  function step(ts){if(!t0)t0=ts;var k=Math.min(1,(ts-t0)/dur),v=target*(1-Math.pow(1-k,3));
    el.textContent=v.toLocaleString('vi-VN',{minimumFractionDigits:dec,maximumFractionDigits:dec})+n[3];if(k<1&&V.open)requestAnimationFrame(step)}
  requestAnimationFrame(step);
}
function kinetic(text,dur){
  var words=text.split(/\s+/),per=Math.min(0.28,(dur*0.85)/Math.max(1,words.length));
  return words.map(function(w,i){return '<span style="animation-delay:'+(i*per).toFixed(2)+'s">'+esc(w)+'</span>'}).join(' ');
}
function renderBeat(i){
  var tm=timing(V.id),cue=tm.cues[i],b=V.beats[i],L=lectures()[V.id],main=V.el.querySelector('.v12v-main');
  var rate=(P.audio&&P.audio.playbackRate)||1,dur=Math.max(1.5,(cue.e-cue.s)/rate);
  if(cue.c!==V.ch){V.ch=cue.c;V.points=[];setBg(V.bgIdx++);
    V.el.querySelector('.v12v-chap').textContent='Chương '+(cue.c+1)+' · '+L.chapters[cue.c].title;
    V.el.querySelector('[data-v="ch"]').value=String(cue.c);}
  moveTimeline(b.year);
  var h='';
  if(b.type==='open')h='<div class="bt-open"><small>BÀI GIẢNG THỜI KỲ</small><h1>'+esc(periodLabel(V.id))+'</h1><p>'+esc(L.title.replace(/^[^:]+:\s*/,''))+'</p></div>';
  else if(b.type==='chapter')h='<div class="bt-chapter"><b>'+pad2(cue.c+1)+'</b><div><small>CHƯƠNG '+(cue.c+1)+'</small><h2>'+esc(L.chapters[cue.c].title)+'</h2></div></div>';
  else if(b.type==='quote')h='<figure class="bt-quote"><blockquote>“'+esc(b.q)+'”</blockquote><figcaption>— '+esc(b.by)+'</figcaption></figure>';
  else if(b.type==='count')h='<div class="bt-count"><strong>0</strong><span>'+esc(b.n[4])+'</span></div>';
  else if(b.type==='congress')h='<div class="bt-congress"><div class="seal"><small>ĐẠI HỘI</small><b>'+esc(b.no)+'</b></div><div><small>ĐẠI HỘI ĐẠI BIỂU TOÀN QUỐC</small><h2>Lần thứ '+esc(b.no)+'</h2>'+(b.year?'<p>Năm '+b.year+'</p>':'')+'</div></div>';
  else if(b.type==='leader'){var rec=(window.LEADERS_DATA||[]).filter(function(x){return x.name===b.name})[0];
    h='<div class="bt-leader"><img src="'+esc(window.portraitOf(b.name))+'" alt=""><div><small>'+(rec?'TỔNG BÍ THƯ':'NHÂN VẬT LỊCH SỬ')+'</small><h2>'+(b.name==='Hồ Chí Minh'?'Chủ tịch Hồ Chí Minh':'Đồng chí '+esc(b.name))+'</h2>'+(rec?'<p>'+esc(rec.term)+'</p>':'')+'<em>'+kinetic(b.text,dur)+'</em></div></div>';}
  else if(b.type==='doc')h='<div class="bt-doc"><div class="paper"><small>VĂN KIỆN · SỰ KIỆN</small><h2>'+esc(b.doc[1])+'</h2><p>'+esc(b.doc[2])+'</p></div><em>'+kinetic(b.text,dur)+'</em></div>';
  else if(b.type==='point'){V.points.push(b.item);
    h='<ol class="bt-points">'+V.points.map(function(p,k){return '<li class="'+(k===V.points.length-1?'new':'')+'"><b>'+(k+1)+'</b><span>'+esc(p.length>150?p.slice(0,147)+'…':p)+'</span></li>'}).join('')+'</ol>';}
  else if(b.type==='date')h='<div class="bt-date"><strong>'+esc(b.date.big)+'</strong><p>'+kinetic(b.text,dur)+'</p></div>';
  else h='<p class="bt-text">'+kinetic(b.text,dur)+'</p>';
  main.innerHTML='<div class="beat beat-'+b.type+'">'+h+'</div>';
  if(b.type==='count')countUp(main.querySelector('.bt-count strong'),b.n,1400);
  if(b.type!=='point'&&b.type!=='chapter'&&b.type!=='open'&&i%5===4)setBg(V.bgIdx++);  // đổi nền định kỳ cho đỡ đơn điệu
}
function videoTick(t){
  if(!V.open)return;var tm=timing(V.id);if(!tm||P.id!==V.id)return;
  var cur=0;for(var k=0;k<tm.cues.length;k++){if(tm.cues[k].s<=t+0.05)cur=k;else break}
  if(cur!==V.cue){
    if(cur<V.cue){V.ch=-1;V.points=[];for(var j=0;j<cur;j++){var bj=V.beats[j];if(tm.cues[j].c===tm.cues[cur].c&&bj.type==='point')V.points.push(bj.item)}} // tua lùi: dựng lại danh sách ý
    V.cue=cur;renderBeat(cur);
  }
  var d=(P.audio&&P.audio.duration)||tm.duration;
  V.el.querySelector('.v12v-seek i').style.width=(t/d*100)+'%';
  V.el.querySelector('.v12v-time').textContent=fmt(t)+' / '+fmt(d);
  var tb=V.el.querySelector('[data-v="toggle"]');tb.textContent=(P.audio&&!P.audio.paused)?'❚❚':'▶';
}
(function hook(){ // nối vào bộ phát chung
  var _onTime=onTime;onTime=function(){_onTime();if(V.open&&P.audio)videoTick(P.audio.currentTime)};
  var _stop=stop;stop=function(){closeVideo();_stop()};
})();
document.addEventListener('click',function(e){var b=e.target.closest('.v12-lec-video');if(b){e.preventDefault();openVideo(b.getAttribute('data-id'))}});

window.V12Lecture={start:start,stop:stop,openVideo:openVideo,
  state:function(){return {id:P.id,voice:P.voice,src:P.audio?P.audio.src.split('/').pop():null,video:V.open}},
  beatsOf:function(id){var tm=timing(id);return tm?tm.cues.map(function(c,i){return beatFor(c,i,tm.cues,id)}):[]},
  renderAt:function(i){if(V.open){V.cue=i;renderBeat(i)}}};
function init(){
  scrollUI(); lectureCard(); reveal();
  var q=0,obs=new MutationObserver(function(){if(q)return;q=requestAnimationFrame(function(){q=0;lectureCard();reveal()})});
  ['#overviewMount','#historyMount','#organizationMount','#syllabusMount','#quizMount'].forEach(function(s){var n=$(s);if(n)obs.observe(n,{childList:true,subtree:true})});
  window.addEventListener('hashchange',function(){setTimeout(reveal,80)});
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',function(){setTimeout(init,0)});else setTimeout(init,0);
})();
