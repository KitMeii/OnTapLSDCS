// Nguồn ảnh chân dung duy nhất cho toàn site: ảnh chân dung chính thức (tulieuvankien.dangcongsan.vn), lưu local.
// Nguồn gốc từng ảnh: assets/images/official/IMAGE_SOURCES.json
window.PORTRAITS = {
 "Trần Phú": "assets/images/official/leader/tran-phu.jpg",
 "Lê Hồng Phong": "assets/images/official/leader/le-hong-phong.jpg",
 "Hà Huy Tập": "assets/images/official/leader/ha-huy-tap.jpg",
 "Nguyễn Văn Cừ": "assets/images/official/leader/nguyen-van-cu.jpg",
 "Trường Chinh": "assets/images/official/leader/truong-chinh.jpg",
 "Hồ Chí Minh": "assets/images/official/leader/ho-chi-minh.jpg",
 "Lê Duẩn": "assets/images/official/leader/le-duan.jpg",
 "Nguyễn Văn Linh": "assets/images/official/leader/nguyen-van-linh.jpg",
 "Đỗ Mười": "assets/images/official/leader/do-muoi.jpg",
 "Lê Khả Phiêu": "assets/images/official/leader/le-kha-phieu.jpg",
 "Nông Đức Mạnh": "assets/images/official/leader/nong-duc-manh.jpg",
 "Nguyễn Phú Trọng": "assets/images/official/leader/nguyen-phu-trong.jpg",
 "Tô Lâm": "assets/images/official/leader/to-lam.jpg",
 "Trần Cẩm Tú": "assets/images/official/leader/tran-cam-tu.jpg",
 "Trần Sỹ Thanh": "assets/images/official/leader/tran-sy-thanh.jpg",
 "Nguyễn Duy Ngọc": "assets/images/official/leader/nguyen-duy-ngoc.jpg",
 "Lê Minh Trí": "assets/images/official/leader/le-minh-tri.jpg",
 "Trịnh Văn Quyết": "assets/images/official/leader/trinh-van-quyet.jpg",
 "Nguyễn Thanh Nghị": "assets/images/official/leader/nguyen-thanh-nghi.jpg",
 "Nguyễn Hải Ninh": "assets/images/official/leader/nguyen-hai-ninh.jpg",
 "Trần Thanh Mẫn": "assets/images/official/leader/tran-thanh-man.jpg",
 "Lê Minh Hưng": "assets/images/official/leader/le-minh-hung.jpg",
 "Nguyễn Văn Quảng": "assets/images/official/leader/nguyen-van-quang.jpg",
 "Nguyễn Huy Tiến": "assets/images/official/leader/nguyen-huy-tien.jpg",
 "Nguyễn Hữu Nghĩa": "assets/images/official/leader/nguyen-huu-nghia.jpg",
 "Phan Văn Giang": "assets/images/official/leader/phan-van-giang.jpg",
 "Lương Tam Quang": "assets/images/official/leader/luong-tam-quang.jpg",
 "Lê Hoài Trung": "assets/images/official/leader/le-hoai-trung.jpg",
 "Nguyễn Tiến Hải": "assets/images/official/leader/nguyen-tien-hai.jpg",
 "Hoàng Thanh Tùng": "assets/images/official/leader/hoang-thanh-tung.jpg",
 "Ngô Văn Tuấn": "assets/images/official/leader/ngo-van-tuan.jpg",
 "Lê Mạnh Hùng": "assets/images/official/leader/le-manh-hung.jpg",
 "Trịnh Việt Hùng": "assets/images/official/leader/trinh-viet-hung.jpg",
 "Trần Hồng Minh": "assets/images/official/leader/tran-hong-minh.jpg",
 "Lâm Thị Phương Thanh": "assets/images/official/leader/lam-thi-phuong-thanh.jpg",
 "Vũ Hải Quân": "assets/images/official/leader/vu-hai-quan.jpg",
 "Hoàng Minh Sơn": "assets/images/official/leader/hoang-minh-son.jpg",
 "Đào Hồng Lan": "assets/images/official/leader/dao-hong-lan.jpg",
 "Nguyễn Đình Khang": "assets/images/official/leader/nguyen-dinh-khang.jpg",
 "Phạm Đức Ấn": "assets/images/official/leader/pham-duc-an.jpg",
 "Nguyễn Quốc Đoàn": "assets/images/official/leader/nguyen-quoc-doan.jpg",
 "Đặng Xuân Phong": "assets/images/official/leader/dang-xuan-phong.jpg",
 "Nguyễn Tân Cương": "assets/images/official/leader/nguyen-tan-cuong.jpg",
 "Nguyễn Trọng Nghĩa": "assets/images/official/leader/nguyen-trong-nghia.jpg",
 "Bùi Thị Minh Hoài": "assets/images/official/leader/bui-thi-minh-hoai.jpg",
 "Nguyễn Anh Tuấn": "assets/images/official/leader/nguyen-anh-tuan.jpg",
 "Lương Quốc Đoàn": "assets/images/official/leader/luong-quoc-doan.jpg",
 "Bùi Quang Huy": "assets/images/official/leader/bui-quang-huy.jpg",
 "Lê Thị Thủy": "assets/images/official/leader/le-thi-thuy.jpg",
 "Bế Xuân Trường": "assets/images/official/leader/be-xuan-truong.jpg"
};
window.portraitOf = function(name){
  name=String(name||"").replace(/^Đồng chí\s+/,"").trim();
  if(window.PORTRAITS[name]) return window.PORTRAITS[name];
  var s=name.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"").replace(/đ/g,"d").replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");
  return "assets/images/portraits/"+s+".svg";
};
window.portraitFallback = function(name){
  var s=String(name||"").replace(/^Đồng chí\s+/,"").trim().toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"").replace(/đ/g,"d").replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");
  return "assets/images/portraits/"+s+".svg";
};
