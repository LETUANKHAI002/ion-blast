// main.js — Kết nối tất cả: state, vòng lặp game, kéo-thả, sự kiện UI, âm thanh và lưu trữ

const DIFFICULTY_CONFIG = {
  easy: {
    gridSize: 6,
    ionPoolTiers: ['easy'],
    pieceTypeRatio: { single: 0.30, cluster: 0.70 }, // 30% khối đơn, 70% khối hình dạng
    maxClusterSize: 3,
    hintsAllowed: 5,
    label: 'Dễ',
  },
  medium: {
    gridSize: 6,
    ionPoolTiers: ['easy', 'medium'],
    pieceTypeRatio: { single: 0.20, cluster: 0.80 }, // 20% khối đơn, 80% khối hình dạng
    maxClusterSize: 4,
    hintsAllowed: 3,
    label: 'Trung bình',
  },
  hard: {
    gridSize: 7,
    ionPoolTiers: ['easy', 'medium', 'hard'],
    pieceTypeRatio: { single: 0.10, cluster: 0.90 }, // 10% khối đơn, 90% khối hình dạng
    maxClusterSize: 4,
    hintsAllowed: 1,
    label: 'Khó',
  },
};

let state = null; // Khởi tạo khi chơi ván mới hoặc tải lại game

const els = {
  grid: document.getElementById('grid'),
  tray: document.getElementById('tray'),
  scoreValue: document.getElementById('score-value'),
  streakBadge: document.getElementById('streak-badge'),
  streakValue: document.getElementById('streak-value'),
  hintBtn: document.getElementById('btn-hint'),
  hintCount: document.getElementById('hint-count'),
  rerollBtn: document.getElementById('btn-reroll'),
  rerollCount: document.getElementById('reroll-count'),
  reactionToast: document.getElementById('reaction-toast'),
  dragGhost: document.getElementById('drag-ghost'),
  finalScore: document.getElementById('final-score'),
  bestScore: document.getElementById('best-score'),
  finalDifficultyLabel: document.getElementById('final-difficulty-label'),
  compendiumList: document.getElementById('compendium-list'),
  particleBg: document.getElementById('particle-bg'),
  btnContinue: document.getElementById('btn-continue'),
  modalDetail: document.getElementById('modal-compound-detail'),
  chkMusic: document.getElementById('chk-music'),
  chkSound: document.getElementById('chk-sound'),
};

// ===== PERSISTENCE (localStorage) =====
const STORAGE_KEY = 'ion_blast_save_v1';
const ACTIVE_GAME_KEY = 'ion_blast_active_game_v1';

function loadSave() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : { bestScores: {}, discoveredCompounds: [] };
  } catch (e) {
    return { bestScores: {}, discoveredCompounds: [] };
  }
}

function saveSave(save) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(save));
}

let saveData = loadSave();

// Lưu trạng thái ván chơi hiện tại
function saveActiveGame() {
  if (!state) return;
  try {
    const gameSession = {
      difficulty: state.difficulty,
      grid: state.grid,
      tray: state.tray,
      score: state.score,
      streakCount: state.streakCount,
      hintsLeft: state.hintsLeft,
      rerollsLeft: state.rerollsLeft,
      discoveredThisGame: Array.from(state.discoveredThisGame)
    };
    localStorage.setItem(ACTIVE_GAME_KEY, JSON.stringify(gameSession));
  } catch (e) {}
}

// Kiểm tra và hiển thị nút "Tiếp tục"
function checkActiveGame() {
  try {
    const active = localStorage.getItem(ACTIVE_GAME_KEY);
    if (active) {
      els.btnContinue.classList.remove('hidden');
    } else {
      els.btnContinue.classList.add('hidden');
    }
  } catch (e) {
    els.btnContinue.classList.add('hidden');
  }
}

