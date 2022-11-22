import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import AssetsPage from "../../pages/assets";
import { MockedProvider } from "@apollo/client/testing";
import GET_ASSETS from "../../helpers/queries/assets/getAssets";

jest.mock("next-auth/client", () => {
  const originalModule = jest.requireActual("next-auth/client");
  const mockSession = {
    expires: new Date(Date.now() + 2 * 86400).toISOString(),
    user: { username: "admin" },
  };
  return {
    __esModule: true,
    ...originalModule,
    useSession: jest.fn(() => {
      return { data: mockSession, status: "authenticated" }; // return type is [] in v3 but changed to {} in v4
    }),
  };
});

const mocks = []; // We'll fill this in next

describe("Assets Page", () => {
  it("Should render the loading component initially", () => {
    const component = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <AssetsPage />
      </MockedProvider>
    );

    const container = screen.getByTestId("loading-element");

    expect(container).toBeTruthy();
  });

  it("Should render pagination after loaded", () => {
    const component = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <AssetsPage />
      </MockedProvider>
    );

    const pagination = screen.getByTestId("pagination-component");

    expect(pagination).toBeTruthy();
  });

  it("Should render search form", () => {
    const component = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <AssetsPage />
      </MockedProvider>
    );

    const searchForm = screen.getByTestId("asset-search-form");

    expect(searchForm).toBeTruthy();
  });

  it("Should render assets-container after loaded", async () => {
    let assetMock = [
      {
        request: {
          query: GET_ASSETS,
          variables: { offset: 1, limit: 9 },
        },
        result: {
          data: {
            getAssets: [
              {
                id: "bitcoin",
                name: "Bitcoin",
                symbol: "btc",
                image: {
                  thumb:
                    "https://assets.coingecko.com/coins/images/1/thumb/bitcoin.png?1547033579",
                  small:
                    "https://assets.coingecko.com/coins/images/1/small/bitcoin.png?1547033579",
                },
              },
              {
                id: "ethereum",
                name: "Ethereum",
                symbol: "eth",
                image: {
                  thumb:
                    "https://assets.coingecko.com/coins/images/279/thumb/ethereum.png?1595348880",
                  small:
                    "https://assets.coingecko.com/coins/images/279/small/ethereum.png?1595348880",
                },
              },
            ],
          },
        },
      },
    ];

    const component = render(
      <MockedProvider mocks={assetMock} addTypename={false}>
        <AssetsPage />
      </MockedProvider>
    );

    const container = screen.getByTestId("loading-element");

    expect(container).toBeTruthy();
    expect(await screen.findByText("BTC")).toBeInTheDocument();

    const assets = await screen.getByTestId("assets-container");
    expect(assets).toBeTruthy();
  });
});
