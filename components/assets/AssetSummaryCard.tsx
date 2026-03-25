import { currencyFormat } from "@/helpers/formatters/currency";
import Image from "next/image";
import {
  ChangePill,
  Divider,
  FallbackMonogram,
  HeaderCard,
  IconWell,
  Identity,
  PrimaryMetric,
  TitleBlock,
  TopRow,
} from "./AssetSummaryCard.styled";
import { AssetSummaryStatsGrid } from "./AssetSummaryStatsGrid";

interface AssetSummaryCardProps {
  readonly name: string;
  readonly symbol: string;
  readonly price?: number;
  readonly priceChange24h?: number;
  readonly image?: string;
  readonly genesisDate?: string;
  readonly communityScore?: number;
  readonly developerScore?: number;
  readonly marketCapRank?: number;
  readonly liquidityScore?: number;
  readonly sentimentUp?: number;
  readonly sentimentDown?: number;
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
  const hasPrice = typeof price === "number" && !Number.isNaN(price);
  const hasChange24h =
    typeof priceChange24h === "number" && !Number.isNaN(priceChange24h);
  const changeIsPositive = hasChange24h && priceChange24h >= 0;
  let changePillClass = "";
  if (hasChange24h) {
    changePillClass = changeIsPositive ? "pos" : "neg";
  }
  const changePercentText = hasChange24h
    ? `${changeIsPositive ? "+" : ""}${priceChange24h.toFixed(2)}%`
    : "—";

  return (
    <HeaderCard data-testid="asset-summary-card">
      <TopRow>
        <Identity>
          <IconWell aria-hidden="true">
            {image ? (
              <Image
                src={image}
                alt=""
                width={44}
                height={44}
                className="asset-image"
                priority
              />
            ) : (
              <FallbackMonogram aria-hidden="true">
                {(symbol || name || "?").slice(0, 1).toUpperCase()}
              </FallbackMonogram>
            )}
          </IconWell>

          <TitleBlock>
            <h2>{name || "Asset"}</h2>
            <div className="meta">
              <span className="ticker">{(symbol || "-").toUpperCase()}</span>
              {typeof marketCapRank === "number" &&
                !Number.isNaN(marketCapRank) && (
                  <span className="rank">Rank #{marketCapRank}</span>
                )}
            </div>
          </TitleBlock>
        </Identity>

        <PrimaryMetric aria-label="Price and 24 hour change">
          <div className="label">Price</div>
          <div className="value-row">
            <div className="value">
              {hasPrice ? currencyFormat(price) : "—"}
            </div>
            <ChangePill className={changePillClass}>
              {changePercentText}
            </ChangePill>
          </div>
          <div className="sub">
            <span>24h change</span>
          </div>
        </PrimaryMetric>
      </TopRow>

      <Divider />

      <AssetSummaryStatsGrid
        genesisDate={genesisDate}
        communityScore={communityScore}
        developerScore={developerScore}
        liquidityScore={liquidityScore}
        sentimentUp={sentimentUp}
        sentimentDown={sentimentDown}
      />
    </HeaderCard>
  );
};

export default AssetSummaryCard;