// Nạp lại ván chơi cũ
function resumeActiveGame() {
  try {
    const active = JSON.parse(localStorage.getItem(ACTIVE_GAME_KEY));
    if (!active) return;

    const config = DIFFICULTY_CONFIG[active.difficulty];
    const compoundPool = getCompoundsForTiers(config.ionPoolTiers);

    state = {
      difficulty: active.difficulty,
      config,
      grid: active.grid,
      tray: active.tray,
      score: active.score,
      streakCount: active.streakCount,
      hintsLeft: active.hintsLeft,
      rerollsLeft: active.rerollsLeft !== undefined ? active.rerollsLeft : 3,
      compoundPool,
      discoveredThisGame: new Set(active.discoveredThisGame || []),
      activeHint: null, // Reset gợi ý khi nạp lại
      lockInput: false
    };

    render();
    UI.showScreen('screen-game');
    audio.startMusic();
  } catch (e) {
    alert("Không thể khôi phục ván chơi cũ, hãy bắt đầu ván mới!");
    localStorage.removeItem(ACTIVE_GAME_KEY);
    checkActiveGame();
  }
}

// ===== KHỞI TẠO VÁN MỚI =====
function startNewGame(difficulty) {
  const config = DIFFICULTY_CONFIG[difficulty];
  const compoundPool = getCompoundsForTiers(config.ionPoolTiers);

  // Tạo lưới trống trước (từ đầu không có hợp chất sẵn)
  let grid = createEmptyGrid(config.gridSize);
  // Đặt sẵn các ion riêng lẻ rời rạc tại các góc/vị trí ngẫu nhiên (giảm mật độ để lưới thông thoáng)
  const initialIonsCount = difficulty === 'easy' ? 1 : (difficulty === 'medium' ? 2 : 2);
  grid = placeInitialIons(grid, compoundPool, initialIonsCount);

  state = {
    difficulty,
    config,
    grid: grid,
    score: 0,
    streakCount: 0,
    hintsLeft: config.hintsAllowed,
    rerollsLeft: 3, // Khởi tạo có sẵn 3 lượt đổi khối
    compoundPool,
    discoveredThisGame: new Set(),
    tray: [],
    activeHint: null, // Trạng thái gợi ý đang nhấp nháy
    lockInput: false
  };
  
  state.tray = generateTray(config, IONS, COMPOUNDS, state.grid, 3, []);

  render();
  saveActiveGame();
  checkActiveGame();
  UI.showScreen('screen-game');
  audio.startMusic();
}

// ===== RENDER TOÀN BỘ =====
function render() {
  UI.renderGrid(els.grid, state.grid, IONS, state.activeHint);
  UI.renderTray(els.tray, state.tray, state.activeHint);
  els.scoreValue.textContent = state.score.toLocaleString('vi-VN');

  if (state.streakCount > 1) {
    const mult = streakToMultiplier(state.streakCount);
    els.streakValue.textContent = `x${mult.toFixed(1)}`;
    els.streakBadge.classList.remove('hidden');
  } else {
    els.streakBadge.classList.add('hidden');
  }

  els.hintCount.textContent = state.hintsLeft;
  els.hintBtn.classList.toggle('disabled', state.hintsLeft <= 0);

  // Cập nhật số lượt Reroll
  els.rerollCount.textContent = state.rerollsLeft;
  els.rerollBtn.classList.toggle('disabled', state.rerollsLeft <= 0);
}

