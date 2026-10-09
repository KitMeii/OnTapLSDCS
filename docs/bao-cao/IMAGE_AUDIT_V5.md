# V5 — IMAGE AUDIT

## Vấn đề đã xử lý

Bản trước dùng nhiều ảnh hotlink. Khi mở bằng `file://`, mạng yếu, website nguồn chặn hotlink hoặc đổi URL, ảnh có thể vỡ.

## Cơ chế V5

### 1. Ảnh bìa
- `assets/images/hero-cover.png` — local, không phụ thuộc Internet.

### 2. Ảnh phong trào / chiến dịch
- Ưu tiên ảnh nguồn nếu có.
- Nếu ảnh nguồn lỗi: tự chuyển sang SVG local trong `assets/images/movements/`.
- 15 phong trào/sự kiện đã có fallback local.

### 3. Ảnh Tổng Bí thư và lãnh đạo cơ quan
- Vẫn ưu tiên ảnh hồ sơ trực tuyến khi có URL tốt.
- Mọi nhân vật được dùng trong dashboard đều có một ảnh dự phòng local dạng chân dung trung tính + **họ tên đầy đủ**, không dùng kiểu chữ viết tắt `TL`, `LMH`...
- Ảnh dự phòng nằm trong `assets/images/portraits/`.
- Nếu ảnh online lỗi, JavaScript tự chuyển sang ảnh local và không để biểu tượng ảnh vỡ.

### 4. Logo / biểu trưng
- Header/footer có fallback sang `assets/images/icon.svg`.

## Kết quả audit

- 40 nhân vật đang dùng trong dashboard tổ chức có fallback local.
- Toàn bộ đường dẫn local tham chiếu trong HTML/CSS/JS đã được kiểm tra tồn tại.
- Không còn đường dẫn local bị thiếu.

## Giới hạn cần hiểu

Ảnh chân dung **thật** từ website chính thức vẫn có thể bị chặn hotlink trong tương lai. Vì vậy V5 dùng chiến lược `remote primary → local named fallback`. Điều này bảo đảm giao diện không vỡ. Nếu muốn hoàn toàn offline bằng ảnh thật, cần có quyền/tệp ảnh gốc rồi chép trực tiếp vào `assets/images/portraits/`; cấu trúc V5 đã sẵn sàng cho việc thay file mà không phải sửa bố cục.
