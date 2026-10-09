# IMAGE AUDIT V10

## Kết quả kiểm tra tĩnh

- `index.html`: **0 local src/href thiếu file**.
- Hồ Chí Minh carousel: **3/3 ảnh local tồn tại**.
- Phong trào/chiến dịch dữ liệu gốc: **15/15 có local fallback**.
- Hồ sơ Tuyên ngôn Độc lập: remote image có thể thay đổi nhưng fallback là ảnh Hồ Chí Minh local, không để box ảnh vỡ.
- Chân dung lãnh đạo: lớp V7/V9 giữ cơ chế portrait fallback local; V10 không loại bỏ cơ chế này.

## Quy tắc hiển thị ảnh V10

1. Ảnh Bác: `object-fit: contain`, giữ tỷ lệ gốc.
2. Carousel: chỉ một ảnh active, không trải cả dải ảnh ra cùng lúc.
3. Ảnh phong trào: ưu tiên ảnh tư liệu; nếu hotlink lỗi → SVG local tương ứng.
4. Không phụ thuộc vào remote image để giữ bố cục trang.

## Lưu ý triển khai

Một số ảnh tư liệu chính vẫn được lấy từ nguồn báo chí trực tuyến. V10 đảm bảo **không vỡ giao diện khi nguồn ngoài lỗi** bằng local fallback; muốn offline 100% ảnh tư liệu thì cần tải và lưu bản ảnh được phép sử dụng vào project.
