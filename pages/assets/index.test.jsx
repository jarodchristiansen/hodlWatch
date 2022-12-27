import { MockedProvider } from "@apollo/client/testing";
import { render, fireEvent, screen, within } from "@testing-library/react";
import AssetsPage from ".";

describe("Assets Page", () => {
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
