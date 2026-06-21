// scoreEngine.js — Tính điểm, combo, streak (theo bảng 3.5 GDD)

function calculateReactionScore(compound, reactionIndexInTurn, isNewDiscovery = false) {
  // reactionIndexInTurn: 0 cho phản ứng đầu tiên trong lượt, 1 cho phản ứng thứ 2...
  // -> phản ứng liên hoàn trong cùng 1 lượt được nhân hệ số tăng dần
  const comboBonus = 1 + reactionIndexInTurn * 0.5;
  let baseScore = compound.score;

  if (isNewDiscovery) {
    const totalIons = compound.ions.reduce((sum, item) => sum + item.count, 0);
    const multiplier = totalIons >= 3 ? 2.0 : 1.5;
    baseScore = baseScore * multiplier;
  }

  return Math.round(baseScore * comboBonus);
}

function calculateLineScore(lineCount, hadReactionOverlap, difficulty) {
  let pointsPerLine = 20; // easy
  if (difficulty === 'medium') {
    pointsPerLine = 45;
  } else if (difficulty === 'hard') {
    pointsPerLine = 90;
  }
  const base = lineCount * pointsPerLine;
  return hadReactionOverlap ? Math.round(base * 1.5) : base;
}

function applyStreakMultiplier(baseScore, streakMultiplier) {
  return Math.round(baseScore * streakMultiplier);
}

function updateStreak(currentStreakCount, hadReactionThisTurn) {
  if (!hadReactionThisTurn) return 0;
  const newCount = currentStreakCount + 1;
  return newCount;
}

function streakToMultiplier(streakCount) {
  // x1.1 mỗi streak, tối đa x3
  return Math.min(3, 1 + streakCount * 0.1);
}
