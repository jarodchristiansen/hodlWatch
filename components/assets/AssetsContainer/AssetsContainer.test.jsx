import { GET_USER } from "@/helpers/queries/user";
import { MockedProvider } from "@apollo/client/testing";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import AssetsContainer from "./AssetsContainer";

describe("AssetsContainer", () => {
  let userMock = [
    {
      request: {
        query: GET_USER,
        variables: { email: "testtesterson@gmail.com" },
        fetchPolicy: "network-only",
      },
      result: {
        data: {
          getUser: {
            createAt: 167099839030389,
            email: "testtesterson@gmail.com",
            favorites: [
              {
                title: "Bitcoin",
                symbol: "BTC",
                image:
                  "https://assets.coingecko.com/coins/images/1/small/bitcoin.png?1547033579",
              },
              {
                title: "Astar",
                symbol: "ASTR",
                image:
                  "https://assets.coingecko.com/coins/images/22617/small/astr.png?1642314057",
              },
            ],
            image:
              "https://lh3.googleusercontent.com/a/ALm5wu2dED2ID3Xe1yIQqm8bnu9cFWmwSTw7VHb_NEo2=s96-c",
            name: "Test Testerson",
            username: "Tester",
          },
        },
      },
    },
  ];

  let assets = [
    {
      __typename: "Asset",
      id: "bitcoin",
      name: "Bitcoin",
      symbol: "btc",
      image: {
        __typename: "ImageParts",
        thumb:
          "https://assets.coingecko.com/coins/images/1/thumb/bitcoin.png?1547033579",
        small:
          "https://assets.coingecko.com/coins/images/1/small/bitcoin.png?1547033579",
      },
    },
    {
      __typename: "Asset",
      id: "ethereum",
      name: "Ethereum",
      symbol: "eth",
      image: {
        __typename: "ImageParts",
        thumb:
          "https://assets.coingecko.com/coins/images/279/thumb/ethereum.png?1595348880",
        small:
          "https://assets.coingecko.com/coins/images/279/small/ethereum.png?1595348880",
      },
    },
  ];

  let session = {
    user: {
      name: "Test Testerson",
      email: "testtesterson@gmail.com",
      image:
        "https://lh3.googleusercontent.com/a/ALm5wu2dED2ID3Xe1yIQqm8bnu9cFWmwSTw7VHb_NEo2=s96-c",
      emailVerified: null,
      id: "6889d9b5b3f7ae6c09178238387d",
      createdAt: "2022-11-27T19:08:35.786Z",
      updatedAt: "2022-11-27T19:08:35.786Z",
    },
    expires: "2023-01-15T18:51:54.530Z",
  };

  it("Should render the initial assets from the query", () => {
    render(
      <MockedProvider mocks={userMock} addTypename={false}>
        <AssetsContainer assets={assets} session={session} />
      </MockedProvider>
    );

    expect(screen.getByTestId("assets-container")).toBeTruthy();
  });

  it("Should render the loading component while user is being retrieved", () => {
    render(
      <MockedProvider mocks={[...userMock]} addTypename={false}>
        <AssetsContainer assets={assets} session={session} />
      </MockedProvider>
    );

    expect(screen.getByTestId("loading-component")).toBeTruthy();
  });

  it("Should render assets without favorites when the user has no favorites", async () => {
    const emptyUserMock = [
      {
        request: {
          query: GET_USER,
          variables: { email: "testtesterson@gmail.com" },
          fetchPolicy: "network-only",
        },
        result: {
          data: {
            getUser: {
              createAt: 167099839030389,
              email: "testtesterson@gmail.com",
              favorites: [],
              image:
                "https://lh3.googleusercontent.com/a/ALm5wu2dED2ID3Xe1yIQqm8bnu9cFWmwSTw7VHb_NEo2=s96-c",
              name: "Test Testerson",
              username: "Tester",
            },
          },
        },
      },
    ];

    render(
      <MockedProvider mocks={emptyUserMock} addTypename={false}>
        <AssetsContainer assets={assets} session={session} />
      </MockedProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId("assets-container")).toBeTruthy();
      // Assert that favorites are not rendered
      expect(screen.queryByTestId("remove-button")).toBeNull();
    });
  });

  // Test the case when there are multiple assets
  it("Should render multiple asset cards when there are multiple assets in the list", async () => {
    render(
      <MockedProvider mocks={userMock} addTypename={false}>
        <AssetsContainer assets={assets} session={session} />
      </MockedProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId("assets-container")).toBeTruthy();
      // Assert that all asset cards are rendered
      expect(screen.getAllByTestId("asset-card")).toHaveLength(assets.length);
    });
  });
});
