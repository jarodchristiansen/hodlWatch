import React, { useState, useEffect } from "react";
import AssetCard from "./AssetCard";

const AssetsContainer = ({ assets }) => {
  const [currentAssets, setCurrentAssets] = useState(assets || null);

  useEffect(() => {
    setCurrentAssets(assets);
  }, [assets]);

  return (
    <div data-testid={"assets-container"}>
      <div className={"w-100"}>
        {currentAssets && currentAssets.length > 1 && (
          <div className={"row row-cols-1 row-cols-sm-2 row-cols-md-3"}>
            {currentAssets.map((asset) => {
              return <AssetCard asset={asset} />;
            })}
          </div>
        )}
      </div>

      {currentAssets && currentAssets.length === 1 && (
        <AssetCard asset={currentAssets[0]} />
      )}
    </div>
  );
};

export default AssetsContainer;
