# CHANGELOG V5 — Audited Deep

## 1. Ảnh

- Thêm `assets/images/portraits/` với fallback local theo **họ tên đầy đủ** cho mọi nhân vật dùng trong dashboard tổ chức.
- Không còn fallback chữ viết tắt kiểu `TL`, `LMH`.
- Ảnh phong trào chuyển sang SVG local làm ảnh hiển thị chính, tránh hotlink vỡ.
- Ảnh bìa giữ local.
- Ảnh chân dung thật vẫn được ưu tiên khi URL nguồn tải được; lỗi sẽ tự chuyển sang portrait local.

## 2. Lịch sử

- Mỗi thời kỳ hiển thị toàn bộ chuyên đề tự luận liên quan, không chỉ nút ẩn.
- Đại hội II–VIII, XI–XIII tự động chèn nội dung đầy đủ từ đề cương Word.
- Đại hội I, IX, X, XIV được bổ sung khối hoàn cảnh – nội dung trung tâm – ý nghĩa – nguồn chính thức.
- Văn kiện như Cương lĩnh 1930, Luận cương 10/1930, chuyển hướng 1939–1941, Kháng chiến kiến quốc, đường lối kháng chiến chống Pháp, Nghị quyết 15, Đổi mới, Cương lĩnh 1991/2011... có phần phân tích đầy đủ ngay trong thẻ.
- Thêm trục diễn biến riêng cho 1939–1945, kháng chiến chống Pháp 1945–1954 và kháng chiến chống Mỹ 1954–1975.

## 3. Tổ chức

- Giữ dashboard chọn bên trái.
- Mỗi cơ quan: người đứng đầu hiện nay, chức danh, nhiệm kỳ, giai đoạn trước, timeline nếu có.
- Thêm nguồn hiện hành cấp nhóm Đảng/Nhà nước/Chính phủ/MTTQ/QP-AN.
- Chính phủ vẫn đủ 14 Bộ + 3 cơ quan ngang Bộ.

## 4. QA

- `node --check`: đạt với toàn bộ JavaScript.
- Không có local asset reference bị thiếu.
- 40 nhân vật trong dashboard tổ chức có portrait fallback local.
- 15 phong trào/sự kiện có hình minh họa local.
