# HƯỚNG DẪN DEPLOY — Website ôn tập Lịch sử Đảng Cộng sản Việt Nam (V13)

Tài liệu gồm 3 phần:

| Phần | Dành cho | Chi phí |
|---|---|---|
| **A. Deploy bản hiện tại (web tĩnh)** | Đưa ngay website lên Internet | Miễn phí |
| **B. Thuê tên miền riêng — web tĩnh** | Muốn link đẹp kiểu `ontaplichsudang.id.vn` | Chỉ tiền tên miền |
| **C. Giả lập: web có backend + cơ sở dữ liệu** | Khi sau này thêm đăng nhập, lưu kết quả, trang quản trị… | Tên miền + máy chủ |

> Bản hiện tại **chỉ cần Phần A** (hoặc A + B). Phần C là hướng dẫn mô phỏng để tham khảo khi mở rộng.

---

## Thông tin chung về website hiện tại

| Mục | Giá trị |
|---|---|
| Repository GitHub | https://github.com/KitMeii/OnTapLSDCS (Public, nhánh `main`) |
| Link website (GitHub Pages) | **https://kitmeii.github.io/OnTapLSDCS/** |
| Thư mục trên máy (chứa trực tiếp `index.html`) | `D:\Nam4_26_27\HOCKY_I_2627\LSĐCSVN\LichSuDangStudy\LichSuDangStudy_CodeWeb` |

- **Loại web:** web tĩnh — chỉ gồm HTML, CSS, JavaScript, ảnh, file MP3. Không có máy chủ xử lý, không có cơ sở dữ liệu.
- **Người xem cần gì:** chỉ cần thiết bị có Internet và trình duyệt (Chrome, Edge, Safari, Cốc Cốc…). Không cài đặt gì.
- **Dung lượng đưa lên:** khoảng **33 MB / 229 file** (audio bài giảng 29 MB, mỗi bài dưới 7 phút).
- **Không đưa lên:** `tools/.tts-cache/` (bộ nhớ tạm khi tạo giọng đọc, khoảng 63 MB) và `tools/.timing/build-*.log` — đã được loại tự động bởi file `.gitignore`.
- **Chỉ đưa thư mục web**, không đưa thư mục cha `LichSuDangStudy` (trong đó có `_luu-tru/`, `tai-lieu-du-an/` là tài liệu nội bộ).

### Những phần cần Internet khi xem

| Thành phần | Nằm ở đâu | Nếu không tải được |
|---|---|---|
| Nội dung, đề cương, trắc nghiệm, ảnh chân dung, audio bài giảng | Trong website | — |
| Font chữ (Be Vietnam Pro, Noto Serif) | Google Fonts | Dùng font có sẵn của máy |
| Một số ảnh tư liệu phong trào, ảnh nền video | Báo chí chính thống | Tự thay bằng ảnh minh họa có sẵn |
| Mã QR cuối trang | api.qrserver.com | Ẩn QR |

Mỗi bài giảng tốn khoảng **1–2 MB dữ liệu**; file MP3 chỉ tải khi người xem bấm *Nghe bài giảng* hoặc *Xem dạng video*.

---

# PHẦN A — DEPLOY BẢN HIỆN TẠI (MIỄN PHÍ)

Dùng **GitHub Pages**: miễn phí, link cố định, cập nhật bằng `git push`.
Không tải lên qua nút *Upload files* trên github.com vì trình tải lên chỉ nhận **100 file/lần** (web có 229 file).

## A1. GitHub Pages bằng Git dòng lệnh (cách đang dùng)

### Bước 0 — Chuẩn bị (làm 1 lần)
1. Có tài khoản GitHub — hiện dùng tài khoản **KitMeii**.
2. Máy đã cài **Git** (kiểm tra: `git --version`).
3. Tạo repository **trống** tại https://github.com/new: tên `OnTapLSDCS`, chọn **Public**, **không** tích *Add a README / .gitignore / license* (thư mục web đã có sẵn các file này).

### Bước 1 — Đẩy code lần đầu
Mở Git Bash (hoặc terminal trong VS Code) và chạy lần lượt:
```bash
cd "D:/Nam4_26_27/HOCKY_I_2627/LSĐCSVN/LichSuDangStudy/LichSuDangStudy_CodeWeb"
git init -b main
git add .
git status            # kiểm tra: khoảng 229 file, KHÔNG có tools/.tts-cache
git commit -m "Website ôn tập Lịch sử Đảng V13"
git remote add origin https://github.com/KitMeii/OnTapLSDCS.git
git push -u origin main
```
- Lần push đầu, Windows mở cửa sổ đăng nhập GitHub → đăng nhập bằng tài khoản **KitMeii** (chủ repository).
- Nếu `git status` có `tools/.tts-cache` → **dừng lại, chưa commit**, kiểm tra file `.gitignore`.