// ===== XỬ LÝ ĐẶT KHỐI (LUỒNG CHÍNH) =====
function handlePlacePiece(pieceIndex, originRow, originCol) {
  const piece = state.tray[pieceIndex];
  if (!piece) return false;
  if (!canPlacePiece(state.grid, piece, originRow, originCol)) return false;

  state.lockInput = true; // Khóa đầu vào khi bắt đầu xử lý hoạt ảnh đặt/nổ

  // Xóa bỏ gợi ý nhấp nháy và Toast gợi ý khi thực hiện nước đi
  if (state.activeHint) {
    state.activeHint = null;
    UI.clearReactionToast(els.reactionToast);
  }

  audio.playPlace();

  // 1. Đặt khối
  const placeResult = placePiece(state.grid, piece, originRow, originCol);
  state.grid = placeResult.grid;

  // 2. Kiểm tra phản ứng hóa học
  const reactions = checkReactions(state.grid, placeResult.placedCells, state.compoundPool);

  // 3. Kiểm tra hàng/cột đầy
  const { fullRows, fullCols } = findFullLines(state.grid);
  const reactingCellKeys = new Set();
  reactions.forEach(m => m.cells.forEach(c => reactingCellKeys.add(`${c.row},${c.col}`)));

  let lineOverlapsReaction = false;
  for (const r of fullRows) {
    for (let c = 0; c < state.grid.length; c++) {
      if (reactingCellKeys.has(`${r},${c}`)) { lineOverlapsReaction = true; break; }
    }
  }
  for (const c of fullCols) {
    for (let r = 0; r < state.grid.length; r++) {
      if (reactingCellKeys.has(`${r},${c}`)) { lineOverlapsReaction = true; break; }
    }
  }

  // 4. Tính điểm phản ứng
  let turnScore = 0;
  const isNewDiscoveryList = [];
  reactions.forEach((match, idx) => {
    const compound = getCompoundById(match.compoundId);
    if (compound) {
      const isNewDiscovery = !saveData.discoveredCompounds.includes(compound.id);
      isNewDiscoveryList.push(isNewDiscovery);
      
      const pts = calculateReactionScore(compound, idx, isNewDiscovery);
      turnScore += pts;
      state.discoveredThisGame.add(compound.id);
      if (isNewDiscovery) {
        saveData.discoveredCompounds.push(compound.id);
      }
    }
  });

  // 5. Nhân điểm streak
  const streakMult = streakToMultiplier(state.streakCount);
  turnScore = applyStreakMultiplier(turnScore, streakMult);

  // 6. Điểm xóa hàng/cột
  const lineCount = fullRows.length + fullCols.length;
  if (lineCount > 0) {
    turnScore += calculateLineScore(lineCount, lineOverlapsReaction, state.difficulty);
  }

  state.score += turnScore;
  state.streakCount = updateStreak(state.streakCount, reactions.length > 0);

  // 7. Âm thanh phản ứng/streak/xóa hàng
  if (reactions.length > 0) {
    if (state.streakCount > 1) {
      audio.playStreak(state.streakCount);
    } else {
      audio.playReaction();
    }

    const allReactingCells = reactions.flatMap(m => m.cells);
    UI.animateReactingCells(els.grid, allReactingCells);
    const compound = getCompoundById(reactions[0].compoundId);
    if (compound) {
      const firstIsNewDiscovery = isNewDiscoveryList[0] || false;
      UI.showReactionToast(els.reactionToast, compound, turnScore, firstIsNewDiscovery);
    }
  } else if (lineCount > 0) {
    audio.playLineClear();
  }

  if (lineCount > 0) {
    const lineCells = [];
    for (const r of fullRows) for (let c = 0; c < state.grid.length; c++) lineCells.push({ row: r, col: c });
    for (const c of fullCols) for (let r = 0; r < state.grid.length; r++) lineCells.push({ row: r, col: c });
    UI.animateLineClearCells(els.grid, lineCells);
  }

  // 8. Cập nhật grid thật
  setTimeout(() => {
    const reactingCells = reactions.flatMap(m => m.cells);
    state.grid = clearCells(state.grid, reactingCells);
    state.grid = clearFullLines(state.grid, fullRows, fullCols);

    // 9. Cập nhật khay (sinh ngay một khối mới thay thế vị trí vừa đặt)
    const newPieceList = generateTray(state.config, IONS, COMPOUNDS, state.grid, 1, state.tray);
    state.tray[pieceIndex] = newPieceList[0];

    // 10. Kiểm tra game over
    const stillValid = hasAnyValidMove(state.grid, state.tray);

    state.lockInput = false; // Mở khóa đầu vào sau khi hoạt ảnh hoàn tất

    render();
    saveActiveGame();

    if (!stillValid) {
      setTimeout(() => triggerGameOver(), 300);
    }

    saveSave(saveData);
  }, reactions.length > 0 ? 460 : 360);

  return true;
}

