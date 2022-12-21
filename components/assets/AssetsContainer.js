import React, { useState, useEffect, useRef, useMemo } from "react";
import AssetCard from "./AssetCard";
import styled from "styled-components";
import { useLazyQuery } from "@apollo/client";
import { GET_USER } from "@/helpers/queries/user";

const AssetsContainer = ({ assets, session }) => {
  const [currentAssets, setCurrentAssets] = useState(assets || null);

  const [
    fetchUserDetails,
    {
      data: userData,
      loading: dataLoading,
      error: userError,
      refetch: refetchUser,
    },
  ] = useLazyQuery(GET_USER, {
    variables: {
      email: session?.user?.email,
    },
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    if (session?.user?.email) {
      fetchUserDetails();
    }
  }, [session?.user?.email]);

  useEffect(() => {
    setCurrentAssets(assets);
  }, [assets]);

  const ref = useRef();
  // const isVisible = useOnScreen(ref, "100px");

  const AssetCards = useMemo(() => {
    if ((!currentAssets, !userData?.getUser?.favorites)) return [];

    let favorites = userData?.getUser?.favorites;

    return currentAssets.map((asset) => {
      return (
        <AssetCard
          asset={asset}
          key={asset.id}
          email={session?.user?.email}
          favorited={favorites.some(
            (e) => e.symbol.toLowerCase() === asset.symbol.toLowerCase()
          )}
          refetchFavorites={() => refetchUser()}
        />
      );
    });
  }, [currentAssets, userData?.getUser?.favorites]);

  return (
    <div data-testid={"assets-container"}>
      <div className={"w-100"}>
        {currentAssets && currentAssets.length > 1 && (
          <GridComponent ref={ref}>
            {/* {currentAssets.map((asset) => {
              return (
                <AssetCard
                  asset={asset}
                  key={asset.id}
                  email={session?.user?.email}
                />
              );
            })} */}
            {AssetCards}
          </GridComponent>
        )}
      </div>

      {currentAssets && currentAssets.length === 1 && (
        <AssetCard
          asset={currentAssets[0]}
          email={session?.user?.email}
          favorited={userData?.getUser?.favorites.some(
            (e) =>
              e.symbol.toLowerCase() === currentAssets[0].symbol.toLowerCase()
          )}
          refetchFavorites={() => refetchUser()}
        />
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
