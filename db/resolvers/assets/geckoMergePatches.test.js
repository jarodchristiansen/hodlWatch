const { mergeDbFallbackPatches } = require("./geckoMergePatches");

describe("mergeDbFallbackPatches", () => {
  it("fills missing USD price from db fallback", () => {
    const data = {
      id: "bitcoin",
      market_data: {},
    };
    const dbFallback = {
      market_data: { current_price: { usd: 42 } },
    };
    mergeDbFallbackPatches(data, dbFallback);
    expect(data.market_data.current_price.usd).toBe(42);
  });

  it("fills 24h change when null on payload", () => {
    const data = {
      id: "bitcoin",
      market_data: {
        current_price: { usd: 1 },
        price_change_percentage_24h: null,
      },
    };
    const dbFallback = {
      market_data: { price_change_percentage_24h: -2.5 },
    };
    mergeDbFallbackPatches(data, dbFallback);
    expect(data.market_data.price_change_percentage_24h).toBe(-2.5);
  });

  it("copies image from fallback when payload has none", () => {
    const data = { id: "x", image: {} };
    const dbFallback = {
      image: { large: "https://example.com/a.png" },
    };
    mergeDbFallbackPatches(data, dbFallback);
    expect(data.image.large).toBe("https://example.com/a.png");
  });
});