function triggerGameOver() {
  audio.playGameOver();
  audio.stopMusic();

  const best = saveData.bestScores[state.difficulty] || 0;
  if (state.score > best) {
    saveData.bestScores[state.difficulty] = state.score;
    saveSave(saveData);
  }
  
  els.finalScore.textContent = state.score.toLocaleString('vi-VN');
  els.bestScore.textContent = (saveData.bestScores[state.difficulty] || 0).toLocaleString('vi-VN');
  els.finalDifficultyLabel.textContent = state.config.label;
  
  localStorage.removeItem(ACTIVE_GAME_KEY);
  checkActiveGame();
  
  UI.showScreen('screen-gameover');
}

// ===== GỢI Ý CHI TIẾT NÂNG CAO (HINT BLINK VÔ HẠN) =====
function useHint() {
  if (state.lockInput) return;
  if (state.hintsLeft <= 0) return;

  // 1. Quét nước đi tạo phản ứng
  for (let pIdx = 0; pIdx < state.tray.length; pIdx++) {
    const piece = state.tray[pIdx];
    if (!piece) continue;
    for (let r = 0; r < state.grid.length; r++) {
      for (let c = 0; c < state.grid.length; c++) {
        if (!canPlacePiece(state.grid, piece, r, c)) continue;
        const test = placePiece(state.grid, piece, r, c);
        const reactions = checkReactions(test.grid, test.placedCells, state.compoundPool);
        if (reactions.length > 0) {
          const targetCompound = getCompoundById(reactions[0].compoundId);
          const firstIonId = piece.cells[0];
          const firstIon = getIonById(firstIonId);
          const ionSymbol = firstIon ? firstIon.symbol : "ion";

          // Lưu trạng thái gợi ý để nhấp nháy blink vô hạn
          state.activeHint = { pieceIndex: pIdx, row: r, col: c, piece: piece };

          // Hiển thị gợi ý in đậm ion và vị trí trong Toast HUD
          UI.showReactionToast(els.reactionToast, {
            formula: `💡 GỢI Ý GHÉP CHẤT`,
            name: `Đặt ion <strong>${ionSymbol}</strong> vào <strong>Hàng ${r + 1}, Cột ${c + 1}</strong> để ghép tạo <strong>${targetCompound.formula}</strong>!`
          }, 0);

          state.hintsLeft--;
          render();
          saveActiveGame();
          return;
        }
      }
    }
  }

  // 2. Không có nước đi tạo phản ứng -> Tìm nước đi AN TOÀN bất kỳ cứu nguy (Không trừ Hint)
  for (let pIdx = 0; pIdx < state.tray.length; pIdx++) {
    const piece = state.tray[pIdx];
    if (!piece) continue;
    for (let r = 0; r < state.grid.length; r++) {
      for (let c = 0; c < state.grid.length; c++) {
        if (canPlacePiece(state.grid, piece, r, c)) {
          const firstIonId = piece.cells[0];
          const firstIon = getIonById(firstIonId);
          const ionSymbol = firstIon ? firstIon.symbol : "khối";

          state.activeHint = { pieceIndex: pIdx, row: r, col: c, piece: piece };

          UI.showReactionToast(els.reactionToast, {
            formula: `💡 GỢI Ý CỨU NGUY`,
            name: `Đặt khối <strong>${ionSymbol}</strong> vào <strong>Hàng ${r + 1}, Cột ${c + 1}</strong> để duy trì mạng chơi!`
          }, 0);
          
          render();
          return;
        }
      }
    }
  }
}

// ===== TÍNH NĂNG ĐỔI KHỐI ĐỀ XUẤT (REROLL - 🔄) =====
function useReroll() {
  if (state.lockInput) return;
  if (state.rerollsLeft <= 0) return;

  // Phát âm thanh xào/đổi bài
  audio.playPlace();

  // Đổi khay khối mới (sinh thông minh theo lưới hiện tại)
  state.tray = generateTray(state.config, IONS, COMPOUNDS, state.grid, 3, []);
  state.rerollsLeft--;

  // Xóa gợi ý cũ vì khay khối đã thay đổi
  if (state.activeHint) {
    state.activeHint = null;
    UI.clearReactionToast(els.reactionToast);
  }

  render();
  saveActiveGame();
}

// ===== DRAG & DROP (Pointer Events) =====
let dragState = null;

