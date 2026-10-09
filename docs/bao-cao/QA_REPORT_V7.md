# QA REPORT V7

## Đã kiểm tra
- Tất cả file JavaScript trong assets/js và data qua `node --check`.
- Không có tham chiếu local HTML tới file bị thiếu.
- Hero có ảnh Hồ Chí Minh local.
- V7 không sử dụng poster phong trào local làm ảnh lịch sử; ảnh tư liệu remote lỗi sẽ tự ẩn.
- Kinh tế được chia đúng 11 thời kỳ trùng cấu trúc Lịch sử.
- Lạm phát có mốc 2020 = 3,23% và 2025 = 3,31%.
- Footer nền sáng.

## Hạn chế môi trường kiểm thử
Chromium headless trong sandbox không kết thúc ổn định do lỗi DBus/zygote, nên chưa chụp được screenshot tự động. Đã kiểm tra cú pháp JS, file dependency và cấu trúc DOM/CSS tĩnh.
