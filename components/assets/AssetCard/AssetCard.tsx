import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Image } from "react-bootstrap";
import AssetCardAnimationWrapper from "./AssetCardAnimationWrapper";
import styled from "styled-components";
import { ADD_FAVORITE, REMOVE_FAVORITE } from "@/helpers/mutations/user";
import { useMutation } from "@apollo/client";
import { GET_USER } from "@/helpers/queries/user";
import { Colors } from "@/styles/variables";

interface AssetCardProps {
  asset: Asset;
  key?: string;
  email: string | null;
  favorited: boolean;
  refetchFavorites?: () => void;
}

export type Asset = {
  title: string;
  name: string;
  description: string;
  symbol: string;
  image: string;
};

/**
 *
 * @param asset: Digital asset BTC etc..
 * @param email: User email
 * @param favorited: Boolean after cross referencing user favorites to this asset
 * @returns AssetCard component that allows users to favorite/expore the digital asset further
 */
const AssetCard = ({ asset, email, favorited }: AssetCardProps) => {
  const [assetDetails, setAssetDetails] = useState();
  const { title, name, description, symbol, image } = asset;
  // const { thumb, small } = image;

  console.log({ asset });

  const exploreLink = {
    pathname: `/assets/${symbol}`,
    query: { name },
  };

  const [addFavorite, { loading, error }] = useMutation(ADD_FAVORITE, {
    // TEMP SOLUTION UNTIL CACHING FIXED
    refetchQueries: [{ query: GET_USER, variables: { email: email } }],
  });

  const [removeFavorite, { loading: removeLoading, error: removeError }] =
    useMutation(REMOVE_FAVORITE, {
      // TEMP SOLUTION UNTIL CACHING FIXED
      refetchQueries: [{ query: GET_USER, variables: { email: email } }],
    });

  const removeFromFavorites = () => {
    removeFavorite({
      variables: {
        input: {
          email,
          asset: {
            title: asset.name,
            symbol: symbol.toUpperCase(),
            image: image,
          },
        },
      },
    });
  };

  const addToFavorites = () => {
    addFavorite({
      variables: {
        input: {
          email,
          asset: {
            title: asset.name,
            symbol: symbol.toUpperCase(),
            image: image,
          },
        },
      },
    });
  };

  return (
    <AssetCardAnimationWrapper>
      <AssetCardWrapper>
        <div className={"card-body py-4 holder"}>
          {!favorited && (
            <div
              onClick={addToFavorites}
              className="favorite-button"
              data-testid="add-button"
            >
              <Image
                src={"/images/empty-star.svg"}
                className={"pointer-link"}
                height={"40px"}
                width={"40px"}
              />
            </div>
          )}
          {favorited && (
            <div
              onClick={removeFromFavorites}
              className="favorite-button"
              data-testid="remove-button"
            >
              <Image
                src={"/images/filled-star.svg"}
                className={"pointer-link"}
                height={"40px"}
                width={"40px"}
                alt="block-logo"
              />
            </div>
          )}

          <h4 className="card-title">{title || name || "Card Title"}</h4>

          <h6 className="card-subtitle my-2 text-muted">
            {symbol.toUpperCase() || "Card subtitle"}
          </h6>

          <ImageContainer>
            <Image
              className="image"
              src={image}
              alt={name || title}
              // @ts-ignore
              unoptimized={"true"}
            />
          </ImageContainer>

          <Link href={exploreLink} as={`/assets/${symbol}?name=${name}`}>
            <button>Explore</button>
          </Link>
        </div>
      </AssetCardWrapper>
    </AssetCardAnimationWrapper>
  );
};

const ImageContainer = styled.div`
  padding: 2rem;

  .image {
    width: 100px;
    height: 100px;
  }
`;

const AssetCardWrapper = styled.div`
  border-radius: 12px;
  background-color: ${Colors.lightGray};
  border: 1px solid black;
  text-align: center;
  margin: 1rem 0;
  box-shadow: 2px 4px 8px gray;

  .holder {
    position: relative;
  }

  .favorite-button {
    position: absolute;
    top: 10px;
    right: 10px;
  }

  button {
    color: ${Colors.elegant.white};
    background-color: ${Colors.elegant.accentPurple};
    border-radius: 8px;
    padding: 8px;
    font-weight: 600;
  }
`;

export default AssetCard;
