// pieceGenerator.js — Sinh khối ngẫu nhiên thông minh cho khay, phân tích trạng thái lưới để tránh thừa/thiếu ion

const CLUSTER_SHAPES_2_3 = [
  // 2 cells (domino)
  [{ dr: 0, dc: 0 }, { dr: 0, dc: 1 }],
  [{ dr: 0, dc: 0 }, { dr: 1, dc: 0 }],
  
  // 3 cells (straight line)
  [{ dr: 0, dc: 0 }, { dr: 0, dc: 1 }, { dr: 0, dc: 2 }],
  [{ dr: 0, dc: 0 }, { dr: 1, dc: 0 }, { dr: 2, dc: 0 }],
  
  // 3 cells (L-shapes/corners)
  [{ dr: 0, dc: 0 }, { dr: 1, dc: 0 }, { dr: 1, dc: 1 }], // L
  [{ dr: 0, dc: 1 }, { dr: 1, dc: 1 }, { dr: 1, dc: 0 }], // J
  [{ dr: 0, dc: 0 }, { dr: 0, dc: 1 }, { dr: 1, dc: 0 }], // Corner 1
  [{ dr: 0, dc: 0 }, { dr: 0, dc: 1 }, { dr: 1, dc: 1 }], // Corner 2
];

const CLUSTER_SHAPES_4 = [
  // 4 cells (Square 2x2)
  [{ dr: 0, dc: 0 }, { dr: 0, dc: 1 }, { dr: 1, dc: 0 }, { dr: 1, dc: 1 }],
  
  // 4 cells (T-shape)
  [{ dr: 0, dc: 1 }, { dr: 1, dc: 0 }, { dr: 1, dc: 1 }, { dr: 1, dc: 2 }],
  
  // 4 cells (Z-shapes)
  [{ dr: 0, dc: 0 }, { dr: 0, dc: 1 }, { dr: 1, dc: 1 }, { dr: 1, dc: 2 }],
  [{ dr: 0, dc: 1 }, { dr: 0, dc: 2 }, { dr: 1, dc: 0 }, { dr: 1, dc: 1 }],
  
  // 4 cells (L-shapes)
  [{ dr: 0, dc: 0 }, { dr: 1, dc: 0 }, { dr: 2, dc: 0 }, { dr: 2, dc: 1 }],
  [{ dr: 0, dc: 1 }, { dr: 1, dc: 1 }, { dr: 2, dc: 1 }, { dr: 2, dc: 0 }],
  
  // 4 cells (Straight line 4)
  [{ dr: 0, dc: 0 }, { dr: 0, dc: 1 }, { dr: 0, dc: 2 }, { dr: 0, dc: 3 }],
  [{ dr: 0, dc: 0 }, { dr: 1, dc: 0 }, { dr: 2, dc: 0 }, { dr: 3, dc: 0 }],
];

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getIonPool(allIons, tiers) {
  return allIons.filter(i => tiers.includes(i.tier));
}

// Kiểm tra xem một danh sách ionIds có tự chứa bất kỳ hợp chất hoàn chỉnh nào hay không
// (Tránh việc sinh ra khối tự phản ứng/nổ ngay khi đặt xuống lưới mà không cần ghép với ô khác)
function isCompoundComplete(ionIds, allCompounds) {
  const counts = {};
  ionIds.forEach(id => { counts[id] = (counts[id] || 0) + 1; });

  for (const cmp of allCompounds) {
    let match = true;
    for (const req of cmp.ions) {
      if ((counts[req.ionId] || 0) < req.count) {
        match = false;
        break;
      }
    }
    if (match) return true; // Chứa hợp chất hoàn chỉnh bên trong khối
  }
  return false;
}

// Sinh 1 khối Loại A (đơn ion)
function generateSinglePiece(ionPool, selectedIonId = null) {
  const ionId = selectedIonId || pickRandom(ionPool).id;
  return {
    id: `piece_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    shape: [{ dr: 0, dc: 0 }],
    cells: [ionId],
  };
}

// Sinh 1 khối cụm (2-4 ô) nhưng KHÔNG tạo thành hợp chất hoàn chỉnh
function generateClusterPiece(ionPool, allCompounds, selectedIonId = null, maxClusterSize = 3) {
  let shapes = CLUSTER_SHAPES_2_3;
  if (maxClusterSize >= 4) {
    shapes = CLUSTER_SHAPES_2_3.concat(CLUSTER_SHAPES_4);
  }
  const shape = pickRandom(shapes);
  const size = shape.length;
  let cells = [];
  let attempts = 0;

  while (attempts < 50) {
    attempts++;
    cells = [];
    // Gán các ion ngẫu nhiên, ưu tiên ion khác nhau để tăng tính đa dạng
    for (let i = 0; i < size; i++) {
      if (i === 0 && selectedIonId) {
        cells.push(selectedIonId);
      } else {
        const uniquePoolForPiece = ionPool.filter(ion => !cells.includes(ion.id));
        const poolToUse = uniquePoolForPiece.length > 0 ? uniquePoolForPiece : ionPool;
        cells.push(pickRandom(poolToUse).id);
      }
    }

    // Đảm bảo khối này không tự nổ
    if (!isCompoundComplete(cells, COMPOUNDS)) {
      return {
        id: `piece_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
        shape,
        cells,
      };
    }
  }

  // Fallback về khối đơn nếu không sinh được cụm an toàn
  return generateSinglePiece(ionPool, selectedIonId);
}