### Bước 2 — Bật GitHub Pages
1. Mở https://github.com/KitMeii/OnTapLSDCS/settings/pages
2. Mục **Build and deployment**:
   - **Source:** `Deploy from a branch`
   - **Branch:** `main` — thư mục `/ (root)` → **Save**.
3. Theo dõi tab **Actions** của repository: lượt chạy *pages build and deployment* có dấu ✓ xanh là xong (thường 1–3 phút).
4. Tải lại trang Settings → Pages: dòng **"Your site is live at …"** hiện link **https://kitmeii.github.io/OnTapLSDCS/**
5. Tích **Enforce HTTPS** nếu có.

> Link có phần đuôi `/OnTapLSDCS/` vì đó là tên repository. Muốn link gọn `https://kitmeii.github.io` thì repository phải đặt tên đúng bằng `kitmeii.github.io`.

### Bước 3 — Kiểm tra sau deploy
- [ ] Mở link trên máy tính, bấm qua 5 mục: **Tổng quan · Lịch sử · Tổ chức · Đề cương · Trắc nghiệm**.
- [ ] **Lịch sử** → chọn thời kỳ → **Nghe bài giảng** (giọng nữ) và **Xem dạng video** (giọng nam) đều có tiếng.
- [ ] **Lịch sử** → **Mục lục** → bấm một mục (ví dụ *Hội nghị hợp nhất*) → trang cuộn đúng tới nội dung.
- [ ] **Đề cương** → mở 1 vấn đề → thấy **Điểm chú ý** và **Câu hỏi phụ có thể được hỏi**.
- [ ] **Trắc nghiệm** → vào 1 bộ đề → chọn đáp án, đồng hồ đếm ngược chạy.
- [ ] Cuối trang có **mã QR** → quét bằng điện thoại → kiểm tra bản mobile; xem video thì xoay ngang.
- [ ] Gửi link cho 1–2 người khác mở thử bằng mạng của họ.

### Bước 4 — Cập nhật nội dung về sau
```bash
cd "D:/Nam4_26_27/HOCKY_I_2627/LSĐCSVN/LichSuDangStudy/LichSuDangStudy_CodeWeb"
git add .
git commit -m "Mô tả thay đổi, ví dụ: Sửa đề cương vấn đề 5"
git push
```
- Chờ 1–2 phút (xem tab **Actions**), web tự cập nhật; link giữ nguyên.
- Nếu vẫn thấy bản cũ: `Ctrl + F5` (máy tính) hoặc mở tab ẩn danh (điện thoại).

> **Sửa lời giảng** (`data/lectures.js`) thì phải tạo lại audio **trước khi push**:
> ```bash
> pip install edge-tts                       # cài 1 lần
> python tools/build_lectures.py             # giọng nữ  -> assets/audio/lich-su-*.mp3
> python tools/build_lectures.py --nam       # giọng nam -> assets/audio/lich-su-*-nam.mp3 (dùng cho video)
> python tools/build_lectures.py --nam 1930-1935   # chỉ tạo lại 1 thời kỳ
> ```
> - Dịch vụ giọng đọc đôi khi từ chối yêu cầu; script tự thử lại. Nếu báo *LỖI* ở thời kỳ nào, chạy lại riêng thời kỳ đó.
> - Dịch vụ đôi khi **treo** (lệnh chạy mãi không in thêm dòng *xong*). Khi đó dừng lệnh (`Ctrl + C`) rồi chạy lại — các đoạn đã tạo được giữ trong `tools/.tts-cache` nên không phải làm lại từ đầu. Có thể chạy từng thời kỳ kèm giới hạn thời gian: `timeout 300 python tools/build_lectures.py --nam 1945-1954`.
> - Mỗi bài giảng nên dưới 7 phút (khoảng 1.400 từ trở xuống).

## A1b. Cách thay thế — GitHub Desktop (không cần gõ lệnh)
1. **File → Add local repository…** → chọn thư mục web (chứa `index.html`). Nếu đã chạy `git init` ở A1 thì repository được nhận ngay.
2. Thay đổi hiện ở cột trái → ghi **Summary** → **Commit to main** → **Push origin**.
3. Repository chưa có trên GitHub thì bấm **Publish repository** và **bỏ tích** *Keep this code private* (GitHub Pages miễn phí cần repository Public). Bật Pages như **Bước 2** ở trên.

