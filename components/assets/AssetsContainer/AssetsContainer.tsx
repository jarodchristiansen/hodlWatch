import { GET_USER } from "@/helpers/queries/user";
import { useLazyQuery } from "@apollo/client";
import { useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";

import { MediaQueries } from "@/styles/variables";
import AssetCard from "../AssetCard/AssetCard";

/**
 *
 * @param assets: Digital assets that are currently being renderered
 * @param session: Signed in user's session
 * @returns AssetsContainer that shows the digital assets currently searched
 */
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
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    if (session?.user?.email) {
      fetchUserDetails({
        variables: {
          email: session.user.email,
        },
      });
    }
  }, [session?.user?.email, fetchUserDetails]);

  useEffect(() => {
    setCurrentAssets(assets);
  }, [assets]);

  const ref = useRef();
  // const isVisible = useOnScreen(ref, "100px");

  const AssetCards = useMemo(() => {
    if (!currentAssets) return [];

    let favorites = userData?.getUser?.favorites;

    return currentAssets.map((asset) => {
      return (
        <div data-testid={`asset-card`} key={asset.id}>
          <AssetCard
            asset={asset}
            email={session?.user?.email}
            favorited={favorites?.some(
              (e) => e.symbol.toLowerCase() === asset.symbol.toLowerCase()
            )}
            refetchFavorites={() => refetchUser()}
          />
        </div>
      );
    });
  }, [
    currentAssets,
    userData?.getUser?.favorites,
    dataLoading,
    refetchUser,
    session?.user?.email,
  ]);

  return (
    <div data-testid={"assets-container"}>
      {dataLoading && <div data-testid="loading-component" />}

      <div className={"w-100"}>
        {currentAssets && currentAssets.length > 1 && (
          <GridComponent ref={ref}>{AssetCards}</GridComponent>
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
          data-testid={`asset-card`}
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

  @media ${MediaQueries.MD} {
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  }
`;

export default AssetsContainer;
