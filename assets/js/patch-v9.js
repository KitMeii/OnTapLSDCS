(()=>{
'use strict';
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const esc=(v='')=>String(v).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
const D=()=>window.DEEP_PERIODS_V9||{};
const slug=(s='')=>String(s).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/g,'d').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
const portraitFallback=name=>`assets/images/portraits/${slug(name)}.svg`;

const MOVEMENT_IMAGES={
 'Phong trào Cần Vương':'https://cdn.nhandan.vn/images/6774a2cbcc5a73e70778c5dc99702adb374322a7382947e0f8c918ebdfd8976382f19e8ff75991d42dd1593e8ba83ba1e667d376bf869970b83bd2a9ea12e0ea/ham-nghi-1.jpg.avif',
 'Phong trào Đông Du':'https://baotanglichsu.vn/DataFiles/Uploaded/image/dong%20du/Anh-2t.jpg',
 'Khởi nghĩa Yên Bái':'https://baotanglichsu.vn/DataFiles/Uploaded/image/ybai1.gif',
 'Khởi nghĩa Bắc Sơn':'https://file3.qdnd.vn/data/images/13/2025/08/12/upload_2331/img_064238730045pm.jpg?dpi=150&quality=100&w=870',
 'Khởi nghĩa Nam Kỳ':'https://d4.violet.vn/uploads/blogs/447/nam_ky_1940_500.jpg',
 'Cao trào kháng Nhật cứu nước':'https://cdn2.tuoitre.vn/zoom/700_525/tto/i/s626/2016/09/09/aa65a224.jpg',
 'Nam Bộ kháng chiến':'https://file3.qdnd.vn/data/images/0/2022/09/17/tuanson/13.jpg',
 '“Điện Biên Phủ trên không”':'https://special.nhandan.vn/TengoiDienBienPhutrenkhong/assets/G3HehQm0o2/27-665x435.jpg'
};


function deepSection(periodId){
  const d=D()[periodId]; if(!d) return '';
  const logic=(d.logic||[]).map((x,i)=>`<li><span>${String(i+1).padStart(2,'0')}</span><p>${esc(x)}</p></li>`).join('');
  const time=(d.timeline||[]).map(x=>`<div class="v9-time-row"><time>${esc(x[0])}</time><div><b>${esc(x[1])}</b><p>${esc(x[2])}</p></div></div>`).join('');
  const policy=(d.policy||[]).map(x=>`<article><b>${esc(x[0])}</b><p>${esc(x[1])}</p></article>`).join('');
  const results=(arr,cls)=>`<ul class="v9-eval-list ${cls}">${(arr||[]).map(x=>`<li>${esc(x)}</li>`).join('')}</ul>`;
  const sources=(d.sources||[]).map((u,i)=>`<a href="${esc(u)}" target="_blank" rel="noopener">Nguồn ${i+1} ↗</a>`).join('');
  return `<section class="v9-deep" data-v9-deep="${esc(periodId)}">
    <header class="v9-deep-head"><div><span>HỌC SÂU THEO THỜI KỲ</span><h3>${esc(d.title)}</h3></div><p>${esc(d.thesis)}</p></header>
    <details class="v9-accordion" open><summary><span>01</span><b>Mạch phát triển và logic lịch sử</b><i>Hiểu vì sao thời kỳ chuyển biến</i></summary><div class="v9-acc-body"><ol class="v9-logic">${logic}</ol></div></details>
    <details class="v9-accordion"><summary><span>02</span><b>Dòng thời gian – các bước ngoặt</b><i>Nhìn chuỗi sự kiện thay vì học rời mốc</i></summary><div class="v9-acc-body"><div class="v9-timeline">${time}</div></div></details>
    <details class="v9-accordion"><summary><span>03</span><b>Chủ trương – cách xử lý vấn đề</b><i>Thấy rõ lựa chọn chiến lược của từng giai đoạn</i></summary><div class="v9-acc-body"><div class="v9-policy-grid">${policy}</div></div></details>
    <details class="v9-accordion"><summary><span>04</span><b>Thành quả – hạn chế – bài học</b><i>Tổng kết để ôn tự luận và trắc nghiệm</i></summary><div class="v9-acc-body"><div class="v9-eval-grid"><article><h4>▲ Thành quả / ý nghĩa</h4>${results(d.achievements,'good')}</article><article><h4>▼ Hạn chế / vấn đề</h4>${results(d.limits,'bad')}</article><article class="wide"><h4>◆ Bài học cần nhớ</h4>${results(d.lessons,'lesson')}</article></div></div></details>
    <footer class="v9-deep-source"><b>Nguồn tư liệu chính:</b>${sources}</footer>
  </section>`;
}

function activePeriod(){return $('#historyMount .v7-period-btn.active')?.dataset?.v7Period || 'pre1930'}
function injectDeep(){
  const main=$('#historyMount .v7-history-main'); if(!main) return;
  const id=activePeriod();
  const old=$('[data-v9-deep]',main);
  if(old?.dataset.v9Deep===id) return;
  old?.remove();
  const anchor=$('.v7-two',main) || $('.v7-history-hero',main);
  if(!anchor) return;
  anchor.insertAdjacentHTML('afterend',deepSection(id));
}


function fillMovementImages(){
  $$('#historyMount .v7-movement').forEach(card=>{
    if(card.querySelector('img')) return;
    const name=card.querySelector('h4')?.textContent.trim(); const src=MOVEMENT_IMAGES[name]; if(!src) return;
    const content=card.firstElementChild; if(!content) return;
    const media=document.createElement('div'); media.className='v9-movement-media';
    const im=document.createElement('img'); im.src=src; im.alt='Ảnh tư liệu '+name; im.loading='lazy'; im.referrerPolicy='no-referrer';
    im.onerror=()=>{media.remove();card.classList.add('no-media')};
    media.appendChild(im); card.insertBefore(media,content); card.classList.remove('no-media');
  });
}

function improveOrgLabels(){
  const mount=$('#organizationMount'); if(!mount) return;
  $$('.v7-org-entity',mount).forEach(btn=>{
    const s=$('span',btn); if(s && s.textContent.trim() && !s.textContent.trim().startsWith('Đồng chí')) s.textContent='Đồng chí '+s.textContent.trim();
  });
  const h2=$('.v7-org-profile h2',mount); if(h2 && h2.textContent.trim() && !h2.textContent.trim().startsWith('Đồng chí')) h2.textContent='Đồng chí '+h2.textContent.trim();
  const role=$('.v7-org-role',mount); if(role) role.title=role.textContent.trim();
}

function imageAuditRuntime(){
  $$('img').forEach(img=>{
    if(img.dataset.v9Bound) return; img.dataset.v9Bound='1';
    img.addEventListener('error',()=>{
      const alt=(img.alt||'').replace(/^Ảnh\s+/,'').trim();
      if(img.closest('.v7-movement')) return; // ảnh phong trào: patch-v10 xử lý fallback
      if(alt && !img.src.includes('/portraits/')){
        const fb=portraitFallback(alt.replace(/^Đồng chí\s+/,''));
        img.src=fb;
      }
    },{once:true});
  });
}

function labelLeaderCards(){
  $$('.v7-leader').forEach(card=>{
    const b=$('.v7-leader-copy b',card); if(b && !b.textContent.startsWith('Đồng chí')) b.textContent='Đồng chí '+b.textContent;
  });
}

function makeHistoryMobileFriendly(){
  const nav=$('#historyMount .v7-periods'); if(!nav) return;
  nav.setAttribute('aria-label','Chọn thời kỳ lịch sử');
}

function enhance(){injectDeep(); fillMovementImages(); improveOrgLabels(); imageAuditRuntime(); labelLeaderCards(); makeHistoryMobileFriendly();}
function observe(){
  const hm=$('#historyMount'),om=$('#organizationMount'),ov=$('#overviewMount');
  if(hm) new MutationObserver(()=>requestAnimationFrame(enhance)).observe(hm,{childList:true,subtree:true});
  if(om) new MutationObserver(()=>requestAnimationFrame(enhance)).observe(om,{childList:true,subtree:true});
  if(ov) new MutationObserver(()=>requestAnimationFrame(enhance)).observe(ov,{childList:true,subtree:true});
}
function init(){setTimeout(()=>{enhance();observe();},0)}
if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init); else init();
})();
