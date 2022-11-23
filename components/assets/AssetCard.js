import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Image } from "react-bootstrap";
import AssetCardAnimationWrapper from "./AssetCardAnimationWrapper";
import styled from "styled-components";

const AssetCard = ({ asset }) => {
  const [assetDetails, setAssetDetails] = useState();
  const { title, name, description, symbol, imageUrl, image, favorited } =
    asset;
  const { thumb, small } = image;

  const exploreLink = `/assets/${symbol}`;

  console.log({ asset, favorited });

  return (
    <AssetCardAnimationWrapper>
      <AssetCardWrapper>
        <FavoriteButtonContainer>
          <Image
            src={"/assets/unfilled-star.svg"}
            height={"40px"}
            width={"40px"}
            alt="block-logo"
            className="partner-image"
          />
          <Image
            src={"/assets/filled-star.svg"}
            height={"40px"}
            width={"40px"}
            alt="block-logo"
            className="filled-star-img"
          />
        </FavoriteButtonContainer>

        <div className={"card-body py-4"}>
          <h4 className="card-title">{title || name || "Card Title"}</h4>

          <h6 className="card-subtitle my-2 text-muted">
            {symbol.toUpperCase() || "Card subtitle"}
          </h6>

          <div>
            <Image
              className="my-2"
              src={imageUrl || small}
              alt={name || title}
            />
          </div>

          <Link href={exploreLink}>
            <button className={"standardized-button mt-4"}>Explore</button>
          </Link>
        </div>
      </AssetCardWrapper>
    </AssetCardAnimationWrapper>
  );
};

const FavoriteButtonContainer = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
`;

const AssetCardWrapper = styled.div`
  border-radius: 12px;
  background-color: white;
  border: 1px solid black;
  text-align: center;
  margin: 1rem 0;
  box-shadow: 2px 4px 8px gray;
  position: relative;
`;

export default AssetCard;
