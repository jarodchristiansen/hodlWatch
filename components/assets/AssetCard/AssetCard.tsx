import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { AssetCardDetailsDrawer } from "./AssetCardDetailsDrawer";
import { AssetCardHeader } from "./AssetCardHeader";
import { AssetCardMetricsStrip } from "./AssetCardMetricsStrip";
import {
  ActionRow,
  CardContainer,
  PrimaryButton,
  SecondaryButton,
} from "./AssetCard.styled";
import { useAssetCardFavorites } from "./useAssetCardFavorites";

interface AssetCardProps {
  asset: Asset;
  key?: string;
  email: string | null;
  favorited: boolean;
  refetchFavorites?: () => void;
  viewMode?: "grid" | "list";
}

export type Asset = {
  title: string;
  name: string;
  description: string;
  symbol: string;
  image: string;
  current_price: number;
  price_change_percentage_24h?: number;
  market_cap_rank?: number;
  ath: number;
  atl: number;
  ath_change_percentage: number;
  atl_change_percentage: number;
  circulating_supply: number;
  total_supply: number;
  atl_date: any;
  ath_date: any;
};

const AssetCard = ({
  asset,
  email,
  favorited,
  viewMode = "grid",
}: AssetCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const {
    title,
    name,
    symbol,
    image,
    current_price,
    price_change_percentage_24h,
    market_cap_rank,
    ath,
    atl,
    ath_change_percentage,
    atl_change_percentage,
    circulating_supply,
    total_supply,
    atl_date,
    ath_date,
  } = asset;

  const exploreLink = {
    pathname: `/assets/${symbol}`,
    query: { name },
  };

  const { addToFavorites, removeFromFavorites } = useAssetCardFavorites(
    { name: asset.name, symbol, image },
    email
  );

  return (
    <motion.div
      whileHover={{
        y: -2,
        transition: { duration: 0.25 },
      }}
      whileTap={{
        y: -1,
        transition: { duration: 0.1 },
      }}
    >
      <CardContainer data-view={viewMode}>
        <AssetCardHeader
          title={title}
          name={name}
          symbol={symbol}
          image={image}
          favorited={favorited}
          onAddToFavorites={addToFavorites}
          onRemoveFromFavorites={removeFromFavorites}
        />

        <AssetCardMetricsStrip
          current_price={current_price}
          price_change_percentage_24h={price_change_percentage_24h}
          market_cap_rank={market_cap_rank}
        />

        <ActionRow>
          <Link
            href={exploreLink}
            as={`/assets/${symbol}?name=${name}`}
            className="explore-link"
          >
            <PrimaryButton primary>Explore</PrimaryButton>
          </Link>
          <SecondaryButton
            type="button"
            onClick={() => setIsExpanded((v) => !v)}
            aria-expanded={isExpanded}
          >
            {isExpanded ? "Hide details" : "Details"}
          </SecondaryButton>
        </ActionRow>

        <AssetCardDetailsDrawer
          isExpanded={isExpanded}
          ath={ath}
          atl={atl}
          ath_change_percentage={ath_change_percentage}
          atl_change_percentage={atl_change_percentage}
          ath_date={ath_date}
          atl_date={atl_date}
          circulating_supply={circulating_supply}
          total_supply={total_supply}
        />
      </CardContainer>
    </motion.div>
  );
};

export default AssetCard;
