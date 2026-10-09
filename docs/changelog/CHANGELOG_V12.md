# CHANGELOG V12

## Giao diện
- Trình bày lại theo phong cách cổng thông tin chính thống (tham khảo dangcongsan.vn, tulieuvankien.dangcongsan.vn, baotanglichsu.vn): nền giấy sáng, tiêu đề chữ có chân (Noto Serif), thân bài Be Vietnam Pro, thẻ phẳng, kẻ mảnh, bỏ bớt nhãn "viên thuốc" và các khối gradient.
- Hero Tổng quan nằm tĩnh trong `index.html` (ảnh `33.jpg`, **bỏ chú thích "Ảnh tổng quan 33.jpg"**), không còn bị JS thay 4–5 lần khi tải trang.
- Footer nằm tĩnh trong `index.html`.
- Sửa lỗi `[object Object]` ở thẻ "Kinh tế – xã hội" của từng thời kỳ (hiển thị Thành quả / Hạn chế).
- Sửa dấu +/− của accordion "Học sâu" bị rớt dòng; sửa tên khối "Quốc phòng – An ninh" bị cắt.
- Responsive đã kiểm tra ở 1440px và 390px.

## Tô đậm nội dung quan trọng
- Chỉ tô **tỉ lệ phần trăm** (774,7%, 23,12%, 18,68%, 3,23%…) và **tên văn kiện / khái niệm then chốt** (Cương lĩnh chính trị, Luận cương chính trị, Chánh cương vắn tắt, Tuyên ngôn Độc lập, thổ địa cách mạng…). Không còn tô năm tháng.
- Kiểu tô: bút dạ nhẹ thay cho khối vàng đậm.

## Ảnh chân dung
- Toàn bộ 49 chân dung (13 Tổng Bí thư + lãnh đạo các cơ quan) được thay bằng ảnh đúng người, chuẩn hóa 600×750 (4:5), lưu local tại `assets/images/official/leader/*.jpg`.
- Nguồn duy nhất trong code: `data/portraits.js` (`window.portraitOf`). Nguồn gốc từng ảnh: `assets/images/official/IMAGE_SOURCES.json`.
- Ảnh cũ trong `assets/images/real/` và `official/leader/*.png` là ảnh cắt từ ảnh chụp màn hình (lệch, dính ảnh bên cạnh, có file sai người) — không còn được dùng.

## Thuyết giảng bằng giọng đọc (mới)
- Nút **Nghe giảng** ở: từng phần Tổng quan (kinh tế, GDP, lạm phát, Tổng Bí thư), cả thời kỳ lịch sử, từng hội nghị/văn kiện (Cương lĩnh, Luận cương, Chỉ thị, Nghị quyết), từng Đại hội, từng phong trào/chiến dịch, khái niệm, lớp học sâu, hồ sơ Tuyên ngôn Độc lập, hồ sơ Tổng Bí thư, từng cơ quan trong Tổ chức.
- Lời giảng có mở bài → trình bày theo ý ("thứ nhất, thứ hai…") → kết luận / ý cần nhớ.
- Đoạn đang đọc được tô sáng trên trang, có phụ đề, thanh phát cố định (lùi/tiến đoạn, tạm dừng, tốc độ, dừng).
- Tự đọc đúng ngày tháng, viết tắt, số La Mã (Đại hội VI → "Đại hội lần thứ 6", XHCN → "xã hội chủ nghĩa").
- Sửa lỗi audio V11 ở tab "Chính phủ & các Bộ" (trước đây không đọc được dữ liệu Bộ).
- Giọng đọc dùng Web Speech API của trình duyệt; trên Windows nên dùng Microsoft Edge (giọng HoaiMy) để phát âm tiếng Việt chuẩn nhất.

## Kỹ thuật
- Bỏ khỏi `index.html` các tầng `patch-v3/v4/v5/v6` (.js và .css) — toàn bộ kết quả của chúng đã bị v7 ghi đè, chỉ gây nháy giao diện và tải thừa ảnh.
- `app.js` không còn render Tổng quan / Lịch sử / Tổ chức (v7 đảm nhận); v7, v9, v10, v11 chạy ngay thay vì chờ 1–1,8 giây.
- Lớp giao diện cuối cùng: `assets/css/patch-v12.css`; lớp thuyết giảng: `assets/js/patch-v12.js`.

