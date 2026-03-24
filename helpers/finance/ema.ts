/**
 * Exponential moving average over numeric series. First value seeds the EMA.
 */
export function computeEMA(values: number[], period: number): number[] {
  if (!values.length || period < 1) {
    return [];
  }
  const k = 2 / (period + 1);
  const emaArray: number[] = [values[0]];
  for (let i = 1; i < values.length; i++) {
    emaArray.push(values[i] * k + emaArray[i - 1] * (1 - k));
  }
  return emaArray;
}
