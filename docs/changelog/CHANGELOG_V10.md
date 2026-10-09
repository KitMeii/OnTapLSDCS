# CHANGELOG V10 — Deep Complete

## 1. Nội dung lịch sử: mở rộng đủ 11/11 thời kỳ

V10 giữ V9 làm nền và bổ sung lớp `period-expert-v10.js` cho toàn bộ 11 thời kỳ:

1. Trước 1930
2. 1930–1935
3. 1936–1939
4. 1939–1945
5. 1945–1954
6. 1954–1975
7. 1975–1986
8. 1986–2001
9. 2001–2011
10. 2011–2021
11. 2021–2026

Mỗi thời kỳ có: câu hỏi lõi, mạch phân tích, dòng sự kiện chi tiết, điểm ghi nhớ, nguồn. Các thời kỳ có chiến tranh/xung đột lớn có thêm khối **Diễn biến chiến tranh theo giai đoạn → cách xử lý → kết quả/chuyển biến**.

## 2. 1945: bổ sung hồ sơ Tuyên ngôn Độc lập

- Đưa sự kiện **02/09/1945** về đúng thời kỳ **1939–1945**.
- Tách thành card/hồ sơ riêng, không để chìm trong danh sách phong trào.
- Ghi rõ thời điểm **14:00 ngày 02/09/1945**, Quảng trường Ba Đình, Chủ tịch Hồ Chí Minh thay mặt Chính phủ lâm thời đọc Tuyên ngôn.
- Nội dung được trình bày theo 3 phần: cơ sở pháp lý – tư tưởng; cơ sở thực tiễn; tuyên bố độc lập và ý chí bảo vệ độc lập.
- Có phần ý nghĩa và liên kết nguồn chính thức.

## 3. Ảnh Chủ tịch Hồ Chí Minh

- Khôi phục đúng hướng trình bày bản cũ: **carousel/slider**, mỗi lần chỉ hiện 1 ảnh.
- Ảnh đầu tiên dùng `assets/images/real/ho-chi-minh.png`.
- Dùng `width:auto; height:auto; object-fit:contain` để giữ đúng tỷ lệ ảnh, không kéo méo/cắt đầu.
- Có nút trước/sau + dots, responsive mobile/desktop.

## 4. Audit ảnh / chống ảnh vỡ

- 15/15 phong trào/chiến dịch trong dữ liệu gốc đều có local fallback SVG.
- Hồ sơ Tuyên ngôn dùng fallback trực tiếp về ảnh Hồ Chí Minh local.
- Chân dung lãnh đạo tiếp tục có local portrait fallback.
- 3 ảnh carousel Hồ Chí Minh đều tồn tại local.
- Không có local `src/href` bị thiếu trong `index.html`.

## 5. “Đồng chí” và chống rớt dòng

- Runtime tự thêm tiền tố **“Đồng chí”** cho tên lãnh đạo khi dữ liệu chưa có.
- Tên lãnh đạo và tên người đứng đầu trong khu vực tổ chức dùng một dòng + ellipsis khi quá dài, không bị rớt chữ xuống dòng.
- Header mobile cũng giữ một dòng, cắt an toàn bằng ellipsis nếu màn hình quá hẹp.

## 6. Footer

- Viết lại footer V10 theo grid ổn định cho desktop / tablet / mobile.
- QR chỉ hiện khi chạy bằng HTTP/HTTPS; mở local sẽ không tạo ô QR lỗi.
- Không còn bố cục footer đen/lệch cột của lớp cũ.

## 7. Mobile / Desktop

- Desktop: giảm mật độ thừa, giữ khối nội dung phân tích dễ đọc.
- Tablet: footer 2 cột, QR xuống hàng; khối phân tích chuyển 1 cột khi cần.
- Mobile: timeline, war phase, Declaration card, footer, hero slider đều chuyển 1 cột; navigation và khoảng cách được nén gọn.

## 8. Kỹ thuật

Thêm:
- `data/period-expert-v10.js`
- `assets/css/patch-v10.css`
- `assets/js/patch-v10.js`

Sửa:
- `assets/js/patch-v7.js`: sự kiện Tuyên ngôn chuyển từ `1945-1954` sang `1939-1945`.
- `index.html`: nạp lớp V10 sau V9 để V10 là lớp hoàn thiện cuối.