## V12.1
- **Bài giảng audio chỉ ở phần Lịch sử**, viết lại hoàn toàn: 11 kịch bản giảng viết tay theo lối giảng bài, có câu hỏi gợi mở, kể chuyện theo mạch nhân – quả, nhấn ý thi cử và kết luận (`data/lectures.js`, ~9.100 từ).
- Giọng đọc **neural tiếng Việt (vi-VN-HoaiMyNeural)** tạo sẵn thành MP3 (`assets/audio/lich-su-<thời kỳ>.mp3`), tốc độ nhanh hơn mặc định; phụ đề chạy theo từng câu, bài giảng chia chương, trang tự cuộn và tô sáng đúng phần đang giảng (`data/lecture-timing.js`). Trình phát: tua ±10 giây, chuyển chương, kéo thanh tiến trình, tốc độ 1–1.5×. Nếu thiếu MP3 thì tự dùng giọng của trình duyệt đọc cùng kịch bản.
- Bỏ nút nghe ở Tổng quan, Tổ chức, hồ sơ lãnh đạo.
- Hero: câu thơ của Chủ tịch Hồ Chí Minh “Dân ta phải biết sử ta, / Cho tường gốc tích nước nhà Việt Nam” (*Lịch sử nước ta*, 1942) và khẩu hiệu “Đảng Cộng sản Việt Nam quang vinh muôn năm!”.
- **Ảnh chân dung chính thức** từ tulieuvankien.dangcongsan.vn cho 49/50 lãnh đạo (giữ nguyên bố cục ảnh gốc, khung 3:4); Bế Xuân Trường dùng ảnh Wikimedia.
- Đề cương: “Xương ý chính cần nhớ” → **Điểm chú ý** (biểu tượng bóng đèn); thêm **120 câu hỏi phụ có đáp án** (3 câu/vấn đề, `data/syllabus-followup.js`).
- Hiệu ứng cuộn: nội dung hiện dần, thanh tiến độ đọc, nút lên đầu trang, header đổ bóng; tự tắt khi người dùng bật “giảm chuyển động”.
- Tương thích: bỏ regex lookbehind (lỗi trên Safari/iOS < 16.4); kiểm tra tự động 5 trang × 8 độ rộng (320–1280px) không có tràn ngang.

## V12.2 — Bài giảng dạng video
- Nút **“Xem dạng video”** trong thẻ bài giảng mỗi thời kỳ: sân khấu 16:9 phát cùng MP3, hoạt ảnh đổi theo từng câu đang đọc (nhận diện tự động từ phụ đề):
  - nhắc lãnh đạo → chân dung chính thức trượt vào kèm tên, nhiệm kỳ;
  - nhắc mốc thời gian → thẻ ngày tháng lớn + con trỏ chạy trên trục thời gian của thời kỳ;
  - nhắc văn kiện / sự kiện (Cương lĩnh, Luận cương, Chỉ thị, Hiệp định, Nghị quyết…) → thẻ văn kiện mở ra;
  - nhắc Đại hội → con dấu số La Mã xoay vào;
  - số liệu (774,7%%, 56 ngày đêm, 2 triệu đồng bào…) → con số đếm lên;
  - câu nói nổi tiếng → trích dẫn lớn; “Thứ nhất, thứ hai…” → danh sách ý xếp dần; còn lại → chữ hiện dần theo nhịp đọc;
  - mỗi chương có màn tiêu đề riêng; ảnh nền tư liệu chuyển động chậm (Ken Burns).
- Điều khiển: phát/tạm dừng, ±10 giây, tua, chọn chương, toàn màn hình, phím Space/←/→/Esc; co giãn theo màn hình, có gợi ý xoay ngang trên điện thoại.
- Không tạo file video riêng (11 video ~42 phút sẽ nặng hàng trăm MB); hoạt ảnh được dựng trực tiếp từ audio + phụ đề nên luôn khớp nhịp và nhẹ.

## V12.3
- Video dùng **giọng nam (vi-VN-NamMinhNeural)**: `assets/audio/lich-su-<thời kỳ>-nam.mp3` + `data/lecture-timing-nam.js`; “Nghe bài giảng” vẫn giọng nữ. Đóng video thì tắt tiếng. Tạo lại: `python tools/build_lectures.py --nam`.
- Bỏ phụ đề trên sân khấu video; trục thời gian đưa xuống sát đáy.
- Sửa lỗi trục thời gian giữ năm của video trước (vd. “1950” trong video 2021–2026): trục được đặt lại mỗi lần mở video, con trỏ ẩn khi năm nằm ngoài khoảng của thời kỳ.
- Mobile: sửa chữ nút “Xem dạng video” bị tô vàng khó đọc; tên trang trên thanh đầu hiện đủ ở 320–420px; nhãn “n câu” ở Đề cương không bị ép xuống dòng.
