import React, { useState, useEffect, useRef } from "react";
import useOnScreen from "../../helpers/hooks/useOnScreen";
import AssetCard from "./AssetCard";
import styled from "styled-components";

const AssetsContainer = ({ assets }) => {
  const [currentAssets, setCurrentAssets] = useState(assets || null);

  useEffect(() => {
    setCurrentAssets(assets);
  }, [assets]);

  const ref = useRef();
  // const isVisible = useOnScreen(ref, "100px");

  return (
    <div data-testid={"assets-container"}>
      <div className={"w-100"}>
        {currentAssets && currentAssets.length > 1 && (
          <GridComponent ref={ref}>
            {currentAssets.map((asset) => {
              return <AssetCard asset={asset} key={asset.id} />;
            })}
          </GridComponent>
        )}
      </div>

      {currentAssets && currentAssets.length === 1 && (
        <AssetCard asset={currentAssets[0]} />
      )}
    </div>
  );
};

const GridComponent = styled.div`
  animation: fadeIn 2s;
  margin: 0 auto;
  display: grid;
  column-gap: 3rem;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
`;

export default AssetsContainer;