## A2. Cách thay thế — Netlify Drop (không cần GitHub)
1. Truy cập https://app.netlify.com/drop, đăng nhập (email hoặc Google).
2. **Di chuyển tạm** thư mục `tools/.tts-cache` ra ngoài thư mục web (cho nhẹ).
3. Kéo–thả **cả thư mục web** (thư mục chứa `index.html`) vào trang.
4. Nhận link `https://ten-ngau-nhien.netlify.app` → đổi tên: **Site configuration → Change site name** → ví dụ `ontaplichsudang` → link `https://ontaplichsudang.netlify.app`.
5. Cập nhật: **Deploys** → kéo–thả lại thư mục.

## A3. Xử lý sự cố thường gặp

| Hiện tượng | Nguyên nhân / Cách xử lý |
|---|---|
| Link báo **404** | Chờ thêm 2–3 phút; kiểm tra Pages chọn `main` + `/ (root)`; `index.html` phải nằm ngay gốc repository (không nằm trong thư mục con). |
| Chỉ có nút **Push origin**, không có Publish | Repository đã publish rồi → bấm **Push origin**. |
| `git push` báo *rejected* / *fetch first* | Trên GitHub có thay đổi mà máy chưa có (ví dụ sửa trực tiếp trên web) → chạy `git pull --rebase` rồi `git push` lại. |
| `git push` báo *Permission denied* / 403 | Đang đăng nhập sai tài khoản → Windows: mở *Credential Manager* → xóa mục `git:https://github.com` → push lại và đăng nhập bằng **KitMeii**. |
| Bấm nghe **không có tiếng** | Trình duyệt chỉ phát âm thanh sau khi người dùng bấm; bấm lại nút; tắt chế độ im lặng của điện thoại. |
| Ảnh tư liệu phong trào không hiện | Trang báo chặn tải ảnh từ web khác; web tự thay ảnh minh họa — không ảnh hưởng nội dung. |
| Giao diện cũ sau khi cập nhật | Bộ nhớ đệm trình duyệt → `Ctrl + F5` / tab ẩn danh. |
| GitHub Desktop báo file quá lớn | Không xảy ra với bản hiện tại (file lớn nhất < 2 MB). GitHub giới hạn 100 MB/file. |

---

# PHẦN B — THUÊ TÊN MIỀN RIÊNG (WEB TĨNH)

Mục tiêu: thay `ten-tai-khoan.github.io/ontaplichsudang` bằng link riêng, ví dụ **`ontaplichsudang.id.vn`**. Website vẫn host miễn phí trên GitHub Pages (hoặc Netlify / Cloudflare Pages) — **chỉ trả tiền tên miền**.

## B1. Chọn tên miền

| Đuôi | Phù hợp | Giá tham khảo/năm* | Ghi chú |
|---|---|---|---|
| `.id.vn` | Cá nhân | Rẻ, nhiều nơi khuyến mãi năm đầu | Cần CCCD; mỗi cá nhân đăng ký theo quy định của VNNIC |
| `.io.vn` | Cá nhân / dự án nhỏ | Rẻ | Tương tự `.id.vn` |
| `.vn` / `.com.vn` | Cá nhân, tổ chức | ~450.000–800.000đ năm đầu | Cần thông tin chủ thể (CCCD hoặc giấy phép tổ chức) |
| `.com` | Quốc tế | ~250.000–350.000đ | Đăng ký đơn giản, không cần giấy tờ |
| `.edu.vn` | Cơ sở giáo dục | — | Chỉ cấp cho tổ chức giáo dục, cá nhân không đăng ký được |

\* Giá thay đổi theo nhà đăng ký và khuyến mãi — kiểm tra trực tiếp khi mua. Lưu ý **giá gia hạn** các năm sau thường cao hơn năm đầu.

**Lưu ý đặt tên:** nội dung liên quan đến Đảng, nên **tránh tên dễ bị hiểu là trang chính thức** (như `dangcongsan…`, `tulieuvankien…`). Nên có yếu tố học tập: `ontap`, `hoc`, `study` — ví dụ `ontaplichsudang`, `hoclichsudang`, `lsd-study`.

