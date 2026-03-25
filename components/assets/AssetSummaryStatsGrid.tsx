import { StatItem, StatsGrid } from "./AssetSummaryCard.styled";

function optionalScore(value: number | undefined | null) {
  return value ?? "—";
}

export type AssetSummaryStatsGridProps = Readonly<{
  genesisDate?: string;
  communityScore?: number;
  developerScore?: number;
  liquidityScore?: number;
  sentimentUp?: number;
  sentimentDown?: number;
}>;

/** Secondary stats: genesis, scores, sentiment. */
export function AssetSummaryStatsGrid({
  genesisDate,
  communityScore,
  developerScore,
  liquidityScore,
  sentimentUp,
  sentimentDown,
}: AssetSummaryStatsGridProps) {
  return (
    <StatsGrid>
      <StatItem>
        <span className="stat-label">Genesis</span>
        <span className="stat-value">{genesisDate ?? "—"}</span>
      </StatItem>
      <StatItem>
        <span className="stat-label">Community</span>
        <span className="stat-value">{optionalScore(communityScore)}</span>
      </StatItem>
      <StatItem>
        <span className="stat-label">Developer</span>
        <span className="stat-value">{optionalScore(developerScore)}</span>
      </StatItem>
      <StatItem>
        <span className="stat-label">Liquidity</span>
        <span className="stat-value">{optionalScore(liquidityScore)}</span>
      </StatItem>
      <StatItem className="span-2">
        <span className="stat-label">Sentiment</span>
        <span className="stat-value">
          <span className="negative">{sentimentDown ?? 0}% Down</span>
          <span className="sep">/</span>
          <span className="positive">{sentimentUp ?? 0}% Up</span>
        </span>
      </StatItem>
    </StatsGrid>
  );
}
