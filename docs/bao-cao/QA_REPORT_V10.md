# QA REPORT V10

## PASS — kiểm tra đã thực hiện

- JavaScript syntax: toàn bộ `assets/js/*.js` và `data/*.js` đều qua `node --check`.
- `index.html`: 34 local resource refs, **0 file thiếu**.
- V10 data: **11/11 period IDs**.
- Chiến tranh/xung đột: 5 nhóm thời kỳ có khối diễn biến nhiều giai đoạn.
- Tuyên ngôn: có dedicated card trong `1939-1945`, không còn gắn sai sang `1945-1954`.
- Hero: 3 local Hồ Chí Minh assets tồn tại.
- Movement fallback: 15/15 dữ liệu gốc có SVG; Tuyên ngôn có fallback ảnh Hồ Chí Minh local.
- Honorific: V10 có runtime normalization tiền tố “Đồng chí”.
- Footer: thay mới bằng V10 responsive footer.

## Visual browser QA

Đã thử chạy Chromium headless trong môi trường hiện tại nhưng tiến trình render bị treo do hạn chế sandbox/DBus của môi trường, nên **không ghi nhận PASS giả cho pixel-level visual test**.

Các kiểm tra cấu trúc, syntax, local asset và responsive CSS đã hoàn tất. Khi mở ZIP trên Edge/Chrome thật, nên kiểm tra nhanh 3 viewport: laptop (~1440px), tablet (~768px), mobile (~390px).
