(()=>{
'use strict';
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const esc=(v='')=>String(v).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
const D=()=>window.PERIOD_EXPERT_V10||{};
const slug=(s='')=>String(s).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/g,'d').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
const movementFallback=n=>n==='Tuyên ngôn Độc lập – khai sinh nước Việt Nam Dân chủ Cộng hòa'?'assets/images/official/leader/ho-chi-minh.jpg':`assets/images/movements/${slug(n)}.svg`;
const MEDIA={
 'Phong trào Cần Vương':'https://cdn.nhandan.vn/images/6774a2cbcc5a73e70778c5dc99702adb374322a7382947e0f8c918ebdfd8976382f19e8ff75991d42dd1593e8ba83ba1e667d376bf869970b83bd2a9ea12e0ea/ham-nghi-1.jpg.avif',
 'Phong trào Đông Du':'https://baotanglichsu.vn/DataFiles/Uploaded/image/dong%20du/Anh-2t.jpg',
 'Khởi nghĩa Yên Bái':'https://baotanglichsu.vn/DataFiles/Uploaded/image/ybai1.gif',
 'Cao trào 1930–1931 – Xô viết Nghệ–Tĩnh':'https://bna.1cdn.vn/2024/10/18/26.-chu-tich-ho-chi-minh-chup-anh-voi-cac-chien-si-xo-viet.-tu-lieu-cua-bao-tang.jpg.jpg',
 'Phong trào dân chủ 1936–1939':'https://sohanews.sohacdn.com/thumb_w/1200/2019/5/19/photo-1-15582322743631355188207-crop-15582325181741729769166.jpg',
 'Khởi nghĩa Bắc Sơn':'https://file3.qdnd.vn/data/images/13/2025/08/12/upload_2331/img_064238730045pm.jpg?dpi=150&quality=100&w=870',
 'Khởi nghĩa Nam Kỳ':'https://d4.violet.vn/uploads/blogs/447/nam_ky_1940_500.jpg',
 'Cao trào kháng Nhật cứu nước':'https://cdn2.tuoitre.vn/zoom/700_525/tto/i/s626/2016/09/09/aa65a224.jpg',
 'Cách mạng Tháng Tám 1945':'https://nhandan.vn/special/motquangtruonglichsu/assets/41P4plCxMN/undefined-1369x1022.jpeg',
 'Tuyên ngôn Độc lập – khai sinh nước Việt Nam Dân chủ Cộng hòa':'https://nhandan.vn/special/motquangtruonglichsu/assets/41P4plCxMN/undefined-1369x1022.jpeg',
 'Nam Bộ kháng chiến':'https://file3.qdnd.vn/data/images/0/2022/09/17/tuanson/13.jpg',
 'Chiến dịch Điện Biên Phủ':'https://resource.kinhtedothi.vn/2024/04/2008c0325e-24e0-4761-b866-ae1528e345c8.png',
 'Phong trào Đồng Khởi':'https://media.vov.vn/sites/default/files/styles/front_medium/public/2025-04/ben_tre_1960.jpg',
 'Tổng tiến công và nổi dậy Tết Mậu Thân 1968':'https://special.nhandan.vn/Tet-Mau-Than-1968-qua-nhung-so-lieu/assets/qh110IPkW9/ttxvnmau_than2-960x668.jpg',
 '“Điện Biên Phủ trên không”':'https://special.nhandan.vn/TengoiDienBienPhutrenkhong/assets/G3HehQm0o2/27-665x435.jpg',
 'Đại thắng mùa Xuân 1975 – Chiến dịch Hồ Chí Minh':'https://file3.qdnd.vn/data/images/0/2022/04/26/thuyanh/30-4.jpg?dpi=150&quality=100&w=870'
};

function currentPeriod(){return $('#historyMount .v7-period-btn.active')?.dataset?.v7Period||'pre1930'}
function expertHtml(id){
 const d=D()[id]; if(!d)return'';
 const depths=(d.deeper||[]).map((x,i)=>`<article class="v10-depth"><b>${String(i+1).padStart(2,'0')} · Mạch phân tích</b>${esc(x)}</article>`).join('');
 const events=(d.keyEvents||[]).map(x=>`<div class="v10-event"><time>${esc(x[0])}</time><div><b>${esc(x[1])}</b><p>${esc(x[2])}</p></div></div>`).join('');
 const war=d.war?`<section class="v10-war"><h4>⚔ ${esc(d.war.title)}</h4><div class="v10-war-grid">${(d.war.phases||[]).map(x=>`<article class="v10-war-phase"><time>${esc(x[0])}</time><div><b>${esc(x[1])}</b><p>${esc(x[2])}</p><p class="v10-war-result"><strong>Kết quả/chuyển biến:</strong> ${esc(x[3])}</p></div></article>`).join('')}</div></section>`:'';
 const rem=(d.remember||[]).map((x,i)=>`<div><b>Ghi nhớ ${i+1}</b><br>${esc(x)}</div>`).join('');
 const src=(d.sources||[]).map((u,i)=>`<a href="${esc(u)}" target="_blank" rel="noopener">Nguồn ${i+1} ↗</a>`).join('');
 return `<section class="v10-expert" data-v10-expert="${esc(id)}"><header class="v10-expert-head"><div><div class="v10-expert-kicker">LỚP PHÂN TÍCH NÂNG CAO · V10</div><h3>Hiểu sâu thời kỳ, không học mốc rời</h3></div><p class="v10-focus"><b>Câu hỏi lõi:</b> ${esc(d.focus)}</p></header><div class="v10-depth-grid">${depths}</div><h4 class="v10-subtitle">Dòng sự kiện chi tiết</h4><div class="v10-keyline">${events}</div>${war}<div class="v10-remember">${rem}</div><footer class="v10-source-row">${src}</footer></section>`;
}
function declarationHtml(){
 const d=D()['1939-1945']?.declaration;if(!d)return'';
 const parts=(d.parts||[]).map(x=>`<article><b>${esc(x[0])}</b><p>${esc(x[1])}</p></article>`).join('');
 const sig=(d.significance||[]).map(x=>`<li>${esc(x)}</li>`).join('');
 const src=(d.sources||[]).map((u,i)=>`<a class="v7-source" href="${esc(u)}" target="_blank" rel="noopener">Nguồn chính thức ${i+1} ↗</a>`).join(' ');
 return `<section class="v10-declaration" data-v10-declaration><div class="v10-declaration-top"><div class="v10-declaration-photo"><img src="assets/images/official/leader/ho-chi-minh.jpg" alt="Chủ tịch Hồ Chí Minh" loading="lazy"></div><div><div class="v10-expert-kicker">SỰ KIỆN 02/09/1945 · HỒ SƠ BẮT BUỘC</div><h3>${esc(d.title)}</h3><p><b>Thời điểm:</b> ${esc(d.time||'02/09/1945')}</p><p><b>Địa điểm:</b> ${esc(d.place)}</p><p><b>Người đọc:</b> ${esc(d.speaker)}</p><p>Không chỉ ghi mốc “02/09/1945”: cần nắm cấu trúc lập luận và giá trị chính trị – pháp lý của Tuyên ngôn.</p>${src}</div></div><div class="v10-declaration-parts">${parts}</div><div class="v10-declaration-significance"><b>Ý nghĩa cần nhớ</b><ul>${sig}</ul></div></section>`;
}
function injectPeriodLayer(){
 const main=$('#historyMount .v7-history-main'); if(!main)return;
 const id=currentPeriod();
 const existing=$('[data-v10-expert]',main);
 if(existing?.dataset?.v10Expert===id){
   if(id==='1939-1945' && !$('[data-v10-declaration]',main)) existing.insertAdjacentHTML('afterend',declarationHtml());
   return;
 }
 $$('[data-v10-expert],[data-v10-declaration]',main).forEach(x=>x.remove());
 const v9=$('[data-v9-deep]',main), anchor=v9||$('.v7-two',main)||$('.v7-history-hero',main); if(!anchor)return;
 anchor.insertAdjacentHTML('afterend',expertHtml(id));
 if(id==='1939-1945') $('[data-v10-expert]',main)?.insertAdjacentHTML('afterend',declarationHtml());
}


function movementImages(){
 $$('#historyMount .v7-movement').forEach(card=>{
  const name=card.querySelector('h4')?.textContent.trim(); if(!name)return;
  let wrap=card.querySelector(':scope > div:first-child'); let img=wrap?.querySelector('img');
  if(!img && MEDIA[name]){wrap=document.createElement('div'); img=document.createElement('img'); wrap.appendChild(img); card.insertBefore(wrap,card.firstElementChild); card.classList.remove('no-media');}
  if(!img)return;
  if(MEDIA[name] && (!img.src || img.dataset.v10Media!=='1')){img.src=MEDIA[name];img.dataset.v10Media='1';img.alt='Ảnh tư liệu '+name;}
  img.onerror=()=>{
    const fb=movementFallback(name); if(!img.src.endsWith(fb.split('/').pop())){img.src=fb;img.removeAttribute('referrerpolicy');}
    else{wrap.innerHTML=`<div class="v10-media-fallback">${esc(name)}</div>`;}
  };
 });
}
function honorifics(){
 $$('.v7-leader-copy b').forEach(x=>{const t=x.textContent.trim();if(t&&!t.startsWith('Đồng chí'))x.textContent='Đồng chí '+t});
 $$('.v7-org-entity span,.v7-org-profile h2').forEach(x=>{const t=x.textContent.trim();if(t&&!t.startsWith('Đồng chí')&&!/^(Chủ tịch|Thủ tướng|Bộ|Ban|Đảng|Quốc hội|Chính phủ)/.test(t))x.textContent='Đồng chí '+t});
}
function footer(){
 const f=$('.site-footer'); if(!f||f.dataset.v10)return; f.dataset.v10='1';f.className='site-footer v10-footer';
 f.innerHTML=`<div class="shell v10-footer-grid"><section><div class="v10-footer-brand"><img src="assets/images/icon.svg" alt="Biểu trưng Đảng"><div><b>Lịch Sử Đảng Cộng Sản Việt Nam</b><small>Học theo thời kỳ · hiểu bối cảnh · nối quyết sách với kết quả.</small></div></div><p class="copyright">© Vũ Nguyễn Tuấn Kiệt</p></section><section><h4>Nội dung & nguồn</h4><p>Phần lịch sử được tổ chức theo 11 thời kỳ; các hồ sơ quan trọng có liên kết tới Tư liệu – Văn kiện Đảng, Bảo tàng Hồ Chí Minh và nguồn tư liệu báo chí chính thống.</p><p><a href="mailto:tuankiet4225@gmail.com">tuankiet4225@gmail.com</a></p></section><section class="v10-footer-qr"><h4>Mở trên điện thoại</h4><img id="qrImage" alt="Mã QR truy cập website"><small id="qrHint">QR sẽ tự hiện khi website chạy bằng HTTPS.</small></section></div>`;
 const qi=$('#qrImage'),qh=$('#qrHint');if(qi){if(/^https?:$/.test(location.protocol)){const u=location.href.split('#')[0]+'#tong-quan';qi.src='https://api.qrserver.com/v1/create-qr-code/?size=180x180&data='+encodeURIComponent(u);if(qh)qh.textContent='Quét để mở đúng website này.'}else{qi.style.display='none';if(qh)qh.textContent='Deploy lên HTTPS để QR tự xuất hiện.'}}
}
function enhance(){injectPeriodLayer();movementImages();honorifics();footer();}
function observe(){['#historyMount','#organizationMount','#overviewMount'].forEach(sel=>{const n=$(sel);if(n)new MutationObserver(()=>requestAnimationFrame(enhance)).observe(n,{childList:true,subtree:true});});}
function init(){setTimeout(()=>{enhance();observe();},0)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
