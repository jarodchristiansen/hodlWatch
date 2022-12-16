import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import AssetsPage from "../../pages/assets";
import { MockedProvider } from "@apollo/client/testing";
// import GET_ASSETS from "../../helpers/queries/assets/getAssets";
import { GET_ASSETS } from "../../helpers/queries/assets/getAssets";
import { GET_USER } from "../../helpers/queries/user";

jest.mock("next-auth/client", () => {
  const originalModule = jest.requireActual("next-auth/client");
  const mockSession = {
    expires: new Date(Date.now() + 2 * 86400).toISOString(),
    user: { username: "admin", email: "testtesterson@gmail.com" },
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

  // it("Should render assets-container after loaded", async () => {
  //   let assetMock = [
  //     {
  //       request: {
  //         query: GET_ASSETS,
  //         variables: { offset: 1, limit: 9 },
  //       },
  //       result: {
  //         data: {
  //           getAssets: [
  //             {
  //               id: "bitcoin",
  //               name: "Bitcoin",
  //               symbol: "btc",
  //               image: {
  //                 thumb:
  //                   "https://assets.coingecko.com/coins/images/1/thumb/bitcoin.png?1547033579",
  //                 small:
  //                   "https://assets.coingecko.com/coins/images/1/small/bitcoin.png?1547033579",
  //                 __typename: "ImageParts",
  //               },
  //             },
  //             {
  //               id: "ethereum",
  //               name: "Ethereum",
  //               symbol: "eth",
  //               image: {
  //                 thumb:
  //                   "https://assets.coingecko.com/coins/images/279/thumb/ethereum.png?1595348880",
  //                 small:
  //                   "https://assets.coingecko.com/coins/images/279/small/ethereum.png?1595348880",
  //                 __typename: "ImageParts",
  //               },
  //             },
  //           ],
  //         },
  //       },
  //     },
  //   ];

  //   let userMock = [
  //     {
  //       request: {
  //         query: GET_USER,
  //         variables: { email: "testtesterson@gmail.com" },
  //       },
  //       result: {
  //         data: {
  //           getUser: {
  //             createAt: 167099839030389,
  //             email: "testtesterson@gmail.com",
  //             favorites: [
  //               {
  //                 title: "Bitcoin",
  //                 symbol: "BTC",
  //                 image:
  //                   "https://assets.coingecko.com/coins/images/1/small/bitcoin.png?1547033579",
  //                 __typename: "FavoritesData",
  //               },
  //               {
  //                 title: "Astar",
  //                 symbol: "ASTR",
  //                 image:
  //                   "https://assets.coingecko.com/coins/images/22617/small/astr.png?1642314057",
  //                 __typename: "FavoritesData",
  //               },
  //             ],
  //             image:
  //               "https://lh3.googleusercontent.com/a/ALm5wu2dED2ID3Xe1yIQqm8bnu9cFWmwSTw7VHb_NEo2=s96-c",
  //             name: "Test Testerson",
  //             username: "Tester",
  //             __typename: "User",
  //           },
  //         },
  //       },
  //     },
  //   ];

  //   render(
  //     <MockedProvider mocks={[...assetMock, ...userMock]} addTypename={false}>
  //       <AssetsPage />
  //     </MockedProvider>
  //   );

  //   const container = screen.getByTestId("loading-element");

  //   expect(container).toBeTruthy();
  //   expect(await screen.findByText("BTC")).toBeInTheDocument();

  //   const assets = await screen.getByTestId("assets-container");
  //   expect(assets).toBeTruthy();
  // });
});