function setupDragForPiece(pieceEl, pieceIndex) {
  pieceEl.addEventListener('pointerdown', (e) => {
    if (state.lockInput) return; // Không cho phép tương tác khi đầu vào đang khóa
    const piece = state.tray[pieceIndex];
    if (!piece) return;
    e.preventDefault();

    audio.resumeContext();

    // Xóa ngay trạng thái nhấp nháy gợi ý khi bắt đầu kéo khối
    if (state.activeHint) {
      state.activeHint = null;
      UI.clearReactionToast(els.reactionToast);
      render();
    }

    const gridRect = els.grid.getBoundingClientRect();
    const cellSize = gridRect.width / state.grid.length;

    dragState = {
      pieceIndex,
      piece,
      cellSize,
      gridRect,
      fingerOffsetY: e.pointerType === 'touch' ? 70 : 15
    };

    pieceEl.classList.add('dragging');
    UI.renderDragGhost(els.dragGhost, piece, cellSize);
    els.dragGhost.classList.remove('hidden');
    positionGhost(e.clientX, e.clientY);

    document.addEventListener('pointermove', onDragMove);
    document.addEventListener('pointerup', onDragEnd);
  });
}

function positionGhost(clientX, clientY) {
  if (!dragState) return;
  const ghostRect = els.dragGhost.getBoundingClientRect();
  els.dragGhost.style.left = `${clientX - ghostRect.width / 2}px`;
  els.dragGhost.style.top = `${clientY - ghostRect.height / 2 - dragState.fingerOffsetY}px`;
}

function onDragMove(e) {
  if (!dragState) return;
  positionGhost(e.clientX, e.clientY);

  const { gridRect, cellSize, piece, fingerOffsetY } = dragState;
  const relX = e.clientX - gridRect.left;
  const relY = e.clientY - gridRect.top - fingerOffsetY;

  const pieceWidthCells = Math.max(...piece.shape.map(s => s.dc)) + 1;
  const pieceHeightCells = Math.max(...piece.shape.map(s => s.dr)) + 1;

  const originCol = clampInt(
    Math.round(relX / cellSize - pieceWidthCells / 2),
    -pieceWidthCells + 1,
    state.grid.length - 1
  );
  const originRow = clampInt(
    Math.round(relY / cellSize - pieceHeightCells / 2),
    -pieceHeightCells + 1,
    state.grid.length - 1
  );

  dragState.targetRow = originRow;
  dragState.targetCol = originCol;

  let reactingCells = [];
  if (state.difficulty === 'easy') {
    if (canPlacePiece(state.grid, piece, originRow, originCol)) {
      const test = placePiece(state.grid, piece, originRow, originCol);
      const reactions = checkReactions(test.grid, test.placedCells, state.compoundPool);
      if (reactions.length > 0) {
        reactingCells = reactions.flatMap(m => m.cells);
      }
    }
  }

  UI.showDropPreview(els.grid, piece, originRow, originCol, state.grid, reactingCells);
}

function clampInt(v, min, max) {
  return Math.max(min, Math.min(max, v));
}

function onDragEnd(e) {
  document.removeEventListener('pointermove', onDragMove);
  document.removeEventListener('pointerup', onDragEnd);

  if (!dragState) return;

  const { pieceIndex, targetRow, targetCol } = dragState;
  UI.clearDropPreview(els.grid);

  const pieceEl = els.tray.querySelector(`[data-piece-index="${pieceIndex}"]`);
  
  let placed = false;
  if (targetRow !== undefined && targetCol !== undefined) {
    placed = handlePlacePiece(pieceIndex, targetRow, targetCol);
  }

  if (placed) {
    els.dragGhost.classList.add('hidden');
    if (pieceEl) pieceEl.classList.remove('dragging');
    dragState = null;
    render();
  } else {
    // Thu hồi về vị trí khay cũ nếu đặt lỗi hoặc hủy thả
    if (pieceEl) {
      const slotRect = pieceEl.getBoundingClientRect();
      
      els.dragGhost.style.transition = 'left 0.25s cubic-bezier(0.25, 1, 0.5, 1), top 0.25s cubic-bezier(0.25, 1, 0.5, 1)';
      els.dragGhost.style.left = `${slotRect.left}px`;
      els.dragGhost.style.top = `${slotRect.top}px`;
      
      const currentDragState = dragState;
      setTimeout(() => {
        if (dragState === currentDragState) {
          els.dragGhost.style.transition = '';
          els.dragGhost.classList.add('hidden');
          if (pieceEl) pieceEl.classList.remove('dragging');
          dragState = null;
          render();
        }
      }, 250);
    } else {
      els.dragGhost.classList.add('hidden');
      dragState = null;
      render();
    }
  }
}

