import React, { useState, useEffect, useRef } from "react";
import useOnScreen from "../../helpers/hooks/useOnScreen";
import AssetCard from "./AssetCard";
import styled from "styled-components";

const AssetsContainer = ({ assets, user }) => {
  const [currentAssets, setCurrentAssets] = useState(assets || null);

  useEffect(() => {
    setCurrentAssets(processAssets(assets));
  }, [assets]);

  useEffect(() => {
    console.log({ assets, user });
  }, [user, currentAssets]);

  const processAssets = (assets) => {
    if (user) {
      if (!assets || !user?.favorites) return;
      for (let i of assets) {
        console.log({ i }, "useEffect");
        if (containsObject(i, user.favorites)) {
          i = {
            ...i,
            favorited: true,
          };
        } else {
          console.log({ i });
          i = {
            ...i,
            favorited: false,
          };
        }
      }
    }
    return assets;
  };

  console.log({ currentAssets });

  function containsObject(obj, list) {
    for (let i = 0; i < list.length; i++) {
      if (list[i].title === obj.name) {
        return true;
      }
    }

    return false;
  }

  const ref = useRef();
  // const isVisible = useOnScreen(ref, "100px");

  return (
    <div data-testid={"assets-container"}>
      <div className={"w-100"}>
        {currentAssets && currentAssets.length > 1 && (
          <GridComponent ref={ref}>
            {currentAssets.map((asset) => {
              return <AssetCard asset={asset} />;
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
