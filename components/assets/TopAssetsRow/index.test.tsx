import { MockedProvider } from "@apollo/client/testing";
import { fireEvent, render, screen, within } from "@testing-library/react";

import TopAssetsRow from ".";

describe("TopAssetRow", () => {
  const topAssets = [
    {
      favorite_count: 2,
      id: "63a7c664cbbb7b5c656f0be3",
      name: "Bitcoin",
      symbol: "btc",
    },
    {
      favorite_count: 1,
      id: "63a7c634cbbb7b5c656f0679",
      name: "0x",
      symbol: "zrx",
    },
    {
      favorite_count: 1,
      id: "63a7c637cbbb7b5c656f06cf",
      name: "Aave",
      symbol: "aave",
    },
    {
      favorite_count: 1,
      id: "63a7c63acbbb7b5c656f0728",
      name: "Acala",
      symbol: "aca",
    },
    {
      favorite_count: 1,
      id: "63a7c641cbbb7b5c656f07f1",
      name: "Algorand",
      symbol: "algo",
    },
  ];
  it("Should render the topAssetRowContainer", () => {
    render(
      <MockedProvider mocks={[]} addTypename={false}>
        <TopAssetsRow topAssets={topAssets} />
      </MockedProvider>
    );

    expect(screen.getByTestId("top-assets-container")).toBeTruthy();
  });

  it("Should render the the assets in order by favorite_count", () => {
    render(
      <MockedProvider mocks={[]} addTypename={false}>
        <TopAssetsRow topAssets={topAssets} />
      </MockedProvider>
    );

    expect(screen.getByTestId("top-asset-card-Bitcoin")).toBeTruthy();
    expect(screen.getByTestId("top-asset-card-Bitcoin")?.textContent).toContain(
      "BTC"
    );
  });

  it("Should render no assets if none passed in", () => {
    render(
      <MockedProvider mocks={[]} addTypename={false}>
        <TopAssetsRow topAssets={[]} />
      </MockedProvider>
    );

    expect(screen.getByTestId("top-assets-container")).toBeTruthy();
  });
});
