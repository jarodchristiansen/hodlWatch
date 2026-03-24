import { computeEMA } from "./ema";

describe("computeEMA", () => {
  it("returns empty array for empty input", () => {
    expect(computeEMA([], 30)).toEqual([]);
  });

  it("returns single-element array when one value", () => {
    expect(computeEMA([100], 30)).toEqual([100]);
  });

  it("computes EMA for a short series", () => {
    const values = [10, 11, 12, 11, 10];
    const out = computeEMA(values, 3);
    expect(out).toHaveLength(5);
    expect(out[0]).toBe(10);
    expect(typeof out[4]).toBe("number");
    expect(out[4]).toBeGreaterThan(9);
    expect(out[4]).toBeLessThan(12);
  });
});
