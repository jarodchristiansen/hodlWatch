import { MockedProvider } from "@apollo/client/testing";
import { render, fireEvent, screen } from "@testing-library/react";
import AssetCard from "./AssetCard";

describe("AssetCard", () => {
  const asset = {
    __typename: "Asset",
    id: "cardano",
    name: "Cardano",
    symbol: "ada",
    image: {
      __typename: "ImageParts",
      thumb:
        "https://assets.coingecko.com/coins/images/975/thumb/cardano.png?1547034860",
      small:
        "https://assets.coingecko.com/coins/images/975/small/cardano.png?1547034860",
    },
  };

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
});
