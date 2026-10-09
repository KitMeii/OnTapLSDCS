(()=>{
'use strict';
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const esc=(v='')=>String(v).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
const slug=(s='')=>String(s).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/g,'d').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
const H=()=>window.HISTORY_INTEGRATED?.periods||[];
const O=()=>window.ORGANIZATION_DATA||{};
const S=()=>window.HISTORY_OFFICIAL_V6||{events:{},congresses:{}};
const E=()=>window.ENRICH_V7||{};
const L6=()=>window.LEADER_BIOS_V6||{};
const L7=()=>window.LEADER_BIOS_V7||{};
const leaders=()=>window.LEADERS_DATA||[];
const state={period:null,orgTab:'party',orgIndex:0};
const honorName=(name='')=>name?`Đồng chí ${name}`:'';
// Ảnh chân dung: dùng nguồn duy nhất data/portraits.js (window.portraitOf).
function leaderRec(name){return leaders().find(x=>x.name===name)}
function portrait(name){return window.portraitOf?window.portraitOf(name):`assets/images/portraits/${slug(name)}.svg`}
function fallback(name){return `assets/images/portraits/${slug(name)}.svg`}
function img(name,cls=''){return `<img class="${cls}" src="${esc(portrait(name))}" alt="Ảnh ${esc(name)}" loading="lazy" referrerpolicy="no-referrer" onerror="this.onerror=null;this.src='${esc(fallback(name))}'">`}
function ul(a){return `<ul>${(a||[]).map(x=>`<li>${esc(x)}</li>`).join('')}</ul>`}


function augmentHistory(){
 const periods=H(); if(!periods?.length) return;
 const byId=id=>periods.find(x=>x.id===id);
 const p45=byId('1939-1945');
 if(p45){
   p45.movements=p45.movements||[];
   if(!p45.movements.find(x=>x.name.includes('Tuyên ngôn Độc lập'))){
     p45.movements.unshift({
       name:'Tuyên ngôn Độc lập – khai sinh nước Việt Nam Dân chủ Cộng hòa',
       time:'02/09/1945',
       place:'Quảng trường Ba Đình, Hà Nội',
       leader:'Chủ tịch Hồ Chí Minh thay mặt Chính phủ lâm thời',
       forces:'Nhân dân cả nước, Chính phủ lâm thời và các đoàn thể cứu quốc',
       summary:'Ngày 2/9/1945, Chủ tịch Hồ Chí Minh đọc Tuyên ngôn Độc lập, trịnh trọng tuyên bố trước quốc dân và thế giới về sự ra đời của nước Việt Nam Dân chủ Cộng hòa.',
       detailPoints:[
         'Phần mở đầu khẳng định quyền con người và mở rộng thành quyền dân tộc: mọi dân tộc đều bình đẳng, có quyền sống, quyền sung sướng và quyền tự do.',
         'Tuyên ngôn tố cáo toàn diện ách áp bức, bóc lột và phản bội của thực dân Pháp tại Việt Nam, bác bỏ luận điệu “khai hóa” và “bảo hộ”.',
         'Văn kiện khẳng định nhân dân Việt Nam đã đứng về phe Đồng minh chống phát xít, đã nổi dậy giành chính quyền từ tay Nhật chứ không phải nhận lại từ thực dân Pháp.',
         'Phần kết thúc tuyên bố dứt khoát: nước Việt Nam có quyền hưởng tự do và độc lập, và sự thật đã trở thành một nước tự do, độc lập.'
       ],
       result:'Tạo cơ sở pháp lý – chính trị cho Nhà nước dân chủ nhân dân đầu tiên ở Đông Nam Á; mở ra kỷ nguyên độc lập dân tộc gắn với chủ nghĩa xã hội.',
       source:'https://tulieuvankien.dangcongsan.vn/'
     });
   }
 }
 const p54=byId('1954-1975');
 if(p54){
   (p54.movements||[]).forEach(m=>{
     if(m.name.includes('Điện Biên Phủ trên không')){
       m.detailPoints=[
         'Ngày 18/12/1972, Mỹ mở cuộc tập kích chiến lược bằng B-52 quy mô lớn vào Hà Nội, Hải Phòng và một số địa bàn miền Bắc nhằm tạo sức ép trên bàn đàm phán Paris.',
         'Trung ương Đảng, Quân ủy Trung ương và Bộ Tư lệnh Phòng không – Không quân tổ chức thế trận phòng không nhiều tầng, kết hợp tên lửa, pháo phòng không, không quân tiêm kích, radar, dân quân tự vệ và nhân dân.',
         'Trong 12 ngày đêm, quân và dân miền Bắc vừa chiến đấu, vừa cứu hộ, bảo đảm giao thông, giữ vững sinh hoạt và ý chí chiến đấu ở Thủ đô.',
         'Thắng lợi làm phá sản ý đồ dùng B-52 khuất phục Việt Nam, buộc Mỹ trở lại bàn đàm phán và ký Hiệp định Paris ngày 27/01/1973.'
       ];
       m.image='https://special.nhandan.vn/12ngaydemhanoi/assets/yyS9Q9qVLE/3-1-1200x675.jpg';
     }
     if(m.name.includes('Đồng Khởi')){
       m.detailPoints=[
         'Xuất phát từ yêu cầu phá thế kìm kẹp của Mỹ – Diệm và thực hiện Nghị quyết 15, phong trào bùng nổ từ Bến Tre rồi lan rộng khắp Nam Bộ, Tây Nguyên và nhiều địa bàn khác.',
         'Quần chúng nổi dậy bằng nhiều hình thức: đấu tranh chính trị, binh vận, kết hợp lực lượng vũ trang địa phương để phá ấp chiến lược, giành quyền làm chủ ở nông thôn.',
         'Vai trò phụ nữ nổi bật với “Đội quân tóc dài”; phong trào chứng tỏ khả năng kết hợp sức mạnh chính trị của quần chúng với đấu tranh vũ trang.'
       ];
     }
     if(m.name.includes('Mậu Thân')){
       m.detailPoints=[
         'Cuộc tổng tiến công diễn ra đồng loạt vào nhiều đô thị, căn cứ quân sự và cơ quan đầu não của Mỹ – chính quyền Sài Gòn, tạo chấn động mạnh về chiến lược và chính trị.',
         'Dù chưa đạt toàn bộ mục tiêu quân sự – chính trị đề ra và lực lượng ta chịu tổn thất lớn, Mậu Thân 1968 đã làm thay đổi cục diện chiến tranh, tác động sâu sắc đến dư luận Mỹ và thế giới.',
         'Bài học lớn là phải đánh giá đúng tương quan lực lượng, khả năng nổi dậy của quần chúng và yêu cầu phối hợp giữa tiến công quân sự với đấu tranh chính trị, ngoại giao.'
       ];
     }
     if(m.name.includes('Đại thắng mùa Xuân 1975')){
       m.detailPoints=[
         'Thắng lợi Tây Nguyên mở đầu sự sụp đổ dây chuyền của hệ thống phòng thủ địch; tiếp đó là Huế – Đà Nẵng, tạo thời cơ chiến lược chín muồi.',
         'Bộ Chính trị quyết định giải phóng miền Nam trong thời gian sớm nhất, tốt nhất là trước mùa mưa năm 1975; Chiến dịch Hồ Chí Minh là đòn quyết chiến chiến lược cuối cùng.',
         'Ngày 30/4/1975, xe tăng quân giải phóng tiến vào Dinh Độc Lập, kết thúc thắng lợi cuộc kháng chiến chống Mỹ, cứu nước, hoàn thành sự nghiệp giải phóng miền Nam, thống nhất đất nước.'
       ];
     }
   });
 }
}

function lineChart(data,opt={}){
 const W=1000,H=390,p={l:86,r:36,t:38,b:72}; const xs=data.map(x=>Number(x.year)), ys=data.map(x=>Number(x.value)); const minX=Math.min(...xs),maxX=Math.max(...xs); let minY=Math.min(...ys),maxY=Math.max(...ys); if(opt.zero){minY=Math.min(0,minY)}; const pad=(maxY-minY||1)*.12; minY-=pad;maxY+=pad;
 const x=v=>p.l+(v-minX)/(maxX-minX||1)*(W-p.l-p.r); const y=v=>p.t+(maxY-v)/(maxY-minY||1)*(H-p.t-p.b);
 const ticks=5; let grid=''; for(let i=0;i<=ticks;i++){const val=minY+(maxY-minY)*i/ticks;const yy=y(val);grid+=`<line x1="${p.l}" y1="${yy}" x2="${W-p.r}" y2="${yy}" stroke="#e8ecf1"/><text x="${p.l-12}" y="${yy+4}" text-anchor="end" class="v7-chart-small">${opt.yfmt?opt.yfmt(val):val.toFixed(1)}</text>`}
 const pts=data.map(d=>`${x(d.year)},${y(d.value)}`).join(' ');
 const points=data.map(d=>`<circle cx="${x(d.year)}" cy="${y(d.value)}" r="5.5" fill="#9d151c"/><text x="${x(d.year)}" y="${y(d.value)-12}" text-anchor="middle" class="v7-chart-value">${opt.vfmt?opt.vfmt(d.value):d.value}</text><text x="${x(d.year)}" y="${H-p.b+25}" text-anchor="middle" class="v7-chart-small">${d.year}</text>`).join('');
 return `<svg class="v7-chart" viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(opt.title||'Biểu đồ')}">${grid}<line x1="${p.l}" y1="${p.t}" x2="${p.l}" y2="${H-p.b}" stroke="#667085" stroke-width="1.5"/><line x1="${p.l}" y1="${H-p.b}" x2="${W-p.r}" y2="${H-p.b}" stroke="#667085" stroke-width="1.5"/><polyline fill="none" stroke="#9d151c" stroke-width="4" stroke-linejoin="round" stroke-linecap="round" points="${pts}"/>${points}<text x="${(p.l+W-p.r)/2}" y="${H-18}" text-anchor="middle" class="v7-chart-label">TRỤC HOÀNH (X): ${esc(opt.xLabel||'Năm')}</text><text transform="translate(22 ${(p.t+H-p.b)/2}) rotate(-90)" text-anchor="middle" class="v7-chart-label">TRỤC TUNG (Y): ${esc(opt.yLabel||'Giá trị')}</text></svg>`;
}
function economyTimeline(){return `<div class="v7-econ-timeline">${(E().economyPeriods||[]).map(x=>`<article class="v7-econ-row"><div class="v7-econ-period">${esc(x.period)}</div><div class="v7-econ-card"><h4>${esc(x.model)}</h4><div class="v7-econ-columns"><div class="v7-econ-box good"><b>▲ Thành quả / chuyển biến</b>${ul(x.achievements)}</div><div class="v7-econ-box bad"><b>▼ Hạn chế / sức ép</b>${ul(x.limits)}</div></div><div class="v7-turn"><b>Bước ngoặt cần nhớ:</b> ${esc(x.turn)}</div></div></article>`).join('')}</div>`}
function leaderCards(){return `<div class="v7-leader-carousel"><button class="v7-leader-nav prev" type="button" aria-label="Lùi">‹</button><div class="v7-leader-track">${leaders().map(l=>`<article class="v7-leader" data-v7-bio="${esc(l.name)}">${img(l.name)}<div class="v7-leader-copy"><b>${esc(l.name)}</b><span>${esc(l.term)}</span></div></article>`).join('')}</div><button class="v7-leader-nav next" type="button" aria-label="Tiến">›</button></div>`}
function bindLeaderCarousel(root=document){const wrap=root.querySelector('.v7-leader-carousel');if(!wrap)return;const track=wrap.querySelector('.v7-leader-track');const prev=wrap.querySelector('.prev');const next=wrap.querySelector('.next');const step=()=>Math.max(260,Math.round(track.clientWidth*.72));prev.onclick=()=>track.scrollBy({left:-step(),behavior:'smooth'});next.onclick=()=>track.scrollBy({left:step(),behavior:'smooth'})}
function renderOverview(){
 const m=$('#overviewMount'); if(!m)return; const o=window.OVERVIEW_DATA||{};
 const infl=[{year:2000,value:-1.71},{year:2005,value:8.28},{year:2008,value:23.12},{year:2010,value:9.21},{year:2011,value:18.68},{year:2015,value:.63},{year:2020,value:3.23},{year:2025,value:3.31}];
 m.innerHTML=`<section class="v7-section"><div class="v7-section-head"><div><div class="v7-kicker">KINH TẾ THEO ĐÚNG CÁC THỜI KỲ LỊCH SỬ</div><h3>Từ kinh tế thuộc địa đến mô hình tăng trưởng số – xanh – tự chủ</h3><p>Không ghép số liệu thiếu tính so sánh cho giai đoạn trước 1986. Mỗi thời kỳ được trình bày bằng mô hình kinh tế, thành quả, hạn chế và bước ngoặt chính.</p></div></div>${economyTimeline()}</section>
 <section class="v7-section"><div class="v7-section-head"><div><div class="v7-kicker">CHỈ BÁO ĐỊNH LƯỢNG BỔ SUNG</div><h3>GDP bình quân đầu người thực – các mốc 5 năm 1985–2025</h3><p>${esc(o.gdpNote||'')}</p></div></div><div class="v7-chart-shell">${lineChart(o.gdpPerCapita||[],{title:'GDP bình quân đầu người',xLabel:'Năm (mốc 5 năm)',yLabel:'USD/người, giá cố định 2015',yfmt:v=>Math.round(v).toLocaleString('vi-VN'),vfmt:v=>Math.round(v).toLocaleString('vi-VN')})}</div></section>
 <section class="v7-section"><div class="v7-section-head"><div><div class="v7-kicker">LẠM PHÁT – NHÌN THEO CÁC GIAI ĐOẠN</div><h3>Biến động giá tiêu dùng và các mốc cần nhớ</h3><p>Biểu đồ dùng chuỗi có thể so sánh từ thời kỳ hiện đại; năm 1986 được tách riêng như một mốc lịch sử của khủng hoảng cuối cơ chế bao cấp.</p></div></div><div class="v7-chart-shell">${lineChart(infl,{title:'Lạm phát Việt Nam',xLabel:'Năm',yLabel:'Lạm phát giá tiêu dùng (%/năm)',zero:true,yfmt:v=>v.toFixed(1)+'%',vfmt:v=>Number(v).toFixed(2)+'%'})}</div><div class="v7-inflation-phases">${(E().inflationDetail||[]).map(x=>`<article class="v7-phase"><b>${esc(x.period)}</b><h4>${esc(x.headline)}</h4><p>${esc(x.detail)}</p></article>`).join('')}</div><div class="v7-turn"><b>Mốc lịch sử riêng:</b> 1986 – lạm phát 774,7%; 2008 – 23,12%; 2011 – 18,68%; 2020 – 3,23%; 2025 – 3,31%.</div></section>
 <section class="v7-section"><div class="v7-section-head"><div><div class="v7-kicker">LÃNH ĐẠO QUA CÁC THỜI KỲ</div><h3>Các đồng chí Tổng Bí thư</h3><p>Click vào từng đồng chí để mở hồ sơ cá nhân, chức vụ, dòng sự nghiệp, dấu ấn và các sự kiện/văn kiện gắn với nhiệm kỳ.</p></div></div>${leaderCards()}</section>`;
 $$('[data-v7-bio]',m).forEach(x=>x.onclick=()=>openBio(x.dataset.v7Bio));
 bindLeaderCarousel(m);
}

function openModal(title,html){const modal=$('#detailModal'),body=$('#modalBody'),mini=$('#modalTitleMini');if(!modal||!body)return;mini.textContent=title;body.innerHTML=html;modal.classList.add('open');modal.setAttribute('aria-hidden','false');document.body.classList.add('modal-open')}
function closeModal(){const modal=$('#detailModal');if(!modal)return;modal.classList.remove('open');modal.setAttribute('aria-hidden','true');document.body.classList.remove('modal-open')}
function openBio(name){
 const b=L6()[name]||{},x=L7()[name]||{},lr=leaderRec(name)||{}; const facts=[['Nhiệm kỳ Tổng Bí thư',lr.term||''],['Ngày sinh',b.birth||''],['Ngày mất',b.death||'—'],['Quê quán',b.hometown||''],['Học vấn / chuyên môn',b.education||'Xem hồ sơ chính thức']];
 const summary=b.legacy||lr.note||'';
 openModal(`SƠ YẾU LÝ LỊCH · ${honorName(name)}`,`<div class="v7-bio"><div class="v7-bio-top"><div class="v7-bio-photo">${img(name)}</div><div><div class="v7-kicker">SƠ YẾU LÝ LỊCH</div><h2>${esc(honorName(name))}</h2><div class="v7-bio-facts">${facts.map(f=>`<div class="v7-bio-fact"><b>${esc(f[0])}</b><span>${esc(f[1])}</span></div>`).join('')}</div><p class="v7-bio-summary">${esc(summary)}</p>${b.source?`<a class="v7-source" href="${esc(b.source)}" target="_blank" rel="noopener">Hồ sơ chính thức ↗</a>`:''}</div></div><div class="v7-bio-grid"><section class="v7-bio-block"><div class="v7-kicker">CHỨC VỤ NỔI BẬT</div><h3>Các cương vị chính</h3>${ul(x.positions||[])}</section><section class="v7-bio-block"><div class="v7-kicker">GẮN VỚI LỊCH SỬ</div><h3>Sự kiện – văn kiện tiêu biểu</h3>${ul(x.events||[])}</section></div><section class="v7-bio-block"><div class="v7-kicker">CUỘC ĐỜI – SỰ NGHIỆP</div><h3>Dòng sự nghiệp chính</h3>${ul(b.career||[])}</section><section class="v7-bio-block"><div class="v7-kicker">DẤU ẤN</div><h3>Đóng góp cần nhớ</h3>${ul(x.contributions||[b.legacy].filter(Boolean))}</section></div>`)
}

const PKEYS={
 'pre1930':['hoi-viet-nam-cach-mang-thanh-nien','hoi-nghi-thanh-lap-dang','cuong-linh-1930'],
 '1930-1935':['luan-cuong-1930'],'1936-1939':['hoi-nghi-7-1936'],'1939-1945':['tw6-1939','tw7-1940','tw8-1941','chi-thi-nhat-phap'],'1945-1954':['khang-chien-kien-quoc','toan-dan-khang-chien','chinh-cuong-1951'],'1954-1975':['nghi-quyet-15','tw11-12-1965','paris-1973'],'1975-1986':['hoi-nghi-6-1979'],'1986-2001':['doi-moi-1986','cuong-linh-1991'],'2001-2011':['wto-2007'],'2011-2021':['cuong-linh-2011','nq-tu4-xii'],'2021-2026':['nq57','nq59-2025','nq66','nq68']
};
const SPECIAL={
 'hoi-nghi-thanh-lap-dang':[
  ['Những quyết định tổ chức',['Hợp nhất các tổ chức cộng sản thành một Đảng duy nhất, khắc phục tình trạng phân tán và tranh chấp ảnh hưởng.','Thống nhất tên Đảng Cộng sản Việt Nam và thông qua chương trình, điều lệ vắn tắt làm cơ sở tổ chức ban đầu.']],
  ['Giá trị lịch sử',['Tạo ra một trung tâm lãnh đạo thống nhất cho phong trào cách mạng.','Kết hợp phong trào công nhân, phong trào yêu nước với chủ nghĩa Mác – Lênin trong một tổ chức chính trị thống nhất.']]
 ],
 'cuong-linh-1930':[
  ['Phương hướng chiến lược',['“Làm tư sản dân quyền cách mạng và thổ địa cách mạng để đi tới xã hội cộng sản”.','Độc lập dân tộc gắn với phương hướng tiến lên CNXH.']],
  ['Nhiệm vụ chính trị – kinh tế – xã hội',['Đánh đổ đế quốc Pháp và phong kiến; làm cho nước Nam hoàn toàn độc lập.','Giải quyết những yêu cầu ruộng đất cho nông dân, tổ chức đời sống mới và quyền lợi thiết thực cho người lao động.']],
  ['Lực lượng cách mạng',['Công nhân và nông dân là nền tảng.','Đoàn kết, tranh thủ tiểu tư sản, trí thức, trung nông; lợi dụng hoặc trung lập những bộ phận chưa lộ rõ mặt phản cách mạng nhằm cô lập kẻ thù chính.']],
  ['Lãnh đạo – phương pháp – quốc tế',['Đảng Cộng sản giữ vai trò lãnh đạo.','Dựa vào sức mạnh quần chúng, không thỏa hiệp với đế quốc và phong kiến để đổi lấy lợi ích cục bộ.','Cách mạng Việt Nam là bộ phận của phong trào cách mạng thế giới.']]
 ],
 'luan-cuong-1930':[
  ['Tính chất và phương hướng',['Cách mạng Đông Dương trước hết là cách mạng tư sản dân quyền, sau đó phát triển lên con đường XHCN, bỏ qua giai đoạn phát triển tư bản chủ nghĩa.']],
  ['Nhiệm vụ',['Chống phong kiến và chống đế quốc được xem là hai nhiệm vụ có quan hệ mật thiết.','Luận cương nhấn mạnh “thổ địa cách mạng” là vấn đề cốt lõi của cách mạng tư sản dân quyền.']],
  ['Lực lượng và lãnh đạo',['Công nhân và nông dân là hai động lực chính; giai cấp công nhân thông qua Đảng Cộng sản giữ vai trò lãnh đạo.']],
  ['Hạn chế nổi bật',['Chưa đặt đúng mức nhiệm vụ giải phóng dân tộc lên hàng đầu trong xã hội thuộc địa.','Đánh giá chưa đầy đủ khả năng tham gia cách mạng của tiểu tư sản, tư sản dân tộc và một bộ phận địa chủ vừa và nhỏ.']]
 ],
 'chinh-cuong-1951':[
  ['Tính chất cách mạng',['Xác định cách mạng Việt Nam là cách mạng dân tộc dân chủ nhân dân, do giai cấp công nhân lãnh đạo, tiến tới CNXH.']],
  ['Nhiệm vụ cơ bản',['Đánh đuổi đế quốc xâm lược, giành độc lập và thống nhất thật sự.','Xóa bỏ những di tích phong kiến, thực hiện người cày có ruộng từng bước phù hợp điều kiện kháng chiến.','Phát triển chế độ dân chủ nhân dân, xây dựng cơ sở cho CNXH.']],
  ['Lực lượng',['Nhân dân là động lực; công nhân, nông dân và lao động trí thức là nền tảng; mở rộng đoàn kết các lực lượng yêu nước.']]
 ],
 'doi-moi-1986':[
  ['Quan điểm đổi mới',['Đổi mới toàn diện nhưng trọng tâm trước hết là đổi mới kinh tế.','Đổi mới không phải thay đổi mục tiêu XHCN mà làm cho mục tiêu đó được thực hiện bằng quan niệm, bước đi và biện pháp phù hợp hơn.']],
  ['Ba chương trình kinh tế lớn',['Lương thực – thực phẩm.','Hàng tiêu dùng.','Hàng xuất khẩu.']],
  ['Đổi mới cơ chế',['Xóa dần cơ chế tập trung quan liêu bao cấp; tôn trọng quy luật hàng hóa – tiền tệ; mở rộng quyền chủ động sản xuất – kinh doanh.']]
 ],
 'cuong-linh-1991':[
  ['Mục tiêu tổng quát',['Xây dựng xã hội XHCN với những đặc trưng cơ bản; xác lập phương hướng quá độ và các định hướng lớn về kinh tế, chính trị, văn hóa, xã hội, quốc phòng – an ninh, đối ngoại.']],
  ['Nền tảng tư tưởng',['Khẳng định Đảng lấy chủ nghĩa Mác – Lênin và tư tưởng Hồ Chí Minh làm nền tảng tư tưởng, kim chỉ nam cho hành động.']]
 ],
 'cuong-linh-2011':[
  ['Bổ sung và phát triển',['Cập nhật nhận thức về đặc trưng xã hội XHCN, mục tiêu, phương hướng và các mối quan hệ lớn sau 20 năm thực hiện Cương lĩnh 1991 và 25 năm Đổi mới.']],
  ['Điểm nhấn',['Phát triển kinh tế thị trường định hướng XHCN, Nhà nước pháp quyền XHCN, dân chủ XHCN, đại đoàn kết toàn dân tộc và chủ động hội nhập quốc tế.']]
 ]
};
Object.assign(SPECIAL,{
 'hoi-viet-nam-cach-mang-thanh-nien':[
  ['Mục tiêu chuẩn bị',['Truyền bá chủ nghĩa Mác – Lênin và tư tưởng cách mạng vô sản vào Việt Nam.','Đào tạo cán bộ, xây dựng cơ sở tổ chức, tạo tiền đề tư tưởng – chính trị – tổ chức cho việc thành lập Đảng.']],
  ['Hoạt động nổi bật',['Mở các lớp huấn luyện chính trị ở Quảng Châu.','Xuất bản báo Thanh Niên; truyền bá các bài giảng sau được tập hợp trong Đường Kách mệnh.','Phát triển cơ sở trong nước và thúc đẩy phong trào “vô sản hóa” để cán bộ đi vào nhà máy, hầm mỏ, đồn điền.']]
 ],
 'hoi-nghi-7-1936':[
  ['Kẻ thù – nhiệm vụ trước mắt',['Không đặt nhiệm vụ đánh đổ toàn bộ đế quốc và phong kiến thành khẩu hiệu trực tiếp trước mắt; tập trung chống phản động thuộc địa, phát xít và nguy cơ chiến tranh.','Đòi tự do, dân chủ, cơm áo, hòa bình; qua đó tập hợp lực lượng rộng rãi.']],
  ['Phương pháp và mặt trận',['Tận dụng báo chí, mít-tinh, kiến nghị, nghị trường và các hình thức hợp pháp, nửa hợp pháp.','Mở rộng mặt trận dân chủ, thu hút nhiều giai cấp và tầng lớp hơn so với giai đoạn 1930–1931.']]
 ],
 'tw6-1939':[
  ['Bước chuyển về nhiệm vụ',['Từ trọng tâm dân sinh – dân chủ chuyển sang đặt vấn đề dân tộc, độc lập và chống chiến tranh đế quốc ở vị trí cấp bách.','Điều chỉnh khẩu hiệu ruộng đất để mở rộng mặt trận dân tộc thống nhất phản đế.']],
  ['Ý nghĩa trong chuỗi 1939–1941',['Là bước mở đầu; Trung ương 7 tiếp tục và Trung ương 8 hoàn chỉnh sự chuyển hướng chiến lược giải phóng dân tộc.']]
 ],
 'tw7-1940':[
  ['Điểm tiếp tục phát triển',['Khẳng định nhiệm vụ giải phóng dân tộc và yêu cầu chuẩn bị bạo động vũ trang.','Rút kinh nghiệm từ các cuộc khởi nghĩa và tăng cường xây dựng lực lượng, căn cứ, tổ chức bí mật.']]
 ],
 'tw8-1941':[
  ['Ba quyết định cần nhớ',['Đặt giải phóng dân tộc lên hàng đầu.','Thành lập Việt Minh để tập hợp rộng rãi các lực lượng yêu nước.','Chuẩn bị khởi nghĩa vũ trang từ khởi nghĩa từng phần tiến lên tổng khởi nghĩa khi thời cơ chín muồi.']],
  ['Điều chỉnh vấn đề ruộng đất',['Tạm gác khẩu hiệu cách mạng ruộng đất triệt để; trước mắt thực hiện giảm tô, giảm tức, chia lại ruộng công và tịch thu ruộng của đế quốc, Việt gian để phục vụ đoàn kết dân tộc.']]
 ],
 'chi-thi-nhat-phap':[
  ['Nhận định tình thế',['Cuộc đảo chính Nhật – Pháp tạo khủng hoảng chính trị sâu sắc; kẻ thù trực tiếp trước mắt là phát xít Nhật.','Điều kiện tổng khởi nghĩa chưa chín ngay, vì vậy cần phát động cao trào kháng Nhật làm tiền đề.']],
  ['Hình thức hành động',['Đẩy mạnh chiến tranh du kích, khởi nghĩa từng phần, phá kho thóc giải quyết nạn đói, xây dựng chính quyền cách mạng ở nơi có điều kiện.']]
 ],
 'khang-chien-kien-quoc':[
  ['Bốn nhiệm vụ cấp bách',['Củng cố chính quyền cách mạng.','Chống thực dân Pháp xâm lược.','Bài trừ nội phản.','Cải thiện đời sống nhân dân.']],
  ['Biện pháp xây dựng chế độ mới',['Tổ chức Tổng tuyển cử, xây dựng Hiến pháp và chính quyền hợp pháp.','Chống đói bằng tăng gia sản xuất, tiết kiệm; chống nạn mù chữ; xây dựng tài chính – tiền tệ độc lập.','Ngoại giao mềm dẻo để tránh cùng lúc đối đầu với nhiều kẻ thù.']]
 ],
 'toan-dan-khang-chien':[
  ['Đường lối kháng chiến',['Toàn dân: huy động mọi tầng lớp tham gia.','Toàn diện: quân sự, chính trị, kinh tế, văn hóa, ngoại giao.','Trường kỳ: khắc phục tương quan lực lượng ban đầu bất lợi.','Tự lực cánh sinh là chính đồng thời tranh thủ sự đồng tình, ủng hộ quốc tế.']],
  ['Mục tiêu',['Bảo vệ độc lập, chính quyền cách mạng và đánh bại ý chí xâm lược của thực dân Pháp.']]
 ],
 'nghi-quyet-15':[
  ['Đường phát triển của cách mạng miền Nam',['Khởi nghĩa giành chính quyền về tay nhân dân là con đường phát triển cơ bản.','Kết hợp đấu tranh chính trị với lực lượng vũ trang tùy điều kiện; xây dựng căn cứ và lực lượng quần chúng.']],
  ['Tác động trực tiếp',['Tạo cơ sở đường lối cho phong trào Đồng Khởi 1959–1960 và bước chuyển từ thế giữ gìn lực lượng sang thế tiến công.']]
 ],
 'tw11-12-1965':[
  ['Đánh giá chiến lược của Mỹ',['“Chiến tranh cục bộ” là bước leo thang mới nhưng vẫn nằm trong thế bị động về chiến lược; Mỹ có ưu thế quân sự nhưng có nhiều điểm yếu về chính trị và thế trận.']],
  ['Quyết tâm chiến lược',['Kiên quyết đánh bại chiến tranh cục bộ; kết hợp đấu tranh quân sự với chính trị và binh vận.','Miền Bắc vừa sản xuất vừa chiến đấu, bảo vệ hậu phương và tăng cường chi viện cho miền Nam.']]
 ],
 'paris-1973':[
  ['Nội dung cốt lõi của Hiệp định',['Hoa Kỳ và các nước tôn trọng độc lập, chủ quyền, thống nhất, toàn vẹn lãnh thổ Việt Nam.','Hoa Kỳ rút quân và chấm dứt dính líu quân sự trực tiếp; các bên thực hiện ngừng bắn theo thỏa thuận.']],
  ['Sau Hiệp định',['Trung ương xác định tiếp tục cách mạng miền Nam, giữ vững thế tiến công, đấu tranh chống vi phạm Hiệp định và chuẩn bị điều kiện giành thắng lợi hoàn toàn.']]
 ],
 'hoi-nghi-6-1979':[
  ['Bước đột phá ban đầu',['Chủ trương làm cho sản xuất “bung ra”, khắc phục những ràng buộc quá cứng của cơ chế quản lý.','Chú ý lợi ích vật chất, quyền chủ động của cơ sở và khả năng tận dụng các thành phần kinh tế trong những phạm vi nhất định.']],
  ['Giới hạn',['Mới là điều chỉnh cục bộ, chưa hình thành đường lối Đổi mới toàn diện; cơ chế bao cấp vẫn giữ vai trò chi phối.']]
 ],
 'wto-2007':[
  ['Ý nghĩa hội nhập',['Mở rộng tiếp cận thị trường, thu hút đầu tư, thúc đẩy cải cách pháp luật và nâng mức độ gắn kết của kinh tế Việt Nam với kinh tế thế giới.']],
  ['Thách thức',['Sức ép cạnh tranh lớn hơn đối với doanh nghiệp trong nước; yêu cầu nâng năng suất, chất lượng thể chế, nhân lực và năng lực thực thi cam kết quốc tế.']]
 ],
 'nq-tu4-xii':[
  ['Bốn nhóm công việc lớn',['Nhận diện và ngăn chặn suy thoái về tư tưởng chính trị, đạo đức, lối sống.','Đấu tranh với các biểu hiện “tự diễn biến”, “tự chuyển hóa”.','Tăng cường kiểm tra, giám sát, kỷ luật Đảng và trách nhiệm nêu gương.','Hoàn thiện cơ chế kiểm soát quyền lực, phòng chống tham nhũng, tiêu cực.']]
 ],
 'nq57':[
  ['Đột phá trọng tâm',['Phát triển khoa học – công nghệ, đổi mới sáng tạo và chuyển đổi số thành động lực then chốt của phát triển.','Phát triển hạ tầng số, dữ liệu, nhân lực chất lượng cao và thể chế khuyến khích sáng tạo.']]
 ],
 'nq59-2025':[
  ['Hướng hội nhập mới',['Chuyển từ tham gia, mở rộng quan hệ sang nâng cao chất lượng, hiệu quả và tính chủ động của hội nhập.','Gắn hội nhập với tự chủ chiến lược, lợi ích quốc gia – dân tộc và nâng sức chống chịu của nền kinh tế.']]
 ],
 'nq66':[
  ['Trọng tâm pháp luật',['Đổi mới tư duy xây dựng pháp luật theo hướng kiến tạo phát triển.','Nâng chất lượng tổ chức thi hành, giảm chồng chéo, tăng tính ổn định và khả năng dự báo của thể chế.']]
 ],
 'nq68':[
  ['Vị trí kinh tế tư nhân',['Khẳng định khu vực kinh tế tư nhân là một động lực quan trọng nhất của nền kinh tế quốc gia.','Tạo môi trường kinh doanh bình đẳng, bảo vệ quyền tài sản, khuyến khích doanh nghiệp lớn, đổi mới sáng tạo và liên kết chuỗi.']]
 ]
});

function extraSections(key){return (SPECIAL[key]||[]).map(s=>`<div class="v7-extra"><h5>${esc(s[0])}</h5>${ul(s[1])}</div>`).join('')}
function dossier(key,d){if(!d)return'';return `<article class="v7-dossier"><header class="v7-dossier-head"><time>${esc(d.time||'')}</time><h4>${esc(d.title||'')}</h4></header><div class="v7-facts"><div class="v7-fact"><b>Địa điểm</b><span>${esc(d.place||'Xem nguồn')}</span></div><div class="v7-fact"><b>Thành phần / chủ thể</b><span>${esc((d.participants||[]).join(' · '))}</span></div></div><div class="v7-detail-block"><h5>Bối cảnh – vì sao xuất hiện?</h5><p>${esc(d.context||'')}</p></div><div class="v7-detail-block"><h5>Chủ trương / định hướng</h5>${ul(d.policy||[])}</div><div class="v7-detail-block"><h5>Nội dung chính</h5>${ul(d.main||[])}</div>${SPECIAL[key]?`<div class="v7-extra-sections">${extraSections(key)}</div>`:''}<div class="v7-evaluation"><div class="v7-eval good"><b>▲ Tích cực / ý nghĩa</b>${ul(Array.isArray(d.positive)?d.positive:[d.positive].filter(Boolean))}</div><div class="v7-eval bad"><b>▼ Hạn chế / điểm cần lưu ý</b>${ul(Array.isArray(d.limits)?d.limits:[d.limits].filter(Boolean))}</div></div>${d.source?`<a class="v7-source" target="_blank" rel="noopener" href="${esc(d.source)}">Nguồn tư liệu chính thức ↗</a>`:''}</article>`}
function concept(c){const ex=E().conceptDetails?.[c.term]||{};return `<article class="v7-concept"><div class="v7-concept-head"><div class="v7-bulb">💡</div><div><div class="v7-kicker">KHÁI NIỆM CẦN HIỂU</div><h4>${esc(c.term)}</h4></div></div><dl><div><dt>Định nghĩa</dt><dd>${esc(c.definition||'')}</dd></div>${ex.simple?`<div><dt>Hiểu đơn giản</dt><dd>${esc(ex.simple)}</dd></div>`:''}${ex.context?`<div><dt>Đặt vào đúng bối cảnh lịch sử</dt><dd>${esc(ex.context)}</dd></div>`:''}${ex.distinguish?`<div><dt>Dễ nhầm ở đâu?</dt><dd>${esc(ex.distinguish)}</dd></div>`:''}</dl>${ex.source?`<a class="v7-source" href="${esc(ex.source)}" target="_blank" rel="noopener">Nguồn giải thích ↗</a>`:''}</article>`}
function congress(c,p){const d=S().congresses?.[c.no]||{},ctx=E().congressContext?.[c.no]||'';return `<article class="v7-dossier"><header class="v7-dossier-head"><time>${esc(d.time||c.date||'')}</time><h4>Đại hội ${esc(c.no)} · ${esc(c.key||'')}</h4></header><div class="v7-facts"><div class="v7-fact"><b>Địa điểm</b><span>${esc(d.place||'Xem nguồn')}</span></div><div class="v7-fact"><b>Thành phần</b><span>${esc(d.participants||'Xem nguồn')}</span></div><div class="v7-fact"><b>Lãnh đạo được bầu / chủ chốt</b><span>${esc(d.leader||c.leader||'')}</span></div><div class="v7-fact"><b>Bối cảnh thời kỳ</b><span>${esc(p.label)}</span></div></div>${ctx?`<div class="v7-detail-block"><h5>Bối cảnh – vấn đề Đại hội phải giải quyết</h5><p>${esc(ctx)}</p></div>`:''}<div class="v7-detail-block"><h5>Nội dung, chủ trương và quyết sách chính</h5>${ul(d.main?.length?d.main:(c.bullets||[]))}</div><div class="v7-evaluation"><div class="v7-eval good"><b>▲ Ý nghĩa / bước phát triển</b><p>${esc(d.positive||c.remember||'')}</p></div><div class="v7-eval bad"><b>▼ Hạn chế / vấn đề đặt ra</b><p>${esc(d.limits||'Việc thực hiện phụ thuộc điều kiện lịch sử và năng lực tổ chức trong nhiệm kỳ.')}</p></div></div>${d.source?`<a class="v7-source" href="${esc(d.source)}" target="_blank" rel="noopener">Văn kiện Đại hội ↗</a>`:''}</article>`}
function movement(m){const has=!!m.image;const details=(m.detailPoints||[]).length?`<div class="v7-detail-block"><h5>Điểm cần nhớ / diễn biến chi tiết</h5>${ul(m.detailPoints)}</div>`:'';return `<article class="v7-movement ${has?'':'no-media'}">${has?`<div><img src="${esc(m.image)}" alt="Ảnh tư liệu ${esc(m.name)}" loading="lazy" referrerpolicy="no-referrer" onerror="this.parentElement.style.display='none';this.closest('.v7-movement').classList.add('no-media')"></div>`:''}<div><div class="v7-kicker">PHONG TRÀO / CHIẾN DỊCH</div><h4>${esc(m.name)}</h4><div class="v7-movement-meta"><div><b>Thời gian</b>${esc(m.time||'')}</div><div><b>Địa điểm</b>${esc(m.place||'')}</div><div><b>Lãnh đạo</b>${esc(m.leader||'')}</div><div><b>Lực lượng</b>${esc(m.forces||'')}</div></div><div class="v7-detail-block"><h5>Diễn biến / nội dung</h5><p>${esc(m.summary||'')}</p></div>${details}<div class="v7-detail-block"><h5>Kết quả – ý nghĩa</h5><p>${esc(m.result||'')}</p></div>${m.failure?`<div class="v7-detail-block"><h5>Nguyên nhân thất bại / hạn chế</h5><p>${esc(m.failure)}</p></div>`:''}${m.source?`<a class="v7-source" href="${esc(m.source)}" target="_blank" rel="noopener">Nguồn đối chiếu ↗</a>`:''}</div></article>`}
function econAnalysis(e){if(!e)return'';if(typeof e==='string')return `<p>${esc(e)}</p>`;return `<dl class="v12-econ">${e.achievement?`<div><dt>Thành quả</dt><dd>${esc(e.achievement)}</dd></div>`:''}${e.constraint?`<div><dt>Hạn chế</dt><dd>${esc(e.constraint)}</dd></div>`:''}</dl>`}
function historyDetail(p){const events=(PKEYS[p.id]||[]).map(k=>[k,S().events?.[k]]).filter(x=>x[1]);return `<div class="v7-history-main"><article class="v7-history-hero"><span>${esc(p.label)}</span><h2>${esc(p.title)}</h2><p>${esc(p.headline||p.vietnam||'')}</p></article><div class="v7-two"><article class="v7-card"><div class="v7-kicker">BỐI CẢNH QUỐC TẾ</div><h3>Thế giới</h3><p>${esc(p.world||'')}</p></article><article class="v7-card"><div class="v7-kicker">BỐI CẢNH TRONG NƯỚC</div><h3>Việt Nam</h3><p>${esc(p.vietnam||'')}</p></article><article class="v7-card"><div class="v7-kicker">KINH TẾ – XÃ HỘI</div><h3>Tình hình nổi bật</h3><p>${esc(p.economy||'')}</p>${econAnalysis(p.economyAnalysis)}</article><article class="v7-card"><div class="v7-kicker">MÂU THUẪN – NHIỆM VỤ</div><h3>Vấn đề trung tâm</h3>${ul(p.contradictions||[])}</article><article class="v7-card"><div class="v7-kicker">LÃNH ĐẠO</div><h3>Chủ thể lãnh đạo</h3><p>${esc(p.leadership||'')}</p></article><article class="v7-card"><div class="v7-kicker">ĐƯỜNG LỐI</div><h3>Chủ trương – quyết sách</h3>${ul([...(p.policy||[]),...(p.decisions||[])])}</article></div>${events.length?`<section class="v7-section"><div class="v7-section-head"><div><div class="v7-kicker">HỒ SƠ TƯ LIỆU</div><h3>Hội nghị · Cương lĩnh · Luận cương · Nghị quyết · Chỉ thị</h3><p>Mỗi hồ sơ trình bày theo cùng một cấu trúc để học: thời gian, địa điểm, thành phần, bối cảnh, chủ trương, nội dung, ý nghĩa và hạn chế.</p></div></div>${events.map(([k,d])=>dossier(k,d)).join('')}</section>`:''}${(p.congresses||[]).length?`<section class="v7-section"><div class="v7-section-head"><div><div class="v7-kicker">ĐẠI HỘI TRONG THỜI KỲ</div><h3>Nội dung và bước phát triển của đường lối</h3></div></div>${p.congresses.map(c=>congress(c,p)).join('')}</section>`:''}${(p.movements||[]).length?`<section class="v7-section"><div class="v7-section-head"><div><div class="v7-kicker">PHONG TRÀO – KHÁNG CHIẾN</div><h3>Diễn biến, lực lượng, kết quả và nguyên nhân</h3><p>Chỉ hiển thị ảnh tư liệu khi có nguồn ảnh thật; không dùng poster minh họa giả thay cho ảnh lịch sử.</p></div></div><div style="display:grid;gap:16px">${p.movements.map(movement).join('')}</div></section>`:''}${(p.concepts||[]).length?`<section class="v7-section"><div class="v7-section-head"><div><div class="v7-kicker">💡 THUẬT NGỮ TRONG NGỮ CẢNH</div><h3>Hiểu khái niệm ngay tại nơi nó xuất hiện</h3></div></div><div style="display:grid;gap:14px">${p.concepts.map(concept).join('')}</div></section>`:''}<div class="v7-two"><article class="v7-card"><div class="v7-kicker">KẾT QUẢ</div><h3>Thành quả / thắng lợi</h3>${ul(p.victories||[])}</article><article class="v7-card"><div class="v7-kicker">ĐÁNH GIÁ</div><h3>Hạn chế / vấn đề tồn tại</h3>${ul(p.limits||[])}</article></div></div>`}
function renderHistory(){const m=$('#historyMount'),ps=H();if(!m||!ps.length)return;if(!state.period)state.period=ps[0].id;const cur=ps.find(x=>x.id===state.period)||ps[0];m.innerHTML=`<div class="v7-history"><aside class="v7-periods">${ps.map(p=>`<button class="v7-period-btn ${p.id===cur.id?'active':''}" data-v7-period="${esc(p.id)}"><b>${esc(p.label)}</b><span>${esc(p.title)}</span></button>`).join('')}</aside><section>${historyDetail(cur)}</section></div>`;$$('[data-v7-period]',m).forEach(b=>b.onclick=()=>{state.period=b.dataset.v7Period;renderHistory();window.scrollTo({top:$('#page-lich-su .page-head')?.offsetTop||0,behavior:'smooth'})})}

function itemsFor(tab){const d=O()[tab]||{};return d.agencies||d.ministries||[]}
function renderOrg(){const m=$('#organizationMount');if(!m)return;const tabs=O().tabs||[];if(!O()[state.orgTab])state.orgTab=tabs[0]?.id||'party';const d=O()[state.orgTab]||{},items=itemsFor(state.orgTab);if(state.orgIndex>=items.length)state.orgIndex=0;const a=items[state.orgIndex]||null;const groups=`<div class="v7-pane-title">Khối tổ chức</div>`+tabs.map(t=>`<button class="v7-org-group ${state.orgTab===t.id?'active':''}" data-v7-orgtab="${esc(t.id)}">${esc(t.label)}</button>`).join('');const entities=`<div class="v7-pane-title">Cơ quan / đơn vị</div>`+items.map((x,i)=>`<button class="v7-org-entity ${i===state.orgIndex?'active':''}" data-v7-orgidx="${i}"><b>${esc(x.name)}</b><span>${esc(honorName(x.head||''))}</span></button>`).join('');let detail='';if(a){detail=`<div class="v7-org-detail"><section class="v7-org-profile">${img(a.head||'', 'v7-org-photo')}<div><div class="v7-kicker">ĐƯƠNG NHIỆM</div><h2>${esc(honorName(a.head||''))}</h2><p class="v7-org-role">${esc(a.title||'')} ${a.term?'· '+esc(a.term):''}</p><h3>${esc(a.name)}</h3>${a.note?`<p>${esc(a.note)}</p>`:''}${a.previous?`<p><b>Giai đoạn trước:</b> ${esc(a.previous)}</p>`:''}${a.source?`<a class="v7-source" href="${esc(a.source)}" target="_blank" rel="noopener">Nguồn chính thức ↗</a>`:''}</div></section><section class="v7-org-history"><div class="v7-kicker">VAI TRÒ – CƠ CẤU – LÃNH ĐẠO</div><h3>${esc(a.name)}</h3>${a.history?`<p><b>Lãnh đạo qua giai đoạn gần đây:</b> ${esc(a.history)}</p>`:''}${a.members?.length?`<p><b>Thành phần chính:</b></p><div class="v7-org-members">${a.members.map(x=>`<span>${esc(x)}</span>`).join('')}</div>`:''}<p><b>Thuộc khối:</b> ${esc(d.title||'')}</p></section></div>`}else{detail=`<section class="v7-org-profile"><div></div><div><h2>${esc(d.title||'')}</h2><p>${esc(d.subtitle||'')}</p></div></section>`};m.innerHTML=`<div class="v7-org"><aside class="v7-org-groups">${groups}</aside><aside class="v7-org-entities">${entities}</aside><section>${detail}</section></div>`;$$('[data-v7-orgtab]',m).forEach(b=>b.onclick=()=>{state.orgTab=b.dataset.v7Orgtab;state.orgIndex=0;renderOrg()});$$('[data-v7-orgidx]',m).forEach(b=>b.onclick=()=>{state.orgIndex=Number(b.dataset.v7Orgidx);renderOrg()})}

function cleanPageHeads(){const a=$('#page-lich-su .page-head');if(a)a.innerHTML='<div><span class="eyebrow dark">THỜI KỲ LÀ TRỤC LỚN NHẤT</span><h2>Lịch sử theo bối cảnh – đường lối – hành động – kết quả</h2></div>';const b=$('#page-to-chuc .page-head');if(b)b.innerHTML='<div><span class="eyebrow dark">TỔ CHỨC VÀ LÃNH ĐẠO</span><h2>Chọn khối → chọn cơ quan → xem người đứng đầu và nhiệm kỳ</h2></div>'}
function rebindModalClose(){const c=$('#modalClose');if(c)c.onclick=closeModal;const s=$('#scrim');if(s)s.onclick=closeModal}
// Hero và footer nay nằm tĩnh trong index.html (không viết lại bằng JS để tránh nháy giao diện).
function init(){augmentHistory();cleanPageHeads();renderOverview();renderHistory();renderOrg();rebindModalClose()}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