## B2. Mua tên miền
1. Chọn nhà đăng ký: tên miền Việt Nam (`.vn`, `.id.vn`…) mua tại nhà đăng ký được VNNIC công nhận (Mắt Bão, PA Vietnam, iNET, Tenten, Nhân Hòa…); `.com` có thể mua ở các nơi trên hoặc Namecheap, Cloudflare Registrar…
2. Tra cứu tên → thêm vào giỏ → khai thông tin chủ thể (họ tên, CCCD, email, số điện thoại **chính xác** — sai thông tin có thể bị khóa tên miền).
3. Thanh toán → nhận email xác nhận + tài khoản quản trị tên miền.
4. (Tên miền `.vn`) hoàn tất **bản khai đăng ký** theo hướng dẫn của nhà đăng ký nếu được yêu cầu.

## B3. Trỏ tên miền về GitHub Pages

Ví dụ tên miền `ontaplichsudang.id.vn`, tài khoản GitHub `KitMeii`.

**Trên GitHub:**
1. Repository → **Settings → Pages → Custom domain** → nhập `ontaplichsudang.id.vn` → **Save**.
   (GitHub tự tạo file `CNAME` trong repository — đừng xóa file này.)

**Trên trang quản lý DNS của nhà đăng ký** (mục *Quản lý DNS / DNS Records*), xóa các bản ghi `A`/`CNAME` mặc định cho `@` và `www` (nếu có), rồi thêm:

| Loại | Tên (Host) | Giá trị | TTL |
|---|---|---|---|
| A | `@` | `185.199.108.153` | 3600 |
| A | `@` | `185.199.109.153` | 3600 |
| A | `@` | `185.199.110.153` | 3600 |
| A | `@` | `185.199.111.153` | 3600 |
| CNAME | `www` | `kitmeii.github.io` | 3600 |

(Tùy chọn, hỗ trợ IPv6 — thêm 4 bản ghi `AAAA` cho `@`: `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153`.)

**Hoàn tất:**
1. Chờ DNS cập nhật: thường 15 phút – vài giờ (tối đa 24–48 giờ).
2. Quay lại **Settings → Pages**: khi báo *DNS check successful*, tích **Enforce HTTPS** (GitHub tự cấp chứng chỉ SSL miễn phí, có thể mất thêm ~30 phút).
3. Kiểm tra: `https://ontaplichsudang.id.vn` và `https://www.ontaplichsudang.id.vn` đều mở được web.
4. Mã QR cuối trang **tự đổi theo tên miền mới** — không cần sửa code.

**Kiểm tra DNS** (Command Prompt / PowerShell):
```bash
nslookup ontaplichsudang.id.vn        # phải trả về các IP 185.199.10x.153
nslookup www.ontaplichsudang.id.vn    # phải trỏ về kitmeii.github.io
```

## B4. Trỏ tên miền về Netlify / Cloudflare Pages (nếu dùng)
- **Netlify:** Site → **Domain management → Add a domain** → nhập tên miền → làm theo bản ghi DNS Netlify hiển thị (thường `A @ → 75.2.60.5` và `CNAME www → ten-site.netlify.app`), hoặc chuyển nameserver về Netlify DNS. HTTPS tự cấp.
- **Cloudflare Pages:** thêm tên miền vào Cloudflare (đổi **nameserver** tại nhà đăng ký sang 2 nameserver Cloudflare cung cấp) → Pages project → **Custom domains → Set up a domain**. HTTPS tự cấp.

## B5. Duy trì tên miền
- **Bật tự động gia hạn** hoặc ghi lịch gia hạn — tên miền hết hạn sẽ ngừng hoạt động và có thể bị người khác đăng ký.
- Giữ email đăng ký luôn hoạt động (nhận thông báo gia hạn, xác minh).
- Không chia sẻ mật khẩu tài khoản quản trị tên miền; bật xác thực 2 lớp nếu nhà đăng ký hỗ trợ.

---

# PHẦN C — GIẢ LẬP: WEBSITE CÓ BACKEND + CƠ SỞ DỮ LIỆU

> Phần này **mô phỏng** trường hợp website được nâng cấp có máy chủ xử lý và cơ sở dữ liệu. Bản hiện tại **chưa cần**.

## C1. Khi nào cần backend + cơ sở dữ liệu?

Ví dụ các tính năng mở rộng cho website này:
- Đăng ký / đăng nhập tài khoản học viên.
- **Lưu lịch sử làm bài trắc nghiệm**, bảng xếp hạng, thống kê câu hay sai.
- Đồng bộ tiến độ "đã học" đề cương giữa máy tính và điện thoại.
- **Trang quản trị**: giảng viên thêm/sửa câu hỏi, đề cương, bài giảng mà không phải sửa code.
- Ghi chú, hỏi đáp, bình luận theo từng vấn đề.

