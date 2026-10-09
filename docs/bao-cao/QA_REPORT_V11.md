# QA REPORT V11

## Đã kiểm tra
- `node -c assets/js/patch-v11.js`: PASS.
- `33.jpg`: đã copy vào thư mục `assets/images/official/overview/` và hero chỉ gọi 1 ảnh này.
- Các ảnh local Tổng Bí thư giai đoạn đầu: tồn tại trong `assets/images/official/leader/`.
- CSS timeline đã bỏ cấu hình cột 50–74 px gây cắt mốc dài; desktop 118 px, mobile chuyển 1 cột.
- CSS tên/nhiệm kỳ card lãnh đạo: không dùng ellipsis làm mất thông tin.
- Audio: có nút nghe/dừng, transcript, nội dung giảng theo record cơ quan đang chọn.

## Lưu ý môi trường kiểm thử
- Chromium headless trong container bị lỗi DBus/sandbox nên không chụp được visual screenshot ổn định.
- Môi trường container không tải trực tiếp được một số CDN ảnh; nguồn ảnh đã xác minh được ghi trong `assets/images/official/IMAGE_SOURCES.json`. Ảnh local sẵn có trong project đã được ưu tiên tuyệt đối.
