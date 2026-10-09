# QA REPORT V6

## Đã kiểm tra tự động
- 11 thời kỳ lịch sử.
- 25 hồ sơ nguồn chính thức; tất cả key được map vào thời kỳ, không thiếu key.
- 14 Đại hội I–XIV.
- 13 hồ sơ Tổng Bí thư có chức năng click mở sơ yếu lý lịch.
- 5 bộ trắc nghiệm × 50 = 250 câu.
- 52 portrait fallback local.
- 15 ảnh phong trào local.
- CPI mốc 5 năm có đủ: 2000, 2005, 2010, 2015, **2020**, **2025**.
- Toàn bộ file JavaScript qua `node --check`.
- Kiểm tra tham chiếu local HTML/CSS/JS: 0 file bị thiếu.

## Thay đổi quan trọng so với V5
1. Không nhúng `Vấn đề 1, 2, 3...` từ Đề cương vào trang Lịch sử.
2. Lịch sử dùng hồ sơ sự kiện/văn kiện có cấu trúc nguồn chính thức.
3. Tổ chức là dashboard trái → phải; cột trái hiển thị trực tiếp tên hệ thống và tên đơn vị.
4. Bìa dùng ảnh nguồn thật làm background, không dùng screenshot.
5. Tổng Bí thư trên Tổng quan có thể click mở sơ yếu lý lịch và sự nghiệp.
6. CPI có mốc 2020 và 2025.

## Giới hạn
Không thể bảo đảm máy người dùng truy cập được mọi ảnh hotlink bên ngoài. Vì vậy mọi ảnh lãnh đạo đều có fallback local để bố cục không vỡ. Ảnh fallback là minh họa định danh bằng họ tên, không được trình bày như ảnh tư liệu thật.
