// ions.js — Cơ sở dữ liệu ION cho Ion Blast (Easy + Medium + Hard) với khối lượng nguyên tử/phân tử (mass)

const IONS = [
  // ===== EASY (vô cơ cơ bản) =====
  { id: "na_plus",    symbol: "Na⁺",   name: "Natri",              charge: 1,  tier: "easy", color: "#5B8DEF", mass: 23 },
  { id: "k_plus",     symbol: "K⁺",    name: "Kali",               charge: 1,  tier: "easy", color: "#5B8DEF", mass: 39 },
  { id: "nh4_plus",   symbol: "NH₄⁺",  name: "Amoni",              charge: 1,  tier: "easy", color: "#5B8DEF", mass: 18 },
  { id: "cl_minus",   symbol: "Cl⁻",   name: "Clorua",             charge: -1, tier: "easy", color: "#4FC3A1", mass: 35.5 },
  { id: "ca_2plus",   symbol: "Ca²⁺",  name: "Canxi",              charge: 2,  tier: "easy", color: "#6F7EF0", mass: 40 },
  { id: "mg_2plus",   symbol: "Mg²⁺",  name: "Magie",              charge: 2,  tier: "easy", color: "#6F7EF0", mass: 24 },
  { id: "ba_2plus",   symbol: "Ba²⁺",  name: "Bari",               charge: 2,  tier: "easy", color: "#6F7EF0", mass: 137 },
  { id: "o_2minus",   symbol: "O²⁻",   name: "Oxit",               charge: -2, tier: "easy", color: "#36B3D9", mass: 16 },
  { id: "s_2minus",   symbol: "S²⁻",   name: "Sunfua",             charge: -2, tier: "easy", color: "#36B3D9", mass: 32 },
  { id: "h_plus",     symbol: "H⁺",    name: "Hidro",              charge: 1,  tier: "easy", color: "#F2B84B", mass: 1 },
  { id: "br_minus",   symbol: "Br⁻",   name: "Bromua",             charge: -1, tier: "easy", color: "#4FC3A1", mass: 80 },

  // ===== MEDIUM (đa nguyên tử, acid/bazơ, kim loại chuyển tiếp) =====
  { id: "so4_2minus", symbol: "SO₄²⁻", name: "Sunfat",             charge: -2, tier: "medium", color: "#36B3D9", mass: 96 },
  { id: "no3_minus",  symbol: "NO₃⁻",  name: "Nitrat",             charge: -1, tier: "medium", color: "#4FC3A1", mass: 62 },
  { id: "oh_minus",   symbol: "OH⁻",   name: "Hidroxit",           charge: -1, tier: "medium", color: "#4FC3A1", mass: 17 },
  { id: "co3_2minus", symbol: "CO₃²⁻", name: "Cacbonat",           charge: -2, tier: "medium", color: "#36B3D9", mass: 60 },
  { id: "po4_3minus", symbol: "PO₄³⁻", name: "Photphat",           charge: -3, tier: "medium", color: "#1D94C4", mass: 95 },
  { id: "al_3plus",   symbol: "Al³⁺",  name: "Nhôm",               charge: 3,  tier: "medium", color: "#8C6FF0", mass: 27 },
  { id: "fe_2plus",   symbol: "Fe²⁺",  name: "Sắt(II)",            charge: 2,  tier: "medium", color: "#6F7EF0", mass: 56 },
  { id: "fe_3plus",   symbol: "Fe³⁺",  name: "Sắt(III)",           charge: 3,  tier: "medium", color: "#8C6FF0", mass: 56 },
  { id: "cu_2plus",   symbol: "Cu²⁺",  name: "Đồng(II)",           charge: 2,  tier: "medium", color: "#6F7EF0", mass: 64 },
  { id: "ag_plus",    symbol: "Ag⁺",   name: "Bạc",                charge: 1,  tier: "medium", color: "#5B8DEF", mass: 108 },

  // ===== HARD (gốc hữu cơ giả lập điện tích để trung hòa bằng 0) =====
  { id: "ch3_plus",   symbol: "CH₃-",  name: "Metyl (hữu cơ)",     charge: 1,  tier: "hard", color: "#7FD69A", mass: 15 },
  { id: "c2h5_plus",  symbol: "C₂H₅-", name: "Etyl (hữu cơ)",      charge: 1,  tier: "hard", color: "#7FD69A", mass: 29 },
  { id: "coo_org_2minus",symbol: "-COO-",name: "Carboxylate",       charge: -2, tier: "hard", color: "#9BDB6E", mass: 44 }
];

function getIonById(id) {
  return IONS.find(i => i.id === id);
}