// Thuật toán sinh khay thông minh hợp tác (Cooperative Smart Tray Generator)
// Đảm bảo các ion sinh ra luôn có thể ghép thành chất hợp lệ
function generateTray(difficultyConfig, allIons, allCompounds, grid, count = 3, existingTray = []) {
  const ionPool = getIonPool(allIons, difficultyConfig.ionPoolTiers);
  const compoundPool = getCompoundsForTiers(difficultyConfig.ionPoolTiers);
  const tray = [];

  // Thu thập các ion đã có trong khay để tránh sinh trùng lặp
  const existingIonsInTray = [];
  if (existingTray) {
    existingTray.forEach(p => {
      if (p) existingIonsInTray.push(...p.cells);
    });
  }

  // Bước 1: Quét lưới tìm các ion hiện có
  const gridIons = [];
  const gridSize = grid.length;
  for (let r = 0; r < gridSize; r++) {
    for (let c = 0; c < gridSize; c++) {
      if (grid[r][c] !== null) {
        gridIons.push(grid[r][c]);
      }
    }
  }

  // Mảng chứa các ion ID mục tiêu mà ta SẼ sinh cho khay
  const targetIonIdsForTray = [];

  if (gridIons.length > 0) {
    // Trường hợp LƯỚI CÓ SẴN ION:
    // Tìm các hợp chất có thể hoàn thành bằng cách kết hợp ion trên lưới + tối đa 3 ion mới
    const gridCounts = {};
    gridIons.forEach(id => { gridCounts[id] = (gridCounts[id] || 0) + 1; });

    // Sắp xếp các hợp chất theo mức độ "gần hoàn thành" (số lượng ion thiếu ít nhất)
    const candidates = [];
    compoundPool.forEach(cmp => {
      // Đếm số lượng ion còn thiếu cho hợp chất này
      let missingCountForCmp = 0;
      const missingForCmpList = [];
      cmp.ions.forEach(req => {
        const currentCount = gridCounts[req.ionId] || 0;
        if (currentCount < req.count) {
          missingCountForCmp += (req.count - currentCount);
          for (let i = 0; i < (req.count - currentCount); i++) {
            missingForCmpList.push(req.ionId);
          }
        }
      });
      // Chỉ xem xét nếu chất này có chia sẻ ít nhất 1 ion với lưới và số lượng thiếu <= 3
      const hasGridIon = cmp.ions.some(req => gridCounts[req.ionId] > 0);
      if (hasGridIon && missingCountForCmp > 0 && missingCountForCmp <= 3) {
        candidates.push({ compound: cmp, missingCount: missingCountForCmp, missingList: missingForCmpList });
      }
    });

    if (candidates.length > 0) {
      // Sắp xếp ưu tiên hợp chất thiếu ít nhất
      candidates.sort((a, b) => a.missingCount - b.missingCount);
      const chosen = candidates[0];
      // Điền các ion thiếu vào khay
      chosen.missingList.forEach(ionId => targetIonIdsForTray.push(ionId));
    }
  }

  // Nếu lưới trống, hoặc không tìm thấy chất nào gần hoàn thành trên lưới:
  // Chọn 1 hợp chất ngẫu nhiên từ pool mà có tổng số ion <= 3
  if (targetIonIdsForTray.length === 0) {
    const validCompounds = compoundPool.filter(cmp => {
      const totalIons = cmp.ions.reduce((s, i) => s + i.count, 0);
      return totalIons <= 3;
    });
    
    // Nếu có hợp chất hợp lệ, chọn ngẫu nhiên 1 chất
    const chosenCmp = validCompounds.length > 0 ? pickRandom(validCompounds) : pickRandom(compoundPool);
    if (chosenCmp) {
      chosenCmp.ions.forEach(req => {
        for (let i = 0; i < req.count; i++) {
          targetIonIdsForTray.push(req.ionId);
        }
      });
    }
  }

  // Điền nốt các slot trống trong khay nếu targetIonIdsForTray chưa đủ 3 phần tử
  while (targetIonIdsForTray.length < count) {
    // Sinh thêm ion ngẫu nhiên từ ionPool, ưu tiên các ion chưa có trong khay để đa dạng hóa
    const uniquePool = ionPool.filter(ion => 
      !targetIonIdsForTray.includes(ion.id) && !existingIonsInTray.includes(ion.id)
    );
    const poolToUse = uniquePool.length > 0 ? uniquePool : ionPool;
    targetIonIdsForTray.push(pickRandom(poolToUse).id);
  }

  // Trộn ngẫu nhiên danh sách targetIonIdsForTray để các vị trí trong khay sinh động
  for (let i = targetIonIdsForTray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [targetIonIdsForTray[i], targetIonIdsForTray[j]] = [targetIonIdsForTray[j], targetIonIdsForTray[i]];
  }

  // Sinh các khối cho khay từ danh sách ion mục tiêu đã chuẩn bị
  for (let i = 0; i < count; i++) {
    const targetIonId = targetIonIdsForTray[i];
    const useCluster = Math.random() < difficultyConfig.pieceTypeRatio.cluster;
    let piece = null;

    if (useCluster) {
      piece = generateClusterPiece(ionPool, allCompounds, targetIonId, difficultyConfig.maxClusterSize || 3);
    } else {
      piece = generateSinglePiece(ionPool, targetIonId);
    }
    tray.push(piece);
  }

  return tray;
}
