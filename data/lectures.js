// Kịch bản bài giảng audio cho từng thời kỳ (phần Lịch sử) – đủ ý chính, mỗi bài không quá 7 phút.
// Nội dung bám "Tài liệu Lịch sử Đảng CSVN 1930–2026 – Học thuật" (tai-lieu-du-an/tailieu), cập nhật 09/10/2026.
// Mỗi chương gắn với một khối trên trang (target) để tự cuộn + tô sáng khi nghe.
// target: hero | context | deep | dossiers | congress | movements | expert | declaration | results
// Sau khi sửa: chạy python tools/build_lectures.py và python tools/build_lectures.py --nam
window.LECTURES = {
'pre1930': {
 title:'1858–1930: Từ khủng hoảng đường lối cứu nước đến thành lập Đảng',
 chapters:[
  {title:'Mở đầu: một câu hỏi lớn',target:'hero',paras:[
   'Xin chào các bạn. Vì sao suốt hơn bảy mươi năm, từ khi thực dân Pháp nổ súng xâm lược năm 1858, biết bao phong trào yêu nước nổ ra, biết bao người con ưu tú ngã xuống, mà đất nước vẫn chưa thoát khỏi vòng nô lệ? Và vì sao đến mùa xuân năm 1930, cách mạng mới tìm được lối ra? Câu trả lời không nằm ở lòng yêu nước, mà ở hai chữ: đường lối và tổ chức.'
  ]},
  {title:'Bối cảnh: xã hội thuộc địa nửa phong kiến',target:'context',paras:[
   'Sau khi xâm lược, thực dân Pháp khai thác thuộc địa quy mô lớn. Về chính trị, chủ quyền quốc gia bị xâm phạm, bộ máy phong kiến bị đặt dưới sự chi phối của chính quyền thuộc địa. Về kinh tế, xuất hiện một số yếu tố tư bản chủ nghĩa nhưng nền kinh tế lệ thuộc, mất cân đối, phục vụ lợi ích tư bản Pháp. Về xã hội, chính sách giáo dục và cai trị làm phân hóa sâu sắc.',
   'Giai cấp địa chủ cấu kết với thực dân, nông dân bị bần cùng hóa, và giai cấp công nhân Việt Nam ra đời, chịu ba tầng áp bức nên có tinh thần cách mạng triệt để. Xã hội Việt Nam trở thành xã hội thuộc địa nửa phong kiến, với hai mâu thuẫn cơ bản: mâu thuẫn giữa toàn thể dân tộc Việt Nam với thực dân và tay sai, đây là mâu thuẫn nổi bật nhất; và mâu thuẫn giữa nông dân với địa chủ phong kiến. Yêu cầu lịch sử trước hết là giành lại độc lập.'
  ]},
  {title:'Những con đường cứu nước đi vào bế tắc',target:'movements',paras:[
   'Năm 1885, vua Hàm Nghi và Tôn Thất Thuyết ra Chiếu Cần Vương. Các cuộc khởi nghĩa Ba Đình, Bãi Sậy, Hương Khê rất anh dũng, nhưng ngọn cờ phong kiến đã lỗi thời nên lần lượt thất bại. Đầu thế kỷ hai mươi, khuynh hướng dân chủ tư sản xuất hiện: Phan Bội Châu với phong trào Đông Du, Phan Châu Trinh với cuộc vận động Duy Tân, Đông Kinh Nghĩa Thục, rồi Việt Nam Quốc dân Đảng với khởi nghĩa Yên Bái. Tất cả đều thất bại.',
   'Các bạn cần hiểu đúng: thất bại ấy không phủ định lòng yêu nước. Nó phản ánh giới hạn của những hệ tư tưởng và cách tổ chức chưa đủ sức tập hợp, lãnh đạo toàn dân. Đất nước rơi vào khủng hoảng sâu sắc về đường lối cứu nước và về lực lượng lãnh đạo, tình hình đen tối như không có đường ra.'
  ]},
  {title:'Nguyễn Ái Quốc tìm ra con đường mới',target:'deep',paras:[
   'Ngày 5 tháng 6 năm 1911, người thanh niên Nguyễn Tất Thành rời bến Nhà Rồng ra đi tìm đường cứu nước. Khác các bậc tiền bối, Người không cầu viện, mà khảo nghiệm thực tiễn ở nhiều nước, tiếp xúc phong trào công nhân và phong trào giải phóng dân tộc. Năm 1919, Người gửi Bản yêu sách của nhân dân An Nam tới Hội nghị Véc xây, đòi những quyền dân tộc và dân chủ tối thiểu.',
   'Mốc quyết định là tháng 7 năm 1920, khi Người đọc bản Sơ thảo lần thứ nhất những luận cương về vấn đề dân tộc và vấn đề thuộc địa của Lênin, tìm thấy con đường cách mạng vô sản. Tháng 12 năm ấy, tại Đại hội Tua, Người tán thành Quốc tế thứ ba, tham gia sáng lập Đảng Cộng sản Pháp, chuyển từ người yêu nước thành người cộng sản.',
   'Từ đó, Người chuẩn bị trên ba mặt. Thứ nhất, về tư tưởng: tham gia Hội Liên hiệp thuộc địa, viết cho báo Người cùng khổ, truyền bá chủ nghĩa Mác Lênin và phê phán chủ nghĩa thực dân. Thứ hai, về chính trị: xác lập các luận điểm về giải phóng dân tộc, lực lượng cách mạng, vai trò của Đảng và quan hệ với cách mạng thế giới. Thứ ba, về tổ chức: tháng 6 năm 1925, lập Hội Việt Nam Cách mạng Thanh niên tại Quảng Châu, mở lớp huấn luyện cán bộ, ra báo Thanh Niên, phát động phong trào vô sản hóa. Tác phẩm Đường Kách mệnh năm 1927 khẳng định: cách mạng trước hết phải có đảng cách mệnh, đảng có vững cách mệnh mới thành công.'
  ]},
  {title:'Hội nghị hợp nhất và Cương lĩnh chính trị đầu tiên',target:'dossiers',paras:[
   'Năm 1929, phong trào công nhân và yêu nước lên cao, ba tổ chức cộng sản ra đời: Đông Dương Cộng sản Đảng, An Nam Cộng sản Đảng và Đông Dương Cộng sản Liên đoàn. Đây là bước trưởng thành, nhưng các tổ chức hoạt động riêng rẽ, tranh giành ảnh hưởng. Yêu cầu bức thiết là thống nhất thành một đảng.',
   'Đầu năm 1930, tại Hương Cảng, Trung Quốc, Nguyễn Ái Quốc với tư cách phái viên Quốc tế Cộng sản chủ trì Hội nghị hợp nhất, thành lập Đảng Cộng sản Việt Nam, thông qua Chánh cương vắn tắt, Sách lược vắn tắt, Chương trình tóm tắt và Điều lệ vắn tắt. Ngày 3 tháng 2 năm 1930 được lấy làm ngày thành lập Đảng.',
   'Cương lĩnh chính trị đầu tiên xác định phương hướng: làm tư sản dân quyền cách mạng và thổ địa cách mạng để đi tới xã hội cộng sản. Nhiệm vụ: đánh đổ đế quốc và phong kiến, trong đó chống đế quốc, giành độc lập được đặt ở vị trí nổi bật. Lực lượng: công nhân và nông dân là nền tảng, đồng thời tập hợp, lôi kéo hoặc trung lập các tầng lớp khác. Lãnh đạo: Đảng Cộng sản là đội tiên phong. Quốc tế: cách mạng Việt Nam là một bộ phận của cách mạng thế giới. Giá trị lớn nhất là kết hợp mục tiêu giai cấp với yêu cầu dân tộc, vận dụng sáng tạo chủ nghĩa Mác Lênin vào điều kiện Việt Nam.'
  ]},
  {title:'Kết luận: ý nghĩa sự ra đời của Đảng',target:'results',paras:[
   'Đảng ra đời là kết quả kết hợp chủ nghĩa Mác Lênin với phong trào công nhân và phong trào yêu nước Việt Nam. Ý nghĩa cần nhớ: chấm dứt cuộc khủng hoảng kéo dài hơn hai phần ba thế kỷ về đường lối cứu nước và tổ chức lãnh đạo; xác lập vai trò lãnh đạo của giai cấp công nhân thông qua Đảng; gắn phong trào công nhân và phong trào yêu nước trong một tổ chức thống nhất; và đặt cơ sở đường lối cho toàn bộ cách mạng Việt Nam về sau.',
   'Khi làm bài tự luận, hãy trình bày theo mạch: bối cảnh, sự thất bại của các khuynh hướng cũ, vai trò chuẩn bị của Nguyễn Ái Quốc, Hội nghị thành lập Đảng, nội dung Cương lĩnh và ý nghĩa lịch sử.'
  ]}
 ]
},
'1930-1935': {
 title:'1930–1935: Cao trào 1930–1931 và khôi phục tổ chức',
 chapters:[
  {title:'Mở đầu: thử thách đầu tiên của Đảng',target:'hero',paras:[
   'Các bạn thân mến, một đảng vừa ra đời được thử thách không phải bằng lời tuyên bố, mà bằng thực tiễn đấu tranh. Chỉ vài tháng sau ngày thành lập, Đảng Cộng sản Việt Nam đã đứng trước thử thách ấy.'
  ]},
  {title:'Bối cảnh: khủng hoảng kinh tế và đời sống cùng cực',target:'context',paras:[
   'Từ năm 1929 đến 1933, đại khủng hoảng kinh tế thế giới lan đến Đông Dương. Thực dân Pháp trút gánh nặng lên nhân dân: tăng sưu thuế, sa thải công nhân, giá nông sản sụt mạnh. Nông dân mất ruộng, công nhân mất việc. Sau khởi nghĩa Yên Bái, thực dân tiến hành khủng bố trắng. Mâu thuẫn xã hội bị đẩy lên cực điểm, ngọn lửa đấu tranh chỉ chờ sự lãnh đạo.'
  ]},
  {title:'Cao trào 1930–1931 và Xô viết Nghệ Tĩnh',target:'movements',paras:[
   'Từ tháng 2 năm 1930, bãi công, biểu tình nổ ra khắp ba miền. Ngày 1 tháng 5 năm 1930, lần đầu tiên công nhân và nông dân Việt Nam kỷ niệm ngày Quốc tế Lao động trên quy mô cả nước.',
   'Đỉnh cao là ở Nghệ An và Hà Tĩnh. Tháng 9 năm 1930, hàng nghìn nông dân Hưng Nguyên biểu tình; thực dân cho máy bay ném bom nhưng phong trào không dừng lại. Ở nhiều làng xã, bộ máy chính quyền thực dân phong kiến tê liệt, nhân dân tự lập chính quyền theo kiểu Xô viết.',
   'Chính quyền Xô viết chia ruộng công cho dân nghèo, bỏ các thứ thuế vô lý, mở lớp dạy chữ quốc ngữ, bài trừ hủ tục. Cao trào cho thấy sức mạnh của liên minh công nông, khả năng tổ chức quần chúng và vai trò lãnh đạo thực tế của Đảng mới thành lập.'
  ]},
  {title:'Luận cương chính trị tháng 10 năm 1930',target:'dossiers',paras:[
   'Tháng 10 năm 1930, Hội nghị lần thứ nhất Ban Chấp hành Trung ương họp tại Hương Cảng, đổi tên Đảng thành Đảng Cộng sản Đông Dương, thông qua Luận cương chính trị do đồng chí Trần Phú chủ trì khởi thảo, và bầu đồng chí làm Tổng Bí thư đầu tiên.',
   'Luận cương xác định cách mạng Đông Dương trước hết là cách mạng tư sản dân quyền, có tính chất thổ địa và phản đế, sau đó tiến lên chủ nghĩa xã hội, bỏ qua thời kỳ tư bản chủ nghĩa; công nhân và nông dân là hai động lực chính; nhấn mạnh vai trò lãnh đạo của Đảng và phương pháp bạo lực cách mạng. Luận cương viết: vấn đề thổ địa là cái cốt của cách mạng tư sản dân quyền.',
   'Đây là chỗ các bạn phải đặc biệt chú ý. Luận cương có hạn chế: chưa đặt nhiệm vụ giải phóng dân tộc lên hàng đầu, nặng về đấu tranh giai cấp và cách mạng ruộng đất; đánh giá chưa đúng khả năng cách mạng của tiểu tư sản, tư sản dân tộc và một bộ phận địa chủ; chưa phát triển tư tưởng mặt trận dân tộc thống nhất. Nguyên nhân là chưa nắm vững đặc điểm xã hội thuộc địa và chịu ảnh hưởng khuynh hướng tả trong Quốc tế Cộng sản.',
   'So sánh nhanh: Cương lĩnh tháng 2 và Luận cương tháng 10 giống nhau ở mục tiêu chống đế quốc, phong kiến, vai trò của Đảng, công nông là lực lượng cơ bản. Nhưng Cương lĩnh nổi bật tư duy dân tộc và đoàn kết rộng rãi, phù hợp hơn với xã hội thuộc địa Việt Nam.'
  ]},
  {title:'Khủng bố trắng và Đại hội lần thứ nhất',target:'congress',paras:[
   'Từ năm 1931, thực dân đàn áp cực kỳ khốc liệt, hàng nghìn chiến sĩ bị bắt, bị giết. Tổng Bí thư Trần Phú hy sinh tháng 9 năm 1931, để lại lời nhắn: hãy giữ vững chí khí chiến đấu.',
   'Nhưng tổ chức Đảng không bị tiêu diệt. Trong nhà tù, các chiến sĩ biến nơi giam cầm thành trường học cách mạng. Từ năm 1932 đến 1935, Đảng kiên trì khôi phục cơ sở; năm 1934 lập Ban Chỉ huy ở ngoài. Tháng 3 năm 1935, Đại hội đại biểu lần thứ nhất của Đảng họp tại Ma Cao, đánh dấu việc phục hồi cơ quan lãnh đạo và phong trào sau tổn thất nặng nề, tạo tiền đề cho giai đoạn vận động mới.'
  ]},
  {title:'Kết luận: cuộc tổng diễn tập đầu tiên',target:'results',paras:[
   'Cao trào 1930 đến 1931 khẳng định đường lối và năng lực lãnh đạo của Đảng, hình thành trong thực tế khối liên minh công nông, và là cuộc tổng diễn tập đầu tiên cho Cách mạng Tháng Tám.',
   'Bài học: đường lối chỉ phát huy hiệu quả khi xuất phát từ mâu thuẫn chủ yếu và cấu trúc xã hội cụ thể của Việt Nam; sức mạnh cách mạng không chỉ ở tinh thần dũng cảm, mà còn ở khả năng bảo toàn lực lượng và xây dựng mặt trận rộng rãi.'
  ]}
 ]
},
'1936-1939': {
 title:'1936–1939: Phong trào dân chủ và nghệ thuật chuyển hướng sách lược',
 chapters:[
  {title:'Mở đầu: mục tiêu không đổi, sách lược linh hoạt',target:'hero',paras:[
   'Có một câu hỏi đề thi hay khai thác: vì sao những năm 1936 đến 1939, Đảng tạm gác khẩu hiệu đánh đổ đế quốc Pháp và tịch thu ruộng đất? Phải chăng Đảng đã đổi mục tiêu? Không. Đây là nghệ thuật lãnh đạo: mục tiêu chiến lược không đổi, nhưng nhiệm vụ trước mắt và sách lược phải linh hoạt theo tình hình.'
  ]},
  {title:'Bối cảnh: nguy cơ phát xít và thời cơ công khai',target:'context',paras:[
   'Chủ nghĩa phát xít lên cầm quyền ở Đức, Ý, Nhật, đe dọa chiến tranh thế giới. Đại hội lần thứ bảy Quốc tế Cộng sản năm 1935 chủ trương lập mặt trận nhân dân chống phát xít. Năm 1936, Mặt trận Nhân dân lên cầm quyền ở Pháp, nới rộng một số quyền tự do dân chủ ở thuộc địa, thả một số tù chính trị.',
   'Trong nước, đời sống nhân dân vẫn cực khổ, ai cũng khao khát cơm áo, tự do, dân chủ. Kẻ thù trước mắt, cụ thể nhất, là bọn phản động thuộc địa và tay sai.'
  ]},
  {title:'Hội nghị Trung ương tháng 7 năm 1936',target:'dossiers',paras:[
   'Tháng 7 năm 1936, Hội nghị Ban Chấp hành Trung ương họp ở Thượng Hải do đồng chí Lê Hồng Phong chủ trì. Mục tiêu chiến lược vẫn là chống đế quốc, chống phong kiến; nhưng nhiệm vụ trước mắt là chống phản động thuộc địa, chống phát xít, chống chiến tranh, đòi tự do, dân chủ, cơm áo và hòa bình.',
   'Để tập hợp lực lượng rộng rãi nhất, Đảng lập Mặt trận Thống nhất Nhân dân phản đế Đông Dương, năm 1938 đổi thành Mặt trận Dân chủ Đông Dương. Hình thức đấu tranh chuyển mạnh sang công khai, nửa công khai, hợp pháp, nửa hợp pháp, khai thác báo chí, mít tinh, nghị trường, kiến nghị, đồng thời vẫn giữ tổ chức bí mật của Đảng.'
  ]},
  {title:'Phong trào dân chủ sôi nổi',target:'movements',paras:[
   'Phong trào Đông Dương Đại hội lập các ủy ban hành động để thu thập nguyện vọng dân sinh, dân chủ. Tiếp đó là những cuộc đón rước phái viên Chính phủ Pháp, bãi công, biểu tình.',
   'Báo chí công khai của Đảng như Tiền Phong, Dân Chúng, Lao Động truyền bá chủ nghĩa Mác Lênin và đường lối của Đảng tới đông đảo quần chúng. Đảng đưa người ra tranh cử vào Viện dân biểu, Hội đồng quản hạt, dùng diễn đàn hợp pháp để bảo vệ quyền lợi nhân dân. Đỉnh cao là cuộc mít tinh ngày 1 tháng 5 năm 1938 tại khu Đấu xảo Hà Nội với khoảng hai vạn rưỡi người tham gia.'
  ]},
  {title:'Kết luận: cuộc tổng diễn tập thứ hai',target:'results',paras:[
   'Tháng 9 năm 1939, Chiến tranh thế giới thứ hai bùng nổ, thực dân Pháp quay lại đàn áp, phong trào kết thúc. Nhưng Đảng đã có một đội quân chính trị quần chúng hùng hậu, một lớp cán bộ đông đảo, kinh nghiệm xây dựng mặt trận và trưởng thành rõ rệt về nghệ thuật chỉ đạo. Vì vậy, phong trào dân chủ được coi là cuộc tổng diễn tập thứ hai cho Cách mạng Tháng Tám.',
   'Ba bài học sách lược các bạn cần nhớ. Một là, mục tiêu chiến lược và nhiệm vụ trước mắt không đồng nhất; phải chọn khâu tập hợp được lực lượng rộng nhất. Hai là, hình thức đấu tranh phải linh hoạt theo điều kiện chính trị cụ thể. Ba là, mặt trận rộng rãi không làm mất vai trò lãnh đạo, mà đòi hỏi Đảng phải có năng lực định hướng và tổ chức tốt hơn.'
  ]}
 ]
},
'1939-1945': {
 title:'1939–1945: Chuyển hướng chiến lược và Cách mạng Tháng Tám',
 chapters:[
  {title:'Mở đầu: mười lăm ngày làm nên lịch sử',target:'hero',paras:[
   'Tháng 8 năm 1945, chỉ trong khoảng mười lăm ngày, cả dân tộc vùng lên giành chính quyền trên toàn quốc. Nhưng thắng lợi ấy được chuẩn bị suốt mười lăm năm, đặc biệt là sáu năm chuyển hướng chiến lược đầy bản lĩnh.'
  ]},
  {title:'Bối cảnh: chiến tranh và ách hai tròng',target:'context',paras:[
   'Tháng 9 năm 1939, Chiến tranh thế giới thứ hai bùng nổ. Thực dân Pháp thi hành chính sách kinh tế chỉ huy, vơ vét sức người, sức của cho chiến tranh. Tháng 9 năm 1940, phát xít Nhật vào Đông Dương, Pháp cấu kết với Nhật, nhân dân ta chịu cảnh một cổ hai tròng.',
   'Mâu thuẫn giữa dân tộc Việt Nam với đế quốc, phát xít Pháp Nhật trở nên gay gắt. Nhiệm vụ dân sinh, dân chủ không còn đủ đáp ứng yêu cầu lịch sử; vấn đề sống còn là độc lập dân tộc.'
  ]},
  {title:'Ba Hội nghị Trung ương: 6, 7 và 8',target:'dossiers',paras:[
   'Hội nghị Trung ương 6, tháng 11 năm 1939, do Tổng Bí thư Nguyễn Văn Cừ chủ trì, mở đầu chuyển hướng: đặt nhiệm vụ giải phóng dân tộc lên hàng đầu, tạm gác khẩu hiệu cách mạng ruộng đất, thay khẩu hiệu chính quyền, lập Mặt trận thống nhất dân tộc phản đế Đông Dương. Hội nghị Trung ương 7, tháng 11 năm 1940, tiếp tục chuyển hướng, nhấn mạnh chuẩn bị khởi nghĩa vũ trang, duy trì lực lượng Bắc Sơn và hoãn khởi nghĩa Nam Kỳ khi điều kiện chưa chín muồi.',
   'Đỉnh cao là Hội nghị Trung ương 8, tháng 5 năm 1941, tại Pác Bó, Cao Bằng, do Nguyễn Ái Quốc chủ trì sau ba mươi năm Người trở về Tổ quốc. Hội nghị khẳng định: nếu không giải quyết được vấn đề dân tộc giải phóng, thì chẳng những toàn thể quốc gia dân tộc còn chịu mãi kiếp ngựa trâu, mà quyền lợi của bộ phận, giai cấp đến vạn năm cũng không đòi lại được.',
   'Thứ nhất, giải phóng dân tộc là nhiệm vụ trước hết, trên hết. Thứ hai, giải quyết vấn đề dân tộc trong khuôn khổ từng nước Đông Dương. Thứ ba, thành lập Mặt trận Việt Nam Độc lập Đồng minh, gọi tắt là Việt Minh, để đoàn kết toàn dân. Thứ tư, chuẩn bị khởi nghĩa vũ trang là nhiệm vụ trung tâm, đi từ khởi nghĩa từng phần tiến lên tổng khởi nghĩa. Chuỗi Trung ương 6, 7, 8 là ví dụ điển hình về điều chỉnh chiến lược dựa trên mâu thuẫn chủ yếu.'
  ]},
  {title:'Chuẩn bị lực lượng và cao trào kháng Nhật',target:'movements',paras:[
   'Mặt trận Việt Minh phát triển rộng khắp, căn cứ địa Việt Bắc được mở rộng. Ngày 22 tháng 12 năm 1944, Đội Việt Nam Tuyên truyền Giải phóng quân ra đời do đồng chí Võ Nguyên Giáp chỉ huy, hạt nhân của Quân đội nhân dân Việt Nam.',
   'Đêm 9 tháng 3 năm 1945, Nhật đảo chính Pháp. Ngày 12 tháng 3, Ban Thường vụ Trung ương ra Chỉ thị Nhật, Pháp bắn nhau và hành động của chúng ta, xác định phát xít Nhật là kẻ thù chính trước mắt, phát động cao trào kháng Nhật cứu nước, chuyển cách mạng sang thời kỳ tiền khởi nghĩa. Phong trào phá kho thóc cứu đói lan rộng, giữa lúc nạn đói làm khoảng hai triệu đồng bào chết đói.'
  ]},
  {title:'Chớp thời cơ: Tổng khởi nghĩa Tháng Tám',target:'expert',paras:[
   'Giữa tháng 8 năm 1945, Nhật đầu hàng Đồng minh. Bộ máy thống trị cũ tan rã, quân Đồng minh chưa kịp vào Đông Dương, phong trào cách mạng đã phát triển rộng. Đây là thời cơ ngàn năm có một.',
   'Hội nghị toàn quốc của Đảng ở Tân Trào từ ngày 13 đến 15 tháng 8 quyết định Tổng khởi nghĩa. Quốc dân Đại hội Tân Trào ngày 16 tháng 8 tán thành, lập Ủy ban Dân tộc giải phóng do Hồ Chí Minh làm Chủ tịch. Người kêu gọi: toàn quốc đồng bào hãy đứng dậy đem sức ta mà tự giải phóng cho ta.',
   'Ngày 19 tháng 8 giành chính quyền ở Hà Nội, ngày 23 tháng 8 ở Huế, ngày 25 tháng 8 ở Sài Gòn. Ngày 30 tháng 8, vua Bảo Đại thoái vị. Đến cuối tháng 8, chính quyền cách mạng cơ bản được thiết lập trong cả nước.'
  ]},
  {title:'Tuyên ngôn Độc lập',target:'declaration',paras:[
   'Ngày 2 tháng 9 năm 1945, tại Quảng trường Ba Đình, Chủ tịch Hồ Chí Minh đọc Tuyên ngôn Độc lập, khai sinh nước Việt Nam Dân chủ Cộng hòa. Tuyên ngôn mở đầu bằng quyền con người trong Tuyên ngôn Độc lập của Mỹ và Tuyên ngôn Nhân quyền và Dân quyền của Pháp, rồi nâng lên thành quyền dân tộc: tất cả các dân tộc trên thế giới đều sinh ra bình đẳng.',
   'Tuyên ngôn tố cáo tội ác của thực dân Pháp, khẳng định nhân dân ta giành chính quyền từ tay Nhật chứ không phải từ tay Pháp, bác bỏ cơ sở pháp lý cho việc tái lập chế độ thuộc địa, và kết thúc: nước Việt Nam có quyền hưởng tự do và độc lập, và sự thật đã thành một nước tự do, độc lập.'
  ]},
  {title:'Kết luận: nguyên nhân và ý nghĩa',target:'results',paras:[
   'Về khách quan, chiến thắng của Liên Xô và Đồng minh trước phát xít tạo thời cơ. Nhưng quyết định là nguyên nhân chủ quan: đường lối đúng với sự chuyển hướng kịp thời, quá trình chuẩn bị lâu dài qua các cao trào, khối đoàn kết toàn dân trong Mặt trận Việt Minh, và nghệ thuật chớp thời cơ.',
   'Thắng lợi đập tan ách thống trị thực dân hơn tám mươi năm và chế độ quân chủ, đưa nhân dân từ thân phận nô lệ thành người làm chủ, mở ra kỷ nguyên độc lập dân tộc gắn liền với chủ nghĩa xã hội. Bài học: chuẩn bị lâu dài phải đi cùng khả năng chớp thời cơ rất ngắn.'
  ]}
 ]
},
'1945-1954': {
 title:'1945–1954: Bảo vệ chính quyền và kháng chiến chống thực dân Pháp',
 chapters:[
  {title:'Mở đầu: ngàn cân treo sợi tóc',target:'hero',paras:[
   'Giành chính quyền đã khó, giữ chính quyền còn khó hơn. Ngay sau ngày độc lập, nước Việt Nam Dân chủ Cộng hòa rơi vào tình thế ngàn cân treo sợi tóc. Nhiệm vụ chuyển rất nhanh từ giành chính quyền sang giữ chính quyền, xây dựng chế độ mới và chuẩn bị kháng chiến.'
  ]},
  {title:'Bối cảnh: thù trong, giặc ngoài',target:'context',paras:[
   'Ở miền Bắc, gần hai mươi vạn quân Tưởng kéo vào cùng bọn tay sai. Ở miền Nam, quân Anh mở đường cho Pháp quay lại; ngày 23 tháng 9 năm 1945, Pháp nổ súng đánh chiếm Sài Gòn, nhân dân Nam Bộ đứng lên kháng chiến.',
   'Bên trong, nạn đói vừa qua, hơn chín mươi phần trăm dân số mù chữ, ngân khố gần như trống rỗng. Giặc đói, giặc dốt và giặc ngoại xâm cùng lúc đe dọa.'
  ]},
  {title:'Kháng chiến kiến quốc: giữ vững chính quyền',target:'dossiers',paras:[
   'Ngày 3 tháng 9 năm 1945, Chủ tịch Hồ Chí Minh nêu sáu nhiệm vụ cấp bách: chống đói, chống dốt, tổng tuyển cử, giáo dục tinh thần, bỏ thuế vô lý, tự do tín ngưỡng và đoàn kết lương giáo. Ngày 25 tháng 11, Trung ương ra Chỉ thị Kháng chiến kiến quốc, xác định kẻ thù chính là thực dân Pháp xâm lược, với bốn nhiệm vụ: củng cố chính quyền, chống thực dân Pháp, bài trừ nội phản, cải thiện đời sống nhân dân.',
   'Ngày 6 tháng 1 năm 1946, Tổng tuyển cử bầu Quốc hội đầu tiên; ngày 9 tháng 11 năm 1946, Hiến pháp đầu tiên được thông qua. Phong trào tăng gia sản xuất, hũ gạo cứu đói, Bình dân học vụ, Quỹ Độc lập, Tuần lễ Vàng lan khắp cả nước, tiền Việt Nam được phát hành.',
   'Về đối ngoại, ta hòa hoãn với Tưởng để tập trung chống Pháp ở miền Nam. Khi Pháp và Tưởng bắt tay nhau, ta ký Hiệp định Sơ bộ ngày 6 tháng 3 và Tạm ước ngày 14 tháng 9 năm 1946 với Pháp, đẩy quân Tưởng về nước, kéo dài hòa bình để củng cố lực lượng. Nguyên tắc: kiên định mục tiêu độc lập nhưng linh hoạt về sách lược.'
  ]},
  {title:'Toàn quốc kháng chiến và đường lối kháng chiến',target:'expert',paras:[
   'Thực dân Pháp liên tiếp gây hấn. Tối 19 tháng 12 năm 1946, cả nước bước vào kháng chiến với Lời kêu gọi của Chủ tịch Hồ Chí Minh: chúng ta thà hy sinh tất cả, chứ nhất định không chịu mất nước, nhất định không chịu làm nô lệ.',
   'Lời kêu gọi, Chỉ thị Toàn dân kháng chiến và tác phẩm Kháng chiến nhất định thắng lợi của Tổng Bí thư Trường Chinh tạo thành đường lối kháng chiến: toàn dân, toàn diện, trường kỳ, dựa vào sức mình là chính và tranh thủ ủng hộ quốc tế. Toàn dân, vì mỗi người dân là một chiến sĩ. Toàn diện, vì đánh địch trên mọi mặt quân sự, chính trị, kinh tế, văn hóa, ngoại giao. Trường kỳ, vì phải có thời gian chuyển hóa tương quan lực lượng.',
   'Cuộc chiến đấu sáu mươi ngày đêm ở Hà Nội làm thất bại ý đồ đánh nhanh thắng nhanh. Chiến thắng Việt Bắc thu đông năm 1947 bảo vệ cơ quan đầu não. Chiến dịch Biên giới thu đông năm 1950 khai thông biên giới, phá thế bao vây, giúp ta giành thế chủ động chiến lược trên chiến trường chính.'
  ]},
  {title:'Đại hội lần thứ hai của Đảng',target:'congress',paras:[
   'Tháng 2 năm 1951, Đại hội đại biểu toàn quốc lần thứ hai họp tại Chiêm Hóa, Tuyên Quang, đưa Đảng ra hoạt động công khai với tên Đảng Lao động Việt Nam; mỗi nước Việt Nam, Lào, Campuchia xây dựng đảng riêng phù hợp. Đồng chí Trường Chinh được bầu làm Tổng Bí thư.',
   'Chính cương xác định xã hội Việt Nam có ba tính chất: dân chủ nhân dân, một phần thuộc địa và nửa phong kiến. Cách mạng Việt Nam là cách mạng dân tộc dân chủ nhân dân, do giai cấp công nhân lãnh đạo, nhiệm vụ đánh đuổi đế quốc, xóa bỏ tàn tích phong kiến, thực hiện người cày có ruộng, tiến tới chủ nghĩa xã hội. Cải cách ruộng đất sau đó được đẩy mạnh để động viên nông dân, nhưng có sai lầm ở một số nơi và Đảng đã kiên quyết sửa sai.'
  ]},
  {title:'Điện Biên Phủ và Hiệp định Giơ ne vơ',target:'movements',paras:[
   'Năm 1953, Pháp với sự giúp sức của Mỹ đưa ra kế hoạch Nava. Bộ Chính trị mở cuộc tiến công Đông Xuân 1953 đến 1954, buộc địch phân tán lực lượng, rồi chọn Điện Biên Phủ, tập đoàn cứ điểm mạnh nhất Đông Dương, làm điểm quyết chiến chiến lược.',
   'Đại tướng Võ Nguyên Giáp chuyển phương châm từ đánh nhanh giải quyết nhanh sang đánh chắc tiến chắc. Từ ngày 13 tháng 3 đến 7 tháng 5 năm 1954, qua ba đợt tiến công, sau năm mươi sáu ngày đêm khoét núi, ngủ hầm, mưa dầm, cơm vắt, toàn bộ tập đoàn cứ điểm bị tiêu diệt.',
   'Ngày 21 tháng 7 năm 1954, Hiệp định Giơ ne vơ được ký, các nước cam kết tôn trọng độc lập, chủ quyền, thống nhất và toàn vẹn lãnh thổ ba nước Đông Dương. Miền Bắc hoàn toàn giải phóng, đất nước tạm thời bị chia cắt về quân sự.'
  ]},
  {title:'Kết luận: nguyên nhân thắng lợi và bài học',target:'results',paras:[
   'Năm nguyên nhân thắng lợi: đường lối chiến tranh nhân dân đúng đắn của Đảng; khối đoàn kết toàn dân trong mặt trận dân tộc thống nhất; lực lượng vũ trang ngày càng lớn mạnh; chính quyền dân chủ nhân dân được giữ vững; liên minh Việt, Lào, Campuchia cùng sự ủng hộ quốc tế.',
   'Lần đầu tiên một nước thuộc địa nhỏ đánh thắng một cường quốc thực dân. Bài học: giữ chính quyền đòi hỏi xác định đúng kẻ thù chính, tận dụng hòa hoãn để chuẩn bị lực lượng, và kết hợp chính trị, kinh tế, quân sự, ngoại giao ngay từ đầu.'
  ]}
 ]
},
'1954-1975': {
 title:'1954–1975: Hai chiến lược cách mạng, giải phóng miền Nam, thống nhất đất nước',
 chapters:[
  {title:'Mở đầu: một nước, hai miền, hai nhiệm vụ',target:'hero',paras:[
   'Sau Hiệp định Giơ ne vơ, đất nước tạm thời chia cắt. Làm sao vừa xây dựng chủ nghĩa xã hội ở miền Bắc, vừa giải phóng miền Nam trước đế quốc giàu mạnh nhất thế giới? Hai mươi mốt năm tiếp theo là câu trả lời đầy bản lĩnh của cả dân tộc.'
  ]},
  {title:'Bối cảnh: Mỹ thay chân Pháp',target:'context',paras:[
   'Miền Bắc được giải phóng, bước vào khôi phục kinh tế, cải tạo xã hội chủ nghĩa, xây dựng hậu phương. Ở miền Nam, Mỹ dựng chính quyền Ngô Đình Diệm, phá hoại hiệp thương tổng tuyển cử, âm mưu chia cắt lâu dài.',
   'Chính quyền Diệm thi hành chính sách tố cộng, diệt cộng. Những năm đầu, Đảng chủ trương đấu tranh chính trị, giữ gìn lực lượng; nhưng đến 1957, 1958, cách mạng miền Nam tổn thất nặng nề.'
  ]},
  {title:'Nghị quyết 15 và phong trào Đồng Khởi',target:'dossiers',paras:[
   'Tháng 1 năm 1959, Hội nghị Trung ương 15 khóa hai xác định con đường cơ bản của cách mạng miền Nam là dùng bạo lực cách mạng, khởi nghĩa giành chính quyền về tay nhân dân, từ đấu tranh chính trị tiến lên kết hợp đấu tranh chính trị với đấu tranh vũ trang.',
   'Phong trào Đồng Khởi bùng nổ, tiêu biểu ở Bến Tre từ ngày 17 tháng 1 năm 1960, với đội quân tóc dài nổi tiếng, rồi lan rộng khắp miền Nam. Ngày 20 tháng 12 năm 1960, Mặt trận Dân tộc Giải phóng miền Nam Việt Nam ra đời. Cách mạng miền Nam chuyển từ thế giữ gìn lực lượng sang thế tiến công.'
  ]},
  {title:'Đại hội lần thứ ba: đường lối hai chiến lược',target:'congress',paras:[
   'Tháng 9 năm 1960, Đại hội đại biểu toàn quốc lần thứ ba họp tại Hà Nội, đề ra đường lối tiến hành đồng thời hai chiến lược cách mạng: cách mạng xã hội chủ nghĩa ở miền Bắc và cách mạng dân tộc dân chủ nhân dân ở miền Nam.',
   'Điểm phải phân biệt rõ: cách mạng miền Bắc giữ vai trò quyết định nhất đối với toàn bộ cách mạng cả nước, vì là hậu phương lớn; cách mạng miền Nam giữ vai trò quyết định trực tiếp đối với giải phóng miền Nam. Hai chiến lược gắn bó mật thiết, cùng hướng tới thống nhất nước nhà. Chủ tịch Hồ Chí Minh tiếp tục là Chủ tịch Đảng, đồng chí Lê Duẩn được bầu làm Bí thư thứ nhất.'
  ]},
  {title:'Đánh bại từng chiến lược chiến tranh của Mỹ',target:'expert',paras:[
   'Từ 1961 đến 1965 là chiến tranh đặc biệt, dùng quân đội Sài Gòn làm lực lượng chủ yếu với cố vấn, vũ khí Mỹ, xương sống là ấp chiến lược. Chiến thắng Ấp Bắc năm 1963 và Bình Giã cuối năm 1964 làm chiến lược này phá sản.',
   'Từ năm 1965, Mỹ đưa quân viễn chinh vào, tiến hành chiến tranh cục bộ, đồng thời ném bom miền Bắc. Hội nghị Trung ương 11 và 12 năm 1965 nêu quyết tâm đánh thắng giặc Mỹ trong bất cứ tình huống nào. Miền Bắc vừa sản xuất, vừa chiến đấu, vừa chi viện miền Nam; Vạn Tường và hai mùa khô làm suy giảm ưu thế quân Mỹ. Chủ tịch Hồ Chí Minh khẳng định chân lý: không có gì quý hơn độc lập, tự do.',
   'Tết Mậu Thân năm 1968, Tổng tiến công và nổi dậy làm lung lay ý chí xâm lược của Mỹ, buộc Mỹ xuống thang và đàm phán ở Pa ri; đồng thời lực lượng ta cũng chịu tổn thất lớn, cần đánh giá cân bằng. Từ năm 1969, Mỹ chuyển sang Việt Nam hóa chiến tranh. Cuối năm 1972, quân dân miền Bắc đánh bại cuộc tập kích bằng B năm mươi hai suốt mười hai ngày đêm, làm nên Điện Biên Phủ trên không. Ngày 27 tháng 1 năm 1973, Hiệp định Pa ri được ký, Mỹ cam kết tôn trọng độc lập, chủ quyền, thống nhất, toàn vẹn lãnh thổ Việt Nam và rút quân.'
  ]},
  {title:'Đại thắng mùa Xuân 1975',target:'movements',paras:[
   'Sau Hiệp định Pa ri, Trung ương xác định tiếp tục giữ vững thế tiến công. Bộ Chính trị đề ra kế hoạch giải phóng miền Nam trong hai năm 1975 và 1976, nhưng nhấn mạnh nếu thời cơ đến thì giải phóng ngay trong năm 1975. Chiến thắng Phước Long đầu năm 1975 là phép thử chiến lược.',
   'Ngày 10 tháng 3, trận Buôn Ma Thuột mở màn Chiến dịch Tây Nguyên, hệ thống phòng thủ địch tan rã nhanh. Tiếp đó là chiến dịch Huế, Đà Nẵng, rồi Chiến dịch Hồ Chí Minh từ 26 đến 30 tháng 4 với tinh thần thần tốc, táo bạo, bất ngờ, chắc thắng. 11 giờ 30 phút ngày 30 tháng 4 năm 1975, Dinh Độc Lập bị chiếm, chính quyền Sài Gòn đầu hàng. Miền Nam hoàn toàn giải phóng, đất nước thống nhất.'
  ]},
  {title:'Kết luận: mốc son chói lọi nhất',target:'results',paras:[
   'Thắng lợi kết thúc hai mươi mốt năm chống Mỹ, ba mươi năm chiến tranh giải phóng, mở ra kỷ nguyên cả nước độc lập, thống nhất, đi lên chủ nghĩa xã hội. Nguyên nhân: đường lối độc lập, tự chủ, sáng tạo của Đảng; sự kết hợp hai miền và ba mặt trận quân sự, chính trị, ngoại giao; hậu phương lớn miền Bắc; sức mạnh đại đoàn kết dân tộc, liên minh ba nước Đông Dương và sự ủng hộ quốc tế.',
   'Bài học: kết hợp sức mạnh dân tộc với sức mạnh thời đại; nghệ thuật chiến lược nằm ở đánh giá đúng thời cơ và tương quan lực lượng. Năm 1975 là mẫu mực về nắm thời cơ và chỉ đạo chiến lược.'
  ]}
 ]
},
'1975-1986': {
 title:'1975–1986: Cả nước đi lên chủ nghĩa xã hội, tìm tòi con đường Đổi mới',
 chapters:[
  {title:'Mở đầu: thắng giặc rồi, xây dựng thế nào?',target:'hero',paras:[
   'Sau mùa Xuân 1975, câu hỏi đặt ra là: xây dựng một đất nước nghèo, vừa ra khỏi chiến tranh như thế nào? Mười năm 1975 đến 1986 là mười năm vừa xây dựng, vừa bảo vệ Tổ quốc, vừa vấp ngã và tự tìm ra con đường đúng.'
  ]},
  {title:'Bối cảnh: hậu quả chiến tranh và cơ chế cũ',target:'context',paras:[
   'Hậu quả chiến tranh rất nặng nề: hàng triệu người chết và bị thương, ruộng đồng, cầu cống bị tàn phá. Mỹ thi hành cấm vận, viện trợ bên ngoài giảm dần.',
   'Cả nước áp dụng cơ chế kế hoạch hóa tập trung, quan liêu, bao cấp vốn phù hợp thời chiến. Trong thời bình, cơ chế ấy bộc lộ hạn chế: giá cả, tiền lương, phân phối vật tư do mệnh lệnh hành chính; doanh nghiệp thiếu quyền tự chủ; người làm nhiều cũng như người làm ít; cơ chế xin cho; hàng hóa khan hiếm, phân phối bằng tem phiếu.'
  ]},
  {title:'Thống nhất nhà nước và Đại hội lần thứ tư',target:'congress',paras:[
   'Ngày 25 tháng 4 năm 1976, Tổng tuyển cử bầu Quốc hội chung. Ngày 2 tháng 7 năm 1976, Quốc hội đặt tên nước Cộng hòa xã hội chủ nghĩa Việt Nam, thủ đô Hà Nội, thống nhất hệ thống nhà nước và các biểu tượng quốc gia.',
   'Tháng 12 năm 1976, Đại hội đại biểu toàn quốc lần thứ tư đổi tên Đảng thành Đảng Cộng sản Việt Nam, bầu đồng chí Lê Duẩn làm Tổng Bí thư, đề ra đường lối cả nước đi lên chủ nghĩa xã hội, tiến hành đồng thời ba cuộc cách mạng về quan hệ sản xuất, khoa học kỹ thuật và tư tưởng văn hóa, trong đó cách mạng khoa học kỹ thuật là then chốt, đẩy mạnh công nghiệp hóa xã hội chủ nghĩa.',
   'Hạn chế cần nhớ: đường lối còn chủ quan, nóng vội, muốn tiến nhanh lên sản xuất lớn, ưu tiên công nghiệp nặng khi nguồn lực còn rất hạn chế, kéo dài cơ chế bao cấp.'
  ]},
  {title:'Bảo vệ Tổ quốc ở hai đầu biên giới',target:'expert',paras:[
   'Ở biên giới Tây Nam, tập đoàn Pôn Pốt liên tục tấn công. Quân dân ta phản công, cùng lực lượng cách mạng Campuchia giải phóng Phnôm Pênh ngày 7 tháng 1 năm 1979, cứu nhân dân Campuchia khỏi diệt chủng. Ngày 17 tháng 2 năm 1979, chiến tranh bảo vệ biên giới phía Bắc nổ ra; quân dân ta chiến đấu kiên cường bảo vệ chủ quyền.',
   'Chiến tranh và cấm vận làm tăng chi phí quốc phòng, nền kinh tế càng kiệt quệ. Nhưng lưu ý: yếu tố khách quan không thay thế việc nhìn nhận những hạn chế chủ quan trong quản lý kinh tế.'
  ]},
  {title:'Những bước tìm tòi đổi mới',target:'dossiers',paras:[
   'Hội nghị Trung ương 6 khóa bốn, họp tháng 8 năm 1979, nghị quyết ban hành tháng 9, chủ trương làm cho sản xuất bung ra, kết hợp kế hoạch với thị trường ở mức nhất định, kết hợp lợi ích Nhà nước, tập thể và cá nhân. Đây chưa phải đổi mới toàn diện nhưng là bước mở đầu tìm tòi đổi mới.',
   'Tháng 1 năm 1981, Ban Bí thư ra Chỉ thị 100 về khoán sản phẩm đến nhóm và người lao động trong hợp tác xã nông nghiệp. Người nông dân được hưởng phần vượt khoán, sản lượng tăng rõ rệt, tạo kinh nghiệm cho khoán mười sau này.',
   'Tháng 3 năm 1982, Đại hội lần thứ năm nhận thức thời kỳ quá độ là lâu dài, coi nông nghiệp là mặt trận hàng đầu, chú trọng hàng tiêu dùng và xuất khẩu, nhưng chưa đổi căn bản cơ chế. Tháng 6 năm 1985, Hội nghị Trung ương 8 khóa năm chủ trương xóa bao cấp trong giá, lương, tiền. Do thiếu đồng bộ, chưa kiểm soát bội chi và tiền tệ, cuộc tổng điều chỉnh tháng 9 năm 1985 thất bại, đẩy lạm phát năm 1986 lên khoảng bảy trăm bảy mươi tư phẩy bảy phần trăm.'
  ]},
  {title:'Kết luận: bài học từ khủng hoảng',target:'results',paras:[
   'Đến giữa thập niên tám mươi, đất nước khủng hoảng kinh tế xã hội trầm trọng. Chính khủng hoảng buộc Đảng nhìn thẳng vào sự thật. Từ khoán một trăm đến giá, lương, tiền là quá trình tích lũy nhận thức, chuẩn bị trực tiếp cho bước ngoặt Đại hội lần thứ sáu.',
   'Bài học: đường lối phát triển phải xuất phát từ thực tế và trình độ lực lượng sản xuất; cải cách không thể chỉ thay đổi giá hay tiền tệ mà phải đồng bộ thể chế, doanh nghiệp, tài chính và chính sách xã hội; đổi mới lớn thường bắt đầu từ sáng kiến của cơ sở, của nhân dân.'
  ]}
 ]
},
'1986-2001': {
 title:'1986–2001: Khởi xướng Đổi mới, Cương lĩnh 1991, đẩy mạnh công nghiệp hóa, hiện đại hóa',
 chapters:[
  {title:'Mở đầu: đổi mới hay là chết',target:'hero',paras:[
   'Có một câu nói rất nổi tiếng ở thời điểm này: đổi mới hay là chết. Năm 1986, lạm phát hàng trăm phần trăm, hàng hóa khan hiếm, đời sống vô cùng khó khăn. Trong hoàn cảnh ấy, Đảng đưa ra một quyết định mang tầm lịch sử.'
  ]},
  {title:'Bối cảnh: thế giới chuyển động, đất nước khủng hoảng',target:'context',paras:[
   'Cách mạng khoa học công nghệ phát triển mạnh, xu thế đối thoại thay đối đầu xuất hiện. Liên Xô và các nước xã hội chủ nghĩa tiến hành cải tổ, cải cách. Trong nước, khủng hoảng kinh tế xã hội lên đến đỉnh điểm. Không thể làm như cũ được nữa.'
  ]},
  {title:'Đại hội lần thứ sáu: bước ngoặt Đổi mới',target:'congress',paras:[
   'Tháng 12 năm 1986, Đại hội đại biểu toàn quốc lần thứ sáu với tinh thần nhìn thẳng vào sự thật, đánh giá đúng sự thật, nói rõ sự thật, đã tự phê bình nghiêm túc, chỉ ra sai lầm chủ quan, duy ý chí trong bố trí cơ cấu kinh tế, cải tạo xã hội chủ nghĩa, cơ chế quản lý và phân phối lưu thông. Đồng chí Nguyễn Văn Linh được bầu làm Tổng Bí thư.',
   'Đại hội đề ra đường lối đổi mới toàn diện, trước hết là đổi mới tư duy kinh tế: phát triển kinh tế hàng hóa nhiều thành phần; xóa bỏ cơ chế tập trung quan liêu bao cấp, chuyển sang hạch toán kinh doanh; thực hiện ba chương trình kinh tế lớn là lương thực thực phẩm, hàng tiêu dùng và hàng xuất khẩu; mở rộng kinh tế đối ngoại.',
   'Điều rất quan trọng: đổi mới không thay đổi mục tiêu chủ nghĩa xã hội, mà đổi phương thức, cơ chế và bước đi để thực hiện mục tiêu ấy hiệu quả hơn.'
  ]},
  {title:'Đổi mới đi vào cuộc sống',target:'dossiers',paras:[
   'Năm 1987, Luật Đầu tư nước ngoài mở kênh huy động vốn và công nghệ. Tháng 4 năm 1988, Bộ Chính trị ra Nghị quyết 10, khoán mười, thừa nhận hộ nông dân là đơn vị kinh tế tự chủ. Năm 1989, từ một nước thiếu lương thực, Việt Nam bắt đầu xuất khẩu gạo, lạm phát từng bước giảm. Cũng năm 1989, Việt Nam hoàn thành rút quân tình nguyện khỏi Campuchia, mở đường phá thế bao vây.',
   'Tháng 3 năm 1989, Hội nghị Trung ương 6 khóa sáu nêu năm nguyên tắc để đổi mới không chệch hướng: đi lên chủ nghĩa xã hội là con đường tất yếu; chủ nghĩa Mác Lênin là nền tảng tư tưởng; đổi mới hệ thống chính trị để tăng cường vai trò lãnh đạo của Đảng; xây dựng dân chủ xã hội chủ nghĩa; kết hợp chủ nghĩa yêu nước với chủ nghĩa quốc tế.'
  ]},
  {title:'Cương lĩnh 1991 và những bước tiến đối ngoại',target:'expert',paras:[
   'Tháng 6 năm 1991, giữa lúc Liên Xô và Đông Âu khủng hoảng sâu sắc, Đại hội lần thứ bảy thông qua Cương lĩnh xây dựng đất nước trong thời kỳ quá độ lên chủ nghĩa xã hội, với sáu đặc trưng của xã hội xã hội chủ nghĩa và các phương hướng cơ bản. Lần đầu tiên Đảng khẳng định lấy chủ nghĩa Mác Lênin và tư tưởng Hồ Chí Minh làm nền tảng tư tưởng, kim chỉ nam cho hành động. Đồng chí Đỗ Mười được bầu làm Tổng Bí thư.',
   'Về đối ngoại, Việt Nam muốn là bạn với tất cả các nước, chuyển sang đa dạng hóa, đa phương hóa. Năm 1991 bình thường hóa quan hệ với Trung Quốc; tháng 7 năm 1995 bình thường hóa quan hệ với Hoa Kỳ và gia nhập ASEAN. Tháng 1 năm 1994, Hội nghị giữa nhiệm kỳ cảnh báo bốn nguy cơ: tụt hậu xa hơn về kinh tế, chệch hướng xã hội chủ nghĩa, tham nhũng và tệ quan liêu, diễn biến hòa bình.'
  ]},
  {title:'Đại hội lần thứ tám: đẩy mạnh công nghiệp hóa',target:'results',paras:[
   'Tháng 6 năm 1996, Đại hội lần thứ tám đánh giá nước ta đã ra khỏi khủng hoảng kinh tế xã hội, nhiệm vụ chuẩn bị tiền đề cho công nghiệp hóa cơ bản hoàn thành, chuyển sang thời kỳ đẩy mạnh công nghiệp hóa, hiện đại hóa, phấn đấu đến năm 2020 cơ bản thành nước công nghiệp. Khủng hoảng tài chính châu Á 1997 làm tăng khó khăn nhưng không đảo ngược đổi mới.',
   'Bài học sau mười năm đổi mới: kiên định mục tiêu độc lập dân tộc và chủ nghĩa xã hội; đổi mới toàn diện nhưng có trọng tâm, kết hợp đổi mới kinh tế với đổi mới chính trị phù hợp; phát triển nhiều thành phần kinh tế đi đôi với vai trò quản lý của Nhà nước; xây dựng Đảng là then chốt; và tổng kết thực tiễn là nguồn gốc phát triển lý luận.'
  ]}
 ]
},
'2001-2011': {
 title:'2001–2011: Kinh tế thị trường định hướng xã hội chủ nghĩa và hội nhập quốc tế',
 chapters:[
  {title:'Mở đầu: bước vào thế kỷ mới',target:'hero',paras:[
   'Bước vào thế kỷ hai mươi mốt, Việt Nam đã có mười lăm năm Đổi mới. Câu hỏi giờ đây không còn là có đổi mới hay không, mà là: mô hình kinh tế của chúng ta là gì, và hội nhập sâu vào thế giới thì được gì, mất gì?'
  ]},
  {title:'Bối cảnh: toàn cầu hóa và cạnh tranh',target:'context',paras:[
   'Toàn cầu hóa kinh tế trở thành xu thế khách quan, cách mạng khoa học công nghệ, nhất là công nghệ thông tin, phát triển như vũ bão. Các nước trong khu vực cạnh tranh gay gắt để thu hút đầu tư. Trong nước, kinh tế tăng trưởng khá, nhưng năng suất, chất lượng và sức cạnh tranh còn thấp.'
  ]},
  {title:'Đại hội lần thứ chín và lần thứ mười',target:'congress',paras:[
   'Tháng 4 năm 2001, Đại hội lần thứ chín bầu đồng chí Nông Đức Mạnh làm Tổng Bí thư. Điểm nhấn lý luận: xác định kinh tế thị trường định hướng xã hội chủ nghĩa là mô hình kinh tế tổng quát của nước ta trong thời kỳ quá độ, phát huy nội lực đồng thời chủ động hội nhập kinh tế quốc tế.',
   'Nghĩa là nền kinh tế vận hành theo quy luật thị trường, có nhiều hình thức sở hữu, nhiều thành phần kinh tế, nhưng có sự quản lý của Nhà nước pháp quyền xã hội chủ nghĩa do Đảng lãnh đạo, hướng tới dân giàu, nước mạnh, dân chủ, công bằng, văn minh.',
   'Tháng 4 năm 2006, Đại hội lần thứ mười tiếp tục hoàn thiện thể chế kinh tế thị trường định hướng xã hội chủ nghĩa, chủ trương sớm đưa nước ta ra khỏi tình trạng kém phát triển, chủ động và tích cực hội nhập, đồng thời nhấn mạnh phòng chống tham nhũng, lãng phí.'
  ]},
  {title:'Gia nhập WTO: cơ hội và thử thách',target:'dossiers',paras:[
   'Ngày 11 tháng 1 năm 2007, Việt Nam trở thành thành viên thứ một trăm năm mươi của Tổ chức Thương mại Thế giới. Thị trường xuất khẩu mở rộng, vốn đầu tư nước ngoài đổ vào mạnh, cải cách pháp luật được thúc đẩy.',
   'Cùng với cơ hội là thử thách: doanh nghiệp trong nước cạnh tranh gay gắt ngay trên sân nhà; thách thức về chất lượng tăng trưởng, chênh lệch phát triển, môi trường và quản trị. Khủng hoảng tài chính toàn cầu cho thấy nền kinh tế đã gắn sâu với thế giới: lạm phát năm 2008 khoảng hai mươi ba phẩy mười hai phần trăm, năm 2011 khoảng mười tám phẩy sáu mươi tám phần trăm, buộc phải ưu tiên ổn định kinh tế vĩ mô.'
  ]},
  {title:'Kết luận: tăng trưởng phải đi cùng chất lượng',target:'results',paras:[
   'Thành tựu rõ nét: năm 2008, Việt Nam ra khỏi nhóm nước thu nhập thấp, trở thành nước thu nhập trung bình thấp; kinh tế tư nhân, xuất khẩu và công nghiệp chế biến mở rộng nhanh. Nhưng tham nhũng, quan liêu, suy thoái đạo đức và hiệu lực quản lý trở thành thách thức ngày càng rõ.',
   'Bài học: hội nhập phải đi cùng nâng cao nội lực, năng suất và sức chống chịu; tăng trưởng nhanh mà thiếu chất lượng sẽ tích tụ rủi ro. Bài học ấy dẫn tới các đột phá chiến lược và công cuộc chỉnh đốn Đảng của thập niên tiếp theo.'
  ]}
 ]
},
'2011-2021': {
 title:'2011–2021: Cương lĩnh 2011, ba đột phá chiến lược, xây dựng và chỉnh đốn Đảng',
 chapters:[
  {title:'Mở đầu: chọn điểm then chốt để bứt phá',target:'hero',paras:[
   'Khi nguồn lực có hạn mà việc phải làm rất nhiều, người lãnh đạo phải chọn đúng điểm then chốt để đột phá. Thập niên 2011 đến 2021 là thập niên của những đột phá chiến lược, và cũng là thập niên Đảng đặc biệt chú trọng tự chỉnh đốn chính mình.'
  ]},
  {title:'Đại hội lần thứ mười một và Cương lĩnh 2011',target:'congress',paras:[
   'Tháng 1 năm 2011, Đại hội lần thứ mười một bầu đồng chí Nguyễn Phú Trọng làm Tổng Bí thư, thông qua Cương lĩnh xây dựng đất nước trong thời kỳ quá độ lên chủ nghĩa xã hội, bổ sung, phát triển năm 2011, tổng kết hơn tám mươi năm cách mạng và hai mươi lăm năm đổi mới.',
   'Cương lĩnh nêu tám đặc trưng của xã hội xã hội chủ nghĩa, mở đầu bằng mục tiêu tổng quát: dân giàu, nước mạnh, dân chủ, công bằng, văn minh. So với sáu đặc trưng của Cương lĩnh 1991, có bổ sung quan trọng như Nhà nước pháp quyền xã hội chủ nghĩa của nhân dân, do nhân dân, vì nhân dân, và quan hệ hữu nghị, hợp tác với các nước. Cương lĩnh xác định tám phương hướng lớn và các mối quan hệ lớn: đổi mới, ổn định và phát triển; kinh tế thị trường và định hướng xã hội chủ nghĩa; tăng trưởng và công bằng xã hội; độc lập tự chủ và hội nhập quốc tế.'
  ]},
  {title:'Ba đột phá chiến lược',target:'dossiers',paras:[
   'Chiến lược 2011 đến 2020 xác định ba khâu đột phá. Một là, hoàn thiện thể chế kinh tế thị trường định hướng xã hội chủ nghĩa, trọng tâm là môi trường cạnh tranh bình đẳng và cải cách hành chính. Hai là, phát triển nhanh nguồn nhân lực, nhất là nhân lực chất lượng cao. Ba là, xây dựng hệ thống kết cấu hạ tầng đồng bộ.',
   'Thể chế đứng đầu vì được ví như điểm nghẽn của điểm nghẽn; ba đột phá như kiềng ba chân, nâng đỡ lẫn nhau. Năm 2013, Hiến pháp mới được thông qua, tiếp tục khẳng định quyền con người, quyền công dân và Nhà nước pháp quyền.'
  ]},
  {title:'Xây dựng, chỉnh đốn Đảng',target:'expert',paras:[
   'Tháng 1 năm 2016, Đại hội lần thứ mười hai nhìn lại ba mươi năm đổi mới, khẳng định đường lối đúng đắn, yêu cầu đồng bộ thể chế và nâng chất lượng tăng trưởng. Bốn trụ cột: phát triển kinh tế xã hội là trung tâm; xây dựng Đảng là then chốt; phát triển văn hóa, con người là nền tảng tinh thần; tăng cường quốc phòng, an ninh là trọng yếu, thường xuyên.',
   'Các nghị quyết Trung ương 4 khóa mười một và khóa mười hai về xây dựng, chỉnh đốn Đảng, ngăn chặn suy thoái tư tưởng chính trị, đạo đức, lối sống, tự diễn biến, tự chuyển hóa được thực hiện quyết liệt. Phòng, chống tham nhũng không có vùng cấm, không có ngoại lệ; kỷ luật, kiểm tra và kiểm soát quyền lực trở thành nội dung trọng tâm.'
  ]},
  {title:'Hội nhập thế hệ mới và thử thách đại dịch',target:'results',paras:[
   'Việt Nam tham gia các hiệp định thương mại tự do thế hệ mới như Hiệp định Đối tác Toàn diện và Tiến bộ xuyên Thái Bình Dương có hiệu lực năm 2019, Hiệp định với Liên minh châu Âu có hiệu lực năm 2020; đồng thời tái cơ cấu ngân hàng, doanh nghiệp nhà nước, đầu tư công. Lạm phát được kiểm soát, chỉ khoảng ba phẩy hai mươi ba phần trăm năm 2020.',
   'Năm 2020, đại dịch COVID mười chín là cú sốc lớn, nhưng Việt Nam vẫn tăng trưởng dương; yêu cầu chuyển đổi số và khả năng chống chịu trở nên cấp thiết. Bài học: đột phá chiến lược phải gắn với năng lực thực thi; phát triển kinh tế phải song hành với xây dựng Đảng và kiểm soát quyền lực.'
  ]}
 ]
},
'2021-2026': {
 title:'2021–2026: Khát vọng 2030–2045, khoa học công nghệ và tự chủ chiến lược',
 chapters:[
  {title:'Mở đầu: hai cột mốc một trăm năm',target:'hero',paras:[
   'Phía trước là hai cột mốc một trăm năm: năm 2030, một trăm năm thành lập Đảng, và năm 2045, một trăm năm thành lập nước. Làm thế nào để khát vọng một nước Việt Nam phát triển, thu nhập cao trở thành hiện thực? Đây là phần lịch sử đang được viết bởi chính thế hệ các bạn.'
  ]},
  {title:'Đại hội lần thứ mười ba: khơi dậy khát vọng',target:'congress',paras:[
   'Đại hội lần thứ mười ba họp từ 25 tháng 1 đến 1 tháng 2 năm 2021, tổng kết ba mươi lăm năm đổi mới, ba mươi năm Cương lĩnh 1991 và mười năm Cương lĩnh 2011. Mục tiêu: đến 2025 là nước đang phát triển có công nghiệp theo hướng hiện đại, vượt mức thu nhập trung bình thấp; đến 2030 có công nghiệp hiện đại, thu nhập trung bình cao; đến 2045 là nước phát triển, thu nhập cao.',
   'Đại hội nhấn mạnh khát vọng phát triển đất nước phồn vinh, hạnh phúc; phát triển dựa nhiều hơn vào khoa học công nghệ, đổi mới sáng tạo và chuyển đổi số; xây dựng thế trận lòng dân, bảo vệ Tổ quốc từ sớm, từ xa. Nhiệm kỳ bắt đầu giữa đại dịch: chính sách chuyển từ zero COVID sang thích ứng an toàn, linh hoạt, và đại dịch thúc đẩy chuyển đổi số mạnh mẽ.'
  ]},
  {title:'Bộ tứ chiến lược và tinh gọn bộ máy',target:'dossiers',paras:[
   'Tháng 8 năm 2024, đồng chí Tô Lâm được bầu làm Tổng Bí thư, nêu tinh thần kỷ nguyên vươn mình của dân tộc. Giai đoạn 2024 đến 2025 diễn ra cuộc sắp xếp, tinh gọn bộ máy với tinh thần tinh, gọn, mạnh, hiệu năng, hiệu lực, hiệu quả, cùng việc sắp xếp đơn vị hành chính và vận hành chính quyền địa phương hai cấp.',
   'Bộ tứ chiến lược gồm bốn nghị quyết. Nghị quyết 57 tháng 12 năm 2024 về khoa học, công nghệ, đổi mới sáng tạo và chuyển đổi số, yếu tố quyết định để phát triển. Nghị quyết 59 tháng 1 năm 2025 về hội nhập quốc tế, nâng tầm hội nhập sang chất lượng, hiệu quả, gắn với tự chủ chiến lược. Nghị quyết 66 tháng 4 năm 2025 về xây dựng và thi hành pháp luật, đột phá của đột phá. Nghị quyết 68 tháng 5 năm 2025 về kinh tế tư nhân, một động lực quan trọng nhất của nền kinh tế quốc gia. Cách nhớ: công nghệ, hội nhập, thể chế và khu vực tư nhân.'
  ]},
  {title:'Đại hội lần thứ mười bốn: tự chủ chiến lược',target:'expert',paras:[
   'Từ 19 đến 23 tháng 1 năm 2026, Đại hội lần thứ mười bốn họp tại Hà Nội với một nghìn năm trăm tám mươi sáu đại biểu, đại diện hơn năm triệu sáu trăm nghìn đảng viên, tổng kết bốn mươi năm đổi mới. Đồng chí Tô Lâm tiếp tục được bầu làm Tổng Bí thư.',
   'Đại hội nhấn mạnh tự chủ chiến lược, tự lực, tự cường, phát triển nhanh và bền vững; khoa học công nghệ, đổi mới sáng tạo, chuyển đổi số là động lực chính; kinh tế số, kinh tế xanh, kinh tế tuần hoàn. Mục tiêu 2026 đến 2030: tăng trưởng bình quân từ mười phần trăm mỗi năm trở lên, thu nhập bình quân đầu người khoảng tám nghìn năm trăm đô la Mỹ vào năm 2030, kinh tế số khoảng ba mươi phần trăm.',
   'Hiểu đúng: tự chủ không có nghĩa là khép kín, mà là nội lực mạnh để hội nhập sâu mà vẫn chống chịu được biến động. Sau Đại hội, các Hội nghị Trung ương 2, 3 và 4 khóa mười bốn tiếp tục cụ thể hóa nghị quyết; Hội nghị Trung ương 4, tháng 10 năm 2026, tập trung xây dựng, chỉnh đốn Đảng và hệ thống chính trị trong sạch, vững mạnh toàn diện.'
  ]},
  {title:'Kết luận: sợi chỉ đỏ xuyên suốt',target:'results',paras:[
   'Nhìn lại gần một trăm năm, sợi chỉ đỏ xuyên suốt là độc lập dân tộc gắn liền với chủ nghĩa xã hội. Đường lối chỉ đúng khi xuất phát từ thực tiễn và xác định đúng mâu thuẫn chủ yếu; sự lãnh đạo của Đảng được kiểm nghiệm ở năng lực tổ chức, tự điều chỉnh và sửa sai; sức mạnh dân tộc phát huy cao nhất khi kết hợp nội lực với sức mạnh thời đại; và đổi mới là quá trình liên tục.',
   'Như lời Bác Hồ dặn: dân ta phải biết sử ta, cho tường gốc tích nước nhà Việt Nam. Học lịch sử Đảng là để hiểu con đường đã đi và tự tin bước tiếp. Cảm ơn các bạn đã lắng nghe.'
  ]}
 ]
}
};
