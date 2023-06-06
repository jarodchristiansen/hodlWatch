import { Colors } from "@/styles/variables";
import { MediaQueries } from "@/styles/variables";
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
          legacyBehavior
        >
          <a>
            <TopAssetCard data-testid={`top-asset-card-${asset.name}`}>
              <FavoriteCountCircle>
                <span>{asset.favorite_count}</span>
              </FavoriteCountCircle>

              <div className="card-text">
                <h4> {asset.name}</h4>
                <span>{asset?.symbol?.toUpperCase()}</span>
              </div>
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

const FavoriteCountCircle = styled.div`
  position: absolute;
  bottom: 0.5rem;
  right: 0.2rem;
  border-radius: 50%;
  color: ${Colors.elegant.accentPurple};
  color: white;
  font-weight: 600;
  width: 1.5rem;
  height: 1.5rem;
  font-size: 1rem;
  border: 2px solid black;
`;

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
    align-items: center;
    max-width: 70rem;
  }
`;

const TopAssetCard = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  width: fit-content;
  border-radius: 12px;
  position: relative;
  background-color: white;

  box-shadow: 0px 4px 12px gray;

  .card-text {
    padding: 1rem 3rem;
  }
`;

const RowContainer = styled.div`
  display: flex;
  overflow-x: scroll;
  gap: 1rem;
  padding: 1rem 0;

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
  @media ${MediaQueries.MD} {
    padding: 1rem;
  }
`;

export default TopAssetsRow;
