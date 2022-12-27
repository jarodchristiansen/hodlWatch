import { MediaQueries } from "@/styles/MediaQueries";
import { useMemo } from "react";
import styled from "styled-components";

interface TopAssetsRowProps {
  topAssets: [TopAsset];
}

interface TopAsset {
  favorite_count: number;
  id: string;
  name: string;
  symbol: string;
}

const TopAssetsRow = ({ topAssets }: TopAssetsRowProps) => {
  console.log({ topAssets });

  const topAssetCards = useMemo(() => {
    if (!topAssets.length) return [];

    return topAssets.map((asset) => {
      return (
        <TopAssetCard>
          {asset.name}
          {asset.symbol}
          {asset.favorite_count}
        </TopAssetCard>
      );
    });
  }, [topAssets]);

  return (
    <TopAssetContainer>
      <h4>Top Favorited Assets</h4>

      <RowContainer>{topAssetCards}</RowContainer>
    </TopAssetContainer>
  );
};

const TopAssetContainer = styled.div`
  text-align: center;
`;

const TopAssetCard = styled.div`
  display: flex;
  flex-direction: column;
`;

const RowContainer = styled.div`
  display: flex;
  gap: 1rem;
  overflow-x: scroll;
  text-align: center;
  justify-content: center;
  gap: 1rem;
  padding 2rem;

  ::-webkit-scrollbar {
    display: none;
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }
`;

export default TopAssetsRow;
