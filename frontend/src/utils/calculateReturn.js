export function calculateReturn(initialValue, currentValue) {
  const initial = Number(initialValue);
  const current = Number(currentValue);

  if (!initial || initial <= 0) {
    return 0;
  }

  const result = ((current - initial) / initial) * 100;
  return Number(result.toFixed(2));
}

export function calculateProfitLoss(initialValue, currentValue) {
  const initial = Number(initialValue || 0);
  const current = Number(currentValue || 0);

  return Number((current - initial).toFixed(2));
}

export function calculateReturnStatus(initialValue, currentValue) {
  const profitLoss = calculateProfitLoss(initialValue, currentValue);

  if (profitLoss > 0) return "untung";
  if (profitLoss < 0) return "rugi";
  return "impas";
}