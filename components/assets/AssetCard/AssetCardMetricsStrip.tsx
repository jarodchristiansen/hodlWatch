import { currencyFormat } from "@/helpers/formatters/currency";
import { ChangePill, MetricBlock, MetricsStrip } from "./AssetCard.styled";

/** Price, 24h change, and market cap rank. */
export function AssetCardMetricsStrip({
  current_price,
  price_change_percentage_24h,
  market_cap_rank,
}: {
  current_price: number;
  price_change_percentage_24h?: number;
  market_cap_rank?: number;
}) {
  const hasPrice =
    typeof current_price === "number" && !Number.isNaN(current_price);
  const hasChange24h =
    typeof price_change_percentage_24h === "number" &&
    !Number.isNaN(price_change_percentage_24h);
  const changeIsPositive =
    !!hasChange24h && (price_change_percentage_24h as number) >= 0;

  return (
    <MetricsStrip role="group" aria-label="Key metrics">
      <MetricBlock>
        <span className="label">Price</span>
        <span className="value">
          {hasPrice ? currencyFormat(current_price) : "—"}
        </span>
      </MetricBlock>
      <MetricBlock>
        <span className="label">24h</span>
        <ChangePill className={changeIsPositive ? "pos" : "neg"}>
          {hasChange24h
            ? `${changeIsPositive ? "+" : ""}${(
                price_change_percentage_24h as number
              ).toFixed(2)}%`
            : "—"}
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
