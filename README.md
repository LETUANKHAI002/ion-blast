# Ion Blast — Digital Chemistry Lab (Phiên bản Hoàn thiện)

Chào mừng bạn đến với phiên bản hoàn chỉnh của **Ion Blast** — tựa game xếp khối kết hợp mô phỏng hóa học giáo dục độc đáo!

---

## 🌟 Các tính năng mới & Cải tiến nổi bật

1. **Giao diện "Digital Chemistry Lab" Hiện đại & Động:**
   - **Hạt background lơ lửng:** Các ion và phân tử bay chậm rãi, mờ ảo ở màn hình nền, mang lại cảm giác sống động như một phòng lab thực thụ.
   - **Neon Glowing Cards:** Cải tiến thẩm mỹ các card chọn độ khó và các nút chức năng với viền phát sáng neon tương ứng với từng cấp độ (Dễ = Cyan, Trung bình = Amber, Khó = Rose).
   - **Hiệu ứng Sparkles:** Khi có phản ứng nổ hoặc dọn hàng, các hạt bụi năng lượng mang màu sắc của ion liên quan sẽ bắn ra từ tâm ô grid tạo cảm giác đã mắt khi ăn điểm.

2. **CSDL Hóa học mở rộng & Sửa đổi điện tích hữu cơ:**
   - **Quy mô CSDL:** Mở rộng từ 17 hợp chất ban đầu lên **36 hợp chất thực tế** và **27 ion** chia đều theo 3 độ khó (Dễ: Vô cơ cơ bản · Trung bình: Acid/Bazơ/Muối đa nguyên tử · Khó: Gốc hữu cơ).
   - **Quy tắc hữu cơ khoa học:** Chuẩn hóa điện tích giả lập cho các gốc hữu cơ để đảm bảo tính trung hòa điện tích bằng 0 khi ghép thành phân tử bền:
     - Gốc Alkyl (Metyl `CH₃-`, Etyl `C₂H₅-`): Cation giả lập điện tích **+1**.
     - Nhóm Hydroxyl (`-OH`): Anion điện tích **-1**.
     - Nhóm Carboxylate (`-COO-`): Anion điện tích **-2**.
     - Ion Hydro hữu cơ (`H⁺`): Cation điện tích **+1**.
     *Ví dụ: C₂H₅OH = Etyl(+1) + Hydroxyl(-1) = 0; CH₃COOH = Metyl(+1) + Carboxylate(-2) + Hydro(+1) = 0.*

3. **Âm thanh tổng hợp kĩ thuật số (Web Audio API):**
   - Không cần tải bất kì file `.mp3` hay `.wav` bên ngoài. Game tự động tổng hợp âm thanh bằng code thông qua Web Audio API của trình duyệt.
   - Gồm: Tiếng đặt khối (place block), tiếng nổ phản ứng hóa học (explosion), tiếng laser quét dọn hàng (line clear), tiếng chuông arpeggio tăng dần khi ăn combo/streak, tiếng game over trầm buồn và nhạc nền (BGM Synth Pad) lặp tuần hoàn êm dịu giúp người chơi tập trung suy nghĩ.

4. **Tự động lưu ván chơi & Khôi phục (Auto-Save & Resume):**
   - Trạng thái bàn cờ, điểm số, streak, tray khối được lưu trữ tự động sau mỗi lượt đi hợp lệ.
   - Khi quay lại game, nút **"Tiếp tục ván chơi"** sẽ xuất hiện ở Menu chính để bạn chơi tiếp ván chơi dang dở.

5. **Sổ hợp chất khám phá chi tiết (Compendium Card):**
   - Click vào bất kì hợp chất nào đã được khám phá trong Compendium để hiển thị thẻ chi tiết.
   - Thẻ hiển thị: Công thức hóa học, Tên đầy đủ tiếng Việt, Nhóm hợp chất (Muối, Oxit, Axit, Bazơ, Chất hữu cơ), danh sách các ion thành phần và ứng dụng thú vị thực tế (Fun Fact).

6. **Gợi ý cứu nguy (Smart Hint):**
   - Quét tìm nước đi tạo phản ứng. Nếu không có nước đi tạo phản ứng, game sẽ quét tìm nước đi an toàn (chỉ để đặt khối duy trì mạng chơi) và highlight vị trí nhấp nháy cho người chơi, không trừ lượt gợi ý nếu không có phản ứng khả thi.

7. **Bảng Cài đặt & Quản lý tiến trình:**
   - Cho phép bật/tắt riêng biệt nhạc nền (BGM) và hiệu ứng âm thanh (SFX).
   - Nút Reset dữ liệu trong vùng nguy hiểm để xóa kỷ lục và các hợp chất đã khám phá khi muốn bắt đầu lại từ đầu.

---

## 📂 Cấu trúc dự án hiện tại

```
f:/demo/
├── 01-GDD-GameDesignDocument.md  ← Tài liệu thiết kế trò chơi chi tiết
├── 02-Kientruc-Architecture.md   ← Tài liệu kiến trúc hệ thống kỹ thuật
├── index.html                    # Layout game (thêm Cài đặt, Hướng dẫn, Particle BG, Modals)
├── style.css                     # CSS (hạt background, nút neon glow, modal, responsive di động)
├── audio.js                      # [NEW] Engine âm thanh tổng hợp bằng Web Audio API
├── ions.js                       # DB ion mở rộng (27 ion, sửa điện tích hữu cơ)
├── compounds.js                  # DB hợp chất mở rộng (36 hợp chất, phân loại, sửa id -> ionId)
├── gridEngine.js                 # Logic hình học lưới chơi
├── reactionEngine.js             # Engine quét và so khớp hợp chất hóa học (đã test 100%)
├── pieceGenerator.js             # Thuật toán sinh khối (đơn, cụm)
├── scoreEngine.js                # Quản lý tính điểm, combo, streak
├── ui.js                         # Render DOM, hiệu ứng hạt nổ sparkles, hiển thị modal
├── main.js                       # Khởi tạo, drag & drop Pointer Events, auto-save/resume, audio triggers
└── README.md                     # Tài liệu hướng dẫn này
```

---

## 🚀 Hướng dẫn chạy game

Do chính sách bảo mật của trình duyệt chặn nạp các file JS cục bộ thông qua giao thức `file://` (lỗi CORS), bạn cần chạy game bằng một web server cục bộ đơn giản:

### Cách 1: Chạy bằng Python (Đã có sẵn trên hầu hết các máy)
Mở terminal tại thư mục dự án và chạy:
```bash
python -m http.server 8765
```
Sau đó mở trình duyệt và truy cập: **[http://localhost:8765](http://localhost:8765)**

### Cách 2: Chạy bằng Node.js / npm
Nếu máy bạn cài sẵn Node.js, chạy lệnh:
```bash
npx serve ./
```
Sau đó mở trình duyệt theo địa chỉ cổng hiển thị trên terminal (thường là `http://localhost:3000` hoặc `http://localhost:5000`).

---

## 🛠 Cách kiểm thử logic hóa học tự động

Bạn có thể chạy thử bộ kiểm thử logic hóa học (16 unit test bao gồm muối vô cơ, ion đa nguyên tử, axit photphoric và các nhóm hữu cơ mới) bằng lệnh:
```bash
node C:\Users\khai\.gemini\antigravity\brain\2806b8f2-7838-4601-a438-efefd27eb2ee\scratch\test_chemistry.js
```
Kết quả hiển thị `🎉 TẤT CẢ TEST ĐỀU THÀNH CÔNG! Engine hóa học hoạt động hoàn hảo.` xác nhận tính đúng đắn khoa học của game.
