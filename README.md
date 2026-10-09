# Website ôn tập Lịch sử Đảng Cộng sản Việt Nam — V12

Web tĩnh (HTML/CSS/JS), mở `index.html` là chạy. Hướng dẫn đưa lên Internet: [docs/DEPLOY.md](docs/DEPLOY.md).

## Cấu trúc thư mục

```
LichSuDangStudy_CodeWeb/               ← THƯ MỤC WEBSITE (đưa nguyên thư mục này lên khi deploy)
├── index.html                         Trang chính (khung trang, hero, footer, thứ tự nạp file)
├── manifest.webmanifest               Thông tin cài web như ứng dụng trên điện thoại
├── README.md                          File này
├── .gitignore / .nojekyll             Cấu hình Git và GitHub Pages
│
├── assets/
│   ├── css/                           Giao diện (nạp theo thứ tự, file sau ghi đè file trước)
│   │   ├── styles.css                 Nền tảng: header, menu, Đề cương, Trắc nghiệm
│   │   ├── patch-v7.css               Bố cục Tổng quan / Lịch sử / Tổ chức
│   │   ├── patch-v9.css, patch-v10.css  Lớp "học sâu", "phân tích chuyên sâu", timeline
│   │   ├── patch-v11.css              Ảnh chân dung, tô đậm nội dung quan trọng
│   │   ├── patch-v12.css              ★ Giao diện cuối cùng: phong cách chính thống, mobile,
│   │   │                                trình phát bài giảng, chế độ video, hiệu ứng cuộn
│   │   └── patch-v13.css              Mục lục thời kỳ (kiểu navigation pane của Word)
│   ├── js/                            Chức năng (nạp theo thứ tự)
│   │   ├── app.js                     Điều hướng 5 mục, Đề cương (Điểm chú ý, câu hỏi phụ), Trắc nghiệm
│   │   ├── patch-v7.js                Dựng nội dung Tổng quan / Lịch sử / Tổ chức
│   │   ├── patch-v9.js, patch-v10.js  Chèn lớp học sâu, hồ sơ Tuyên ngôn, ảnh phong trào
│   │   ├── patch-v11.js               Tô đậm %, văn kiện; hồ sơ Tổng Bí thư
│   │   ├── patch-v12.js               ★ Bài giảng audio + chế độ video + hiệu ứng cuộn
│   │   └── patch-v13.js               Mục lục thời kỳ: bấm để cuộn tới hội nghị, sự kiện, phong trào…
│   ├── images/
│   │   ├── icon.svg                   Biểu trưng
│   │   ├── official/leader/           50 ảnh chân dung chính thức (tulieuvankien.dangcongsan.vn)
│   │   ├── official/overview/33.jpg   Ảnh hero trang Tổng quan
│   │   ├── official/IMAGE_SOURCES.json  Nguồn gốc từng ảnh
│   │   ├── portraits/                 Ảnh dự phòng (SVG) khi thiếu ảnh chân dung
│   │   └── movements/                 Ảnh minh họa dự phòng cho các phong trào
│   └── audio/                         22 file MP3 bài giảng
│       ├── lich-su-<thời kỳ>.mp3        giọng nữ — nút "Nghe bài giảng"
│       └── lich-su-<thời kỳ>-nam.mp3    giọng nam — nút "Xem dạng video"
│
├── data/                              NỘI DUNG (sửa nội dung chủ yếu ở đây)
│   ├── history-integrated.js          11 thời kỳ: bối cảnh, Đại hội, văn kiện, phong trào, khái niệm
│   ├── history-official-v6.js         Hồ sơ hội nghị, cương lĩnh, nghị quyết, Đại hội
│   ├── deep-periods-v9.js             Lớp "Học sâu theo thời kỳ"
│   ├── period-expert-v10.js           Lớp "Phân tích chuyên sâu", diễn biến chiến tranh, Tuyên ngôn
│   ├── concept-details-v9.js, enrichment-v7.js  Giải thích khái niệm, kinh tế theo thời kỳ
│   ├── overview.js                    Số liệu Tổng quan (GDP, lạm phát…)
│   ├── leaders.js, leader-bios-v6.js, leader-bios-v7.js  Tổng Bí thư và hồ sơ
│   ├── portraits.js                   ★ Bảng tên người → ảnh chân dung (nguồn ảnh duy nhất)
│   ├── organization-dashboard.js      Tổ chức: Đảng, Nhà nước, Chính phủ, QP–AN, MTTQ
│   ├── syllabus.js                    Đề cương 40 vấn đề — nguyên văn file Word
│   ├── syllabus-followup.js           120 câu hỏi phụ có đáp án (3 câu/vấn đề)
│   ├── quiz.js                        5 bộ đề × 50 câu trắc nghiệm
│   ├── lectures.js                    ★ Kịch bản 11 bài giảng (sửa lời giảng ở đây)
│   └── lecture-timing.js, lecture-timing-nam.js  Mốc chương + phụ đề (tạo tự động, không sửa tay)
│
├── tools/
│   └── build_lectures.py              Tạo lại audio sau khi sửa data/lectures.js
│                                        (thư mục .tts-cache, .timing là bộ nhớ tạm — không deploy)
└── docs/                              TÀI LIỆU DỰ ÁN
    ├── DEPLOY.md                      Hướng dẫn deploy, thuê tên miền, mô phỏng backend + CSDL
    ├── changelog/                     Nhật ký thay đổi từng phiên bản (V4 → V12)
    ├── bao-cao/                       Báo cáo kiểm tra nội dung, hình ảnh, chất lượng các phiên bản cũ
    └── readme-cu/                     README các phiên bản cũ
```

Ngoài thư mục website (không deploy):
```
LichSuDangStudy/
├── LichSuDangStudy_CodeWeb/           Website (như trên)
├── tai-lieu-du-an/
│   ├── anh-mobile/                    Ảnh chụp giao diện trên điện thoại
│   └── tailieu/                       Tài liệu học thuật (.docx)
└── _luu-tru/                          Code và ảnh cũ không còn dùng (giữ lại để tra cứu)
```

## Sửa nội dung thường gặp

| Muốn sửa | File |
|---|---|
| Đề cương, đáp án gốc | `data/syllabus.js` |
| Điểm chú ý / câu hỏi phụ | `data/syllabus.js` (mục `bones`) / `data/syllabus-followup.js` |
| Câu hỏi trắc nghiệm | `data/quiz.js` |
| Nội dung thời kỳ lịch sử | `data/history-integrated.js` |
| Lời giảng audio | `data/lectures.js` → chạy `python tools/build_lectures.py` và `python tools/build_lectures.py --nam` |
| Lãnh đạo các cơ quan | `data/organization-dashboard.js` (+ ảnh trong `assets/images/official/leader/`, khai báo ở `data/portraits.js`) |
| Số liệu kinh tế | `data/overview.js` |
| Giao diện | `assets/css/patch-v12.css` |

© Vũ Nguyễn Tuấn Kiệt — tuankiet4225@gmail.com
