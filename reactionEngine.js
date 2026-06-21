// reactionEngine.js — Trái tim của game: phát hiện phản ứng hóa học hợp lệ
//
// Thuật toán:
// 1. Từ các ô vừa đặt, tìm cụm liên thông (flood-fill 4 hướng)
// 2. Với mỗi cụm, thử mọi tập con liên thông kích thước nhỏ và so khớp
//    với Compound DB bằng multiset matching (đếm số lượng từng ion)
// 3. Giải quyết chồng lấn: ưu tiên hợp chất phức tạp hơn (nhiều ion hơn) trước

const MAX_SUBSET_SIZE = 6; // giới hạn để vét cạn trong thời gian thực

function getConnectedCluster(grid, startRow, startCol) {
  const size = grid.length;
  if (grid[startRow][startCol] === null) return [];

  const visited = new Set();
  const stack = [{ row: startRow, col: startCol }];
  const cluster = [];

  while (stack.length > 0) {
    const { row, col } = stack.pop();
    const key = `${row},${col}`;
    if (visited.has(key)) continue;
    visited.add(key);

    if (row < 0 || row >= size || col < 0 || col >= size) continue;
    if (grid[row][col] === null) continue;

    cluster.push({ row, col, ionId: grid[row][col] });

    const neighbors = [
      { row: row - 1, col }, { row: row + 1, col },
      { row, col: col - 1 }, { row, col: col + 1 },
    ];
    for (const n of neighbors) {
      const nKey = `${n.row},${n.col}`;
      if (!visited.has(nKey)) stack.push(n);
    }
  }
  return cluster;
}

// Đếm số lượng mỗi ionId trong 1 danh sách cell
function countIons(cells) {
  const counts = {};
  for (const cell of cells) {
    counts[cell.ionId] = (counts[cell.ionId] || 0) + 1;
  }
  return counts;
}

// Tìm kiếm quay lui liên thông trong cụm để so khớp hợp chất chính xác
function tryMatchCompoundExact(grid, remainingCells, compound) {
  const req = {};
  let totalCount = 0;
  for (const item of compound.ions) {
    req[item.ionId] = item.count;
    totalCount += item.count;
  }

  const availableKeys = new Set(remainingCells.map(c => `${c.row},${c.col}`));

  // Thử bắt đầu từ mọi ô khả dụng có chứa ion đầu tiên cần thiết
  for (const startCell of remainingCells) {
    const ionId = startCell.ionId;
    if (req[ionId] > 0) {
      const currentReq = { ...req };
      currentReq[ionId]--;

      const path = [startCell];
      const visitedKeys = new Set([`${startCell.row},${startCell.col}`]);

      const result = backtrackMatchInCells(grid, path, visitedKeys, currentReq, totalCount - 1, availableKeys);
      if (result) {
        return result;
      }
    }
  }
  return null;
}

function backtrackMatchInCells(grid, path, visitedKeys, currentReq, remainingTotal, availableKeys) {
  if (remainingTotal === 0) {
    return path.slice(); // Trả về bản sao của đường đi khớp
  }

  const size = grid.length;
  const neighbors = [];
  const neighborKeys = new Set();

  // Tìm tất cả các ô hàng xóm của các ô đã có trong path
  for (const cell of path) {
    const directions = [
      { r: cell.row - 1, c: cell.col },
      { r: cell.row + 1, c: cell.col },
      { r: cell.row, c: cell.col - 1 },
      { r: cell.row, c: cell.col + 1 }
    ];
    for (const d of directions) {
      if (d.r >= 0 && d.r < size && d.c >= 0 && d.c < size) {
        const key = `${d.r},${d.c}`;
        if (availableKeys.has(key) && !visitedKeys.has(key) && !neighborKeys.has(key)) {
          const ionId = grid[d.r][d.c];
          if (ionId && currentReq[ionId] > 0) {
            neighbors.push({ row: d.r, col: d.c, ionId });
            neighborKeys.add(key);
          }
        }
      }
    }
  }

  // Thử duyệt đệ quy qua các hàng xóm hợp lệ
  for (const nextCell of neighbors) {
    const key = `${nextCell.row},${nextCell.col}`;

    path.push(nextCell);
    visitedKeys.add(key);
    currentReq[nextCell.ionId]--;

    const result = backtrackMatchInCells(grid, path, visitedKeys, currentReq, remainingTotal - 1, availableKeys);
    if (result) return result;

    // Quay lui
    currentReq[nextCell.ionId]++;
    visitedKeys.delete(key);
    path.pop();
  }

  return null;
}

// Thử khớp TẤT CẢ compound trong DB với 1 cụm bằng thuật toán quay lui.
// Cho phép các chất khác nhau dùng chung ion (react song song).
function matchCompoundsInCluster(grid, cluster, compoundDB) {
  if (cluster.length < 2) return []; // 1 ion đơn lẻ không tạo phản ứng

  const matches = [];
  // Sắp xếp DB theo độ phức tạp giảm dần (nhiều ion hơn = ưu tiên trước)
  const sortedDB = [...compoundDB].sort((a, b) => {
    const totalA = a.ions.reduce((s, i) => s + i.count, 0);
    const totalB = b.ions.reduce((s, i) => s + i.count, 0);
    return totalB - totalA;
  });

  for (const compound of sortedDB) {
    let remainingCells = cluster.slice();
    let foundMatch = true;
    while (foundMatch) {
      const usedCells = tryMatchCompoundExact(grid, remainingCells, compound);
      if (usedCells) {
        matches.push({ compoundId: compound.id, cells: usedCells });
        const usedKeys = new Set(usedCells.map(c => `${c.row},${c.col}`));
        remainingCells = remainingCells.filter(c => !usedKeys.has(`${c.row},${c.col}`));
      } else {
        foundMatch = false;
      }
    }
  }

  return matches;
}

// Hàm tổng hợp: gọi sau mỗi lần đặt khối
// placedCells: danh sách {row, col} vừa đặt xuống
function checkReactions(grid, placedCells, compoundDB) {
  const processedClusterKeys = new Set();
  const allMatches = [];

  for (const { row, col } of placedCells) {
    const cluster = getConnectedCluster(grid, row, col);
    const clusterKey = cluster.map(c => `${c.row},${c.col}`).sort().join("|");
    if (processedClusterKeys.has(clusterKey)) continue;
    processedClusterKeys.add(clusterKey);

    const matches = matchCompoundsInCluster(grid, cluster, compoundDB);
    allMatches.push(...matches);
  }

  return allMatches; // [{ compoundId, cells: [{row,col,ionId}, ...] }, ...]
}
