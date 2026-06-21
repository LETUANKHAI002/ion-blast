// compounds.js — Cơ sở dữ liệu HỢP CHẤT cho Ion Blast

const COMPOUNDS = [
  // ===== EASY =====
  { id: "nacl", formula: "NaCl", name: "Natri clorua (muối ăn)",
    ions: [{ ionId: "na_plus", count: 1 }, { ionId: "cl_minus", count: 1 }],
    tier: "easy", score: 50, category_vi: "Muối vô cơ", fact: "Thành phần chính của muối ăn hằng ngày, dùng để nêm nếm thức ăn." },

  { id: "kcl", formula: "KCl", name: "Kali clorua",
    ions: [{ ionId: "k_plus", count: 1 }, { ionId: "cl_minus", count: 1 }],
    tier: "easy", score: 50, category_vi: "Muối vô cơ", fact: "Dùng làm phân bón kali trong nông nghiệp và chất thay thế muối ăn." },

  { id: "cao", formula: "CaO", name: "Canxi oxit (vôi sống)",
    ions: [{ ionId: "ca_2plus", count: 1 }, { ionId: "o_2minus", count: 1 }],
    tier: "easy", score: 50, category_vi: "Oxit vô cơ", fact: "Hợp chất hóa học được dùng phổ biến trong lò luyện kim, xử lý nước thải và xây dựng." },

  { id: "mgo", formula: "MgO", name: "Magie oxit",
    ions: [{ ionId: "mg_2plus", count: 1 }, { ionId: "o_2minus", count: 1 }],
    tier: "easy", score: 50, category_vi: "Oxit vô cơ", fact: "Một oxit có tính bazơ, dùng làm vật liệu chịu lửa trong lò luyện gang thép." },

  { id: "cacl2", formula: "CaCl₂", name: "Canxi clorua",
    ions: [{ ionId: "ca_2plus", count: 1 }, { ionId: "cl_minus", count: 2 }],
    tier: "easy", score: 70, category_vi: "Muối vô cơ", fact: "Chất hút ẩm cực mạnh, thường dùng để rải chống đóng băng mặt đường mùa đông." },

  { id: "kbr", formula: "KBr", name: "Kali bromua",
    ions: [{ ionId: "k_plus", count: 1 }, { ionId: "br_minus", count: 1 }],
    tier: "easy", score: 50, category_vi: "Muối vô cơ", fact: "Dùng làm thuốc chống co giật và an thần cho thú y." },

  { id: "h2o", formula: "H₂O", name: "Nước",
    ions: [{ ionId: "h_plus", count: 2 }, { ionId: "o_2minus", count: 1 }],
    tier: "easy", score: 60, category_vi: "Oxit vô cơ", fact: "Hợp chất của oxi và hidro, là dung môi vạn năng cần thiết cho sự sống." },

  { id: "mgcl2", formula: "MgCl₂", name: "Magie clorua",
    ions: [{ ionId: "mg_2plus", count: 1 }, { ionId: "cl_minus", count: 2 }],
    tier: "easy", score: 70, category_vi: "Muối vô cơ", fact: "Được chiết xuất nhiều từ nước biển sâu, dùng trong công nghiệp sản xuất kim loại magie." },

  { id: "bacl2", formula: "BaCl₂", name: "Bari clorua",
    ions: [{ ionId: "ba_2plus", count: 1 }, { ionId: "cl_minus", count: 2 }],
    tier: "easy", score: 70, category_vi: "Muối vô cơ", fact: "Một loại muối tan độc, dùng để kiểm tra sự có mặt của ion sunfat." },

  { id: "bao", formula: "BaO", name: "Bari oxit",
    ions: [{ ionId: "ba_2plus", count: 1 }, { ionId: "o_2minus", count: 1 }],
    tier: "easy", score: 50, category_vi: "Oxit vô cơ", fact: "Dùng trong sản xuất cathode của ống phóng tia điện tử (CRT)." },

  { id: "na2s", formula: "Na₂S", name: "Natri sunfua",
    ions: [{ ionId: "na_plus", count: 2 }, { ionId: "s_2minus", count: 1 }],
    tier: "easy", score: 70, category_vi: "Muối vô cơ", fact: "Có mùi trứng thối đặc trưng, dùng trong công nghiệp thuộc da và sản xuất bột giấy." },

  { id: "k2s", formula: "K₂S", name: "Kali sunfua",
    ions: [{ ionId: "k_plus", count: 2 }, { ionId: "s_2minus", count: 1 }],
    tier: "easy", score: 70, category_vi: "Muối vô cơ", fact: "Hình thành khi đốt pháo hoa hoặc bột thuốc súng, tỏa mùi lưu huỳnh đặc trưng." },

  { id: "nh4cl", formula: "NH₄Cl", name: "Amoni clorua (lạnh)",
    ions: [{ ionId: "nh4_plus", count: 1 }, { ionId: "cl_minus", count: 1 }],
    tier: "easy", score: 60, category_vi: "Muối vô cơ", fact: "Muối amoni khan, dùng làm chất trợ hàn kim loại và trong pin khô." },

  { id: "nabr", formula: "NaBr", name: "Natri bromua",
    ions: [{ ionId: "na_plus", count: 1 }, { ionId: "br_minus", count: 1 }],
    tier: "easy", score: 50, category_vi: "Muối vô cơ", fact: "Dùng làm thuốc chống co giật và chất sát trùng trong y khoa." },

  { id: "nh4br", formula: "NH₄Br", name: "Amoni bromua",
    ions: [{ ionId: "nh4_plus", count: 1 }, { ionId: "br_minus", count: 1 }],
    tier: "easy", score: 60, category_vi: "Muối vô cơ", fact: "Hợp chất tinh thể màu trắng, dùng trong ngành làm phim ảnh và làm chất chống cháy." },

  { id: "cabr2", formula: "CaBr₂", name: "Canxi bromua",
    ions: [{ ionId: "ca_2plus", count: 1 }, { ionId: "br_minus", count: 2 }],
    tier: "easy", score: 70, category_vi: "Muối vô cơ", fact: "Dùng nhiều trong dung dịch khoan dầu khí để tăng áp suất chất lỏng." },

  { id: "mgbr2", formula: "MgBr₂", name: "Magie bromua",
    ions: [{ ionId: "mg_2plus", count: 1 }, { ionId: "br_minus", count: 2 }],
    tier: "easy", score: 70, category_vi: "Muối vô cơ", fact: "Dùng làm chất điện phân trong tổng hợp hữu cơ Grignard." },

  { id: "babr2", formula: "BaBr₂", name: "Bari bromua",
    ions: [{ ionId: "ba_2plus", count: 1 }, { ionId: "br_minus", count: 2 }],
    tier: "easy", score: 70, category_vi: "Muối vô cơ", fact: "Có độc tính cao như các muối bari tan khác, dùng để tinh chế radium." },

  { id: "hbr", formula: "HBr", name: "Axit bromhidric",
    ions: [{ ionId: "h_plus", count: 1 }, { ionId: "br_minus", count: 1 }],
    tier: "easy", score: 60, category_vi: "Axit vô cơ", fact: "Một axit vô cơ rất mạnh, mạnh hơn cả axit clohidric." },

  { id: "na2o", formula: "Na₂O", name: "Natri oxit",
    ions: [{ ionId: "na_plus", count: 2 }, { ionId: "o_2minus", count: 1 }],
    tier: "easy", score: 60, category_vi: "Oxit vô cơ", fact: "Oxit bazơ cực mạnh, tác dụng mãnh liệt với nước tạo thành natri hidroxit." },

  { id: "k2o", formula: "K₂O", name: "Kali oxit",
    ions: [{ ionId: "k_plus", count: 2 }, { ionId: "o_2minus", count: 1 }],
    tier: "easy", score: 60, category_vi: "Oxit vô cơ", fact: "Chất rắn màu vàng nhạt, phản ứng mạnh với nước tạo kali hidroxit." },

  { id: "nh42s", formula: "(NH₄)₂S", name: "Amoni sunfua",
    ions: [{ ionId: "nh4_plus", count: 2 }, { ionId: "s_2minus", count: 1 }],
    tier: "easy", score: 70, category_vi: "Muối vô cơ", fact: "Thường dùng trong các trò đùa tinh quái vì có mùi trứng thối cực kỳ nồng." },

  { id: "cas", formula: "CaS", name: "Canxi sunfua",
    ions: [{ ionId: "ca_2plus", count: 1 }, { ionId: "s_2minus", count: 1 }],
    tier: "easy", score: 50, category_vi: "Muối vô cơ", fact: "Chất bột màu trắng, dùng trong sản xuất lân quang và sơn phát quang." },

  { id: "mgs", formula: "MgS", name: "Magie sunfua",
    ions: [{ ionId: "mg_2plus", count: 1 }, { ionId: "s_2minus", count: 1 }],
    tier: "easy", score: 50, category_vi: "Muối vô cơ", fact: "Hình thành trong quá trình sản xuất thép công nghiệp để loại bỏ lưu huỳnh." },

  { id: "bas", formula: "BaS", name: "Bari sunfua",
    ions: [{ ionId: "ba_2plus", count: 1 }, { ionId: "s_2minus", count: 1 }],
    tier: "easy", score: 50, category_vi: "Muối vô cơ", fact: "Nguyên chất có tính phát lân quang, dùng làm tiền chất sản xuất các hợp chất bari khác." },

  { id: "h2s", formula: "H₂S", name: "Dihidro sunfua (khí trứng thối)",
    ions: [{ ionId: "h_plus", count: 2 }, { ionId: "s_2minus", count: 1 }],
    tier: "easy", score: 60, category_vi: "Axit vô cơ", fact: "Khí không màu, mùi trứng thối đặc trưng, cực độc ở nồng độ cao." },

  // ===== MEDIUM =====
  { id: "naoh", formula: "NaOH", name: "Natri hidroxit (xút ăn da)",
    ions: [{ ionId: "na_plus", count: 1 }, { ionId: "oh_minus", count: 1 }],
    tier: "medium", score: 120, category_vi: "Bazơ vô cơ", fact: "Chất kiềm cực mạnh, dùng để tẩy dầu mỡ, sản xuất xà phòng và tơ nhân tạo." },

  { id: "caoh2", formula: "Ca(OH)₂", name: "Canxi hidroxit (vôi tôi)",
    ions: [{ ionId: "ca_2plus", count: 1 }, { ionId: "oh_minus", count: 2 }],
    tier: "medium", score: 130, category_vi: "Bazơ vô cơ", fact: "Được tạo ra khi vôi sống tác dụng với nước. Dùng để làm ngọt/khử chua đất nông nghiệp." },

  { id: "caco3", formula: "CaCO₃", name: "Canxi cacbonat (đá vôi)",
    ions: [{ ionId: "ca_2plus", count: 1 }, { ionId: "co3_2minus", count: 1 }],
    tier: "medium", score: 120, category_vi: "Muối vô cơ", fact: "Thành phần chính của đá vôi, đá phấn, đá cẩm thạch và vỏ của các loài sò ốc." },

  { id: "na2so4", formula: "Na₂SO₄", name: "Natri sunfat",
    ions: [{ ionId: "na_plus", count: 2 }, { ionId: "so4_2minus", count: 1 }],
    tier: "medium", score: 130, category_vi: "Muối vô cơ", fact: "Dùng để làm chất độn trong bột giặt, sản xuất thủy tinh và bột giấy Kraft." },

  { id: "alcl3", formula: "AlCl₃", name: "Nhôm clorua",
    ions: [{ ionId: "al_3plus", count: 1 }, { ionId: "cl_minus", count: 3 }],
    tier: "medium", score: 150, category_vi: "Muối vô cơ", fact: "Dùng làm chất xúc tác axit Lewis mạnh trong các phản ứng Friedel-Crafts hữu cơ." },

  { id: "kno3", formula: "KNO₃", name: "Kali nitrat (diêm tiêu)",
    ions: [{ ionId: "k_plus", count: 1 }, { ionId: "no3_minus", count: 1 }],
    tier: "medium", score: 120, category_vi: "Muối vô cơ", fact: "Diêm tiêu, thành phần của thuốc súng đen, chất bảo quản thịt và phân bón hóa học." },

  { id: "fe2so43", formula: "Fe₂(SO₄)₃", name: "Sắt(III) sunfat",
    ions: [{ ionId: "fe_3plus", count: 2 }, { ionId: "so4_2minus", count: 3 }],
    tier: "medium", score: 200, category_vi: "Muối vô cơ", fact: "Dùng làm chất kết tủa keo tụ để làm trong nước sinh hoạt và xử lý nước thải." },

  { id: "fecl2", formula: "FeCl₂", name: "Sắt(II) clorua",
    ions: [{ ionId: "fe_2plus", count: 1 }, { ionId: "cl_minus", count: 2 }],
    tier: "medium", score: 130, category_vi: "Muối vô cơ", fact: "Hợp chất có màu lục nhạt, dùng trong ngành nhuộm vải và xử lý nước chứa crom." },

  { id: "fecl3", formula: "FeCl₃", name: "Sắt(III) clorua",
    ions: [{ ionId: "fe_3plus", count: 1 }, { ionId: "cl_minus", count: 3 }],
    tier: "medium", score: 150, category_vi: "Muối vô cơ", fact: "Chất ăn mòn kim loại cực mạnh, dùng để khắc mạch điện tử in (PCB)." },

  { id: "cuso4", formula: "CuSO₄", name: "Đồng(II) sunfat (phèn xanh)",
    ions: [{ ionId: "cu_2plus", count: 1 }, { ionId: "so4_2minus", count: 1 }],
    tier: "medium", score: 130, category_vi: "Muối vô cơ", fact: "Hợp chất khan màu trắng, ngậm nước hóa xanh lam rực rỡ, dùng làm thuốc diệt nấm hại cây." },

  { id: "cuoh2", formula: "Cu(OH)₂", name: "Đồng(II) hidroxit",
    ions: [{ ionId: "cu_2plus", count: 1 }, { ionId: "oh_minus", count: 2 }],
    tier: "medium", score: 130, category_vi: "Bazơ vô cơ", fact: "Chất kết tủa màu xanh lam, tan trong amoniac tạo dung dịch màu xanh thẫm phức chất." },

  { id: "baso4", formula: "BaSO₄", name: "Bari sunfat",
    ions: [{ ionId: "ba_2plus", count: 1 }, { ionId: "so4_2minus", count: 1 }],
    tier: "medium", score: 130, category_vi: "Muối vô cơ", fact: "Chất kết tủa trắng tinh khiết, không tan trong axit, dùng làm chất cản quang khi chụp X-quang dạ dày." },

  { id: "mgso4", formula: "MgSO₄", name: "Magie sunfat (muối Epsom)",
    ions: [{ ionId: "mg_2plus", count: 1 }, { ionId: "so4_2minus", count: 1 }],
    tier: "medium", score: 130, category_vi: "Muối vô cơ", fact: "Còn gọi là muối Epsom, dùng làm thuốc tẩy rửa đường ruột, muối tắm thư giãn cơ bắp." },

  { id: "caso4", formula: "CaSO₄", name: "Canxi sunfat (thạch cao)",
    ions: [{ ionId: "ca_2plus", count: 1 }, { ionId: "so4_2minus", count: 1 }],
    tier: "medium", score: 130, category_vi: "Muối vô cơ", fact: "Thành phần chính của thạch cao, dùng làm vật liệu đúc tượng, bó bột chấn thương xương." },

  { id: "agcl", formula: "AgCl", name: "Bạc clorua",
    ions: [{ ionId: "ag_plus", count: 1 }, { ionId: "cl_minus", count: 1 }],
    tier: "medium", score: 130, category_vi: "Muối vô cơ", fact: "Kết tủa trắng hóa đen ngoài ánh sáng do bạc bị khử giải phóng, dùng làm giấy ảnh." },

  { id: "al2so43", formula: "Al₂(SO₄)₃", name: "Nhôm sunfat (phèn chua)",
    ions: [{ ionId: "al_3plus", count: 2 }, { ionId: "so4_2minus", count: 3 }],
    tier: "medium", score: 220, category_vi: "Muối vô cơ", fact: "Còn gọi là phèn nhôm, dùng rộng rãi trong lọc nước sinh hoạt và làm chất cắn màu nhuộm vải." },

  { id: "hcl", formula: "HCl", name: "Axit clohidric",
    ions: [{ ionId: "h_plus", count: 1 }, { ionId: "cl_minus", count: 1 }],
    tier: "medium", score: 100, category_vi: "Axit vô cơ", fact: "Axit mạnh trong dạ dày động vật giúp tiêu hóa thức ăn, được sản xuất đại trà trong công nghiệp." },

  { id: "h2so4", formula: "H₂SO₄", name: "Axit sunfuric",
    ions: [{ ionId: "h_plus", count: 2 }, { ionId: "so4_2minus", count: 1 }],
    tier: "medium", score: 140, category_vi: "Axit vô inorganic", fact: "Được mệnh danh là 'Hóa chất vua' vì là thước đo sản lượng công nghiệp của một quốc gia." },

  { id: "hno3", formula: "HNO₃", name: "Axit nitric",
    ions: [{ ionId: "h_plus", count: 1 }, { ionId: "no3_minus", count: 1 }],
    tier: "medium", score: 100, category_vi: "Axit vô cơ", fact: "Axit có tính oxi hóa mạnh, dùng sản xuất phân bón nitrat và thuốc nổ TNT." },

  { id: "h3po4", formula: "H₃PO₄", name: "Axit photphoric",
    ions: [{ ionId: "h_plus", count: 3 }, { ionId: "po4_3minus", count: 1 }],
    tier: "medium", score: 180, category_vi: "Axit vô cơ", fact: "Dùng để tạo vị chua thanh dịu trong các loại nước ngọt có ga như Cola." },

  { id: "na3po4", formula: "Na₃PO₄", name: "Natri photphat",
    ions: [{ ionId: "na_plus", count: 3 }, { ionId: "po4_3minus", count: 1 }],
    tier: "medium", score: 180, category_vi: "Muối vô cơ", fact: "Dùng làm chất tẩy rửa mạnh, chất làm mềm nước và phụ gia thực phẩm." },

  { id: "baco3", formula: "BaCO₃", name: "Bari cacbonat",
    ions: [{ ionId: "ba_2plus", count: 1 }, { ionId: "co3_2minus", count: 1 }],
    tier: "medium", score: 120, category_vi: "Muối vô cơ", fact: "Chất kết tủa trắng, dùng nhiều trong công nghệ sản xuất gốm sứ và thủy tinh quang học." },

  { id: "agno3", formula: "AgNO₃", name: "Bạc nitrat",
    ions: [{ ionId: "ag_plus", count: 1 }, { ionId: "no3_minus", count: 1 }],
    tier: "medium", score: 140, category_vi: "Muối vô cơ", fact: "Dùng tráng gương, làm phim ảnh truyền thống và sát trùng vết thương nhẹ." },

  { id: "koh", formula: "KOH", name: "Kali hidroxit",
    ions: [{ ionId: "k_plus", count: 1 }, { ionId: "oh_minus", count: 1 }],
    tier: "medium", score: 120, category_vi: "Bazơ vô cơ", fact: "Còn gọi là kiềm ăn da, dùng chế tạo xà phòng mềm và chất điện phân trong pin kiềm." },

  { id: "mgoh2", formula: "Mg(OH)₂", name: "Magie hidroxit",
    ions: [{ ionId: "mg_2plus", count: 1 }, { ionId: "oh_minus", count: 2 }],
    tier: "medium", score: 130, category_vi: "Bazơ vô cơ", fact: "Thành phần của sữa magie (milk of magnesia), dùng làm thuốc giảm tiết axit dịch vị dạ dày." },

  { id: "baoh2", formula: "Ba(OH)₂", name: "Bari hidroxit",
    ions: [{ ionId: "ba_2plus", count: 1 }, { ionId: "oh_minus", count: 2 }],
    tier: "medium", score: 130, category_vi: "Bazơ vô cơ", fact: "Một bazơ mạnh tan tốt, dùng trong hóa phân tích để chuẩn độ các axit yếu." },

  { id: "aloh3", formula: "Al(OH)₃", name: "Nhôm hidroxit",
    ions: [{ ionId: "al_3plus", count: 1 }, { ionId: "oh_minus", count: 3 }],
    tier: "medium", score: 150, category_vi: "Bazơ vô cơ", fact: "Dạng keo trắng đặc trưng, dùng làm chất chống cháy và chất hấp phụ trong y tế." },

  { id: "feoh2", formula: "Fe(OH)₂", name: "Sắt(II) hidroxit",
    ions: [{ ionId: "fe_2plus", count: 1 }, { ionId: "oh_minus", count: 2 }],
    tier: "medium", score: 130, category_vi: "Bazơ vô cơ", fact: "Kết tủa màu trắng lục nhạt, dễ bị oxi hóa ngoài không khí thành sắt(III) hidroxit màu nâu đỏ." },

  { id: "feoh3", formula: "Fe(OH)₃", name: "Sắt(III) hidroxit",
    ions: [{ ionId: "fe_3plus", count: 1 }, { ionId: "oh_minus", count: 3 }],
    tier: "medium", score: 150, category_vi: "Bazơ vô cơ", fact: "Chất kết tủa màu nâu đỏ, xuất hiện khi các muối sắt(III) gặp môi trường kiềm." },

  { id: "nh4oh", formula: "NH₄OH", name: "Amoni hidroxit",
    ions: [{ ionId: "nh4_plus", count: 1 }, { ionId: "oh_minus", count: 1 }],
    tier: "medium", score: 120, category_vi: "Bazơ vô cơ", fact: "Dung dịch amoniac trong nước, tỏa mùi khai cực mạnh, dùng làm chất tẩy rửa gia dụng." },

  { id: "na2co3", formula: "Na₂CO₃", name: "Natri cacbonat (soda)",
    ions: [{ ionId: "na_plus", count: 2 }, { ionId: "co3_2minus", count: 1 }],
    tier: "medium", score: 130, category_vi: "Muối vô cơ", fact: "Còn gọi là Soda ash, nguyên liệu thiết yếu để sản xuất thủy tinh, xà phòng và giấy." },

  { id: "k2co3", formula: "K₂CO₃", name: "Kali cacbonat",
    ions: [{ ionId: "k_plus", count: 2 }, { ionId: "co3_2minus", count: 1 }],
    tier: "medium", score: 130, category_vi: "Muối vô cơ", fact: "Dùng để sản xuất thủy tinh chuyên dụng, xà phòng lỏng và làm chất hút ẩm trong phòng thí nghiệm." },

  { id: "mgco3", formula: "MgCO₃", name: "Magie cacbonat",
    ions: [{ ionId: "mg_2plus", count: 1 }, { ionId: "co3_2minus", count: 1 }],
    tier: "medium", score: 120, category_vi: "Muối vô cơ", fact: "Chất bột màu trắng mịn, các vận động viên thường xoa vào tay để hút mồ hôi, tăng độ bám." },

  { id: "feco3", formula: "FeCO₃", name: "Sắt(II) cacbonat (siderit)",
    ions: [{ ionId: "fe_2plus", count: 1 }, { ionId: "co3_2minus", count: 1 }],
    tier: "medium", score: 130, category_vi: "Muối vô cơ", fact: "Khoáng vật siderit trong tự nhiên, là một nguồn quặng sắt quan trọng." },

  { id: "cuco3", formula: "CuCO₃", name: "Đồng(II) cacbonat",
    ions: [{ ionId: "cu_2plus", count: 1 }, { ionId: "co3_2minus", count: 1 }],
    tier: "medium", score: 130, category_vi: "Muối vô cơ", fact: "Muối màu xanh lục lục ngọc bảo, xuất hiện khi đồng bị ăn mòn ngoài không khí ẩm lâu ngày." },

  { id: "ag2co3", formula: "Ag₂CO₃", name: "Bạc cacbonat",
    ions: [{ ionId: "ag_plus", count: 2 }, { ionId: "co3_2minus", count: 1 }],
    tier: "medium", score: 140, category_vi: "Muối vô cơ", fact: "Nhạy cảm với ánh sáng, dùng làm thuốc thử trong tổng hợp hóa học hữu cơ." },

  { id: "nh42co3", formula: "(NH₄)₂CO₃", name: "Amoni cacbonat",
    ions: [{ ionId: "nh4_plus", count: 2 }, { ionId: "co3_2minus", count: 1 }],
    tier: "medium", score: 130, category_vi: "Muối vô cơ", fact: "Thành phần chính của muối ngửi (smelling salts) giúp kích thích tỉnh táo khi bị ngất xỉu." },

  { id: "k3po4", formula: "K₃PO₄", name: "Kali photphat",
    ions: [{ ionId: "k_plus", count: 3 }, { ionId: "po4_3minus", count: 1 }],
    tier: "medium", score: 180, category_vi: "Muối vô cơ", fact: "Chất xúc tác hữu hiệu trong một số phản ứng hữu cơ và làm chất dinh dưỡng cho phân bón." },

  { id: "ca3po42", formula: "Ca₃(PO₄)₂", name: "Canxi photphat",
    ions: [{ ionId: "ca_2plus", count: 3 }, { ionId: "po4_3minus", count: 2 }],
    tier: "medium", score: 250, category_vi: "Muối vô cơ", fact: "Thành phần chính chiếm 70% cấu trúc của xương và răng người." },

  { id: "mg3po42", formula: "Mg₃(PO₄)₂", name: "Magie photphat",
    ions: [{ ionId: "mg_2plus", count: 3 }, { ionId: "po4_3minus", count: 2 }],
    tier: "medium", score: 250, category_vi: "Muối vô cơ", fact: "Khoáng chất cần thiết cho cơ thể, dùng bổ sung magie trong dược phẩm dinh dưỡng." },

  { id: "ba3po42", formula: "Ba₃(PO₄)₂", name: "Bari photphat",
    ions: [{ ionId: "ba_2plus", count: 3 }, { ionId: "po4_3minus", count: 2 }],
    tier: "medium", score: 250, category_vi: "Muối vô cơ", fact: "Hợp chất kết tủa trắng, dùng làm nguyên liệu chế tạo phosphor trong đèn huỳnh quang." },

  { id: "alpo4", formula: "AlPO₄", name: "Nhôm photphat",
    ions: [{ ionId: "al_3plus", count: 1 }, { ionId: "po4_3minus", count: 1 }],
    tier: "medium", score: 180, category_vi: "Muối vô cơ", fact: "Dùng làm chất kết dính trong xi măng chịu nhiệt độ cao và trong chất phủ bề mặt kim loại." },

  { id: "fepo4", formula: "FePO₄", name: "Sắt(III) photphat",
    ions: [{ ionId: "fe_3plus", count: 1 }, { ionId: "po4_3minus", count: 1 }],
    tier: "medium", score: 180, category_vi: "Muối vô cơ", fact: "Hợp chất không tan, dùng làm thuốc diệt ốc sên thân thiện với môi trường trong nông nghiệp." },

  { id: "cu3po42", formula: "Cu₃(PO₄)₂", name: "Đồng(II) photphat",
    ions: [{ ionId: "cu_2plus", count: 3 }, { ionId: "po4_3minus", count: 2 }],
    tier: "medium", score: 250, category_vi: "Muối vô cơ", fact: "Một chất rắn màu xanh nhạt không tan, dùng làm chất màu vẽ và chất xúc tác tổng hợp hữu cơ." },

  { id: "ag3po4", formula: "Ag₃PO₄", name: "Bạc photphat",
    ions: [{ ionId: "ag_plus", count: 3 }, { ionId: "po4_3minus", count: 1 }],
    tier: "medium", score: 200, category_vi: "Muối vô cơ", fact: "Kết tủa màu vàng tươi đặc trưng, dùng để chỉ thị xác định sự hiện diện của ion photphat." },

  { id: "nh43po4", formula: "(NH₄)₃PO₄", name: "Amoni photphat",
    ions: [{ ionId: "nh4_plus", count: 3 }, { ionId: "po4_3minus", count: 1 }],
    tier: "medium", score: 180, category_vi: "Muối vô cơ", fact: "Một chất rắn tinh thể dễ tan, dùng làm thành phần chính trong phân bón phức hợp DAP." },

  { id: "nano3", formula: "NaNO₃", name: "Natri nitrat",
    ions: [{ ionId: "na_plus", count: 1 }, { ionId: "no3_minus", count: 1 }],
    tier: "medium", score: 120, category_vi: "Muối vô cơ", fact: "Còn gọi là diêm tiêu Chile, dùng làm chất bảo quản thực phẩm (thịt xông khói) và phân bón." },

  { id: "nh4no3", formula: "NH₄NO₃", name: "Amoni nitrat",
    ions: [{ ionId: "nh4_plus", count: 1 }, { ionId: "no3_minus", count: 1 }],
    tier: "medium", score: 120, category_vi: "Muối vô cơ", fact: "Là loại phân đạm cực tốt, nhưng cũng là thành phần chính của chất nổ công nghiệp ANFO." },

  { id: "cano32", formula: "Ca(NO₃)₂", name: "Canxi nitrat",
    ions: [{ ionId: "ca_2plus", count: 1 }, { ionId: "no3_minus", count: 2 }],
    tier: "medium", score: 130, category_vi: "Muối vô cơ", fact: "Dùng để xử lý nước thải nhằm ngăn chặn mùi hôi, và tăng tốc độ đông cứng của bê tông." },

  { id: "mgno32", formula: "Mg(NO₃)₂", name: "Magie nitrat",
    ions: [{ ionId: "mg_2plus", count: 1 }, { ionId: "no3_minus", count: 2 }],
    tier: "medium", score: 130, category_vi: "Muối vô cơ", fact: "Chất hút ẩm mạnh, dùng trong công nghiệp sản xuất axit nitric đậm đặc và thuốc pháo sáng." },

  { id: "bano32", formula: "Ba(NO₃)₂", name: "Bari nitrat",
    ions: [{ ionId: "ba_2plus", count: 1 }, { ionId: "no3_minus", count: 2 }],
    tier: "medium", score: 130, category_vi: "Muối vô cơ", fact: "Được dùng phổ biến trong pháo hoa để tạo hiệu ứng ánh sáng màu xanh lá cây rực rỡ." },

  { id: "alno33", formula: "Al(NO₃)₃", name: "Nhôm nitrat",
    ions: [{ ionId: "al_3plus", count: 1 }, { ionId: "no3_minus", count: 3 }],
    tier: "medium", score: 150, category_vi: "Muối vô cơ", fact: "Dùng làm chất cắn màu trong nhuộm vải và xúc tác trong quá trình lọc dầu mỏ." },

  { id: "feno32", formula: "Fe(NO₃)₂", name: "Sắt(II) nitrat",
    ions: [{ ionId: "fe_2plus", count: 1 }, { ionId: "no3_minus", count: 2 }],
    tier: "medium", score: 130, category_vi: "Muối vô cơ", fact: "Dùng làm chất xúc tác trong các phản ứng tổng hợp hữu cơ và tiền chất điều chế oxit sắt." },

  { id: "feno33", formula: "Fe(NO₃)₃", name: "Sắt(III) nitrat",
    ions: [{ ionId: "fe_3plus", count: 1 }, { ionId: "no3_minus", count: 3 }],
    tier: "medium", score: 150, category_vi: "Muối vô cơ", fact: "Dùng để nhuộm màu đồng thau, và xúc tác cho phản ứng ngưng tụ hữu cơ." },

  { id: "cuno32", formula: "Cu(NO₃)₂", name: "Đồng(II) nitrat",
    ions: [{ ionId: "cu_2plus", count: 1 }, { ionId: "no3_minus", count: 2 }],
    tier: "medium", score: 130, category_vi: "Muối vô cơ", fact: "Một chất rắn tinh thể màu xanh dương, phân hủy mạnh ở nhiệt độ cao tạo ra oxit đồng." },

  { id: "k2so4", formula: "K₂SO₄", name: "Kali sunfat",
    ions: [{ ionId: "k_plus", count: 2 }, { ionId: "so4_2minus", count: 1 }],
    tier: "medium", score: 130, category_vi: "Muối vô cơ", fact: "Phân bón kali chất lượng cao, thường được dùng cho các cây trồng nhạy cảm với clo." },

  { id: "nh42so4", formula: "(NH₄)₂SO₄", name: "Amoni sunfat (phân SA)",
    ions: [{ ionId: "nh4_plus", count: 2 }, { ionId: "so4_2minus", count: 1 }],
    tier: "medium", score: 130, category_vi: "Muối vô cơ", fact: "Còn gọi là phân SA, cung cấp đồng thời cả nitơ đạm và lưu huỳnh cho cây trồng." },

  { id: "feso4", formula: "FeSO₄", name: "Sắt(II) sunfat (thanh phèn)",
    ions: [{ ionId: "fe_2plus", count: 1 }, { ionId: "so4_2minus", count: 1 }],
    tier: "medium", score: 130, category_vi: "Muối vô cơ", fact: "Dùng bổ sung sắt trong y tế điều trị thiếu máu, và xử lý rong rêu trong công viên hồ nước." },

  { id: "ag2so4", formula: "Ag₂SO₄", name: "Bạc sunfat",
    ions: [{ ionId: "ag_plus", count: 2 }, { ionId: "so4_2minus", count: 1 }],
    tier: "medium", score: 140, category_vi: "Muối vô cơ", fact: "Hợp chất ít tan trong nước, dùng để tráng phim ảnh và phân tích COD của mẫu nước thải." },

  // ===== BROMIDES, OXIDES, SULFIDES (MEDIUM) =====
  { id: "cucl2", formula: "CuCl₂", name: "Đồng(II) clorua",
    ions: [{ ionId: "cu_2plus", count: 1 }, { ionId: "cl_minus", count: 2 }],
    tier: "medium", score: 130, category_vi: "Muối vô cơ", fact: "Muối màu nâu nhạt khi khan, ngậm nước hóa xanh lục lam, dùng làm chất xúc tác hữu cơ." },

  { id: "albr3", formula: "AlBr₃", name: "Nhôm bromua",
    ions: [{ ionId: "al_3plus", count: 1 }, { ionId: "br_minus", count: 3 }],
    tier: "medium", score: 150, category_vi: "Muối vô cơ", fact: "Axit Lewis rất mạnh, dùng làm chất xúc tác halogen hóa hữu cơ." },

  { id: "febr2", formula: "FeBr₂", name: "Sắt(II) bromua",
    ions: [{ ionId: "fe_2plus", count: 1 }, { ionId: "br_minus", count: 2 }],
    tier: "medium", score: 130, category_vi: "Muối vô cơ", fact: "Dùng làm chất xúc tác trong một số phản ứng trùng hợp hữu cơ." },

  { id: "febr3", formula: "FeBr₃", name: "Sắt(III) bromua",
    ions: [{ ionId: "fe_3plus", count: 1 }, { ionId: "br_minus", count: 3 }],
    tier: "medium", score: 150, category_vi: "Muối vô cơ", fact: "Chất xúc tác brom hóa vòng benzen cực kỳ hiệu quả." },

  { id: "cubr2", formula: "CuBr₂", name: "Đồng(II) bromua",
    ions: [{ ionId: "cu_2plus", count: 1 }, { ionId: "br_minus", count: 2 }],
    tier: "medium", score: 130, category_vi: "Muối vô cơ", fact: "Chất rắn màu đen, dùng trong phản ứng brom hóa các hợp chất carbonyl hữu cơ." },

  { id: "agbr", formula: "AgBr", name: "Bạc bromua",
    ions: [{ ionId: "ag_plus", count: 1 }, { ionId: "br_minus", count: 1 }],
    tier: "medium", score: 130, category_vi: "Muối vô cơ", fact: "Nhạy cảm với ánh sáng nhất trong các muối bạc, là chất cốt lõi của phim ảnh truyền thống." },

  { id: "al2o3", formula: "Al₂O₃", name: "Nhôm oxit (Alumina)",
    ions: [{ ionId: "al_3plus", count: 2 }, { ionId: "o_2minus", count: 3 }],
    tier: "medium", score: 180, category_vi: "Oxit vô cơ", fact: "Thành phần của hồng ngọc, lam ngọc và đá mài đánh bóng kim loại." },

  { id: "feo", formula: "FeO", name: "Sắt(II) oxit",
    ions: [{ ionId: "fe_2plus", count: 1 }, { ionId: "o_2minus", count: 1 }],
    tier: "medium", score: 130, category_vi: "Oxit vô cơ", fact: "Chất bột màu đen, dùng làm chất tạo màu đen cho thủy tinh và gốm sứ." },

  { id: "fe2o3", formula: "Fe₂O₃", name: "Sắt(III) oxit (gỉ sắt)",
    ions: [{ ionId: "fe_3plus", count: 2 }, { ionId: "o_2minus", count: 3 }],
    tier: "medium", score: 180, category_vi: "Oxit vô cơ", fact: "Quặng hematit màu đỏ nâu trong tự nhiên, thành phần chính của gỉ sắt." },

  { id: "cuo", formula: "CuO", name: "Đồng(II) oxit",
    ions: [{ ionId: "cu_2plus", count: 1 }, { ionId: "o_2minus", count: 1 }],
    tier: "medium", score: 130, category_vi: "Oxit vô cơ", fact: "Chất bột màu đen, dùng sản xuất men gốm màu xanh lá cây hoặc xanh dương." },

  { id: "ag2o", formula: "Ag₂O", name: "Bạc oxit",
    ions: [{ ionId: "ag_plus", count: 2 }, { ionId: "o_2minus", count: 1 }],
    tier: "medium", score: 140, category_vi: "Oxit vô cơ", fact: "Chất bột màu nâu đen nhạt, dùng trong các loại pin cúc áo oxit bạc." },

  { id: "al2s3", formula: "Al₂S₃", name: "Nhôm sunfua",
    ions: [{ ionId: "al_3plus", count: 2 }, { ionId: "s_2minus", count: 3 }],
    tier: "medium", score: 180, category_vi: "Muối vô cơ", fact: "Hợp chất nhạy nước, phản ứng mãnh liệt giải phóng khí H2S mùi thối đặc trưng." },

  { id: "fes", formula: "FeS", name: "Sắt(II) sunfua",
    ions: [{ ionId: "fe_2plus", count: 1 }, { ionId: "s_2minus", count: 1 }],
    tier: "medium", score: 130, category_vi: "Muối vô cơ", fact: "Chất rắn màu đen, dùng điều chế khí H2S trong các phòng thí nghiệm trường học." },

  { id: "fe2s3", formula: "Fe₂S₃", name: "Sắt(III) sunfua",
    ions: [{ ionId: "fe_3plus", count: 2 }, { ionId: "s_2minus", count: 3 }],
    tier: "medium", score: 180, category_vi: "Muối vô cơ", fact: "Chất rắn màu xanh đen đen không bền, bị phân hủy trong dung dịch nước nóng." },

  { id: "cus", formula: "CuS", name: "Đồng(II) sunfua",
    ions: [{ ionId: "cu_2plus", count: 1 }, { ionId: "s_2minus", count: 1 }],
    tier: "medium", score: 130, category_vi: "Muối vô cơ", fact: "Kết tủa đen cực kỳ bền vững, không tan kể cả trong axit clohidric và axit sunfuric loãng." },

  { id: "ag2s", formula: "Ag₂S", name: "Bạc sunfua",
    ions: [{ ionId: "ag_plus", count: 2 }, { ionId: "s_2minus", count: 1 }],
    tier: "medium", score: 140, category_vi: "Muối vô cơ", fact: "Thành phần lớp màng màu đen xuất hiện khi đồ dùng bằng bạc bị xỉn màu trong không khí." },

  { id: "h2o_acid_base", formula: "H₂O", name: "Nước (trung hòa)",
    ions: [{ ionId: "h_plus", count: 1 }, { ionId: "oh_minus", count: 1 }],
    tier: "medium", score: 60, category_vi: "Oxit vô cơ", fact: "Sản phẩm của phản ứng trung hòa trực tiếp giữa axit (H⁺) và bazơ (OH⁻)." },

  { id: "h2co3", formula: "H₂CO₃", name: "Axit cacbonic",
    ions: [{ ionId: "h_plus", count: 2 }, { ionId: "co3_2minus", count: 1 }],
    tier: "medium", score: 90, category_vi: "Axit vô cơ", fact: "Một axit yếu và kém bền, dễ dàng phân hủy thành khí cacbonic (CO₂) và nước." },

  // ===== HARD (hữu cơ) =====
  { id: "methanol", formula: "CH₃OH", name: "Metanol (cồn công nghiệp)",
    ions: [{ ionId: "ch3_plus", count: 1 }, { ionId: "oh_minus", count: 1 }],
    tier: "hard", score: 250, category_vi: "Ancol hữu cơ", fact: "Loại cồn cực độc, có thể gây mù lòa hoặc tử vong nếu uống nhầm rượu pha cồn công nghiệp." },

  { id: "ethanol", formula: "C₂H₅OH", name: "Etanol (cồn thực phẩm)",
    ions: [{ ionId: "c2h5_plus", count: 1 }, { ionId: "oh_minus", count: 1 }],
    tier: "hard", score: 250, category_vi: "Ancol hữu cơ", fact: "Thành phần chính của rượu bia bia, nước sát trùng y tế 70 độ và xăng sinh học E5." },

  { id: "formic_acid", formula: "HCOOH", name: "Axit formic (axit kiến)",
    ions: [{ ionId: "h_plus", count: 2 }, { ionId: "coo_org_2minus", count: 1 }],
    tier: "hard", score: 280, category_vi: "Axit hữu cơ", fact: "Chất độc có trong vòi chích của loài kiến rừng, gây bỏng rát đau nhức khi bị cắn." },

  { id: "acetic_acid", formula: "CH₃COOH", name: "Axit axetic (giấm ăn)",
    ions: [{ ionId: "ch3_plus", count: 1 }, { ionId: "coo_org_2minus", count: 1 }, { ionId: "h_plus", count: 1 }],
    tier: "hard", score: 280, category_vi: "Axit hữu cơ", fact: "Axit hữu cơ quen thuộc tạo nên vị chua thanh và mùi thơm đặc trưng của giấm ăn lên men." },

  { id: "propionic_acid", formula: "C₂H₅COOH", name: "Axit propionic",
    ions: [{ ionId: "c2h5_plus", count: 1 }, { ionId: "coo_org_2minus", count: 1 }, { ionId: "h_plus", count: 1 }],
    tier: "hard", score: 300, category_vi: "Axit hữu cơ", fact: "Axit carboxylic mạch 3 carbon, muối của nó dùng làm chất bảo quản chống mốc trong bánh mì." },

  { id: "sodium_acetate", formula: "CH₃COONa", name: "Natri axetat",
    ions: [{ ionId: "ch3_plus", count: 1 }, { ionId: "coo_org_2minus", count: 1 }, { ionId: "na_plus", count: 1 }],
    tier: "hard", score: 260, category_vi: "Muối hữu cơ", fact: "Dùng phổ biến trong túi sưởi tay hóa học (tỏa nhiệt khi kết tinh) và làm gia vị tạo vị giấm khoai tây." },

  { id: "potassium_acetate", formula: "CH₃COOK", name: "Kali axetat",
    ions: [{ ionId: "ch3_plus", count: 1 }, { ionId: "coo_org_2minus", count: 1 }, { ionId: "k_plus", count: 1 }],
    tier: "hard", score: 260, category_vi: "Muối hữu cơ", fact: "Dùng làm chất tan băng đường băng sân bay vì ít gây ăn mòn hơn các muối vô cơ clorua." },

  { id: "ammonium_acetate", formula: "CH₃COONH₄", name: "Amoni axetat",
    ions: [{ ionId: "ch3_plus", count: 1 }, { ionId: "coo_org_2minus", count: 1 }, { ionId: "nh4_plus", count: 1 }],
    tier: "hard", score: 260, category_vi: "Muối hữu cơ", fact: "Muối dễ bay hơi, dùng làm chất đệm trong sắc ký lỏng khối phổ (LC-MS)." },

  { id: "silver_acetate", formula: "CH₃COOAg", name: "Bạc axetat",
    ions: [{ ionId: "ch3_plus", count: 1 }, { ionId: "coo_org_2minus", count: 1 }, { ionId: "ag_plus", count: 1 }],
    tier: "hard", score: 270, category_vi: "Muối hữu cơ", fact: "Dùng trong y học làm thuốc cai thuốc lá (tạo vị khó chịu khi kết hợp với khói thuốc)." },

  { id: "sodium_formate", formula: "HCOONa", name: "Natri fomat",
    ions: [{ ionId: "h_plus", count: 1 }, { ionId: "coo_org_2minus", count: 1 }, { ionId: "na_plus", count: 1 }],
    tier: "hard", score: 260, category_vi: "Muối hữu cơ", fact: "Dùng làm chất trung hòa trong ngành dệt nhuộm và thuộc da." },

  { id: "potassium_formate", formula: "HCOOK", name: "Kali fomat",
    ions: [{ ionId: "h_plus", count: 1 }, { ionId: "coo_org_2minus", count: 1 }, { ionId: "k_plus", count: 1 }],
    tier: "hard", score: 260, category_vi: "Muối hữu cơ", fact: "Dùng làm dung dịch khoan thân thiện với môi trường trong thăm dò dầu khí." },

  { id: "sodium_propionate", formula: "C₂H₅COONa", name: "Natri propionat",
    ions: [{ ionId: "c2h5_plus", count: 1 }, { ionId: "coo_org_2minus", count: 1 }, { ionId: "na_plus", count: 1 }],
    tier: "hard", score: 270, category_vi: "Muối hữu cơ", fact: "Chất bảo quản thực phẩm chống nấm mốc phổ biến trong các loại bánh ngọt và bánh mì." },

  { id: "potassium_propionate", formula: "C₂H₅COOK", name: "Kali propionat",
    ions: [{ ionId: "c2h5_plus", count: 1 }, { ionId: "coo_org_2minus", count: 1 }, { ionId: "k_plus", count: 1 }],
    tier: "hard", score: 270, category_vi: "Muối hữu cơ", fact: "Dùng làm chất bảo quản thực phẩm (mã số E283) chống vi khuẩn và nấm mốc." },

  { id: "calcium_acetate", formula: "(CH₃COO)₂Ca", name: "Canxi axetat",
    ions: [{ ionId: "ch3_plus", count: 2 }, { ionId: "coo_org_2minus", count: 2 }, { ionId: "ca_2plus", count: 1 }],
    tier: "hard", score: 320, category_vi: "Muối hữu cơ", fact: "Tiền chất cổ xưa để điều chế axeton bằng cách nhiệt phân khô Canxi axetat." },

  { id: "magnesium_acetate", formula: "(CH₃COO)₂Mg", name: "Magie axetat",
    ions: [{ ionId: "ch3_plus", count: 2 }, { ionId: "coo_org_2minus", count: 2 }, { ionId: "mg_2plus", count: 1 }],
    tier: "hard", score: 320, category_vi: "Muối hữu cơ", fact: "Dùng bổ sung magie sinh học và làm nguồn canxi-magie acetate chống đóng băng đường." },

  { id: "iron_ii_acetate", formula: "(CH₃COO)₂Fe", name: "Sắt(II) axetat",
    ions: [{ ionId: "ch3_plus", count: 2 }, { ionId: "coo_org_2minus", count: 2 }, { ionId: "fe_2plus", count: 1 }],
    tier: "hard", score: 320, category_vi: "Muối hữu cơ", fact: "Dùng làm chất gắn màu (mordant) trong ngành nhuộm và sản xuất mực sắt cổ điển." },

  { id: "copper_ii_acetate", formula: "(CH₃COO)₂Cu", name: "Đồng(II) axetat",
    ions: [{ ionId: "ch3_plus", count: 2 }, { ionId: "coo_org_2minus", count: 2 }, { ionId: "cu_2plus", count: 1 }],
    tier: "hard", score: 320, category_vi: "Muối hữu cơ", fact: "Tinh thể màu xanh lục lam tuyệt đẹp, dùng làm chất diệt nấm và chất xúc tác tổng hợp hữu cơ." },

  { id: "methyl_formate", formula: "HCOOCH₃", name: "Metyl fomat",
    ions: [{ ionId: "h_plus", count: 1 }, { ionId: "coo_org_2minus", count: 1 }, { ionId: "ch3_plus", count: 1 }],
    tier: "hard", score: 280, category_vi: "Este hữu cơ", fact: "Este đơn giản nhất, có mùi dễ chịu, dùng làm chất tạo bọt xốp polyurethane." },

  { id: "ethyl_formate", formula: "HCOOC₂H₅", name: "Etyl fomat",
    ions: [{ ionId: "h_plus", count: 1 }, { ionId: "coo_org_2minus", count: 1 }, { ionId: "c2h5_plus", count: 1 }],
    tier: "hard", score: 280, category_vi: "Este hữu cơ", fact: "Tạo nên mùi thơm đặc trưng của quả mâm xôi và được phát hiện thấy trong các đám mây bụi ở trung tâm dải Ngân Hà." },

  { id: "methyl_acetate", formula: "CH₃COOCH₃", name: "Metyl axetat",
    ions: [{ ionId: "ch3_plus", count: 2 }, { ionId: "coo_org_2minus", count: 1 }],
    tier: "hard", score: 280, category_vi: "Este hữu cơ", fact: "Dung môi dễ bay hơi có mùi thơm nhẹ như sơn móng tay, dùng trong sản xuất keo dán và chất tẩy sơn." },

  { id: "ethyl_acetate", formula: "CH₃COOC₂H₅", name: "Etyl axetat",
    ions: [{ ionId: "ch3_plus", count: 1 }, { ionId: "c2h5_plus", count: 1 }, { ionId: "coo_org_2minus", count: 1 }],
    tier: "hard", score: 280, category_vi: "Este hữu cơ", fact: "Dung môi hữu cơ phổ biến, có mùi trái cây ngọt ngào dễ chịu giống như mùi quả lê." },

  { id: "ethyl_propionate", formula: "C₂H₅COOC₂H₅", name: "Etyl propionat",
    ions: [{ ionId: "c2h5_plus", count: 2 }, { ionId: "coo_org_2minus", count: 1 }],
    tier: "hard", score: 300, category_vi: "Este hữu cơ", fact: "Este có mùi thơm của dứa, dùng làm hương liệu nhân tạo trong thực phẩm." },

  { id: "methyl_chloride", formula: "CH₃Cl", name: "Metyl clorua (Clorometan)",
    ions: [{ ionId: "ch3_plus", count: 1 }, { ionId: "cl_minus", count: 1 }],
    tier: "hard", score: 200, category_vi: "Dẫn xuất halogen", fact: "Từng được sử dụng rộng rãi làm chất làm lạnh, nhưng đã bị cấm do độc tính và phá hủy tầng ozone." },

  { id: "ethyl_chloride", formula: "C₂H₅Cl", name: "Etyl clorua (Cloroetan)",
    ions: [{ ionId: "c2h5_plus", count: 1 }, { ionId: "cl_minus", count: 1 }],
    tier: "hard", score: 200, category_vi: "Dẫn xuất halogen", fact: "Được dùng làm chất gây tê tại chỗ dạng xịt lạnh trong y tế thể thao." },

  { id: "methyl_bromide", formula: "CH₃Br", name: "Metyl bromua (Bromometan)",
    ions: [{ ionId: "ch3_plus", count: 1 }, { ionId: "br_minus", count: 1 }],
    tier: "hard", score: 200, category_vi: "Dẫn xuất halogen", fact: "Chất xông trùng đất nông nghiệp hiệu quả, nhưng bị hạn chế nghiêm ngặt do ảnh hưởng đến tầng ozone." },

  { id: "ethyl_bromide", formula: "C₂H₅Br", name: "Etyl bromua (Bromoetan)",
    ions: [{ ionId: "c2h5_plus", count: 1 }, { ionId: "br_minus", count: 1 }],
    tier: "hard", score: 200, category_vi: "Dẫn xuất halogen", fact: "Một dung môi và tác nhân alkyl hóa hữu ích trong công nghiệp tổng hợp dược phẩm." }];

function getCompoundById(id) {
  return COMPOUNDS.find(c => c.id === id);
}

function getCompoundsForTiers(tiers) {
  return COMPOUNDS.filter(c => tiers.includes(c.tier));
}
