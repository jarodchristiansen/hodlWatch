import { render, screen } from "@testing-library/react";

import AssetSummaryCard from "./AssetSummaryCard";

import "@testing-library/jest-dom";

jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: Record<string, unknown>) => <img alt="" {...props} />,
}));

describe("AssetSummaryCard", () => {
  it("renders summary test id and name", () => {
    render(
      <AssetSummaryCard
        name="Bitcoin"
        symbol="btc"
        price={50_000}
        priceChange24h={1.5}
        marketCapRank={1}
      />
    );
    expect(screen.getByTestId("asset-summary-card")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Bitcoin" })).toBeInTheDocument();
    expect(screen.getByText("BTC")).toBeInTheDocument();
  });

  it("shows monogram when no image", () => {
    render(<AssetSummaryCard name="Ether" symbol="eth" />);
    expect(screen.getByText("E")).toBeInTheDocument();
  });
});
