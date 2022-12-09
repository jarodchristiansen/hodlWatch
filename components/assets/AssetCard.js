import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Image } from "react-bootstrap";
import AssetCardAnimationWrapper from "./AssetCardAnimationWrapper";
import styled from "styled-components";

const AssetCard = ({ asset }) => {
  const [assetDetails, setAssetDetails] = useState();
  const { title, name, description, symbol, imageUrl, image } = asset;
  const { thumb, small } = image;

  const exploreLink = `/assets/${symbol}`;

  return (
    <AssetCardAnimationWrapper>
      <AssetCardWrapper>
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
`;

export default AssetCard;
