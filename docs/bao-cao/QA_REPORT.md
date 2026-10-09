# QA REPORT — V5 AUDITED DEEP

## Kiểm tra tự động

- JavaScript: tất cả file `.js` đã chạy `node --check` — đạt.
- Local paths: quét HTML/CSS/JS — không có asset/data path local bị thiếu.
- 11 thời kỳ lịch sử: đủ.
- 40 vấn đề tự luận: dữ liệu giữ trong `data/syllabus.js`.
- 5 × 50 câu trắc nghiệm: giữ nguyên từ bản trước.
- 40 người dùng trong dashboard tổ chức: có fallback portrait local.
- 15 phong trào/sự kiện: có fallback ảnh local.

## Rà soát nội dung

V5 không chỉ dựa vào vài bullet. Các câu tự luận gắn với mỗi thời kỳ được render trực tiếp thành nội dung học sâu. Tổng số đoạn đáp án Word được liên kết theo thời kỳ dao động 29–141 đoạn/thời kỳ tùy giai đoạn.

## Rà soát dữ liệu hiện hành

Đối chiếu tháng 10/2026 với nguồn chính thức cho:
- Tổng Bí thư/Chủ tịch nước.
- Chủ tịch Quốc hội khóa XVI.
- Chính phủ nhiệm kỳ 2026–2031, gồm 14 Bộ + 3 cơ quan ngang Bộ và thay đổi Bộ Nội vụ tháng 8/2026.
- Chánh án TANDTC, Viện trưởng VKSNDTC, Tổng Kiểm toán Nhà nước.
- Một số ban Đảng Trung ương khóa XIV.
- MTTQ Việt Nam khóa XI.

## Browser test

Môi trường thực thi hiện chặn Chromium truy cập `localhost` (`ERR_BLOCKED_BY_ADMINISTRATOR`), nên không thể hoàn thành screenshot E2E tự động. Tuy nhiên HTTP server local trả `200 OK`, cú pháp JS và asset references đã được kiểm tra độc lập.
