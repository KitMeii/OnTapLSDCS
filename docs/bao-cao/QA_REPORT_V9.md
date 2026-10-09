# QA REPORT — V9

## Kiểm tra tĩnh

- `assets/js/patch-v7.js`: syntax OK
- `assets/js/patch-v9.js`: syntax OK
- `data/deep-periods-v9.js`: syntax OK
- `data/concept-details-v9.js`: syntax OK
- Tham chiếu asset local bị thiếu: **0**

## Kiểm tra dữ liệu

- Thời kỳ: **11**
- Thời kỳ có lớp deep: **11**
- Thuật ngữ lịch sử: **29**
- Thuật ngữ có deep definition: **29**
- Nhân vật Tổng quan + Tổ chức: **49**
- Fallback local cho nhân vật: **49/49**
- Nhân vật có ứng viên ảnh thật: **49/49**
- Phong trào/chiến dịch: **15**
- Phong trào/chiến dịch có ảnh hoặc ứng viên ảnh: **15/15**

## Responsive

V9 CSS có ba trạng thái chính:

- desktop: dashboard nhiều cột;
- tablet ≤1100px: nav thời kỳ/khối tổ chức chuyển thành horizontal sticky/scroll;
- mobile ≤720px: nội dung một cột, accordion gọn, ảnh và hồ sơ co theo màn hình.

## Giới hạn kiểm thử môi trường

Kiểm tra Chromium headless tự động trong môi trường tạo artifact có thể bị hạn chế bởi DBus/zygote. Vì vậy QA này tập trung vào syntax, dependency, asset path, data coverage và responsive CSS. Khi tải về, nên mở bằng Edge cả desktop và chế độ DevTools mobile để kiểm tra cảm quan cuối cùng.
