// gridEngine.js — Quản lý lưới: đặt khối, kiểm tra hợp lệ, xóa hàng/cột, đặt hợp chất ban đầu
// LƯU Ý: module này KHÔNG chứa luật hóa học phức tạp, chỉ làm việc với cấu trúc ô lưới.

function createEmptyGrid(size) {
  const grid = [];
  for (let r = 0; r < size; r++) {
    grid.push(new Array(size).fill(null));
  }
  return grid;
}

function cloneGrid(grid) {
  return grid.map(row => row.slice());
}

// piece.shape: mảng các offset {dr, dc} tính từ originRow/originCol
// piece.cells: mảng song song chứa ionId tương ứng cho mỗi offset
function canPlacePiece(grid, piece, originRow, originCol) {
  const size = grid.length;
  for (let i = 0; i < piece.shape.length; i++) {
    const { dr, dc } = piece.shape[i];
    const r = originRow + dr;
    const c = originCol + dc;
    if (r < 0 || r >= size || c < 0 || c >= size) return false;
    if (grid[r][c] !== null) return false;
  }
  return true;
}

function placePiece(grid, piece, originRow, originCol) {
  const newGrid = cloneGrid(grid);
  const placedCells = [];
  for (let i = 0; i < piece.shape.length; i++) {
    const { dr, dc } = piece.shape[i];
    const r = originRow + dr;
    const c = originCol + dc;
    newGrid[r][c] = piece.cells[i]; // ionId string
    placedCells.push({ row: r, col: c });
  }
  return { grid: newGrid, placedCells };
}

function findFullLines(grid) {
  const size = grid.length;
  const fullRows = [];
  const fullCols = [];

  for (let r = 0; r < size; r++) {
    if (grid[r].every(cell => cell !== null)) fullRows.push(r);
  }
  for (let c = 0; c < size; c++) {
    let full = true;
    for (let r = 0; r < size; r++) {
      if (grid[r][c] === null) { full = false; break; }
    }
    if (full) fullCols.push(c);
  }
  return { fullRows, fullCols };
}

function clearCells(grid, cellList) {
  const newGrid = cloneGrid(grid);
  for (const { row, col } of cellList) {
    newGrid[row][col] = null;
  }
  return newGrid;
}

function clearFullLines(grid, fullRows, fullCols) {
  const size = grid.length;
  const newGrid = cloneGrid(grid);
  for (const r of fullRows) {
    for (let c = 0; c < size; c++) newGrid[r][c] = null;
  }
  for (const c of fullCols) {
    for (let r = 0; r < size; r++) newGrid[r][c] = null;
  }
  return newGrid;
}

function hasAnyValidMove(grid, trayPieces) {
  const size = grid.length;
  for (const piece of trayPieces) {
    if (!piece) continue;
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        if (canPlacePiece(grid, piece, r, c)) return true;
      }
    }
  }
  return false;
}

// ===== ĐẶT SẴN HỢP CHẤT KHI KHỞI TẠO (INITIAL PLACEMENT) =====
function placeInitialCompounds(grid, compoundPool, count = 2) {
  const size = grid.length;
  const newGrid = cloneGrid(grid);

  // Lọc các hợp chất có tổng số ion <= 3 để đặt ban đầu cho dễ thở
  const easyStartingCompounds = compoundPool.filter(c => {
    const totalIons = c.ions.reduce((sum, i) => sum + i.count, 0);
    return totalIons <= 3;
  });

  const pool = easyStartingCompounds.length > 0 ? easyStartingCompounds : compoundPool;

  for (let step = 0; step < count; step++) {
    const compound = pool[Math.floor(Math.random() * pool.length)];
    if (!compound) continue;

    // Trải các ion ra thành mảng phẳng các ionId
    const ionIds = [];
    compound.ions.forEach(req => {
      for (let i = 0; i < req.count; i++) ionIds.push(req.ionId);
    });

    const numIons = ionIds.length;
    let placedSuccessfully = false;
    let attempts = 0;

    while (!placedSuccessfully && attempts < 100) {
      attempts++;
      // Chọn 1 ô gốc ngẫu nhiên đang trống
      const startRow = Math.floor(Math.random() * size);
      const startCol = Math.floor(Math.random() * size);
      if (newGrid[startRow][startCol] !== null) continue;

      const path = [{ row: startRow, col: startCol }];
      let pathSuccess = true;

      // Tìm thêm các ô kề bên liên thông đang trống
      for (let i = 1; i < numIons; i++) {
        const neighbors = [];
        path.forEach(cell => {
          const directions = [
            { r: cell.row - 1, c: cell.col },
            { r: cell.row + 1, c: cell.col },
            { r: cell.row, c: cell.col - 1 },
            { r: cell.row, c: cell.col + 1 }
          ];

          directions.forEach(d => {
            // Kiểm tra trong lưới
            if (d.r >= 0 && d.r < size && d.c >= 0 && d.c < size) {
              // Kiểm tra trống trên lưới và chưa nằm trong path hiện tại
              if (newGrid[d.r][d.c] === null && !path.some(p => p.row === d.r && p.col === d.c)) {
                neighbors.push({ row: d.r, col: d.c });
              }
            }
          });
        });

        if (neighbors.length === 0) {
          pathSuccess = false;
          break;
        }

        // Chọn ngẫu nhiên một ô kề bên trống để kéo dài chuỗi liên thông
        const nextCell = neighbors[Math.floor(Math.random() * neighbors.length)];
        path.push(nextCell);
      }

      if (pathSuccess && path.length === numIons) {
        // Đặt các ion của chất đó lên lưới
        path.forEach((cell, idx) => {
          newGrid[cell.row][cell.col] = ionIds[idx];
        });
        placedSuccessfully = true;
      }
    }
  }

  return newGrid;
}

// Đặt sẵn một số ion rời rạc ngẫu nhiên không kề nhau tại màn chơi ban đầu
function placeInitialIons(grid, compoundPool, count = 4) {
  const size = grid.length;
  const newGrid = cloneGrid(grid);

  // Lấy danh sách tất cả các ion có trong compoundPool
  const availableIonIds = new Set();
  compoundPool.forEach(cmp => {
    cmp.ions.forEach(req => availableIonIds.add(req.ionId));
  });
  const ionList = Array.from(availableIonIds);

  if (ionList.length === 0) return newGrid;

  let placed = 0;
  let attempts = 0;
  while (placed < count && attempts < 200) {
    attempts++;
    const r = Math.floor(Math.random() * size);
    const c = Math.floor(Math.random() * size);

    if (newGrid[r][c] === null) {
      // Đảm bảo không kề nhau (tránh tự phản ứng khi vừa mở màn)
      let hasNeighbor = false;
      const neighbors = [
        { row: r - 1, col: c }, { row: r + 1, col: c },
        { row: r, col: c - 1 }, { row: r, col: c + 1 }
      ];
      for (const n of neighbors) {
        if (n.row >= 0 && n.row < size && n.col >= 0 && n.col < size) {
          if (newGrid[n.row][n.col] !== null) {
            hasNeighbor = true;
            break;
          }
        }
      }

      if (!hasNeighbor) {
        newGrid[r][c] = ionList[Math.floor(Math.random() * ionList.length)];
        placed++;
      }
    }
  }
  return newGrid;
}
