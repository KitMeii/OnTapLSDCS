(()=>{
'use strict';
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const esc=(v='')=>String(v).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
const slug=(s='')=>String(s).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/g,'d').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
const L=()=>window.LEADERS_DATA||[];
const B6=()=>window.LEADER_BIOS_V6||{};
const B7=()=>window.LEADER_BIOS_V7||{};
const O=()=>window.ORGANIZATION_DATA||{};

// Ảnh: nguồn duy nhất data/portraits.js
const FALLBACK=(name)=>window.portraitFallback?window.portraitFallback(name):`assets/images/portraits/${slug(name)}.svg`;

const DEEP_BIOS={
  'Trần Phú':{
    summary:'Tổng Bí thư đầu tiên của Đảng, tiêu biểu cho lớp cán bộ cộng sản đầu tiên đã sớm góp phần hệ thống hóa đường lối cách mạng và xây dựng cơ quan lãnh đạo thống nhất của Đảng trong giai đoạn mở đầu đầy thử thách.',
    timeline:[
      '1904: Sinh tại Tùng Ảnh, Đức Thọ, Hà Tĩnh; sớm tham gia phong trào yêu nước.',
      '1926–1928: Hoạt động cách mạng, tiếp cận chủ nghĩa Mác – Lênin và tham gia tổ chức cách mạng.',
      '10/1930: Được bầu làm Tổng Bí thư; trực tiếp gắn với Luận cương chính trị tháng 10/1930.',
      '1930–1931: Cùng Trung ương lãnh đạo cao trào cách mạng 1930–1931, đặc biệt là phong trào Xô viết Nghệ – Tĩnh.',
      '4/1931: Bị địch bắt; dù bị tra tấn khốc liệt vẫn giữ vững khí tiết cách mạng.',
      '9/1931: Hy sinh; để lại lời nhắn nổi tiếng “Hãy giữ vững chí khí chiến đấu”.'
    ],
    values:[
      'Đặt nền móng cho việc hệ thống hóa đường lối của Đảng sau khi thành lập.',
      'Biểu tượng của bản lĩnh chính trị, ý chí kiên trung và tinh thần hy sinh của người cộng sản đầu tiên.'
    ]
  },
  'Lê Hồng Phong':{
    summary:'Nhà lãnh đạo có vai trò nổi bật trong việc khôi phục hệ thống tổ chức Đảng và nối lại liên hệ quốc tế của phong trào cách mạng Việt Nam sau những tổn thất đầu thập niên 1930.',
    timeline:[
      '1902: Sinh tại Hưng Nguyên, Nghệ An.',
      'Những năm 1920: Hoạt động ở nước ngoài, học tập và trưởng thành trong phong trào cộng sản quốc tế.',
      '1934–1935: Tham gia Ban Chỉ huy ở ngoài của Đảng, góp phần khôi phục hệ thống chỉ đạo trung ương.',
      '3/1935: Gắn với Đại hội I của Đảng tại Ma Cao – mốc quan trọng khôi phục tổ chức Đảng sau khủng bố.',
      '1935–1936: Giữ cương vị Tổng Bí thư, tập trung củng cố bộ máy, đào tạo cán bộ, chuẩn bị cho bước chuyển mới.',
      '1942: Hy sinh trong nhà tù Côn Đảo.'
    ],
    values:[
      'Khôi phục mạch lãnh đạo của Đảng trong giai đoạn cực kỳ khó khăn.',
      'Tạo điều kiện tổ chức và cán bộ cho cao trào dân chủ 1936–1939.'
    ]
  },
  'Hà Huy Tập':{
    summary:'Một nhà lý luận, tổ chức và lãnh đạo xuất sắc của Đảng, gắn với quá trình chuyển sách lược để mở rộng phong trào dân chủ 1936–1939.',
    timeline:[
      '1906: Sinh tại Cẩm Xuyên, Hà Tĩnh.',
      'Đầu thập niên 1930: Hoạt động ở nước ngoài, nghiên cứu lý luận và tham gia lãnh đạo Đảng.',
      '10/1936: Được bầu làm Tổng Bí thư trong bối cảnh mặt trận chống phát xít, chống phản động thuộc địa được đặt ra.',
      '1936–1938: Chỉ đạo phong trào dân chủ với các hình thức công khai, hợp pháp, nửa hợp pháp.',
      '1938: Rời cương vị Tổng Bí thư nhưng tiếp tục hoạt động cách mạng.',
      '1941: Bị thực dân Pháp xử bắn tại Hóc Môn.'
    ],
    values:[
      'Góp phần mở rộng mặt trận tập hợp lực lượng yêu nước và dân chủ.',
      'Để lại bài học về vận dụng sách lược mềm dẻo nhưng vẫn giữ vững mục tiêu chiến lược.'
    ]
  },
  'Nguyễn Văn Cừ':{
    summary:'Tổng Bí thư trẻ tuổi tiêu biểu của Đảng, gắn với bước đầu chuyển hướng chiến lược đặt nhiệm vụ giải phóng dân tộc lên hàng đầu và với tác phẩm Tự chỉ trích.',
    timeline:[
      '1912: Sinh tại Từ Sơn, Bắc Ninh.',
      'Đầu thập niên 1930: Sớm tham gia phong trào cách mạng và trưởng thành qua thực tiễn đấu tranh.',
      '3/1938: Được bầu làm Tổng Bí thư.',
      '11/1939: Gắn với Hội nghị Trung ương 6 – mốc mở đầu cho chuyển hướng chiến lược trước chiến tranh thế giới thứ hai.',
      '1939: Viết tác phẩm “Tự chỉ trích”, nhấn mạnh tự phê bình, phê bình, tăng cường đoàn kết trong Đảng.',
      '1941: Bị thực dân Pháp xử bắn tại Hóc Môn.'
    ],
    values:[
      'Đặt nền cho quá trình chuyển trọng tâm từ dân chủ sang giải phóng dân tộc.',
      'Để lại giá trị lớn về xây dựng Đảng, đặc biệt là tinh thần tự phê bình và phê bình.'
    ]
  },
  'Trường Chinh':{
    summary:'Nhà lãnh đạo, nhà lý luận lớn của cách mạng Việt Nam, gắn với hai chặng lớn: lãnh đạo cách mạng giải phóng dân tộc – kháng chiến chống Pháp và góp phần chuẩn bị bước ngoặt Đổi mới năm 1986.',
    timeline:[
      '1907: Sinh tại Xuân Trường, Nam Định.',
      '5/1941: Được bầu làm Tổng Bí thư tại Hội nghị Trung ương 8; gắn với hoàn chỉnh chuyển hướng chiến lược giải phóng dân tộc.',
      '1941–1945: Cùng Trung ương lãnh đạo chuẩn bị lực lượng, tiến tới Cách mạng Tháng Tám.',
      '1945–1954: Giữ vai trò nổi bật trong kháng chiến chống Pháp và xây dựng đường lối kháng chiến.',
      '1951: Gắn với Đại hội II và Chính cương Đảng Lao động Việt Nam.',
      '7–12/1986: Trở lại cương vị Tổng Bí thư, góp phần thúc đẩy đổi mới tư duy, chuẩn bị Đại hội VI.'
    ],
    values:[
      'Có công lớn trong hoàn chỉnh đường lối giải phóng dân tộc và đường lối kháng chiến chống Pháp.',
      'Đóng góp quan trọng vào chuyển biến tư duy trước bước ngoặt Đổi mới.'
    ]
  },
  'Hồ Chí Minh':{
    summary:'Người sáng lập, rèn luyện Đảng Cộng sản Việt Nam; lãnh tụ thiên tài của dân tộc, anh hùng giải phóng dân tộc và danh nhân văn hóa thế giới.',
    timeline:[
      '1911: Ra đi tìm đường cứu nước, mở đầu hành trình khảo nghiệm nhiều con đường giải phóng dân tộc.',
      '1920: Tiếp cận Luận cương của Lênin về vấn đề dân tộc và thuộc địa; xác định con đường cách mạng vô sản cho Việt Nam.',
      '6/1925: Thành lập Hội Việt Nam Cách mạng Thanh niên, chuẩn bị tư tưởng, chính trị, tổ chức và cán bộ cho sự ra đời của Đảng.',
      '3/2/1930: Chủ trì Hội nghị hợp nhất các tổ chức cộng sản, thành lập Đảng Cộng sản Việt Nam và thông qua Cương lĩnh chính trị đầu tiên.',
      '1941–1945: Trực tiếp lãnh đạo giải phóng dân tộc; chủ trì Hội nghị Trung ương 8 và chỉ đạo Tổng khởi nghĩa Tháng Tám.',
      '2/9/1945: Đọc Tuyên ngôn Độc lập, khai sinh nước Việt Nam Dân chủ Cộng hòa.'
    ],
    values:[
      'Xác lập con đường cứu nước đúng đắn: độc lập dân tộc gắn với chủ nghĩa xã hội.',
      'Tư tưởng Hồ Chí Minh cùng chủ nghĩa Mác – Lênin trở thành nền tảng tư tưởng, kim chỉ nam cho hành động của Đảng.'
    ]
  },
  'Lê Duẩn':{
    summary:'Nhà lãnh đạo gắn rất chặt với đường lối cách mạng xã hội chủ nghĩa ở miền Bắc, cách mạng dân tộc dân chủ nhân dân ở miền Nam và sự nghiệp thống nhất đất nước.',
    timeline:[
      '1907: Sinh tại Triệu Phong, Quảng Trị.',
      'Sau 1954: Hoạt động nổi bật trong việc chỉ đạo cách mạng miền Nam.',
      '1959: Gắn với Nghị quyết Trung ương 15 – mốc quan trọng mở đường cho cách mạng miền Nam phát triển.',
      '9/1960: Từ Đại hội III giữ cương vị Bí thư thứ nhất; từ Đại hội IV tiếp tục với chức danh Tổng Bí thư.',
      '1960–1975: Lãnh đạo sự nghiệp kháng chiến chống Mỹ, cứu nước; thống nhất đường lối hai chiến lược cách mạng.',
      '1975–1986: Lãnh đạo xây dựng đất nước sau thống nhất trong bối cảnh nhiều khó khăn, thử thách.'
    ],
    values:[
      'Dấu ấn nổi bật trong đường lối giải phóng miền Nam, thống nhất Tổ quốc.',
      'Khẳng định vai trò lãnh đạo trong thời kỳ chiến tranh và sau thống nhất đất nước.'
    ]
  },
  'Nguyễn Văn Linh':{
    summary:'Tổng Bí thư của bước ngoặt Đổi mới, gắn với việc đưa đường lối Đại hội VI đi vào đời sống và giải phóng sức sản xuất của đất nước.',
    timeline:[
      '1915: Sinh tại Hưng Yên.',
      'Trước 1986: Kinh qua nhiều cương vị lãnh đạo ở Trung ương và địa phương, đặc biệt tại Thành phố Hồ Chí Minh.',
      '12/1986: Được bầu làm Tổng Bí thư tại Đại hội VI.',
      '1986–1991: Lãnh đạo triển khai đổi mới kinh tế, đổi mới cơ chế quản lý, khắc phục dần cơ chế bao cấp.',
      'Gắn với tinh thần nói đi đôi với làm, chống quan liêu, chống tiêu cực và phong cách “Những việc cần làm ngay”.',
      '1991: Hoàn thành cương vị Tổng Bí thư, để lại dấu ấn sâu đậm trong chặng đầu Đổi mới.'
    ],
    values:[
      'Khơi thông động lực đổi mới, tạo niềm tin mới cho xã hội sau khủng hoảng.',
      'Là biểu tượng của tinh thần đổi mới thẳng thắn, dám nhìn thẳng sự thật.'
    ]
  },
  'Đỗ Mười':{
    summary:'Nhà lãnh đạo gắn với giai đoạn ổn định, củng cố và mở rộng thành quả Đổi mới, đẩy mạnh công nghiệp hóa, hiện đại hóa và mở rộng đối ngoại.',
    timeline:[
      '1917: Sinh tại Hà Nội.',
      '1988–1991: Giữ cương vị Chủ tịch Hội đồng Bộ trưởng, trực tiếp chỉ đạo nhiều vấn đề điều hành kinh tế.',
      '6/1991: Được bầu làm Tổng Bí thư tại Đại hội VII.',
      '1991–1997: Gắn với Cương lĩnh 1991, Chiến lược ổn định và phát triển kinh tế – xã hội, mở rộng quan hệ đối ngoại.',
      '1995: Việt Nam gia nhập ASEAN và bình thường hóa quan hệ với Hoa Kỳ – những mốc lớn trong hội nhập đối ngoại.',
      '12/1997: Kết thúc nhiệm kỳ Tổng Bí thư.'
    ],
    values:[
      'Củng cố bước đi của Đổi mới trong môi trường quốc tế biến động sau Chiến tranh lạnh.',
      'Đẩy mạnh công nghiệp hóa, hiện đại hóa và mở rộng vị thế đối ngoại của Việt Nam.'
    ]
  },
  'Lê Khả Phiêu':{
    summary:'Nhà lãnh đạo xuất thân từ quân đội, gắn với yêu cầu xây dựng, chỉnh đốn Đảng và giữ vững ổn định chính trị trong giai đoạn chuyển tiếp cuối thế kỷ XX.',
    timeline:[
      '1931: Sinh tại Thanh Hóa.',
      'Trưởng thành trong quân đội, từng giữ chức Chủ nhiệm Tổng cục Chính trị QĐND Việt Nam.',
      '12/1997: Được bầu làm Tổng Bí thư.',
      '1997–2001: Nhấn mạnh nhiệm vụ xây dựng, chỉnh đốn Đảng, nâng cao năng lực lãnh đạo và sức chiến đấu của Đảng.',
      'Chỉ đạo đất nước trong bối cảnh khu vực và thế giới nhiều biến động sau khủng hoảng tài chính châu Á.',
      '2001: Hoàn thành cương vị Tổng Bí thư, chuẩn bị cho bước chuyển sang Đại hội IX.'
    ],
    values:[
      'Nhấn mạnh yêu cầu chỉnh đốn Đảng và giữ vững kỷ luật, đoàn kết nội bộ.',
      'Góp phần giữ ổn định chính trị – xã hội trong giai đoạn chuyển tiếp.'
    ]
  },
  'Nông Đức Mạnh':{
    summary:'Tổng Bí thư gắn với giai đoạn đẩy mạnh công nghiệp hóa, hiện đại hóa, hoàn thiện mô hình kinh tế thị trường định hướng xã hội chủ nghĩa và tăng tốc hội nhập quốc tế.',
    timeline:[
      '1940: Sinh tại Bắc Kạn.',
      '1992–2001: Giữ cương vị Chủ tịch Quốc hội.',
      '4/2001: Được bầu làm Tổng Bí thư tại Đại hội IX.',
      '2001–2011: Lãnh đạo qua hai nhiệm kỳ Đại hội IX và X; tiếp tục cụ thể hóa đường lối đổi mới.',
      '2007: Việt Nam gia nhập WTO – mốc hội nhập quốc tế quan trọng trong nhiệm kỳ.',
      '1/2011: Hoàn thành cương vị Tổng Bí thư.'
    ],
    values:[
      'Gắn với giai đoạn tăng trưởng và hội nhập mạnh mẽ của nền kinh tế Việt Nam.',
      'Làm rõ hơn mô hình kinh tế thị trường định hướng xã hội chủ nghĩa trong thực tiễn.'
    ]
  },
  'Nguyễn Phú Trọng':{
    summary:'Tổng Bí thư có dấu ấn đậm nét về xây dựng, chỉnh đốn Đảng, hoàn thiện lý luận về chủ nghĩa xã hội và con đường đi lên chủ nghĩa xã hội ở Việt Nam, đồng thời đẩy mạnh phòng chống tham nhũng, tiêu cực.',
    timeline:[
      '1944: Sinh tại Hà Nội.',
      '2006–2011: Giữ cương vị Chủ tịch Quốc hội.',
      '1/2011: Được bầu làm Tổng Bí thư khóa XI; sau đó tiếp tục ở khóa XII và XIII.',
      '2011–2024: Gắn với Cương lĩnh bổ sung, phát triển năm 2011 và nhiều Nghị quyết Trung ương về xây dựng Đảng.',
      '2016 trở đi: Đẩy mạnh công tác phòng chống tham nhũng, tiêu cực, làm trong sạch bộ máy.',
      '10/2018–4/2021: Đồng thời giữ cương vị Chủ tịch nước.'
    ],
    values:[
      'Tạo dấu ấn sâu rộng về xây dựng, chỉnh đốn Đảng và siết chặt kỷ luật, kỷ cương.',
      'Đóng góp quan trọng cho tổng kết lý luận – thực tiễn về mô hình phát triển và con đường đi lên chủ nghĩa xã hội ở Việt Nam.'
    ]
  },
  'Tô Lâm':{
    summary:'Tổng Bí thư đương nhiệm, gắn với giai đoạn tiếp tục sắp xếp, tinh gọn tổ chức bộ máy, đẩy mạnh chuyển đổi số, khoa học – công nghệ, đổi mới sáng tạo và xây dựng nền kinh tế tự chủ, hiện đại.',
    timeline:[
      '1957: Sinh tại Hưng Yên.',
      '2016–2024: Giữ cương vị Bộ trưởng Bộ Công an.',
      '5/2024: Được bầu làm Chủ tịch nước.',
      '3/8/2024: Được bầu làm Tổng Bí thư.',
      '2024–2026: Gắn với nhiều chủ trương về sắp xếp tổ chức bộ máy, nâng cao hiệu lực quản trị và thúc đẩy phát triển khoa học – công nghệ, đổi mới sáng tạo.',
      '2026: Tiếp tục được bầu làm Tổng Bí thư khóa XIV.'
    ],
    values:[
      'Tạo định hướng mới cho giai đoạn phát triển gắn với chuyển đổi số, khoa học – công nghệ và nâng cao năng lực cạnh tranh quốc gia.',
      'Nhấn mạnh yêu cầu vừa phát triển nhanh vừa bảo đảm ổn định chính trị, quốc phòng – an ninh và đối ngoại.'
    ]
  }
};

// Chỉ tô: tỉ lệ phần trăm và tên văn kiện / khái niệm then chốt. KHÔNG tô năm tháng.
const IMPORTANT_SRC='([0-9]{1,3}(?:,[0-9]+)? ?%|Cương lĩnh chính trị(?: đầu tiên)?|Luận cương chính trị|Chánh cương vắn tắt|Sách lược vắn tắt|Chính cương Đảng Lao động Việt Nam|Tuyên ngôn Độc lập|Lời kêu gọi [Tt]oàn quốc kháng chiến|thổ địa cách mạng|tư sản dân quyền cách mạng|giải phóng dân tộc lên hàng đầu|Cương lĩnh xây dựng đất nước|Hiệp định Genève|Hiệp định Pa-?ri|kinh tế thị trường định hướng (?:xã hội chủ nghĩa|XHCN)|Nghị quyết (?:Trung ương )?15)';

function leaderByName(name){return L().find(x=>x.name===name)||{};}
function portraitFor(name){return window.portraitOf?window.portraitOf(name):FALLBACK(name);}
function liList(arr){return `<ul>${(arr||[]).map(x=>`<li>${esc(x)}</li>`).join('')}</ul>`;}

function openLeaderBioV11(name){
  const b6=B6()[name]||{}; const b7=B7()[name]||{}; const extra=DEEP_BIOS[name]||{}; const leader=leaderByName(name);
  const modal=$('#detailModal'), body=$('#modalBody'), mini=$('#modalTitleMini');
  if(!modal||!body||!mini) return;
  const facts=[['Nhiệm kỳ Tổng Bí thư',leader.term||''],['Ngày sinh',b6.birth||''],['Ngày mất',b6.death||'—'],['Quê quán',b6.hometown||''],['Học vấn / chuyên môn',b6.education||'Xem hồ sơ chính thức']];
  const summary=extra.summary||b6.legacy||leader.note||'';
  mini.textContent=`HỒ SƠ CHI TIẾT · Đồng chí ${name}`;
  body.innerHTML=`<article class="v7-bio v11-bio"><section class="v7-bio-top"><div class="v7-bio-photo"><img src="${esc(portraitFor(name))}" alt="Ảnh đồng chí ${esc(name)}" loading="lazy" referrerpolicy="no-referrer" onerror="this.onerror=null;this.src='${esc(FALLBACK(name))}'"></div><div><div class="v7-kicker">TỔNG BÍ THƯ QUA CÁC THỜI KỲ</div><h2>Đồng chí ${esc(name)}</h2><div class="v7-bio-facts">${facts.map(f=>`<div class="v7-bio-fact"><b>${esc(f[0])}</b><span>${esc(f[1])}</span></div>`).join('')}</div><p class="v7-bio-summary">${esc(summary)}</p>${b6.source?`<a class="v7-source" href="${esc(b6.source)}" target="_blank" rel="noopener">Hồ sơ chính thức ↗</a>`:''}</div></section><div class="v7-bio-grid"><section class="v7-bio-block"><div class="v7-kicker">CHỨC VỤ NỔI BẬT</div><h3>Các cương vị chính</h3>${liList(b7.positions||[])}</section><section class="v7-bio-block"><div class="v7-kicker">GẮN VỚI LỊCH SỬ</div><h3>Sự kiện – văn kiện tiêu biểu</h3>${liList(b7.events||[])}</section></div><section class="v7-bio-block"><div class="v7-kicker">CUỘC ĐỜI – SỰ NGHIỆP</div><h3>Dòng mốc thời gian chi tiết</h3>${liList(extra.timeline||b6.career||[])}</section><section class="v7-bio-block"><div class="v7-kicker">GIÁ TRỊ ĐỂ LẠI</div><h3>Đóng góp và ý nghĩa lịch sử</h3>${liList(extra.values||b7.contributions||[b6.legacy].filter(Boolean))}</section></article>`;
  modal.classList.add('open');
  modal.setAttribute('aria-hidden','false');
  document.body.classList.add('modal-open');
  highlightImportant(body);
}

function bindLeaderCards(){
  $$('.v7-leader[data-v7-bio]').forEach(card=>{
    card.onclick=(e)=>{e.preventDefault(); openLeaderBioV11(card.dataset.v7Bio);};
  });
}

function highlightImportant(root=document){
  const containers=$$('.v7-econ-box, .v7-bio-block, .v7-bio-summary, .v7-phase, .v7-card, .v7-concept, .v9-acc-body, .v10-depth, .v10-event p, .v10-war, .v10-declaration, .v7-detail-block, .v7-history-hero p, .v11-transcript-body p', root);
  const fullRe=new RegExp(IMPORTANT_SRC,'g');
  const testRe=new RegExp('^'+IMPORTANT_SRC+'$');
  const hasRe=new RegExp(IMPORTANT_SRC);
  containers.forEach(container=>{
    const walker=document.createTreeWalker(container, NodeFilter.SHOW_TEXT, {
      acceptNode(node){
        if(!node.nodeValue || !node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
        const parent=node.parentElement;
        if(!parent) return NodeFilter.FILTER_REJECT;
        if(parent.closest('.v11-hl') || ['SCRIPT','STYLE','BUTTON','A','TIME'].includes(parent.tagName)) return NodeFilter.FILTER_REJECT;
        return hasRe.test(node.nodeValue) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
      }
    });
    const nodes=[]; while(walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(node=>{
      const frag=document.createDocumentFragment();
      const parts=String(node.nodeValue).split(fullRe);
      parts.forEach(part=>{
        if(!part) return;
        if(testRe.test(part)){
          const mark=document.createElement('mark');
          mark.className='v11-hl';
          mark.textContent=part;
          frag.appendChild(mark);
        }else frag.appendChild(document.createTextNode(part));
      });
      node.parentNode.replaceChild(frag,node);
    });
  });
}

function fixFooter(){
  const footer=$('.site-footer.v10-footer');
  if(footer) footer.classList.add('v11-footer');
}

function fixOrganizationNames(){
  $$('.v7-org-entity span,.v7-org-profile h2').forEach(el=>{
    const t=el.textContent.trim();
    if(t && !t.startsWith('Đồng chí') && !/^Chủ tịch|^Thủ tướng/.test(t)) el.textContent='Đồng chí '+t;
  });
}

function run(){
  bindLeaderCards();
  fixOrganizationNames();
  highlightImportant(document);
  fixFooter();
}

function observe(){
  ['#overviewMount','#historyMount','#organizationMount','#modalBody'].forEach(sel=>{
    const el=$(sel); if(!el) return;
    new MutationObserver(()=>requestAnimationFrame(run)).observe(el,{childList:true,subtree:true});
  });
}

function init(){setTimeout(()=>{run();observe();},0);}
if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init); else init();
})();
