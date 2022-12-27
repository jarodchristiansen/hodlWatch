import { MediaQueries } from "@/styles/MediaQueries";
import Link from "next/link";
import { useMemo } from "react";
import styled from "styled-components";

interface TopAssetsRowProps {
  topAssets: TopAsset[];
}

interface TopAsset {
  favorite_count: number;
  id: string;
  name: string;
  symbol: string;
}

const TopAssetsRow = ({ topAssets }: TopAssetsRowProps) => {
  const topAssetCards = useMemo(() => {
    if (!topAssets.length) return [];

    return topAssets.map((asset) => {
      return (
        <Link
          href={`/assets/${asset.symbol}?name=${asset.name}`}
          className="asset-link"
          passHref
          key={asset.symbol}
        >
          <a>
            <TopAssetCard data-testid={`top-asset-card-${asset.name}`}>
              <h4> {asset.name}</h4>
              <h5>{asset?.symbol?.toUpperCase()}</h5>
            </TopAssetCard>
          </a>
        </Link>
      );
    });
  }, [topAssets]);

  return (
    <TopAssetContainer data-testid="top-assets-container">
      <h4>Top Favorited Assets</h4>

      <div>
        <RowContainer>{topAssetCards}</RowContainer>
      </div>
    </TopAssetContainer>
  );
};

const TopAssetContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
  width: 100%;
  gap: 1rem;
  max-width: 28rem;
  margin: auto;
  padding: 1rem 0;

  @media ${MediaQueries.MD} {
    max-width: 40rem;
  }
`;

const TopAssetCard = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  padding: 1rem;
  border-radius: 5px;
`;

const RowContainer = styled.div`
  display: flex;
  overflow-x: scroll;
  gap: 1rem;

  ::-webkit-scrollbar {
    display: none;
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }

  a {
    cursor: pointer;
  }

  a:hover {
    color: purple;
    text-decoration: underline;
  }
`;

export default TopAssetsRow;
