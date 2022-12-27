import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import AssetsPage from "../../pages/assets";
import { MockedProvider } from "@apollo/client/testing";

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

describe("Collective Stats", () => {
  const session = {
    user: {
      name: "Test Tester",
      email: "testtester@gmail.com",
      image:
        "https://lh3.googleusercontent.com/a/A6a2d58d52dED2ID3Xe1yIQqm8bnu9cFWmwSTw7VHb_NEo2=s96-c",
      emailVerified: null,
      id: "jklfdljkaljapoooiddd",
      createdAt: "2022-11-27T19:08:35.786Z",
      updatedAt: "2022-11-27T19:08:35.786Z",
    },
    expires: "2023-01-26T17:54:55.056Z",
  };

  const collectiveData = {
    data: {
      getCollectiveStats: {
        __typename: "DaysCollectiveStats",
        user_count: 3,
        asset_count: 12907,
        followed_assets: 38,
        top_assets: [
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
        ],
        date: 1672105567460,
      },
    },
    loading: false,
    networkStatus: 7,
  };

  it("Should render the collective stats header", () => {
    render(
      <MockedProvider mocks={[]} addTypename={false}>
        <AssetsPage session={session} collectiveData={collectiveData} />
      </MockedProvider>
    );

    expect(screen.getByTestId("collective-stats-header")).toBeTruthy();
  });

  it("Should render top assets row", () => {
    render(
      <MockedProvider mocks={[]} addTypename={false}>
        <AssetsPage session={session} collectiveData={collectiveData} />
      </MockedProvider>
    );

    expect(screen.getByTestId("top-assets-row")).toBeTruthy();
  });
});

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
});