Web tĩnh (GitHub Pages / Netlify Drop) **không chạy được** backend → cần máy chủ.

## C2. Kiến trúc mô phỏng

```
Người dùng (trình duyệt máy tính / điện thoại)
        │  HTTPS (ontaplichsudang.id.vn)
        ▼
┌──────────────────────────── Máy chủ ────────────────────────────┐
│  Nginx (cổng 80/443, SSL Let's Encrypt)                          │
│   ├── /            → giao diện tĩnh (index.html, assets, data)   │
│   └── /api/...     → chuyển tiếp tới backend (cổng 3000)         │
│                                                                   │
│  Backend Node.js (Express) — quản lý bằng PM2                     │
│   ├── /api/auth/register, /api/auth/login   (đăng ký/đăng nhập)  │
│   ├── /api/progress        (tiến độ học đề cương)                 │
│   ├── /api/quiz/results    (lưu & xem kết quả trắc nghiệm)        │
│   └── /api/admin/...       (quản trị nội dung, cần quyền admin)  │
│                                                                   │
│  Cơ sở dữ liệu PostgreSQL (hoặc MySQL) — chỉ nghe nội bộ          │
└───────────────────────────────────────────────────────────────────┘
```

Lựa chọn công nghệ tương đương: **PHP (Laravel) + MySQL** (phổ biến với hosting Việt Nam), **Python (Django/FastAPI) + PostgreSQL**, **Node.js + MongoDB**. Hướng dẫn dưới đây dùng **Node.js + PostgreSQL**; các bước hạ tầng (tên miền, Nginx, SSL, sao lưu) giống nhau.

### Cấu trúc thư mục mô phỏng
```
ontaplichsudang/
├── frontend/                 # chính là website hiện tại (index.html, assets, data)
├── backend/
│   ├── package.json
│   ├── .env                  # KHÔNG đưa lên GitHub
│   ├── .env.example          # mẫu biến môi trường (được đưa lên)
│   ├── src/
│   │   ├── server.js         # khởi động Express
│   │   ├── db.js             # kết nối PostgreSQL
│   │   ├── routes/           # auth.js, progress.js, quiz.js, admin.js
│   │   └── middleware/       # kiểm tra đăng nhập (JWT), phân quyền
│   └── migrations/
│       └── 001_init.sql      # tạo bảng
└── deploy/
    ├── nginx.conf
    └── backup.sh
```

### Bảng dữ liệu mô phỏng (`migrations/001_init.sql`)
```sql
CREATE TABLE users (
  id            SERIAL PRIMARY KEY,
  email         VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,          -- mật khẩu đã băm (bcrypt), không lưu mật khẩu gốc
  full_name     VARCHAR(120),
  role          VARCHAR(20) DEFAULT 'student',  -- student | admin
  created_at    TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE syllabus_progress (
  user_id    INT REFERENCES users(id) ON DELETE CASCADE,
  issue_id   INT NOT NULL,                      -- vấn đề 1..40
  learned_at TIMESTAMPTZ DEFAULT now(),
  PRIMARY KEY (user_id, issue_id)
);

CREATE TABLE quiz_results (
  id          SERIAL PRIMARY KEY,
  user_id     INT REFERENCES users(id) ON DELETE CASCADE,
  set_id      INT NOT NULL,                     -- bộ đề 1..5
  score       NUMERIC(4,1) NOT NULL,            -- thang 10
  correct     INT NOT NULL,
  duration_s  INT NOT NULL,
  answers     JSONB NOT NULL,                   -- đáp án đã chọn
  created_at  TIMESTAMPTZ DEFAULT now()
);
CREATE INDEX idx_quiz_user ON quiz_results(user_id, created_at DESC);
```

### Biến môi trường mô phỏng (`backend/.env.example`)
```ini
NODE_ENV=production
PORT=3000
DATABASE_URL=postgresql://lsd_app:MAT_KHAU_MANH@127.0.0.1:5432/lichsudang
JWT_SECRET=chuoi_ngau_nhien_dai_it_nhat_32_ky_tu
CORS_ORIGIN=https://ontaplichsudang.id.vn
```
> File `.env` thật chứa mật khẩu — **tuyệt đối không commit** lên GitHub (thêm `backend/.env` vào `.gitignore`).

## C3. Ba phương án hosting

