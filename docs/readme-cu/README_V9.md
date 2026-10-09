# Lịch Sử Đảng Cộng Sản Việt Nam — V9 Deep Responsive

Bản V9 tiếp tục từ V8, tập trung vào hai yêu cầu chính:

1. Học sâu **đủ 11/11 thời kỳ** thay vì chỉ mở rộng một vài giai đoạn.
2. Tối ưu dashboard cho **laptop + điện thoại**, đồng thời rà soát lại toàn bộ ảnh.

## Lịch sử theo thời kỳ

Mỗi thời kỳ vẫn là trục lớn nhất. Ngoài phần bối cảnh, mâu thuẫn, lãnh đạo, đường lối, Đại hội, văn kiện, phong trào và thuật ngữ, V9 bổ sung một lớp **HỌC SÂU THEO THỜI KỲ** gồm:

- Mạch phát triển và logic lịch sử.
- Dòng thời gian, các bước ngoặt.
- Chủ trương và cách xử lý vấn đề.
- Thành quả, hạn chế và bài học.
- Link nguồn tư liệu chính cho chính thời kỳ đó.

11 thời kỳ:

- 1858–1930
- 1930–1935
- 1936–1939
- 1939–1945
- 1945–1954
- 1954–1975
- 1975–1986
- 1986–2001
- 2001–2011
- 2011–2021
- 2021–2026

## Thuật ngữ

29/29 thuật ngữ xuất hiện trong nội dung lịch sử có lớp giải thích sâu, đặt ngay trong bối cảnh nơi thuật ngữ xuất hiện. Bao gồm các khái niệm quan trọng như:

- Cách mạng tư sản dân quyền
- Thổ địa cách mạng
- Phản đế, phản phong
- Chuyên chính vô sản
- Cách mạng dân tộc dân chủ nhân dân
- Cơ chế tập trung quan liêu bao cấp
- Kinh tế thị trường định hướng XHCN
- Ba đột phá chiến lược
- Tự chủ chiến lược
- Quốc phòng toàn dân, thế trận lòng dân, chính sách quốc phòng “4 không”

## Ảnh

- 49/49 nhân vật xuất hiện ở Tổng quan + Tổ chức có **ứng viên ảnh thật** và **fallback local**.
- 15/15 phong trào/chiến dịch có ảnh tư liệu hoặc ứng viên ảnh tư liệu.
- Ảnh local được kiểm tra: không có tham chiếu tệp local bị thiếu.
- Nếu máy chủ ảnh ngoài chặn hotlink hoặc mất mạng, chân dung lãnh đạo tự chuyển sang fallback local; ảnh phong trào lỗi sẽ được ẩn sạch thay vì hiện biểu tượng ảnh vỡ.

## Responsive

### Laptop/desktop
- Lịch sử: danh sách thời kỳ cố định bên trái, nội dung bên phải.
- Tổ chức: Khối tổ chức → Cơ quan/đơn vị → Hồ sơ chi tiết.
- Tổng Bí thư: carousel ngang có nút tiến/lùi.

### Tablet/mobile
- Danh sách thời kỳ chuyển thành thanh chọn ngang sticky.
- Khối tổ chức và cơ quan chuyển thành các thanh cuộn ngang; không ép thành ba cột nhỏ.
- Nội dung học sâu dùng accordion.
- Hồ sơ lãnh đạo và nội dung tổ chức chuyển về một cột.
- Footer chuyển về một cột.

## Chạy local

Có thể mở trực tiếp `index.html` bằng Edge. Để QR và một số tài nguyên web hoạt động giống môi trường deploy, nên chạy bằng một static server hoặc deploy lên HTTPS.
