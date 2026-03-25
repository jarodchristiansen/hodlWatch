import { currencyFormat } from "@/helpers/formatters/currency";
import { ChangePill, MetricBlock, MetricsStrip } from "./AssetCard.styled";

export type AssetCardMetricsStripProps = Readonly<{
  current_price: number;
  price_change_percentage_24h?: number;
  market_cap_rank?: number;
}>;

/** Price, 24h change, and market cap rank. */
export function AssetCardMetricsStrip({
  current_price,
  price_change_percentage_24h,
  market_cap_rank,
}: AssetCardMetricsStripProps) {
  const hasPrice =
    typeof current_price === "number" && !Number.isNaN(current_price);
  const hasChange24h =
    typeof price_change_percentage_24h === "number" &&
    !Number.isNaN(price_change_percentage_24h);
  const change24 = hasChange24h ? price_change_percentage_24h : undefined;
  const changeIsPositive = change24 !== undefined && change24 >= 0;

  let change24Label = "—";
  if (change24 !== undefined) {
    const sign = changeIsPositive ? "+" : "";
    change24Label = `${sign}${change24.toFixed(2)}%`;
  }

  return (
    <MetricsStrip aria-label="Key metrics">
      <MetricBlock>
        <span className="label">Price</span>
        <span className="value">
          {hasPrice ? currencyFormat(current_price) : "—"}
        </span>
      </MetricBlock>
      <MetricBlock>
        <span className="label">24h</span>
        <ChangePill className={changeIsPositive ? "pos" : "neg"}>
          {change24Label}
        </ChangePill>
      </MetricBlock>
      <MetricBlock>
        <span className="label">Rank</span>
        <span className="value">
          {typeof market_cap_rank === "number"
            ? `#${market_cap_rank}`
            : "—"}
        </span>
      </MetricBlock>
    </MetricsStrip>
  );
}
