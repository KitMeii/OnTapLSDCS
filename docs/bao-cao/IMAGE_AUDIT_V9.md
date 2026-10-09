# IMAGE AUDIT — V9

## Chân dung lãnh đạo/tổ chức

- Tổng số tên người duy nhất được dùng trong phần Tổng quan và Tổ chức: **49**.
- Có ứng viên ảnh thật: **49/49**.
- Có fallback local: **49/49**.
- Fallback local nằm tại `assets/images/portraits/`.

Một số chân dung Tổng Bí thư giai đoạn đầu đã được lưu local từ ảnh người dùng cung cấp để giảm phụ thuộc hotlink.

## Phong trào/chiến dịch

- Tổng số phong trào/chiến dịch trong dữ liệu lịch sử: **15**.
- Có ảnh/ứng viên ảnh tư liệu: **15/15**.
- 8 mục trước đây thiếu ảnh đã được bổ sung ứng viên ảnh tư liệu: Cần Vương, Đông Du, Yên Bái, Bắc Sơn, Nam Kỳ, cao trào kháng Nhật cứu nước, Nam Bộ kháng chiến, “Điện Biên Phủ trên không”.

## Cơ chế chống ảnh vỡ

- Chân dung: ảnh thật → nếu lỗi thì chuyển về portrait local.
- Phong trào/chiến dịch: nếu nguồn ngoài không tải được thì khối ảnh được ẩn, không để biểu tượng ảnh vỡ làm hỏng bố cục.
- Hero dùng ảnh local nên không phụ thuộc mạng.

## Lưu ý triển khai

Một số ảnh thật là URL của nguồn báo chí/cổng thông tin bên ngoài. Website nguồn có thể thay URL hoặc chặn hotlink trong tương lai. V9 bảo đảm giao diện vẫn không vỡ nhờ fallback local, nhưng nếu muốn một gói **100% ảnh thật offline**, cần có quyền/tệp ảnh nguồn để lưu trực tiếp vào `assets/images/real/`.
