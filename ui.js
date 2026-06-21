// ui.js — Các hàm thuần để render UI dựa trên state. Không chứa luật chơi.

const UI = {};

// ===== SHOW/HIDE SCREEN =====
UI.showScreen = function (screenId) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const target = document.getElementById(screenId);
  if (target) target.classList.add('active');
};

// ===== RENDER BACKGROUND PARTICLES =====
UI.renderBackgroundParticles = function (containerEl) {
  if (!containerEl) return;
  containerEl.innerHTML = '';
  const particleCount = 18;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'bg-particle';

    const size = Math.random() * 80 + 30; // Kích thước hạt từ 30px -> 110px
    const left = Math.random() * 100;
    const delay = Math.random() * -20;
    const duration = Math.random() * 15 + 15;

    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${left}%`;
    particle.style.animationDelay = `${delay}s`;
    particle.style.animationDuration = `${duration}s`;

    const colors = ['rgba(14, 165, 233, 0.05)', 'rgba(217, 119, 6, 0.04)', 'rgba(225, 29, 72, 0.04)'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    particle.style.background = `radial-gradient(circle, ${randomColor} 0%, transparent 70%)`;

    containerEl.appendChild(particle);
  }
};

// Hàm tính toán scale của chữ ion dựa trên khối lượng
function calculateIonScale(mass) {
  const minScale = 0.7;
  const maxScale = 1.15;
  const m = Math.min(137, mass || 1);
  return minScale + (m / 137) * (maxScale - minScale);
}

// ===== SPAWN SPARKLES (HIỆU ỨNG HẠT PHÁT NỔ) =====
UI.spawnSparkles = function (gridEl, row, col, color) {
  const cellEl = gridEl.querySelector(`[data-row="${row}"][data-col="${col}"]`);
  if (!cellEl) return;

  const rect = cellEl.getBoundingClientRect();
  const gridRect = gridEl.getBoundingClientRect();
  
  const centerX = rect.left - gridRect.left + rect.width / 2;
  const centerY = rect.top - gridRect.top + rect.height / 2;

  const sparkleCount = 8;
  for (let i = 0; i < sparkleCount; i++) {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle-particle';
    sparkle.style.background = color;
    sparkle.style.left = `${centerX}px`;
    sparkle.style.top = `${centerY}px`;

    const angle = Math.random() * Math.PI * 2;
    const distance = Math.random() * 40 + 20;
    const tx = Math.cos(angle) * distance;
    const ty = Math.sin(angle) * distance;

    sparkle.style.setProperty('--tx', `${tx}px`);
    sparkle.style.setProperty('--ty', `${ty}px`);
    sparkle.style.boxShadow = `0 2px 6px ${color}`;

    gridEl.appendChild(sparkle);

    setTimeout(() => {
      sparkle.remove();
    }, 450);
  }
};

// ===== RENDER GRID =====
UI.renderGrid = function (gridEl, grid, allIons, activeHint = null) {
  const size = grid.length;
  gridEl.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  gridEl.style.gridTemplateRows = `repeat(${size}, 1fr)`;
  gridEl.innerHTML = '';

  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      const cellEl = document.createElement('div');
      cellEl.className = 'cell';
      cellEl.dataset.row = r;
      cellEl.dataset.col = c;

      const ionId = grid[r][c];
      if (ionId) {
        const ion = getIonById(ionId);
        if (ion) {
          cellEl.classList.add('filled');
          cellEl.style.background = ion.color;
          cellEl.style.color = '#0F172A';
          
          // Tính scale font-size dựa trên khối lượng
          const scale = calculateIonScale(ion.mass);

          cellEl.innerHTML = `
            <span class="cell-symbol" style="transform: scale(${scale}); display: inline-block;">${ion.symbol}</span>
            <span class="cell-mass">${ion.mass}</span>
          `;
        }
      }

      // Xử lý nhấp nháy gợi ý vô hạn trên lưới
      if (activeHint && activeHint.piece) {
        const isHintCell = activeHint.piece.shape.some(offset => {
          return (activeHint.row + offset.dr === r) && (activeHint.col + offset.dc === c);
        });
        if (isHintCell) {
          cellEl.classList.add('hint-blink');
        }
      }

      gridEl.appendChild(cellEl);
    }
  }
};

// ===== RENDER TRAY (Khay chứa khối) =====
UI.renderTray = function (trayEl, tray, activeHint = null) {
  trayEl.innerHTML = '';
  tray.forEach((piece, idx) => {
    const pieceEl = document.createElement('div');
    pieceEl.className = 'tray-piece';
    pieceEl.dataset.pieceIndex = idx;

    if (piece === null) {
      pieceEl.classList.add('used');
    } else {
      const maxDr = Math.max(...piece.shape.map(s => s.dr));
      const maxDc = Math.max(...piece.shape.map(s => s.dc));
      pieceEl.style.gridTemplateColumns = `repeat(${maxDc + 1}, 28px)`;
      pieceEl.style.gridTemplateRows = `repeat(${maxDr + 1}, 28px)`;

      // Xử lý nhấp nháy khối được gợi ý
      if (activeHint && activeHint.pieceIndex === idx) {
        pieceEl.classList.add('hint-blink');
      }

      // tạo grid 2D tạm để biết ô nào có/không có
      const occupied = {};
      piece.shape.forEach((offset, i) => {
        occupied[`${offset.dr},${offset.dc}`] = piece.cells[i];
      });

      for (let dr = 0; dr <= maxDr; dr++) {
        for (let dc = 0; dc <= maxDc; dc++) {
          const ionId = occupied[`${dr},${dc}`];
          const miniEl = document.createElement('div');
          if (ionId) {
            const ion = getIonById(ionId);
            if (ion) {
              miniEl.className = 'cell-mini';
              miniEl.style.background = ion.color;
              miniEl.style.color = '#0F172A';
              
              const scale = calculateIonScale(ion.mass);
              miniEl.innerHTML = `<span style="transform: scale(${scale}); display: inline-block;">${ion.symbol}</span>`;
            }
          } else {
            miniEl.style.visibility = 'hidden';
          }
          pieceEl.appendChild(miniEl);
        }
      }
    }
    trayEl.appendChild(pieceEl);
  });
};

// ===== RENDER GHOST KHI KÉO THẢ =====
UI.renderDragGhost = function (ghostEl, piece, cellSize) {
  const maxDr = Math.max(...piece.shape.map(s => s.dr));
  const maxDc = Math.max(...piece.shape.map(s => s.dc));
  ghostEl.style.setProperty('--ghost-cell-size', `${cellSize}px`);
  ghostEl.style.gridTemplateColumns = `repeat(${maxDc + 1}, ${cellSize}px)`;
  ghostEl.style.gridTemplateRows = `repeat(${maxDr + 1}, ${cellSize}px)`;
  ghostEl.innerHTML = '';

  const occupied = {};
  piece.shape.forEach((offset, i) => { occupied[`${offset.dr},${offset.dc}`] = piece.cells[i]; });

  for (let dr = 0; dr <= maxDr; dr++) {
    for (let dc = 0; dc <= maxDc; dc++) {
      const ionId = occupied[`${dr},${dc}`];
      const miniEl = document.createElement('div');
      if (ionId) {
        const ion = getIonById(ionId);
        if (ion) {
          miniEl.className = 'cell-mini';
          miniEl.style.background = ion.color;
          miniEl.style.color = '#0F172A';
          
          const scale = calculateIonScale(ion.mass);
          miniEl.innerHTML = `<span style="transform: scale(${scale}); display: inline-block;">${ion.symbol}</span>`;
        }
      } else {
        miniEl.style.visibility = 'hidden';
      }
      ghostEl.appendChild(miniEl);
    }
  }
};

UI.clearDropPreview = function (gridEl) {
  gridEl.querySelectorAll('.cell').forEach(c => {
    c.classList.remove('drop-preview-valid', 'drop-preview-invalid', 'drop-preview-reaction');
  });
};

UI.showDropPreview = function (gridEl, piece, originRow, originCol, grid, reactingCells = []) {
  UI.clearDropPreview(gridEl);
  const valid = canPlacePiece(grid, piece, originRow, originCol);
  const size = grid.length;
  
  const reactingKeys = new Set(reactingCells.map(c => `${c.row},${c.col}`));

  for (const { dr, dc } of piece.shape) {
    const r = originRow + dr;
    const c = originCol + dc;
    if (r < 0 || r >= size || c < 0 || c >= size) continue;
    const cellEl = gridEl.querySelector(`[data-row="${r}"][data-col="${c}"]`);
    if (cellEl) {
      if (reactingKeys.has(`${r},${c}`)) {
        cellEl.classList.add('drop-preview-reaction');
      } else {
        cellEl.classList.add(valid ? 'drop-preview-valid' : 'drop-preview-invalid');
      }
    }
  }

  // Tô màu các ô có sẵn trên lưới tham gia vào phản ứng
  for (const { row, col } of reactingCells) {
    const isPieceCell = piece.shape.some(({ dr, dc }) => originRow + dr === row && originCol + dc === col);
    if (!isPieceCell) {
      const cellEl = gridEl.querySelector(`[data-row="${row}"][data-col="${col}"]`);
      if (cellEl) {
        cellEl.classList.add('drop-preview-reaction');
      }
    }
  }

  return valid;
};

// ===== ANIMATION KHI NỔ PHẢN ỨNG =====
UI.animateReactingCells = function (gridEl, cells) {
  for (const { row, col, ionId } of cells) {
    const cellEl = gridEl.querySelector(`[data-row="${row}"][data-col="${col}"]`);
    if (cellEl) {
      const ion = getIonById(ionId);
      const color = ion ? ion.color : 'var(--accent-cyan)';
      cellEl.classList.add('reacting');
      UI.spawnSparkles(gridEl, row, col, color);
    }
  }
};

// ===== ANIMATION DỌN HÀNG/CỘT ĐẦY =====
UI.animateLineClearCells = function (gridEl, cells) {
  for (const { row, col } of cells) {
    const cellEl = gridEl.querySelector(`[data-row="${row}"][data-col="${col}"]`);
    if (cellEl) {
      cellEl.classList.add('line-clearing');
      UI.spawnSparkles(gridEl, row, col, 'rgba(15, 23, 42, 0.15)');
    }
  }
};

// ===== TOAST POPUP BÁO PHẢN ỨNG / GỢI Ý =====
UI.showReactionToast = function (toastEl, compound, scoreGained, isNewDiscovery = false) {
  let scoreText = scoreGained > 0 ? '+' + scoreGained.toLocaleString('vi-VN') + ' điểm' : '';
  if (isNewDiscovery && scoreGained > 0) {
    const totalIons = compound.ions.reduce((sum, item) => sum + item.count, 0);
    const multiplierText = totalIons >= 3 ? 'x2.0 (Khám phá mới - Phức tạp)' : 'x1.5 (Khám phá mới)';
    scoreText += ` <span class="toast-discovery-badge" style="font-size: 0.8rem; color: #F59E0B; display: block; margin-top: 6px; font-weight: bold; letter-spacing: 0.5px;">✨ ${multiplierText} ✨</span>`;
  }

  toastEl.innerHTML = `
    <div class="toast-formula">${compound.formula}</div>
    <div class="toast-name">${compound.name}</div>
    <div class="toast-score">${scoreText}</div>
  `;
  
  toastEl.classList.remove('hidden', 'show', 'keep-alive');
  void toastEl.offsetWidth; // force reflow

  if (scoreGained === 0) {
    // Nếu là gợi ý, giữ cố định trên màn hình (keep-alive)
    toastEl.classList.add('keep-alive');
  } else {
    // Nếu là phản ứng thông thường, tự fade out
    toastEl.classList.add('show');
  }
};

UI.clearReactionToast = function (toastEl) {
  toastEl.classList.add('hidden');
  toastEl.classList.remove('show', 'keep-alive');
};

// ===== RENDER COMPENDIUM (SỔ TAY HỢP CHẤT) =====
UI.renderCompendium = function (listEl, allCompounds, discoveredIds, onSelectCompound) {
  listEl.innerHTML = '';
  const tierOrder = { easy: 0, medium: 1, hard: 2 };
  const sorted = [...allCompounds].sort((a, b) => tierOrder[a.tier] - tierOrder[b.tier]);

  for (const compound of sorted) {
    const discovered = discoveredIds.has(compound.id);
    const itemEl = document.createElement('div');
    itemEl.className = 'compendium-item' + (discovered ? '' : ' locked');

    itemEl.innerHTML = `
      <div>
        <div class="compendium-formula">${discovered ? compound.formula : '???'}</div>
        <div class="compendium-name">${discovered ? compound.name : 'Chưa khám phá'}</div>
      </div>
      <span class="compendium-tier-tag tag-${compound.tier}">${compound.tier}</span>
    `;

    if (discovered && onSelectCompound) {
      itemEl.addEventListener('click', () => {
        onSelectCompound(compound);
      });
    }

    listEl.appendChild(itemEl);
  }
};

// ===== SHOW MODAL CHI TIẾT HỢP CHẤT =====
UI.showCompoundDetailModal = function (modalEl, compound, allIons) {
  if (!modalEl || !compound) return;

  const formulaEl = document.getElementById('detail-formula');
  const nameEl = document.getElementById('detail-name');
  const catEl = document.getElementById('detail-category');
  const ionsListEl = document.getElementById('detail-ions');
  const factEl = document.getElementById('detail-fact');

  formulaEl.textContent = compound.formula;
  nameEl.textContent = compound.name;
  catEl.textContent = compound.category_vi || "Hợp chất";
  factEl.textContent = compound.fact || "Không có thông tin mô tả thú vị nào có sẵn cho chất này.";

  ionsListEl.innerHTML = '';
  compound.ions.forEach(req => {
    const ion = allIons.find(i => i.id === req.ionId);
    if (ion) {
      const chip = document.createElement('span');
      chip.className = 'detail-ion-chip';
      chip.style.background = ion.color;
      chip.textContent = `${ion.symbol} x ${req.count}`;
      ionsListEl.appendChild(chip);
    }
  });

  modalEl.classList.remove('hidden');
};
