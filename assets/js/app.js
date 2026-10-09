(() => {
  'use strict';
  const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
  const esc=(v='')=>String(v).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
  const slug=(s='')=>String(s).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/g,'d').replace(/[^a-z0-9]+/g,' ').trim();
  const state={orgTab:'party',period:null,quiz:null,timerId:null};

  const conceptHints={
    'Cách mạng tư sản dân quyền':['Hiểu nhanh: giai đoạn cách mạng dân chủ giải quyết những nhiệm vụ chống đế quốc, chống phong kiến và chuẩn bị điều kiện tiến lên CNXH.','Dễ nhầm: không nên hiểu máy móc là cuộc cách mạng do giai cấp tư sản lãnh đạo.'],
    'Thổ địa cách mạng':['Hiểu nhanh: cách mạng về ruộng đất, nhằm giải quyết quan hệ chiếm hữu ruộng đất phong kiến và quyền lợi của nông dân.','Dễ nhầm: “thổ địa/điền địa” trong văn kiện thời kỳ đầu đều gắn với vấn đề ruộng đất.'],
    'Chuyên chính vô sản':['Hiểu nhanh: khái niệm lịch sử trong lý luận Mác – Lênin về quyền lực chính trị thời kỳ quá độ dưới sự lãnh đạo của giai cấp công nhân.','Dễ nhầm: không đồng nhất nghĩa lịch sử – lý luận này với cách dùng thông thường của từ “độc tài”.'],
    'Kinh tế thị trường định hướng XHCN':['Hiểu nhanh: vận hành theo quy luật thị trường, có quản lý của Nhà nước và hướng tới các mục tiêu xã hội chủ nghĩa.','Dễ nhầm: không phải kinh tế kế hoạch hóa bao cấp, cũng không phải thị trường hoàn toàn tự do.'],
    'Thế trận lòng dân':['Hiểu nhanh: niềm tin, đồng thuận và sự gắn bó của nhân dân là nền tảng của sức mạnh bảo vệ Tổ quốc.','Dễ nhầm: đây không phải một “thế trận” thuần túy quân sự.']
  };

  function toast(msg){const t=$('#toast');if(!t)return;t.textContent=msg;t.classList.add('show');clearTimeout(t._x);t._x=setTimeout(()=>t.classList.remove('show'),1900)}
  function route(){
    const id=(location.hash||'#tong-quan').slice(1), valid=['tong-quan','lich-su','to-chuc','de-cuong','trac-nghiem'];
    const page=valid.includes(id)?id:'tong-quan';
    $$('.page').forEach(x=>x.classList.toggle('active',x.dataset.page===page));
    $$('.main-nav a').forEach(x=>x.classList.toggle('active',x.dataset.route===page));
    $('#mainNav')?.classList.remove('open'); $('#menuBtn')?.setAttribute('aria-expanded','false');
    window.scrollTo({top:0,behavior:'instant'});
  }

  function chartSvg(data,{xLabel='Năm',yLabel='Giá trị',format=v=>v.toFixed(1),accent='#971b23',zero=false}={}){
    if(!data?.length)return '<div class="empty">Chưa có dữ liệu.</div>';
    const W=960,H=360,p={l:92,r:32,t:35,b:74};
    const vals=data.map(d=>Number(d.value)); let min=Math.min(...vals),max=Math.max(...vals);
    if(zero){min=Math.min(0,min);max=Math.max(0,max)}
    const span=Math.max(1,max-min), pad=span*.12; min-=pad; max+=pad;
    const x=i=>p.l+(data.length===1?0:i*(W-p.l-p.r)/(data.length-1));
    const y=v=>p.t+(max-v)*(H-p.t-p.b)/(max-min);
    const ticks=5;
    const grid=[...Array(ticks+1)].map((_,i)=>{const yy=p.t+i*(H-p.t-p.b)/ticks,v=max-i*(max-min)/ticks;return `<line x1="${p.l}" x2="${W-p.r}" y1="${yy}" y2="${yy}" stroke="#e6e8ec" stroke-width="1"/><text x="${p.l-12}" y="${yy+4}" text-anchor="end" font-size="12" fill="#667085">${esc(format(v))}</text>`}).join('');
    const zeroLine=(min<0&&max>0)?`<line x1="${p.l}" x2="${W-p.r}" y1="${y(0)}" y2="${y(0)}" stroke="#98a2b3" stroke-width="1.5"/>`:'';
    const path=data.map((d,i)=>(i?'L':'M')+x(i).toFixed(1)+' '+y(d.value).toFixed(1)).join(' ');
    const points=data.map((d,i)=>`<g><circle cx="${x(i)}" cy="${y(d.value)}" r="5" fill="${accent}"/><text x="${x(i)}" y="${y(d.value)-12}" text-anchor="middle" font-size="12" font-weight="800" fill="${accent}">${esc(format(d.value))}</text><text x="${x(i)}" y="${H-p.b+27}" text-anchor="middle" font-size="12" fill="#475467">${esc(d.year)}</text></g>`).join('');
    return `<svg class="axis-chart" viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(yLabel)} theo ${esc(xLabel)}"><g>${grid}${zeroLine}</g><line x1="${p.l}" y1="${p.t}" x2="${p.l}" y2="${H-p.b}" stroke="#344054" stroke-width="1.5"/><line x1="${p.l}" y1="${H-p.b}" x2="${W-p.r}" y2="${H-p.b}" stroke="#344054" stroke-width="1.5"/><path d="${path}" fill="none" stroke="${accent}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>${points}<text x="${(p.l+W-p.r)/2}" y="${H-14}" text-anchor="middle" font-size="13" font-weight="700" fill="#344054">TRỤC HOÀNH (X): ${esc(xLabel)}</text><text transform="translate(22 ${(p.t+H-p.b)/2}) rotate(-90)" text-anchor="middle" font-size="13" font-weight="700" fill="#344054">TRỤC TUNG (Y): ${esc(yLabel)}</text></svg>`;
  }

  function leaderCard(l){
    const initials=l.name.split(' ').slice(-2).map(x=>x[0]).join('');
    return `<article class="leader-card"><div class="leader-photo"><img src="${esc(l.img)}" alt="Ảnh tư liệu ${esc(l.name)}" loading="lazy" referrerpolicy="no-referrer" onerror="this.style.display='none';this.nextElementSibling.style.display='grid'"><div class="leader-fallback" style="display:none">${esc(initials)}</div></div><div class="leader-copy"><b>${esc(l.name)}</b><small>${esc(l.term)}</small><p>${esc(l.note)}</p></div></article>`;
  }

  function economyCheckpoint(c){return `<article class="checkpoint-card"><div class="checkpoint-year">${esc(c.year)}</div><h4>${esc(c.title)}</h4><div class="checkpoint-good"><b>▲ Thành quả / chuyển biến</b><p>${esc(c.achievements)}</p></div><div class="checkpoint-bad"><b>▼ Hạn chế / sức ép</b><p>${esc(c.constraints)}</p></div></article>`}

  function renderOverview(){
    const m=$('#overviewMount');if(!m)return;const o=window.OVERVIEW_DATA||{},periods=window.HISTORY_INTEGRATED?.periods||[],leaders=window.LEADERS_DATA||[];
    const movements=periods.reduce((n,p)=>n+(p.movements?.length||0),0),questions=window.QUIZ_DATA?.sets?.reduce((n,s)=>n+s.questions.length,0)||0;
    m.innerHTML=`
      <div class="stats-grid">
        <article class="stat-card"><small>Thời kỳ lịch sử</small><strong>${periods.length}</strong><span>mỗi thời kỳ là một dashboard đầy đủ</span></article>
        <article class="stat-card"><small>Phong trào / sự kiện</small><strong>${movements}</strong><span>thời gian · lực lượng · kết quả</span></article>
        <article class="stat-card"><small>Đề cương gốc</small><strong>${window.SYLLABUS_DATA?.count||0}</strong><span>vấn đề tự luận nguyên văn Word</span></article>
        <article class="stat-card"><small>Ngân hàng trắc nghiệm</small><strong>${questions}</strong><span>5 bộ × 50 câu</span></article>
      </div>

      <section class="section-block">
        <div class="section-heading"><div><span class="section-kicker">1930 → 2025 · MỖI 5 NĂM</span><h3>Kinh tế Việt Nam nhìn theo dòng lịch sử</h3><p>Phần trước giữa thập niên 1980 trình bày theo bối cảnh và trạng thái kinh tế, không gán một chuỗi GDP/CPI hiện đại vào dữ liệu lịch sử không đồng nhất. Mỗi mốc chỉ ra rõ điều đã đạt được và yếu tố kéo giảm kết quả.</p></div></div>
        <div class="checkpoint-grid">${(o.economyCheckpoints||[]).map(economyCheckpoint).join('')}</div>
      </section>

      <section class="section-block chart-card">
        <div class="chart-head"><div><span class="section-kicker">BIỂU ĐỒ ĐỊNH LƯỢNG · MỐC 5 NĂM</span><h3>GDP bình quân đầu người</h3><p>${esc(o.gdpNote||'')}</p></div><span class="chart-unit">USD/người · giá cố định</span></div>
        <div class="chart-wrap">${chartSvg(o.gdpPerCapita||[],{xLabel:'Năm (mốc 5 năm)',yLabel:'GDP bình quân đầu người – USD, giá cố định',format:v=>Math.round(v).toLocaleString('vi-VN')})}</div>
      </section>

      <section class="section-block chart-card">
        <div class="chart-head"><div><span class="section-kicker">BIỂU ĐỒ LẠM PHÁT · MỐC 5 NĂM</span><h3>Lạm phát giá tiêu dùng</h3><p>${esc(o.inflationNote||'Chuỗi CPI hiện đại dùng cho giai đoạn có dữ liệu so sánh phù hợp.')}</p></div><span class="chart-unit">% / năm</span></div>
        <div class="chart-wrap">${chartSvg(o.inflationFiveYear||[],{xLabel:'Năm (mốc 5 năm)',yLabel:'Lạm phát giá tiêu dùng (%/năm)',format:v=>Number(v).toFixed(2)+'%',zero:true})}</div>
        <div class="peak-row">${(o.inflationPeaks||[]).map(x=>`<article class="peak-card"><b>${esc(x.year)}</b><strong>${esc(x.value)}%</strong><span>${esc(x.note||'Mốc lạm phát đáng chú ý')}</span></article>`).join('')}</div>
      </section>

      <section class="section-block"><div class="section-heading"><div><span class="section-kicker">NEO SỰ KIỆN</span><h3>Vấn đề nổi bật theo thời kỳ</h3><p>Những “điểm đau” xã hội – kinh tế giúp nhớ vì sao Đảng phải đưa ra chủ trương hoặc quyết sách tương ứng.</p></div></div><div class="issue-timeline">${(o.issueTimeline||[]).map(x=>`<article class="issue-card"><time>${esc(x.year)}</time><h4>${esc(x.title)}</h4><p>${esc(x.desc)}</p></article>`).join('')}</div></section>

      <section class="section-block"><div class="section-heading"><div><span class="section-kicker">LÃNH ĐẠO QUA CÁC THỜI KỲ</span><h3>Các đồng chí Tổng Bí thư</h3><p>Ảnh Hồ Chí Minh và Nguyễn Phú Trọng đã chuyển sang nguồn Wikimedia ổn định hơn; khi mạng chặn ảnh ngoài, web hiển thị chữ viết tắt thay thế chứ không để khung lỗi.</p></div></div><div class="leader-row">${leaders.map(leaderCard).join('')}</div></section>

      <section class="source-panel"><b>Nguồn dữ liệu kinh tế:</b> ${(o.sources||[]).map(s=>`<a href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.label)}</a>`).join(' · ')}</section>`;
  }

  function periodCard(p){return `<article class="period-card" data-period="${esc(p.id)}"><div class="period-top"><span class="period-range">${esc(p.label)}</span><span class="period-open">Mở đầy đủ ↗</span></div><h3>${esc(p.title)}</h3><p class="period-headline">${esc(p.headline||p.vietnam)}</p><div class="period-metrics"><span>🏛 ${p.congresses?.length||0} Đại hội</span><span>📜 ${p.documents?.length||0} văn kiện</span><span>✊ ${p.movements?.length||0} phong trào</span><span>💡 ${p.concepts?.length||0} khái niệm</span></div><div class="period-keywords">${(p.mustRemember||p.issues||[]).slice(0,4).map(x=>`<span>${esc(x)}</span>`).join('')}</div></article>`}

  function renderHistory(){
    const m=$('#historyMount');if(!m)return;const periods=window.HISTORY_INTEGRATED?.periods||[];
    m.innerHTML=`<div class="period-timeline">${periods.map(periodCard).join('')}</div>`;
    $$('[data-period]',m).forEach(el=>el.addEventListener('click',()=>openPeriod(el.dataset.period)));
  }

  function bullets(arr){return `<ul>${(arr||[]).map(x=>`<li>${esc(x)}</li>`).join('')}</ul>`}
  function detailCard(title,body,cls=''){return `<article class="detail-card ${cls}"><b>${esc(title)}</b>${body}</article>`}
  function conceptCallout(c){const hints=conceptHints[c.term]||['Hiểu nhanh: đặt thuật ngữ này vào đúng văn kiện, nhiệm vụ và bối cảnh của thời kỳ đang học.','Dễ nhầm: không tách thuật ngữ khỏi hoàn cảnh lịch sử rồi suy diễn theo nghĩa hiện nay.'];return `<aside class="concept-callout"><div class="bulb">💡</div><div><span>KHÁI NIỆM CẦN NHỚ</span><h4>${esc(c.term)}</h4><p>${esc(c.definition)}</p><div class="concept-hints"><b>${esc(hints[0])}</b><small>${esc(hints[1])}</small></div></div></aside>`}

  function congressRich(c){return `<article class="congress-rich"><div class="congress-tag">ĐẠI HỘI ${esc(c.no)} · ${esc(c.date)}</div><h4>${esc(c.key)}</h4><p class="leader-line"><b>Lãnh đạo:</b> ${esc(c.leader)}</p>${bullets(c.bullets)}<div class="remember"><b>Mẹo nhớ:</b> ${esc(c.remember)}</div></article>`}
  function documentCard(d){return `<article class="document-card"><time>${esc(d.date)}</time><div><span>${esc(d.type)}</span><h4>${esc(d.name)}</h4><p>${esc(d.note)}</p></div></article>`}
  function movementRich(m,i){
    const photo=m.image?`<img src="${esc(m.image)}" alt="Ảnh tư liệu ${esc(m.name)}" loading="lazy" referrerpolicy="no-referrer" onerror="this.style.display='none';this.nextElementSibling.style.display='grid'"><div class="movement-placeholder" style="display:none">✊</div>`:`<div class="movement-placeholder">✊</div>`;
    return `<article class="movement-rich"><div class="movement-photo">${photo}<span>Ảnh tư liệu / minh họa</span></div><div class="movement-content"><div class="movement-title-row"><h4>${esc(m.name)}</h4><button class="listen-btn" data-narration="${i}">🎧 Thuyết minh</button></div><div class="movement-meta"><div><b>Thời gian</b><span>${esc(m.time)}</span></div><div><b>Địa điểm</b><span>${esc(m.place)}</span></div><div><b>Lãnh đạo</b><span>${esc(m.leader)}</span></div><div><b>Lực lượng</b><span>${esc(m.forces)}</span></div></div><div class="movement-text"><b>Sơ lược phong trào</b><p>${esc(m.summary)}</p></div><div class="movement-result"><b>Kết quả / ý nghĩa</b><p>${esc(m.result)}</p></div>${m.failure?`<div class="movement-failure"><b>Nguyên nhân thất bại / hạn chế</b><p>${esc(m.failure)}</p></div>`:''}${m.source?`<a class="source-link" href="${esc(m.source)}" target="_blank" rel="noopener">Đối chiếu nguồn ↗</a>`:''}</div></article>`;
  }

  function linkedSyllabus(ids=[]){
    const all=window.SYLLABUS_DATA?.issues||[],items=all.filter(x=>ids.includes(x.id));
    if(!items.length)return '';
    return `<section class="period-section"><div class="section-title-row"><div><span class="section-kicker">HỌC XONG THỜI KỲ → LÀM TỰ LUẬN</span><h3>Liên hệ đề cương nguyên văn</h3><p>Các câu dưới đây được đưa nguyên nội dung từ Word để bạn học ngay sau phần lịch sử liên quan.</p></div><span class="count-badge">${items.length} câu</span></div><div class="linked-syllabus">${items.map(x=>`<details><summary><span>${String(x.id).padStart(2,'0')}</span><b>${esc(x.question)}</b></summary><div class="linked-answer"><div class="verbatim-title">ĐÁP ÁN GỐC – NGUYÊN VĂN WORD</div>${x.answerParagraphs.map(p=>`<p>${esc(p)}</p>`).join('')}<div class="bone-title">XƯƠNG Ý CHÍNH CẦN NHỚ</div><div class="bone-list">${(x.bones||[]).map(b=>`<div class="bone-item">${esc(b)}</div>`).join('')}</div></div></details>`).join('')}</div></section>`;
  }

  function openPeriod(id){
    const p=(window.HISTORY_INTEGRATED?.periods||[]).find(x=>x.id===id);if(!p)return;state.period=p;
    const intro=(p.deepIntro||[]).map(x=>`<p>${esc(x)}</p>`).join('');
    const congress=(p.congresses||[]).length?`<section class="period-section"><div class="section-title-row"><div><span class="section-kicker">ĐẶT ĐÚNG VÀO THỜI KỲ</span><h3>Đại hội của Đảng</h3></div><span class="count-badge">${p.congresses.length}</span></div><div class="congress-rich-grid">${p.congresses.map(congressRich).join('')}</div></section>`:'';
    const docs=(p.documents||[]).length?`<section class="period-section"><div class="section-title-row"><div><span class="section-kicker">HỘI NGHỊ · CƯƠNG LĨNH · NGHỊ QUYẾT · CHỈ THỊ</span><h3>Văn kiện và quyết sách theo trình tự</h3></div><span class="count-badge">${p.documents.length}</span></div><div class="document-timeline">${p.documents.map(documentCard).join('')}</div></section>`:'';
    const movements=(p.movements||[]).length?`<section class="period-section"><div class="section-title-row"><div><span class="section-kicker">PHONG TRÀO CÁCH MẠNG</span><h3>Diễn biến – lực lượng – kết quả</h3><p>Mỗi phong trào có phần thuyết minh ngắn bằng giọng đọc của thiết bị.</p></div><span class="count-badge">${p.movements.length}</span></div><div class="movement-stack">${p.movements.map(movementRich).join('')}</div></section>`:'';
    const concepts=(p.concepts||[]).length?`<section class="period-section"><div class="section-title-row"><div><span class="section-kicker">ĐIỂM SÁNG KIẾN THỨC</span><h3>Thuật ngữ xuất hiện trong chính bối cảnh này</h3></div></div><div class="concept-stack">${p.concepts.map(conceptCallout).join('')}</div></section>`:'';
    const html=`<article class="period-detail">
      <header class="period-detail-hero"><span>${esc(p.label)} · THỜI KỲ</span><h1>${esc(p.title)}</h1><p>${esc(p.headline||'')}</p><div class="hero-tags">${(p.mustRemember||[]).slice(0,5).map(x=>`<b>${esc(x)}</b>`).join('')}</div></header>
      <section class="period-section intro-section"><div class="section-title-row"><div><span class="section-kicker">HIỂU TRONG 60 GIÂY</span><h3>Bức tranh tổng thể</h3></div></div><div class="prose-large">${intro}</div></section>
      <section class="period-section"><div class="section-title-row"><div><span class="section-kicker">BỐI CẢNH → VẤN ĐỀ</span><h3>Vì sao đường lối phải thay đổi?</h3></div></div><div class="context-grid-rich">${detailCard('🌍 Tình hình thế giới',`<p>${esc(p.world)}</p>`)}${detailCard('🇻🇳 Tình hình Việt Nam',`<p>${esc(p.vietnam)}</p>`)}${detailCard('📈 Kinh tế – xã hội',`<p>${esc(p.economy)}</p><div class="economy-analysis">${esc(p.economyAnalysis||'')}</div>`)}${detailCard('⚖️ Mâu thuẫn / vấn đề trung tâm',bullets(p.contradictions))}${detailCard('👤 Lãnh đạo thời kỳ',`<p>${esc(p.leadership)}</p>`,'leader-detail')}</div></section>
      <section class="period-section"><div class="section-title-row"><div><span class="section-kicker">TỪ NHẬN THỨC ĐẾN HÀNH ĐỘNG</span><h3>Chủ trương – đường lối – quyết sách</h3></div></div><div class="policy-rich-grid">${detailCard('Chủ trương – đường lối',bullets(p.policy),'policy-card')}${detailCard('Quyết sách / mốc chính',bullets(p.decisions),'decision-card')}</div></section>
      ${congress}${docs}${movements}${concepts}
      <section class="period-section"><div class="section-title-row"><div><span class="section-kicker">ĐÁNH GIÁ THỜI KỲ</span><h3>Thành quả, hạn chế và điều phải nhớ</h3></div></div><div class="outcome-rich-grid">${detailCard('✅ Thành quả / thắng lợi',bullets(p.victories),'success-card')}${detailCard('⚠️ Hạn chế / điểm nghẽn',bullets(p.limits),'limit-card')}${detailCard('🧠 Xương cần nhớ',bullets(p.mustRemember||p.issues),'memory-card')}</div></section>
      ${linkedSyllabus(p.syllabusIds||[])}
    </article>`;
    showModal(html,`${p.label} · ${p.title}`);
  }

  function renderOrgTabs(){const wrap=$('#orgTabs'),d=window.ORGANIZATION_DATA;if(!wrap||!d)return;wrap.innerHTML=d.tabs.map(t=>`<button data-org-tab="${esc(t.id)}" class="${state.orgTab===t.id?'active':''}">${esc(t.label)}</button>`).join('');$$('[data-org-tab]',wrap).forEach(b=>b.onclick=()=>{state.orgTab=b.dataset.orgTab;renderOrganization()})}
  function orgHero(hero){if(!hero)return'';return `<section class="org-hero"><div><span>NGƯỜI ĐỨNG ĐẦU HIỆN NAY</span><h3>${esc(hero.name)}</h3><b>${esc(hero.role)}</b><p>${esc(hero.term||'')}</p><small>${esc(hero.note||'')}</small></div><div class="org-avatar">${esc(hero.name.split(' ').slice(-2).map(x=>x[0]).join(''))}</div></section>`}
  function agencyCard(a){return `<article class="agency-card"><div class="agency-head"><span>${esc(a.name)}</span>${a.term?`<small>${esc(a.term)}</small>`:''}</div><h4>${esc(a.head||'')}</h4><b>${esc(a.title||'')}</b>${a.note?`<p>${esc(a.note)}</p>`:''}${a.previous?`<div class="previous"><span>Nhiệm kỳ / giai đoạn trước</span>${esc(a.previous)}</div>`:''}${a.history?`<div class="previous"><span>Qua nhiệm kỳ</span>${esc(a.history)}</div>`:''}${a.members?`<details class="member-list"><summary>${a.members.length} Ủy viên · xem danh sách</summary><div>${a.members.map((x,i)=>`<span><i>${i+1}</i>${esc(x)}</span>`).join('')}</div></details>`:''}${a.source?`<a class="agency-source" href="${esc(a.source)}" target="_blank" rel="noopener">Nguồn chính thức ↗</a>`:''}</article>`}
  function leadershipTimeline(rows=[]){if(!rows.length)return'';return `<section class="org-section"><div class="section-title-row"><div><span class="section-kicker">QUA CÁC THỜI KỲ</span><h3>Tổng Bí thư / người đứng đầu</h3></div></div><div class="leadership-table">${rows.map(r=>`<div><time>${esc(r[0])}</time><b>${esc(r[1])}</b></div>`).join('')}</div></section>`}

  function renderOrganization(){
    renderOrgTabs();const m=$('#organizationMount'),all=window.ORGANIZATION_DATA;if(!m||!all)return;const d=all[state.orgTab];if(!d)return;
    let body=`<div class="org-title"><span>CẬP NHẬT ${esc(all.updated||'')}</span><h3>${esc(d.title)}</h3><p>${esc(d.subtitle||'')}</p></div>${orgHero(d.hero)}`;
    if(d.stats?.length)body+=`<div class="org-stat-grid">${d.stats.map(s=>`<article><strong>${esc(s.value)}</strong><span>${esc(s.label)}</span></article>`).join('')}</div>`;
    const agencies=d.agencies||[]; if(agencies.length)body+=`<section class="org-section"><div class="section-title-row"><div><span class="section-kicker">DASHBOARD CƠ QUAN</span><h3>Các cơ quan lớn và người đứng đầu</h3><p>Thông tin lãnh đạo hiện tại đặt ngay trên thẻ; nhiệm kỳ/giai đoạn trước nằm phía dưới.</p></div><span class="count-badge">${agencies.length}</span></div><div class="agency-grid">${agencies.map(agencyCard).join('')}</div></section>`;
    if(d.ministries?.length){body+=`<section class="org-section"><div class="section-title-row"><div><span class="section-kicker">14 BỘ + 3 CƠ QUAN NGANG BỘ</span><h3>Thành viên Chính phủ khóa XVI</h3><p>Hiển thị trực tiếp Bộ trưởng/người đứng đầu nhiệm kỳ 2026–2031 và người tiền nhiệm/giai đoạn trước.</p></div><span class="count-badge">${d.ministries.length}</span></div><label class="search-box org-search"><span>⌕</span><input id="ministrySearch" placeholder="Tìm Bộ, Bộ trưởng..." autocomplete="off"></label><div class="ministry-grid" id="ministryGrid">${d.ministries.map(agencyCard).join('')}</div></section>`}
    if(d.leadershipTimeline)body+=leadershipTimeline(d.leadershipTimeline);
    if(d.source)body+=`<section class="source-panel"><b>Nguồn đối chiếu nhóm:</b> <a href="${esc(d.source)}" target="_blank" rel="noopener">Mở nguồn chính thức ↗</a></section>`;
    if(d.sources?.length)body+=`<section class="source-panel"><b>Nguồn đối chiếu:</b> ${d.sources.map(s=>typeof s==='string'?`<a href="${esc(s)}" target="_blank" rel="noopener">Nguồn ↗</a>`:`<a href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.label||'Nguồn')}</a>`).join(' · ')}</section>`;
    m.innerHTML=body;
    const inp=$('#ministrySearch');if(inp)inp.oninput=()=>{const q=slug(inp.value);$$('.agency-card',$('#ministryGrid')).forEach(card=>card.style.display=!q||slug(card.textContent).includes(q)?'':'none')};
  }

  // SYLLABUS — exact Word content
  function loadLearned(){try{return new Set(JSON.parse(localStorage.getItem('dcsvnstudy_learned')||'[]').map(Number))}catch{return new Set()}}
  function saveLearned(s){localStorage.setItem('dcsvnstudy_learned',JSON.stringify([...s]));updateLearnedCount()}
  function updateLearnedCount(){const e=$('#learnedCount');if(e)e.textContent=loadLearned().size}
  function setupSyllabusGroup(){const s=$('#syllabusGroup');if(!s)return;s.innerHTML='<option value="all">Tất cả nhóm</option>'+((window.SYLLABUS_DATA?.groups)||[]).map(g=>`<option value="${esc(g)}">${esc(g)}</option>`).join('')}
  function questionCard(x,done){return `<details class="question-card"><summary><span class="qno">${String(x.id).padStart(2,'0')}</span><span class="qtext">${esc(x.question)}</span><span class="q-status">${done?'✓ đã học':'mở ▼'}</span></summary><div class="question-body"><div class="answer-label"><b>ĐÁP ÁN GỐC · NGUYÊN VĂN WORD</b><div class="answer-actions"><button class="mini-btn ${done?'learned':''}" data-learn="${x.id}">${done?'✓ Đã học':'Đánh dấu đã học'}</button><button class="mini-btn" data-copy="${x.id}">Sao chép</button></div></div><div class="raw-answer">${x.answerParagraphs.map(p=>`<p>${esc(p)}</p>`).join('')}</div><div class="verbatim-note">Phần trên xuất trực tiếp từ <b>${esc(window.SYLLABUS_DATA.source)}</b>; không tự sửa chính tả, viết tắt hay cách diễn đạt.</div>${notesBlock(x)}${followupBlock(x.id)}</div></details>`}
  const BULB='<svg class="v12-bulb" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M9 21h6v-1.5H9V21zm3-19a7 7 0 0 0-4 12.74V17a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-2.26A7 7 0 0 0 12 2zm2.3 11.4-.3.2V16h-4v-2.4l-.3-.2A5 5 0 1 1 14.3 13.4z"/></svg>';
  function notesBlock(x){if(!(x.bones||[]).length)return '';return `<section class="v12-notes"><div class="v12-notes-title">${BULB}<span>Điểm chú ý</span></div><ul class="v12-notes-list">${x.bones.map(b=>`<li>${esc(b)}</li>`).join('')}</ul></section>`}
  function followupBlock(id){const qs=(window.SYLLABUS_FOLLOWUP||{})[id]||[];if(!qs.length)return '';return `<section class="v12-followup"><div class="v12-followup-title"><span>?</span>Câu hỏi phụ có thể được hỏi</div>${qs.map((q,i)=>`<details class="v12-fq"><summary><b>Câu ${i+1}.</b> ${esc(q[0])}</summary><div class="v12-fa"><b>Trả lời:</b> ${esc(q[1])}</div></details>`).join('')}</section>`}
  function renderSyllabus(){const m=$('#syllabusMount');if(!m)return;const d=window.SYLLABUS_DATA||{issues:[]},q=slug($('#syllabusSearch')?.value||''),g=$('#syllabusGroup')?.value||'all',learned=loadLearned();const list=d.issues.filter(x=>(g==='all'||x.group===g)&&(!q||slug(x.question+' '+x.answerParagraphs.join(' ')).includes(q))),groups=new Map();list.forEach(x=>{if(!groups.has(x.group))groups.set(x.group,[]);groups.get(x.group).push(x)});m.innerHTML=list.length?[...groups.entries()].map(([name,items])=>`<section class="syllabus-group"><div class="syllabus-group-title"><h3>${esc(name)}</h3><span>${items.length} câu</span></div>${items.map(x=>questionCard(x,learned.has(x.id))).join('')}</section>`).join(''):'<div class="empty">Không tìm thấy nội dung.</div>';$$('[data-learn]',m).forEach(b=>b.onclick=e=>{e.preventDefault();e.stopPropagation();const id=Number(b.dataset.learn),s=loadLearned();s.has(id)?s.delete(id):s.add(id);saveLearned(s);renderSyllabus()});$$('[data-copy]',m).forEach(b=>b.onclick=async e=>{e.preventDefault();e.stopPropagation();const x=d.issues.find(i=>i.id===Number(b.dataset.copy));try{await navigator.clipboard.writeText([x.question,'',...x.answerParagraphs].join('\n'));toast('Đã sao chép đáp án.')}catch{toast('Không thể sao chép tự động.')}});updateLearnedCount()}

  // QUIZ — intentionally no localStorage
  function renderQuizLanding(){const m=$('#quizMount');if(!m)return;const qd=window.QUIZ_DATA||{sets:[]};m.innerHTML=`<div class="quiz-intro"><div class="quiz-rule"><h3>Quy chế luyện tập</h3><ul><li>5 bộ đề, mỗi bộ <b>50 câu</b>.</li><li>Thời gian: <b>60 phút</b>.</li><li>Câu đã làm được đánh dấu trên bảng số câu.</li><li>Chỉ được nộp thủ công khi đã trả lời đủ 50 câu.</li><li>Hết giờ hệ thống tự chấm; câu bỏ trống tính sai.</li><li>Không lưu lịch sử bài thi.</li></ul></div><div class="quiz-research"><b>Phạm vi</b><p>${esc(qd.researchNote||'Phủ rộng toàn bộ học phần Lịch sử Đảng.')}</p><p>Từ bối cảnh trước 1930, thành lập Đảng, Cương lĩnh – Luận cương, các phong trào cách mạng, kháng chiến, Đổi mới đến các kỳ Đại hội.</p></div></div><div class="exam-set-grid">${qd.sets.map((s,i)=>`<button class="exam-set" data-set="${i}"><b>${esc(s.title)}</b><span>50 câu · 60 phút · 10 điểm</span></button>`).join('')}</div>`;$$('[data-set]',m).forEach(b=>b.onclick=()=>startQuiz(Number(b.dataset.set)))}
  function startQuiz(i){clearInterval(state.timerId);const set=window.QUIZ_DATA.sets[i];state.quiz={setIndex:i,set,current:0,answers:Array(set.questions.length).fill(null),remaining:set.duration,finished:false};state.timerId=setInterval(()=>{if(!state.quiz||state.quiz.finished)return;state.quiz.remaining--;updateTimer();if(state.quiz.remaining<=0)gradeQuiz(true)},1000);renderQuizExam()}
  function formatTime(s){s=Math.max(0,s);return `${String(Math.floor(s/60)).padStart(2,'0')}:${String(s%60).padStart(2,'0')}`}
  function updateTimer(){const t=$('#quizTimer');if(t&&state.quiz)t.textContent=formatTime(state.quiz.remaining)}
  function renderQuizExam(){const m=$('#quizMount');if(!m||!state.quiz)return;const qz=state.quiz,q=qz.set.questions[qz.current],answered=qz.answers.filter(x=>x!==null).length;m.innerHTML=`<div class="quiz-shell"><aside class="exam-sidebar"><h4>${esc(qz.set.title)}</h4><div class="palette">${qz.set.questions.map((_,i)=>`<button data-jump="${i}" class="${qz.answers[i]!==null?'answered':''} ${i===qz.current?'current':''}">${i+1}</button>`).join('')}</div><div class="legend"><span><i class="done"></i>Đã làm</span><span><i class="todo"></i>Chưa làm</span></div></aside><div class="exam-main"><div class="exam-topbar"><strong>${esc(qz.set.title)}</strong><span class="progress-text">Đã làm ${answered}/50 · còn ${50-answered} câu</span><span class="timer" id="quizTimer">${formatTime(qz.remaining)}</span></div><article class="exam-question"><span class="q-index">CÂU ${qz.current+1}/50 · ${esc(q.topic)}</span><h3>${esc(q.q)}</h3><div class="option-list">${q.options.map((o,i)=>`<label class="option ${qz.answers[qz.current]===i?'selected':''}"><input type="radio" name="ans" value="${i}" ${qz.answers[qz.current]===i?'checked':''}><span class="opt-letter">${'ABCD'[i]}</span><span>${esc(o)}</span></label>`).join('')}</div></article><div class="exam-nav"><button class="button ghost-dark" id="prevQ" ${qz.current===0?'disabled':''}>← Câu trước</button><div class="submit-wrap"><span class="submit-hint">${answered<50?`Còn ${50-answered} câu chưa làm`:'Đã đủ 50 câu'}</span><button class="button small" id="submitQuiz" ${answered<50?'disabled':''}>Nộp bài</button></div><button class="button ghost-dark" id="nextQ" ${qz.current===49?'disabled':''}>Câu sau →</button></div></div></div>`;$$('input[name="ans"]',m).forEach(r=>r.onchange=()=>{qz.answers[qz.current]=Number(r.value);renderQuizExam()});$$('[data-jump]',m).forEach(b=>b.onclick=()=>{qz.current=Number(b.dataset.jump);renderQuizExam()});$('#prevQ')?.addEventListener('click',()=>{qz.current--;renderQuizExam()});$('#nextQ')?.addEventListener('click',()=>{qz.current++;renderQuizExam()});$('#submitQuiz')?.addEventListener('click',()=>gradeQuiz(false))}
  function gradeQuiz(timeout=false){if(!state.quiz||state.quiz.finished)return;const qz=state.quiz,answered=qz.answers.filter(x=>x!==null).length;if(!timeout&&answered<50){toast(`Bạn còn ${50-answered} câu chưa làm.`);return}qz.finished=true;clearInterval(state.timerId);let correct=0;qz.set.questions.forEach((q,i)=>{if(qz.answers[i]===q.answer)correct++});qz.correct=correct;qz.score=(correct/5).toFixed(1);qz.timeout=timeout;renderQuizResult()}
  function resultCard(q,i,user){const ok=user===q.answer;return `<article class="result-card ${ok?'correct':'wrong'}"><span class="q-index">CÂU ${i+1} · ${ok?'✓ ĐÚNG':'✕ SAI'}</span><h4>${esc(q.q)}</h4>${q.options.map((o,j)=>`<div class="result-option ${j===q.answer?'correct-answer':''} ${user===j&&j!==q.answer?'user-wrong':''}">${'ABCD'[j]}. ${esc(o)} ${j===q.answer?'✓':''}${user===j&&j!==q.answer?' ← bạn chọn':''}</div>`).join('')}${user===null?'<div class="result-option user-wrong">Bạn chưa trả lời câu này.</div>':''}<div class="explain"><b>Giải thích:</b> ${esc(q.explain)}</div></article>`}
  function renderQuizResult(){const m=$('#quizMount'),qz=state.quiz;if(!m||!qz)return;const used=qz.set.duration-qz.remaining;m.innerHTML=`<div class="result-summary"><div class="score-ring">${qz.score}/10</div><div><h3>${qz.correct}/50 câu đúng</h3><p>${qz.timeout?'Hết 60 phút – hệ thống tự chấm.':'Đã nộp bài thành công.'} · Thời gian làm ${formatTime(used)}</p><button class="button primary" id="backQuiz">Chọn bộ đề khác</button></div></div><div class="result-list">${qz.set.questions.map((q,i)=>resultCard(q,i,qz.answers[i])).join('')}</div>`;$('#backQuiz')?.addEventListener('click',()=>{state.quiz=null;renderQuizLanding();window.scrollTo({top:0,behavior:'smooth'})})}

  function speakMovement(i,button){const m=state.period?.movements?.[i];if(!m||!('speechSynthesis'in window)){toast('Thiết bị không hỗ trợ đọc văn bản.');return}speechSynthesis.cancel();const text=m.narration||`${m.name}. Thời gian ${m.time}. Địa điểm ${m.place}. Lãnh đạo ${m.leader}. Lực lượng ${m.forces}. ${m.summary}. Kết quả và ý nghĩa: ${m.result}. ${m.failure?`Nguyên nhân thất bại hoặc hạn chế: ${m.failure}`:''}`;const u=new SpeechSynthesisUtterance(text);u.lang='vi-VN';u.rate=.94;u.onstart=()=>button.textContent='⏸ Đang thuyết minh...';u.onend=()=>button.textContent='🎧 Thuyết minh';u.onerror=()=>button.textContent='🎧 Thuyết minh';speechSynthesis.speak(u)}
  function showModal(html,title='CHI TIẾT'){const modal=$('#detailModal');$('#modalBody').innerHTML=html;$('#modalTitleMini').textContent=title;modal.classList.add('open');modal.setAttribute('aria-hidden','false');$('#scrim').classList.add('show');document.body.style.overflow='hidden';$('.modal-scroll').scrollTop=0}
  function closeModal(){speechSynthesis?.cancel();$('#detailModal').classList.remove('open');$('#detailModal').setAttribute('aria-hidden','true');$('#scrim').classList.remove('show');document.body.style.overflow=''}
  function setupQR(){const img=$('#qrImage'),hint=$('#qrHint');if(!img)return;if(/^https?:$/.test(location.protocol)){const u=location.href.split('#')[0]+'#tong-quan';img.src='https://api.qrserver.com/v1/create-qr-code/?size=180x180&data='+encodeURIComponent(u);if(hint)hint.textContent='Quét QR để mở đúng website này.'}else{img.style.display='none';if(hint)hint.textContent='QR sẽ tự xuất hiện sau khi website được deploy lên HTTPS.'}}

  function init(){
    // Tổng quan / Lịch sử / Tổ chức do patch-v7.js render; app.js giữ Đề cương, Trắc nghiệm, điều hướng.
    setupSyllabusGroup();renderSyllabus();renderQuizLanding();setupQR();route();
    window.addEventListener('hashchange',route);
    $('#menuBtn')?.addEventListener('click',()=>{const n=$('#mainNav'),o=n.classList.toggle('open');$('#menuBtn').setAttribute('aria-expanded',String(o))});
    $('#modalClose')?.addEventListener('click',closeModal);$('#scrim')?.addEventListener('click',closeModal);document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModal()});
    $('#modalBody')?.addEventListener('click',e=>{const b=e.target.closest('[data-narration]');if(b)speakMovement(Number(b.dataset.narration),b)});
    $('#syllabusSearch')?.addEventListener('input',renderSyllabus);$('#syllabusGroup')?.addEventListener('change',renderSyllabus);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