| | **Phương án 1: VPS** | **Phương án 2: PaaS + CSDL dịch vụ** | **Phương án 3: Shared hosting cPanel** |
|---|---|---|---|
| Ví dụ | VPS Việt Nam (Viettel IDC, VNPT, BKNS, Vietnix…) hoặc DigitalOcean, Vultr | Render / Railway / Fly.io + Supabase / Neon (PostgreSQL) | Hosting PHP + MySQL của Mắt Bão, PA, iNET… |
| Phù hợp | Toàn quyền, nhiều người dùng | Ít thao tác máy chủ, triển khai nhanh | Backend PHP/Laravel đơn giản |
| Mức khó | Cao (tự quản trị Linux) | Thấp – trung bình | Thấp |
| Chi phí tham khảo* | ~100.000–300.000đ/tháng | Có gói miễn phí giới hạn; gói trả phí ~5–25 USD/tháng | ~30.000–150.000đ/tháng |
| Tên miền | Trỏ bản ghi A về IP VPS | Trỏ CNAME theo hướng dẫn dịch vụ | Trỏ nameserver/A về hosting |

\* Giá tham khảo, thay đổi theo nhà cung cấp và cấu hình.

---

### Phương án 1 — VPS (Ubuntu 22.04/24.04) — chi tiết

**Bước 1. Thuê VPS và tên miền**
- VPS tối thiểu: 1–2 vCPU, 2 GB RAM, 25–40 GB SSD, Ubuntu LTS. Nhận **IP**, tài khoản `root`.
- Tên miền: mua như **Phần B2**.

**Bước 2. Trỏ tên miền về VPS** (trang quản lý DNS):

| Loại | Tên | Giá trị |
|---|---|---|
| A | `@` | `IP_CUA_VPS` |
| A | `www` | `IP_CUA_VPS` |

**Bước 3. Bảo mật máy chủ ban đầu**
```bash
ssh root@IP_CUA_VPS
adduser deploy && usermod -aG sudo deploy        # tạo người dùng riêng, không dùng root hằng ngày
apt update && apt upgrade -y
ufw allow OpenSSH && ufw allow 'Nginx Full' && ufw enable   # chỉ mở cổng 22, 80, 443
# Khuyên dùng: đăng nhập SSH bằng khóa (ssh-copy-id), sau đó tắt đăng nhập mật khẩu và đăng nhập root
```

**Bước 4. Cài phần mềm**
```bash
# Nginx + Certbot (SSL)
sudo apt install -y nginx certbot python3-certbot-nginx git
# Node.js LTS + PM2
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt install -y nodejs && sudo npm i -g pm2
# PostgreSQL
sudo apt install -y postgresql
```

**Bước 5. Tạo cơ sở dữ liệu**
```bash
sudo -u postgres psql
```
```sql
CREATE USER lsd_app WITH PASSWORD 'MAT_KHAU_MANH';
CREATE DATABASE lichsudang OWNER lsd_app;
\q
```
```bash
psql postgresql://lsd_app:MAT_KHAU_MANH@127.0.0.1:5432/lichsudang -f backend/migrations/001_init.sql
```
> PostgreSQL mặc định chỉ nghe `127.0.0.1` — **không mở cổng 5432 ra Internet**.

**Bước 6. Đưa mã nguồn lên máy chủ và chạy backend**
```bash
sudo mkdir -p /var/www/ontaplichsudang && sudo chown deploy: /var/www/ontaplichsudang
cd /var/www/ontaplichsudang
git clone https://github.com/KitMeii/OnTapLSDCS.git .
cd backend && npm ci --omit=dev
cp .env.example .env && nano .env          # điền mật khẩu CSDL, JWT_SECRET thật
pm2 start src/server.js --name lsd-api
pm2 save && pm2 startup                    # tự chạy lại khi máy chủ khởi động lại
```

**Bước 7. Cấu hình Nginx** — `/etc/nginx/sites-available/ontaplichsudang`
```nginx
server {
    listen 80;
    server_name ontaplichsudang.id.vn www.ontaplichsudang.id.vn;

    root /var/www/ontaplichsudang/frontend;   # giao diện tĩnh hiện tại
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /api/ {
        proxy_pass http://127.0.0.1:3000;     # backend Node.js
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location ~* \.(mp3|jpg|jpeg|png|svg|css|js)$ {
        expires 30d;                          # bộ nhớ đệm cho file tĩnh
        add_header Cache-Control "public";
    }

    client_max_body_size 10m;
}
```
```bash
sudo ln -s /etc/nginx/sites-available/ontaplichsudang /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
```

