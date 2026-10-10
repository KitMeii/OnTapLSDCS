(function(){
'use strict';
/* V16 — Trang Tổng quan dạng "bức tranh": mỗi phần một màn hình, ít chữ, lướt xuống đọc sơ qua.
   Chi tiết nằm ở trang Lịch sử; các thẻ ở đây dẫn sang đúng thời kỳ.
   Thứ tự: con số → hình thành & trưởng thành → 14 kỳ Đại hội → văn kiện then chốt → kinh tế → lạm phát → người đứng đầu Đảng. */
var $=function(s,r){return (r||document).querySelector(s)}, $$=function(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))};
var esc=function(v){return String(v==null?'':v).replace(/[&<>'"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]})};
var reduceMotion=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
var vn=function(n,d){return Number(n).toLocaleString('vi-VN',{minimumFractionDigits:d||0,maximumFractionDigits:d||0})};

/* ---------- Nội dung tóm lược (chi tiết đã có ở trang Lịch sử) ---------- */
var STAGES=[
 {name:'Hình thành',years:'1858–1945',period:'pre1930',line:'Tìm đường cứu nước, thành lập Đảng, giành chính quyền.',marks:[['3/2/1930','Thành lập Đảng'],['5/1941','Trung ương 8 – Việt Minh'],['2/9/1945','Tuyên ngôn Độc lập']]},
 {name:'Chiến đấu',years:'1945–1975',period:'1945-1954',line:'Giữ chính quyền, hai cuộc kháng chiến, thống nhất đất nước.',marks:[['19/12/1946','Toàn quốc kháng chiến'],['7/5/1954','Điện Biên Phủ'],['30/4/1975','Thống nhất đất nước']]},
 {name:'Xây dựng',years:'1975–1986',period:'1975-1986',line:'Cả nước đi lên CNXH, bảo vệ Tổ quốc, tìm tòi đổi mới.',marks:[['1976','Thống nhất nhà nước'],['8/1979','Sản xuất “bung ra”'],['1/1981','Chỉ thị 100 – khoán']]},
 {name:'Đổi mới',years:'1986–2021',period:'1986-2001',line:'Đổi mới toàn diện, kinh tế thị trường định hướng XHCN, hội nhập.',marks:[['12/1986','Đại hội VI'],['1995','ASEAN · Hoa Kỳ'],['2007','Gia nhập WTO']]},
 {name:'Ngày nay',years:'2021–2026',period:'2021-2026',line:'Khát vọng 2030–2045, đột phá khoa học công nghệ, tự chủ chiến lược.',marks:[['2021','Đại hội XIII'],['2024–2025','Bộ tứ nghị quyết'],['1/2026','Đại hội XIV']]}
];
var NAMES=[['2/1930','Đảng Cộng sản Việt Nam','Hội nghị hợp nhất'],['10/1930','Đảng Cộng sản Đông Dương','Hội nghị Trung ương lần thứ nhất'],['2/1951','Đảng Lao động Việt Nam','Đại hội II'],['12/1976','Đảng Cộng sản Việt Nam','Đại hội IV']];
var DOCS=[
 ['3/2/1930','Cương lĩnh chính trị đầu tiên','Độc lập dân tộc gắn với chủ nghĩa xã hội','pre1930'],
 ['10/1930','Luận cương chính trị','Cách mạng tư sản dân quyền, công – nông là động lực','1930-1935'],
 ['5/1941','Hội nghị Trung ương 8','Giải phóng dân tộc lên hàng đầu, lập Việt Minh','1939-1945'],
 ['12/3/1945','Chỉ thị “Nhật – Pháp bắn nhau…”','Phát động cao trào kháng Nhật cứu nước','1939-1945'],
 ['25/11/1945','Chỉ thị Kháng chiến kiến quốc','Kẻ thù chính là thực dân Pháp xâm lược','1945-1954'],
 ['2/1951','Chính cương Đảng Lao động Việt Nam','Cách mạng dân tộc dân chủ nhân dân','1945-1954'],
 ['1/1959','Nghị quyết Trung ương 15','Bạo lực cách mạng, mở đường Đồng khởi','1954-1975'],
 ['8/1979','Hội nghị Trung ương 6 khóa IV','Làm cho sản xuất “bung ra”','1975-1986'],
 ['1/1981','Chỉ thị 100-CT/TW','Khoán sản phẩm đến nhóm và người lao động','1975-1986'],
 ['12/1986','Đại hội VI','Đổi mới toàn diện, trước hết là kinh tế','1986-2001'],
 ['4/1988','Nghị quyết 10','Hộ nông dân là đơn vị kinh tế tự chủ','1986-2001'],
 ['6/1991','Cương lĩnh 1991','Mác – Lênin và tư tưởng Hồ Chí Minh là nền tảng','1986-2001'],
 ['1/2011','Cương lĩnh bổ sung, phát triển 2011','Dân giàu, nước mạnh, dân chủ, công bằng, văn minh','2011-2021'],
 ['2024–2025','Nghị quyết 57 · 59 · 66 · 68','Công nghệ · hội nhập · pháp luật · kinh tế tư nhân','2021-2026']
];
var ERAS=['Thuộc địa nửa phong kiến','Kinh tế kháng chiến','Kế hoạch hóa tập trung, bao cấp','Hàng hóa nhiều thành phần','Thị trường định hướng XHCN'];
var CONG_PERIOD={I:'1930-1935',II:'1945-1954',III:'1954-1975',IV:'1975-1986',V:'1975-1986',VI:'1986-2001',VII:'1986-2001',VIII:'1986-2001',IX:'2001-2011',X:'2001-2011',XI:'2011-2021',XII:'2011-2021',XIII:'2021-2026',XIV:'2021-2026'};

/* ---------- Biểu đồ đường một chuỗi (SVG vẽ theo đúng bề rộng khung → chữ luôn 12px; tooltip khi rê/chạm) ---------- */
var CHARTS=[];
function lineChart(id,data,o){
  CHARTS.push({id:id,data:data,o:o});
  return '<div class="v16-chart" data-chart="'+id+'"><div class="v16-plot"></div><div class="v16-tip" hidden></div>'+
    '<details class="v16-table"><summary>Xem bảng số liệu</summary><table><thead><tr><th>Năm</th><th>'+esc(o.unit)+'</th></tr></thead><tbody>'+data.map(function(d){return '<tr><td>'+d.year+'</td><td>'+esc(o.fmt(d.value))+'</td></tr>'}).join('')+'</tbody></table></details></div>';
}
function drawChart(box,data,o){
  var plot=$('.v16-plot',box);if(!plot)return;
  var W=Math.max(280,Math.round(plot.clientWidth)),H=Math.round(Math.min(320,Math.max(210,W*.42))),p={l:48,r:30,t:26,b:30};
  var xs=data.map(function(d){return d.year}),ys=data.map(function(d){return d.value});
  var x0=Math.min.apply(0,xs),x1=Math.max.apply(0,xs),y0=Math.min(0,Math.min.apply(0,ys)),y1=Math.max(Math.max.apply(0,ys),o.ticks[o.ticks.length-1]);
  var X=function(v){return p.l+(v-x0)/(x1-x0)*(W-p.l-p.r)},Y=function(v){return p.t+(y1-v)/(y1-y0)*(H-p.t-p.b)};
  var grid=o.ticks.map(function(t){return '<line x1="'+p.l+'" x2="'+(W-p.r)+'" y1="'+Y(t)+'" y2="'+Y(t)+'" class="v16-grid'+(t===0?' zero':'')+'"/><text x="'+(p.l-8)+'" y="'+(Y(t)+4)+'" class="v16-ax" text-anchor="end">'+esc(o.fmtAxis(t))+'</text>'}).join('');
  var path=data.map(function(d,i){return (i?'L':'M')+X(d.year).toFixed(1)+' '+Y(d.value).toFixed(1)}).join(' ');
  var lastX=-99,labels=data.map(function(d,i){var x=X(d.year);if(x-lastX<34&&i!==data.length-1)return '';if(i===data.length-1&&x-lastX<34)return '';lastX=x;return '<text x="'+x+'" y="'+(H-8)+'" class="v16-ax" text-anchor="middle">'+d.year+'</text>'}).join('');
  var dots=data.map(function(d,i){var lab=o.label.indexOf(d.year)>=0,anchor=i===0?'start':(i===data.length-1?'end':'middle'),dx=i===0?6:(i===data.length-1?-2:0);
    return '<circle cx="'+X(d.year)+'" cy="'+Y(d.value)+'" r="4.5" class="v16-dot"/>'+(lab?'<text x="'+(X(d.year)+dx)+'" y="'+(Y(d.value)-12)+'" class="v16-val" text-anchor="'+anchor+'">'+esc(o.fmt(d.value))+'</text>':'')}).join('');
  plot.innerHTML='<svg width="'+W+'" height="'+H+'" viewBox="0 0 '+W+' '+H+'" role="img" aria-label="'+esc(o.title)+'">'+grid+'<path d="'+path+'" class="v16-line"/>'+dots+labels+
    '<line class="v16-cross" y1="'+p.t+'" y2="'+(H-p.b)+'" x1="0" x2="0"/><rect class="v16-hit" x="'+p.l+'" y="0" width="'+(W-p.l-p.r)+'" height="'+H+'"/></svg>';
  bindChart(box,data,o,W,p);
}
function drawAll(){var m=$('#overviewMount');if(!m||!m.offsetParent)return;CHARTS.forEach(function(c){var b=$('[data-chart="'+c.id+'"]',m);if(b)drawChart(b,c.data,c.o)})}
var rz=0;window.addEventListener('resize',function(){clearTimeout(rz);rz=setTimeout(drawAll,150)});
window.addEventListener('hashchange',function(){if(location.hash==='#tong-quan'||!location.hash)setTimeout(drawAll,60)});
function bindChart(box,data,o,W,p){
  var svg=$('svg',box),hit=$('.v16-hit',svg),cross=$('.v16-cross',svg),tip=$('.v16-tip',box);if(!svg)return;
  var xs=data.map(function(d){return d.year}),x0=Math.min.apply(0,xs),x1=Math.max.apply(0,xs);
  function move(ev){
    var r=svg.getBoundingClientRect(),cx=(ev.touches?ev.touches[0].clientX:ev.clientX),vx=(cx-r.left)/r.width*W;
    var yr=x0+(vx-p.l)/(W-p.l-p.r)*(x1-x0),best=data[0];data.forEach(function(d){if(Math.abs(d.year-yr)<Math.abs(best.year-yr))best=d});
    var px=p.l+(best.year-x0)/(x1-x0)*(W-p.l-p.r);cross.setAttribute('x1',px);cross.setAttribute('x2',px);cross.style.opacity=1;
    tip.hidden=false;tip.innerHTML='<b>'+best.year+'</b>'+esc(o.fmt(best.value))+' <small>'+esc(o.unit)+'</small>';
    var left=px/W*r.width;tip.style.left=Math.min(Math.max(left,50),r.width-50)+'px';
  }
  function leave(){tip.hidden=true;cross.style.opacity=0}
  hit.addEventListener('mousemove',move);hit.addEventListener('touchstart',move,{passive:true});hit.addEventListener('touchmove',move,{passive:true});
  hit.addEventListener('mouseleave',leave);hit.addEventListener('touchend',function(){setTimeout(leave,1600)});
}

/* ---------- Dựng trang ---------- */
function sec(cls,kicker,title,body,lead){
  return '<section class="v16-sec '+cls+'"><div class="v16-head"><span class="v16-kicker">'+kicker+'</span><h2>'+title+'</h2>'+(lead?'<p>'+lead+'</p>':'')+'</div>'+body+'</section>';
}
function render(){
  var m=$('#overviewMount');if(!m)return;
  CHARTS=[];
  var H=(window.HISTORY_INTEGRATED||{}).periods||[],L=window.LEADERS_DATA||[],O=window.OVERVIEW_DATA||{};
  var congresses=[];H.forEach(function(p){(p.congresses||[]).forEach(function(c){congresses.push(c)})});
  var gdp=O.gdpPerCapita||[];
  var infl=(O.inflationFiveYear||[]).slice();(O.inflationPeaks||[]).forEach(function(k){if(k.year>=2000&&!infl.some(function(d){return d.year===k.year}))infl.push({year:k.year,value:k.value})});
  infl.sort(function(a,b){return a.year-b.year});
  var g0=gdp[0],g1=gdp[gdp.length-1];

  var stats='<div class="v16-stats">'+[
    [2026-1930,'năm','Đảng lãnh đạo cách mạng (1930–2026)'],[congresses.length,'kỳ','Đại hội đại biểu toàn quốc'],[L.length,'đồng chí','đứng đầu Đảng qua các thời kỳ'],[5.6,'triệu','đảng viên (Đại hội XIV, 2026)',1]
  ].map(function(s){return '<div class="v16-stat"><strong data-count="'+s[0]+'" data-dec="'+(s[3]||0)+'">'+vn(s[0],s[3]||0)+'</strong><em>'+s[1]+'</em><span>'+s[2]+'</span></div>'}).join('')+'</div>';

  var stages='<ol class="v16-road">'+STAGES.map(function(s,i){return '<li><button type="button" class="v16-stage" data-period="'+s.period+'"><span class="v16-step">'+(i+1)+'</span><b>'+s.name+'</b><time>'+s.years+'</time><p>'+s.line+'</p><ul>'+s.marks.map(function(k){return '<li><i>'+k[0]+'</i>'+k[1]+'</li>'}).join('')+'</ul><span class="v16-more">Xem chi tiết →</span></button></li>'}).join('')+'</ol>'+
    '<div class="v16-names"><span class="v16-names-t">Tên Đảng qua các thời kỳ</span><ol>'+NAMES.map(function(n){return '<li><time>'+n[0]+'</time><b>'+n[1]+'</b><small>'+n[2]+'</small></li>'}).join('')+'</ol></div>';

  var seals='<div class="v16-seals" role="list">'+congresses.map(function(c){var y=(String(c.date).match(/(\d{4})\s*$/)||[])[1]||'';return '<button type="button" role="listitem" class="v16-seal" data-period="'+(CONG_PERIOD[c.no]||'')+'" title="'+esc(c.key)+'"><b>'+esc(c.no)+'</b><time>'+y+'</time><span>'+esc(c.key)+'</span></button>'}).join('')+'</div>';

  var docs='<div class="v16-docs">'+DOCS.map(function(d){return '<button type="button" class="v16-doc" data-period="'+d[3]+'"><time>'+d[0]+'</time><b>'+esc(d[1])+'</b><span>'+esc(d[2])+'</span></button>'}).join('')+'</div>';

  var econ='<div class="v16-eras">'+ERAS.map(function(e,i){return '<span>'+e+'</span>'+(i<ERAS.length-1?'<i aria-hidden="true">→</i>':'')}).join('')+'</div>'+
    '<div class="v16-tiles"><div class="v16-tile"><small>GDP/người '+g0.year+'</small><strong>'+vn(g0.value)+'</strong><em>USD, giá 2015</em></div><div class="v16-tile hi"><small>GDP/người '+g1.year+'</small><strong>'+vn(g1.value)+'</strong><em>gấp khoảng '+vn(g1.value/g0.value,1)+' lần</em></div><div class="v16-tile"><small>Mục tiêu 2030 · Đại hội XIV</small><strong>≈ 8.500</strong><em>USD/người · tăng trưởng ≥ 10%/năm</em></div></div>'+
    lineChart('gdp',gdp,{title:'GDP bình quân đầu người Việt Nam 1985–2025, USD giá cố định 2015',unit:'USD/người (giá 2015)',ticks:[0,1000,2000,3000,4000],fmtAxis:function(v){return vn(v)},fmt:function(v){return vn(v)},label:[g0.year,2005,g1.year]})+
    '<p class="v16-src">Nguồn: World Bank (giá cố định 2015). Trước 1985 không có chuỗi số liệu so sánh được.</p>';

  var inflation='<div class="v16-infl"><div class="v16-peak"><small>Năm 1986 · cuối thời bao cấp</small><strong>774,7%</strong><span>Siêu lạm phát – lý do trực tiếp dẫn tới Đổi mới. Tách riêng vì không cùng thang đo với chuỗi hiện đại.</span></div>'+
    lineChart('infl',infl,{title:'Lạm phát giá tiêu dùng Việt Nam 2000–2025, phần trăm mỗi năm',unit:'%/năm',ticks:[0,5,10,15,20,25],fmtAxis:function(v){return v+'%'},fmt:function(v){return vn(v,2)+'%'},label:[2008,2011,2025]})+'</div>'+
    '<p class="v16-src">Nguồn: World Bank, Tổng cục Thống kê. Đỉnh 2008 và 2011 gắn với khủng hoảng toàn cầu và bất ổn vĩ mô.</p>';

  var leaders='<div class="v16-leaders">'+L.map(function(l){var src=window.portraitOf?window.portraitOf(l.name):'';return '<article class="v7-leader v16-leader" data-v7-bio="'+esc(l.name)+'" tabindex="0"><img src="'+esc(src)+'" alt="Ảnh '+esc(l.name)+'" loading="lazy"><div class="v7-leader-copy"><b>'+esc(l.name)+'</b><span>'+esc(l.term)+'</span></div></article>'}).join('')+'</div>';

  m.innerHTML='<div class="v16">'+
    sec('v16-s-stats','1930 → 2026','Gần một thế kỷ, một con đường',stats,'Độc lập dân tộc gắn liền với chủ nghĩa xã hội – sợi chỉ đỏ xuyên suốt.')+
    sec('v16-s-road','Hình thành và trưởng thành','Năm chặng đường của Đảng',stages,'Chạm vào từng chặng để xem chi tiết ở trang Lịch sử.')+
    sec('v16-s-cong','Đại hội đại biểu toàn quốc','14 kỳ Đại hội',seals)+
    sec('v16-s-docs','Cương lĩnh · Nghị quyết · Chỉ thị','Những văn kiện làm nên bước ngoặt',docs)+
    sec('v16-s-econ','Kinh tế','Từ thuộc địa đến kinh tế thị trường',econ)+
    sec('v16-s-infl','Lạm phát','Từ siêu lạm phát đến ổn định',inflation)+
    sec('v16-s-lead','Lãnh đạo qua các thời kỳ','Những người đứng đầu Đảng',leaders,'Chạm vào ảnh để xem hồ sơ.')+
    '<section class="v16-sec v16-s-cta"><h2>Bắt đầu ôn tập</h2><div class="v16-cta"><a href="#lich-su" class="v16-btn primary">Học theo thời kỳ</a><a href="#de-cuong" class="v16-btn">Đề cương 40 vấn đề</a><a href="#trac-nghiem" class="v16-btn">Luyện 250 câu trắc nghiệm</a></div></section>'+
  '</div>';
  drawAll();
  appear(m);
}

/* ---------- Hiện dần khi lướt tới + số chạy ---------- */
function count(el){
  var to=Number(el.getAttribute('data-count')),dec=Number(el.getAttribute('data-dec')),t0=0;
  if(reduceMotion){el.textContent=vn(to,dec);return}
  function step(ts){if(!t0)t0=ts;var k=Math.min(1,(ts-t0)/1200),v=to*(1-Math.pow(1-k,3));el.textContent=vn(v,dec);if(k<1)requestAnimationFrame(step)}
  requestAnimationFrame(step);
}
function appear(m){
  var secs=$$('.v16-sec',m);
  if(!('IntersectionObserver' in window)||reduceMotion){secs.forEach(function(s){s.classList.add('v16-in')});return}
  var io=new IntersectionObserver(function(es){es.forEach(function(en){if(!en.isIntersecting)return;en.target.classList.add('v16-in');$$('[data-count]',en.target).forEach(count);io.unobserve(en.target)})},{threshold:.15});
  secs.forEach(function(s){io.observe(s)});
}

/* ---------- Dẫn sang trang Lịch sử đúng thời kỳ ---------- */
document.addEventListener('click',function(e){
  var b=e.target.closest&&e.target.closest('#overviewMount [data-period]');if(!b)return;
  var id=b.getAttribute('data-period');if(!id)return;
  location.hash='#lich-su';
  setTimeout(function(){var p=$('#historyMount [data-v7-period="'+id+'"]');if(p&&!p.classList.contains('active'))p.click();window.scrollTo({top:0,behavior:'instant'})},60);
});
document.addEventListener('keydown',function(e){var c=e.target.closest&&e.target.closest('#overviewMount .v16-leader');if(c&&(e.key==='Enter'||e.key===' ')){e.preventDefault();c.click()}});

function init(){render()}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',function(){setTimeout(init,0)});else setTimeout(init,0);
})();
