import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Image } from "react-bootstrap";
import AssetCardAnimationWrapper from "./AssetCardAnimationWrapper";
import styled from "styled-components";
import { ADD_FAVORITE, REMOVE_FAVORITE } from "../../helpers/mutations/user";
import { useMutation } from "@apollo/client";
import { GET_USER } from "../../helpers/queries/user";

const AssetCard = ({ asset, email, favorited }) => {
  const [assetDetails, setAssetDetails] = useState();
  const { title, name, description, symbol, imageUrl, image } = asset;
  const { thumb, small } = image;

  const exploreLink = `/assets/${symbol}`;

  const [addFavorite, { loading, error }] = useMutation(ADD_FAVORITE, {
    // TEMP SOLUTION UNTIL CACHING FIXED
    refetchQueries: [
      { query: GET_USER, variables: { email: email } },
      "getUser",
    ],
  });

  const [removeFavorite, { loading: removeLoading, error: removeError }] =
    useMutation(REMOVE_FAVORITE, {
      // TEMP SOLUTION UNTIL CACHING FIXED
      refetchQueries: [
        { query: GET_USER, variables: { email: email } },
        "getUser",
      ],
    });

  const removeFromFavorites = () => {
    removeFavorite({
      variables: {
        input: {
          email,
          asset: {
            title: asset.name,
            symbol: symbol.toUpperCase(),
            image: image.small,
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
            image: image.small,
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

          <div>
            <Image
              className="my-2"
              src={imageUrl || small}
              alt={name || title}
              unoptimized={"true"}
            />
          </div>

          <Link href={exploreLink}>
            <button className={"standardized-button my-2"}>Explore</button>
          </Link>
        </div>
      </AssetCardWrapper>
    </AssetCardAnimationWrapper>
  );
};

const AssetCardWrapper = styled.div`
  border-radius: 12px;
  background-color: white;
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
`;

export default AssetCard;
