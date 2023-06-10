import { MockedProvider } from "@apollo/client/testing";
import { fireEvent, render, screen } from "@testing-library/react";

import AssetCard from "./AssetCard";

import "@testing-library/jest-dom";

// Mock the useMutation hook
jest.mock("@apollo/client", () => {
  const mockMutation = jest.fn().mockImplementation(() => {
    return [jest.fn(), { loading: false, error: null }];
  });

  const mockGql = jest.fn().mockImplementation((query) => query);

  return {
    useMutation: mockMutation,
    gql: mockGql,
  };
});

describe("AssetCard", () => {
  const asset = {
    __typename: "Asset",
    id: "6482565d40b97f8048d2bdc2",
    name: "USD Coin",
    symbol: "usdc",
    image:
      "https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png?1547042389",
    current_price: 1,
    market_cap: 28440774676,
    market_cap_rank: 5,
    fully_diluted_valuation: 28437441976,
    circulating_supply: 28441689268.4396,
    total_supply: 28438356460.9866,
    ath: 1.17,
    ath_change_percentage: -14.72754,
    ath_date: 1557276028300,
    atl: 0.877647,
    atl_change_percentage: 13.94055,
    atl_date: 1678521733981,
  };

  // const asset = {
  //   __typename: "Asset",
  //   id: "cardano",
  //   name: "Cardano",
  //   symbol: "ada",
  //   image: {
  //     __typename: "ImageParts",
  //     thumb:
  //       "https://assets.coingecko.com/coins/images/975/thumb/cardano.png?1547034860",
  //     small:
  //       "https://assets.coingecko.com/coins/images/975/small/cardano.png?1547034860",
  //   },
  // };

  const email = "testtesterson@gmail.com";
  let favorited = false;

  it("Should render the add button if the asset is not favorited", () => {
    render(
      <MockedProvider mocks={[]} addTypename={false}>
        <AssetCard asset={asset} email={email} favorited={favorited} />
      </MockedProvider>
    );

    expect(screen.getByTestId("add-button")).toBeTruthy();
  });

  it("Should render the remove button if the asset is favorited", () => {
    favorited = true;

    render(
      <MockedProvider mocks={[]} addTypename={false}>
        <AssetCard asset={asset} email={email} favorited={favorited} />
      </MockedProvider>
    );

    expect(screen.getByTestId("remove-button")).toBeTruthy();
  });

  test("clicking the main view button changes the card view", () => {
    const email = "example@example.com";
    const favorited = true;

    render(<AssetCard asset={asset} email={email} favorited={favorited} />);

    // Click the main view button
    const snapshotButton = screen.getByText("Snapshot");
    fireEvent.click(snapshotButton);

    // Click the main view button
    const mainViewButton = screen.getByText("Main View");
    fireEvent.click(mainViewButton);

    // Check if the card view is changed to "A"
    const cardViewA = screen.getByText("Snapshot");
    expect(cardViewA).toBeInTheDocument();
  });

  // test("clicking the add button calls addFavorite", () => {
  //   const email = "example@example.com";
  //   const favorited = false;

  //   render(<AssetCard asset={asset} email={email} favorited={favorited} />);

  //   // Click the add button
  //   const addButton = screen.getByTestId("add-button");
  //   fireEvent.click(addButton);

  //   // Expect addFavorite to be called
  //   const mockUseMutation = require("@apollo/client").useMutation; // Access the mocked useMutation function
  //   expect(mockUseMutation).toHaveBeenCalledWith(
  //     expect.any(Function),
  //     expect.any(Object)
  //   );
  // });
});