const originalRenderTray = UI.renderTray;
UI.renderTray = function (trayEl, tray, activeHint) {
  originalRenderTray(trayEl, tray, activeHint);
  trayEl.querySelectorAll('.tray-piece').forEach(pieceEl => {
    const idx = parseInt(pieceEl.dataset.pieceIndex, 10);
    if (tray[idx]) setupDragForPiece(pieceEl, idx);
  });
};

// ===== EVENT LISTENERS UI =====
document.querySelectorAll('.diff-card').forEach(card => {
  card.addEventListener('click', () => {
    startNewGame(card.dataset.difficulty);
  });
});

els.btnContinue.addEventListener('click', () => {
  resumeActiveGame();
});

document.getElementById('btn-back').addEventListener('click', () => {
  audio.stopMusic();
  UI.showScreen('screen-menu');
  checkActiveGame();
});

document.getElementById('btn-restart').addEventListener('click', () => {
  startNewGame(state.difficulty);
});

document.getElementById('btn-menu').addEventListener('click', () => {
  UI.showScreen('screen-menu');
  checkActiveGame();
});

els.hintBtn.addEventListener('click', useHint);
els.rerollBtn.addEventListener('click', useReroll);

document.getElementById('btn-compendium').addEventListener('click', () => {
  audio.resumeContext();
  const discoveredIds = new Set(saveData.discoveredCompounds);
  
  const onSelectCompound = (compound) => {
    UI.showCompoundDetailModal(els.modalDetail, compound, IONS);
  };

  UI.renderCompendium(els.compendiumList, COMPOUNDS, discoveredIds, onSelectCompound);
  UI.showScreen('screen-compendium');
});

document.getElementById('btn-compendium-back').addEventListener('click', () => {
  UI.showScreen('screen-menu');
});

document.getElementById('btn-menu-tutorial').addEventListener('click', () => {
  audio.resumeContext();
  UI.showScreen('screen-tutorial');
});

document.getElementById('btn-tutorial-back').addEventListener('click', () => {
  UI.showScreen('screen-menu');
});

document.getElementById('btn-menu-settings').addEventListener('click', () => {
  audio.resumeContext();
  els.chkMusic.checked = audio.musicEnabled;
  els.chkSound.checked = audio.soundEnabled;
  UI.showScreen('screen-settings');
});

document.getElementById('btn-settings-back').addEventListener('click', () => {
  UI.showScreen('screen-menu');
});

els.chkMusic.addEventListener('change', (e) => {
  audio.setMusicEnabled(e.target.checked);
});

els.chkSound.addEventListener('change', (e) => {
  audio.setSoundEnabled(e.target.checked);
});

document.getElementById('btn-reset-data').addEventListener('click', () => {
  if (confirm("Bạn có chắc chắn muốn xóa toàn bộ tiến trình chơi, kỷ lục và danh sách chất đã khám phá không? Hành động này không thể hoàn tác!")) {
    saveData = { bestScores: {}, discoveredCompounds: [] };
    saveSave(saveData);
    localStorage.removeItem(ACTIVE_GAME_KEY);
    checkActiveGame();
    alert("Đã xóa toàn bộ dữ liệu thành công!");
    UI.showScreen('screen-menu');
  }
});

document.getElementById('btn-close-detail').addEventListener('click', () => {
  els.modalDetail.classList.add('hidden');
});

els.modalDetail.addEventListener('click', (e) => {
  if (e.target === els.modalDetail) {
    els.modalDetail.classList.add('hidden');
  }
});

// ===== INIT ON LOAD =====
UI.renderBackgroundParticles(els.particleBg);
checkActiveGame();
UI.showScreen('screen-menu');