**Bước 8. Cấp SSL miễn phí (HTTPS)**
```bash
sudo certbot --nginx -d ontaplichsudang.id.vn -d www.ontaplichsudang.id.vn
# chọn chuyển hướng HTTP -> HTTPS; Certbot tự gia hạn (kiểm tra: sudo certbot renew --dry-run)
```

**Bước 9. Kiểm tra**
- `https://ontaplichsudang.id.vn` mở giao diện.
- `https://ontaplichsudang.id.vn/api/health` (endpoint kiểm tra sức khỏe backend) trả về `{"ok":true}`.
- `pm2 logs lsd-api` không có lỗi.

**Bước 10. Cập nhật phiên bản mới**
```bash
cd /var/www/ontaplichsudang && git pull
cd backend && npm ci --omit=dev
psql "$DATABASE_URL" -f migrations/00X_ten_thay_doi.sql   # nếu có thay đổi bảng
pm2 reload lsd-api
```
(Nâng cao: tự động hóa bằng GitHub Actions — push lên `main` thì tự SSH vào máy chủ chạy các lệnh trên.)

---

### Phương án 2 — PaaS + cơ sở dữ liệu dịch vụ

1. **Cơ sở dữ liệu:** tạo project trên **Supabase** hoặc **Neon** → lấy chuỗi kết nối `DATABASE_URL` → chạy `001_init.sql` trong SQL Editor.
2. **Backend:** trên **Render** (hoặc Railway): *New → Web Service* → kết nối repository GitHub → Root directory `backend` → Build `npm ci` → Start `node src/server.js` → thêm biến môi trường (`DATABASE_URL`, `JWT_SECRET`, `CORS_ORIGIN`). Nhận link dạng `https://lsd-api.onrender.com`.
3. **Frontend:** giữ trên **GitHub Pages / Netlify** như Phần A; trong JavaScript gọi API theo địa chỉ backend (ví dụ `https://api.ontaplichsudang.id.vn`).
4. **Tên miền:**

| Loại | Tên | Giá trị |
|---|---|---|
| A / CNAME | `@`, `www` | Theo Phần B3 (GitHub Pages) hoặc B4 (Netlify) |
| CNAME | `api` | `lsd-api.onrender.com` (địa chỉ Render cung cấp) |

   Trên Render: *Settings → Custom Domains → Add* `api.ontaplichsudang.id.vn` → HTTPS tự cấp.
5. **CORS:** backend chỉ cho phép `CORS_ORIGIN=https://ontaplichsudang.id.vn`.
6. Lưu ý gói miễn phí: dịch vụ có thể **"ngủ" khi không có truy cập** → lần mở đầu chậm vài chục giây; CSDL miễn phí giới hạn dung lượng — xem điều khoản trước khi dùng thật.

---

### Phương án 3 — Shared hosting cPanel (PHP + MySQL)

Phù hợp nếu viết backend bằng **PHP / Laravel**.
1. Mua gói hosting (kèm hoặc không kèm tên miền) → nhận tài khoản **cPanel**.
2. Tên miền: đổi **nameserver** về nameserver của hosting (hoặc trỏ bản ghi A về IP hosting).
3. cPanel → **MySQL® Databases**: tạo database, user, gán quyền → **phpMyAdmin**: import file `.sql` tạo bảng.
4. cPanel → **File Manager**: tải giao diện tĩnh vào `public_html/`; mã PHP API vào `public_html/api/` (Laravel: trỏ document root vào thư mục `public`).
5. Thông tin kết nối CSDL đặt trong file cấu hình nằm **ngoài** `public_html` (hoặc `.env` của Laravel).
6. cPanel → **SSL/TLS Status** → *Run AutoSSL* để bật HTTPS miễn phí.
7. Sao lưu: cPanel → **Backup** (tải bản sao lưu định kỳ về máy).

---

## C4. Sao lưu dữ liệu (bắt buộc khi có cơ sở dữ liệu)

`deploy/backup.sh` (Phương án 1):
```bash
#!/bin/bash
# Sao lưu PostgreSQL mỗi ngày, giữ 14 bản gần nhất
DIR=/home/deploy/backups; mkdir -p "$DIR"
pg_dump "postgresql://lsd_app:MAT_KHAU_MANH@127.0.0.1:5432/lichsudang" | gzip > "$DIR/lichsudang_$(date +%F).sql.gz"
ls -1t "$DIR"/lichsudang_*.sql.gz | tail -n +15 | xargs -r rm --
```
```bash
chmod +x deploy/backup.sh
crontab -e     # thêm dòng: chạy 2 giờ sáng mỗi ngày
0 2 * * * /var/www/ontaplichsudang/deploy/backup.sh
```
- Định kỳ **chép bản sao lưu ra nơi khác** (Google Drive, máy cá nhân, dịch vụ lưu trữ) — mất máy chủ thì vẫn còn dữ liệu.
- **Thử khôi phục** ít nhất 1 lần: `gunzip -c file.sql.gz | psql "$DATABASE_URL"` trên CSDL thử nghiệm.

