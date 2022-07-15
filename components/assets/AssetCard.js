import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Image } from "react-bootstrap";

const AssetCard = ({ asset }) => {
  const [assetDetails, setAssetDetails] = useState();
  const { title, name, description, symbol, imageUrl, image } = asset;
  const { thumb, small } = image;

  const exploreLink = `/assets/${symbol}`;

  return (
    <div
      className={
        "card text-center mb-3 border border-dark border-1 rounded shadow"
      }
    >
      <div className={"card-body py-4"}>
        <h5 className="card-title">{title || name || "Card Title"}</h5>

        <h6 className="card-subtitle mb-2 text-muted">
          {symbol || "Card subtitle"}
        </h6>

        <div>
          <Image src={imageUrl || small} />
        </div>

        <Link href={exploreLink}>
          <button className={"bg-primary text-white rounded mt-4 px-4"}>
            Explore
          </button>
        </Link>
      </div>
    </div>
  );
};

export default AssetCard;
