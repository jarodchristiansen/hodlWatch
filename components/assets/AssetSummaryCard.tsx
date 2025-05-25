import { Colors, FontWeight } from "@/styles/variables";
import Image from "next/image";
import styled from "styled-components";

interface AssetSummaryCardProps {
  name: string;
  symbol: string;
  price?: number;
  priceChange24h?: number;
  image?: string;
  genesisDate?: string;
  communityScore?: number;
  developerScore?: number;
  marketCapRank?: number;
  liquidityScore?: number;
  sentimentUp?: number;
  sentimentDown?: number;
}

const AssetSummaryCard = ({
  name,
  symbol,
  price,
  priceChange24h,
  image,
  genesisDate,
  communityScore,
  developerScore,
  marketCapRank,
  liquidityScore,
  sentimentUp,
  sentimentDown,
}: AssetSummaryCardProps) => {
  return (
    <CardWrapper>
      {image && (
        <Image
          src={image}
          alt={symbol}
          className="asset-image"
          width={56}
          height={56}
          style={{
            borderRadius: "50%",
            objectFit: "cover",
            border: `2px solid ${Colors.accent}`,
          }}
        />
      )}
      <div className="main-info">
        <div className="asset-title">
          {name} <span className="asset-symbol">({symbol?.toUpperCase()})</span>
        </div>
        {typeof price === "number" && (
          <div className="asset-price">
            ${price.toLocaleString(undefined, { maximumFractionDigits: 2 })}
            {typeof priceChange24h === "number" && (
              <span
                className={`change ${
                  priceChange24h >= 0 ? "positive" : "negative"
                }`}
              >
                {priceChange24h >= 0 ? "+" : ""}
                {priceChange24h.toFixed(2)}%
              </span>
            )}
          </div>
        )}
        <StatsGrid>
          <StatItem>
            <span className="stat-label">Genesis Date</span>
            <span className="stat-value">{genesisDate || "-"}</span>
          </StatItem>
          <StatItem>
            <span className="stat-label">Community</span>
            <span className="stat-value">
              {communityScore !== undefined && communityScore !== null
                ? communityScore
                : "-"}
            </span>
          </StatItem>
          <StatItem>
            <span className="stat-label">Developer</span>
            <span className="stat-value">
              {developerScore !== undefined && developerScore !== null
                ? developerScore
                : "-"}
            </span>
          </StatItem>
          <StatItem>
            <span className="stat-label">Mkt Cap Rank</span>
            <span className="stat-value">
              {marketCapRank !== undefined && marketCapRank !== null
                ? marketCapRank
                : "-"}
            </span>
          </StatItem>
          <StatItem>
            <span className="stat-label">Liquidity</span>
            <span className="stat-value">
              {liquidityScore !== undefined && liquidityScore !== null
                ? liquidityScore
                : "-"}
            </span>
          </StatItem>
          <StatItem>
            <span className="stat-label">Sentiment</span>
            <span className="stat-value">
              <span className="negative">{sentimentDown ?? 0}% Down</span>
              {" / "}
              <span className="positive">{sentimentUp ?? 0}% Up</span>
            </span>
          </StatItem>
        </StatsGrid>
      </div>
    </CardWrapper>
  );
};

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(120px, 1fr));
  gap: 0.5rem 2.5rem;
  margin-top: 1.2rem;
  @media (min-width: 600px) {
    grid-template-columns: repeat(3, minmax(120px, 1fr));
  }
`;

const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  .stat-label {
    font-size: 0.95rem;
    color: ${Colors.accent};
    font-weight: ${FontWeight.regular};
    margin-bottom: 0.1rem;
  }
  .stat-value {
    font-size: 1.08rem;
    font-weight: ${FontWeight.bold};
    color: ${Colors.white};
    .positive {
      color: #14d114;
      font-weight: ${FontWeight.bold};
    }
    .negative {
      color: #e74c3c;
      font-weight: ${FontWeight.bold};
    }
  }
`;

const CardWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  background: linear-gradient(
    90deg,
    ${Colors.primary} 0%,
    ${Colors.charcoal} 100%
  );
  color: ${Colors.white};
  border-radius: 18px;
  box-shadow: 0 4px 24px 0 rgba(20, 20, 40, 0.18);
  padding: 1.5rem 2rem;
  margin-bottom: 2rem;
  .asset-image {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background: ${Colors.secondary};
    object-fit: cover;
    border: 2px solid ${Colors.accent};
  }
  .main-info {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  .asset-title {
    font-size: 1.4rem;
    font-weight: ${FontWeight.bold};
    letter-spacing: 0.02em;
  }
  .asset-symbol {
    font-size: 1.1rem;
    color: ${Colors.accent};
    font-weight: ${FontWeight.regular};
    margin-left: 0.5rem;
  }
  .asset-price {
    font-size: 1.2rem;
    font-weight: ${FontWeight.bold};
    .change {
      margin-left: 1rem;
      font-size: 1.1rem;
      font-weight: ${FontWeight.bold};
    }
    .positive {
      color: #14d114;
    }
    .negative {
      color: #e74c3c;
    }
  }
`;

export default AssetSummaryCard;