## C5. Danh sách kiểm tra bảo mật

- [ ] HTTPS bắt buộc toàn trang (chuyển hướng HTTP → HTTPS).
- [ ] Mật khẩu người dùng **băm bằng bcrypt/argon2**; không lưu mật khẩu gốc.
- [ ] Truy vấn CSDL dùng **tham số hóa** (prepared statements / ORM) — chống SQL Injection.
- [ ] Hiển thị dữ liệu người dùng nhập luôn **escape HTML** — chống XSS (web hiện tại đã có hàm `esc`).
- [ ] API quản trị kiểm tra **quyền admin**; giới hạn số lần đăng nhập sai (rate limit).
- [ ] File `.env`, mật khẩu, khóa bí mật **không có trong GitHub**.
- [ ] Cổng CSDL không mở ra Internet; tường lửa chỉ mở 22/80/443.
- [ ] Cập nhật hệ điều hành và thư viện định kỳ (`apt upgrade`, `npm audit`).
- [ ] Sao lưu tự động + đã thử khôi phục.
- [ ] Theo dõi lỗi/nhật ký: `pm2 logs`, `/var/log/nginx/error.log`.

## C6. Lưu ý pháp lý khi website thu thập dữ liệu người dùng

- Khi có đăng ký tài khoản (email, họ tên…), website đang **xử lý dữ liệu cá nhân** — cần tìm hiểu và tuân thủ quy định hiện hành về bảo vệ dữ liệu cá nhân (Nghị định 13/2023/NĐ-CP và các văn bản cập nhật), tối thiểu: có **chính sách quyền riêng tư**, xin **đồng ý** của người dùng, chỉ thu thập dữ liệu cần thiết, cho phép người dùng xóa tài khoản.
- Website học tập cá nhân thông thường khác với **trang thông tin điện tử tổng hợp** (đăng lại tin tức của cơ quan báo chí) — loại sau có thể phải xin giấy phép theo quy định về quản lý dịch vụ Internet và thông tin trên mạng. Khi mở rộng tính năng, nên tham khảo quy định hiện hành hoặc hỏi ý kiến người có chuyên môn.
- Ghi rõ **nguồn** tư liệu, ảnh (website hiện tại đã ghi trong `assets/images/official/IMAGE_SOURCES.json` và chân trang).

## C7. So sánh nhanh 2 trường hợp thuê tên miền

| | **Trường hợp 1: Web tĩnh + tên miền (Phần B)** | **Trường hợp 2: Web có backend + CSDL + tên miền (Phần C)** |
|---|---|---|
| Phù hợp | Website hiện tại | Khi thêm đăng nhập, lưu kết quả, quản trị |
| Hosting | GitHub Pages / Netlify / Cloudflare Pages — **miễn phí** | VPS, PaaS hoặc shared hosting — **trả phí hằng tháng** (có gói miễn phí giới hạn) |
| Chi phí/năm tham khảo | Chỉ tiền tên miền | Tên miền + máy chủ (~1–4 triệu đồng/năm tùy phương án) |
| Bản ghi DNS | 4 bản ghi A (GitHub) + CNAME `www` | A về IP VPS, hoặc CNAME theo dịch vụ (thêm `api.` nếu tách backend) |
| SSL/HTTPS | Tự động (tích *Enforce HTTPS*) | Let's Encrypt (Certbot) / tự động trên PaaS / AutoSSL cPanel |
| Cập nhật | Commit → Push | `git pull` + cài thư viện + chạy migration + khởi động lại backend |
| Sao lưu | Mã nguồn đã có trên GitHub | **Bắt buộc** sao lưu CSDL định kỳ |
| Bảo mật cần lo | Rất ít | Mật khẩu, quyền truy cập, SQL Injection, XSS, tường lửa, cập nhật |
| Thời gian thiết lập | 15–30 phút (+ chờ DNS) | 2–8 giờ (tùy kinh nghiệm) |

---

### Liên hệ
© Vũ Nguyễn Tuấn Kiệt — tuankiet4225@gmail.com
