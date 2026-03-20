import Button from "@/components/commons/buttons/Button";
import { currencyFormat } from "@/helpers/formatters/currency";
import {
  formatPercentage,
  numberWithCommas,
} from "@/helpers/formatters/thousands";
import { FormatUnixTimeWithTime } from "@/helpers/formatters/time";
import { ADD_FAVORITE, REMOVE_FAVORITE } from "@/helpers/mutations/user";
import { GET_USER } from "@/helpers/queries/user";
import { BorderRadius, Colors, FontFamily, FontWeight, Surfaces } from "@/styles/variables";
import { useMutation } from "@apollo/client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import styled from "styled-components";

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

const AssetCard = ({ asset, email, favorited, viewMode = "grid" }: AssetCardProps) => {
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

  const [addFavorite, { loading, error }] = useMutation(ADD_FAVORITE, {
    // TEMP SOLUTION UNTIL CACHING FIXED
    refetchQueries: [{ query: GET_USER, variables: { email: email } }],
  });

  const [removeFavorite, { loading: removeLoading, error: removeError }] =
    useMutation(REMOVE_FAVORITE, {
      // TEMP SOLUTION UNTIL CACHING FIXED
      refetchQueries: [{ query: GET_USER, variables: { email: email } }],
    });

  const removeFromFavorites = () => {
    removeFavorite({
      variables: {
        input: {
          email,
          asset: {
            title: asset.name,
            symbol: symbol.toUpperCase(),
            image: image,
          },
        },
      },
    });
  };

  const addToFavorites = () => {
    addFavorite({
      variables: {
        input: {
          email,
          asset: {
            title: asset.name,
            symbol: symbol.toUpperCase(),
            image: image,
          },
        },
      },
    });
  };

  const hasPrice = typeof current_price === "number" && !Number.isNaN(current_price);
  const hasChange24h =
    typeof price_change_percentage_24h === "number" &&
    !Number.isNaN(price_change_percentage_24h);
  const changeIsPositive = !!hasChange24h && price_change_percentage_24h >= 0;

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
        <CardHeaderRow>
          <Identity>
            <AssetIcon aria-hidden="true">
              <img className="image" src={image} alt={name || title} />
            </AssetIcon>
            <div className="names">
              <Title>{title || name || "Asset"}</Title>
              <Symbol>{symbol?.toUpperCase() || "-"}</Symbol>
            </div>
          </Identity>

          <FavoriteButton
            type="button"
            onClick={favorited ? removeFromFavorites : addToFavorites}
            aria-label={favorited ? "Remove from favorites" : "Add to favorites"}
            data-testid={favorited ? "remove-button" : "add-button"}
          >
            <img
              src={favorited ? "/images/filled-star.svg" : "/images/empty-star.svg"}
              height={"22px"}
              width={"22px"}
              alt=""
            />
          </FavoriteButton>
        </CardHeaderRow>

        <MetricsStrip role="group" aria-label="Key metrics">
          <MetricBlock>
            <span className="label">Price</span>
            <span className="value">{hasPrice ? currencyFormat(current_price) : "—"}</span>
          </MetricBlock>
          <MetricBlock>
            <span className="label">24h</span>
            <ChangePill className={changeIsPositive ? "pos" : "neg"}>
              {hasChange24h ? `${changeIsPositive ? "+" : ""}${price_change_percentage_24h.toFixed(2)}%` : "—"}
            </ChangePill>
          </MetricBlock>
          <MetricBlock>
            <span className="label">Rank</span>
            <span className="value">{typeof market_cap_rank === "number" ? `#${market_cap_rank}` : "—"}</span>
          </MetricBlock>
        </MetricsStrip>

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

        <Drawer aria-hidden={!isExpanded} data-open={isExpanded}>
          <DrawerGrid>
            <DrawerItem>
              <span className="k">All-time high</span>
              <span className="v">{typeof ath === "number" ? currencyFormat(ath) : "—"}</span>
            </DrawerItem>
            <DrawerItem>
              <span className="k">All-time low</span>
              <span className="v">{typeof atl === "number" ? currencyFormat(atl) : "—"}</span>
            </DrawerItem>
            <DrawerItem>
              <span className="k">ATH change</span>
              <span className="v">{typeof ath_change_percentage === "number" ? formatPercentage(ath_change_percentage) : "—"}</span>
            </DrawerItem>
            <DrawerItem>
              <span className="k">ATL change</span>
              <span className="v">{typeof atl_change_percentage === "number" ? formatPercentage(atl_change_percentage) : "—"}</span>
            </DrawerItem>
            <DrawerItem>
              <span className="k">ATH date</span>
              <span className="v">{ath_date ? FormatUnixTimeWithTime(ath_date) : "—"}</span>
            </DrawerItem>
            <DrawerItem>
              <span className="k">ATL date</span>
              <span className="v">{atl_date ? FormatUnixTimeWithTime(atl_date) : "—"}</span>
            </DrawerItem>
            <DrawerItem>
              <span className="k">Circulating</span>
              <span className="v">{typeof circulating_supply === "number" ? numberWithCommas(circulating_supply) : "—"}</span>
            </DrawerItem>
            <DrawerItem>
              <span className="k">Total supply</span>
              <span className="v">{typeof total_supply === "number" ? numberWithCommas(total_supply) : "—"}</span>
            </DrawerItem>
          </DrawerGrid>
        </Drawer>
      </CardContainer>
    </motion.div>
  );
};

const CardContainer = styled.div`
  background: ${Surfaces.cardDark};
  border-radius: ${BorderRadius.large};
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 10px 28px rgba(0, 0, 0, 0.18);
  color: ${Colors.white};
  padding: 16px 16px 14px 16px;
  position: relative;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 0;
  transition: border-color 0.18s ease, box-shadow 0.18s ease;

  &:hover {
    border-color: rgba(212, 168, 75, 0.35);
    box-shadow: 0 14px 34px rgba(0, 0, 0, 0.22);
  }

  &[data-view="list"] {
    padding: 16px 18px 14px 18px;
  }
`;

const CardHeaderRow = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  min-width: 0;
`;

const Title = styled.h4`
  font-size: 1.02rem;
  font-weight: 800;
  margin: 0;
  color: ${Colors.white};
  letter-spacing: 0.01em;
  line-height: 1.25;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  word-break: break-word;
`;

const Symbol = styled.h6`
  font-size: 0.92rem;
  font-weight: 800;
  color: ${Colors.textMutedOnDark};
  margin: 2px 0 0 0;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

const Identity = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  min-width: 0;
  flex: 1;

  .names {
    min-width: 0;
    flex: 1;
    padding-top: 2px;
  }
`;

const AssetIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 44px;
  height: 44px;
  border-radius: 999px;
  background: linear-gradient(
    135deg,
    ${Surfaces.imageWellFrom} 60%,
    ${Surfaces.imageWellTo} 100%
  );
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.18);

  .image {
    width: 40px;
    height: 40px;
    border-radius: 999px;
    object-fit: cover;
    border: 2px solid rgba(212, 168, 75, 0.55);
    background: ${Surfaces.cardPanelStrong};
  }
`;

const MetricsStrip = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr);
  gap: 10px 12px;
  align-items: start;
  margin-top: 14px;
  padding-top: 14px;
  border-top: 1px solid rgba(255, 255, 255, 0.07);
  min-width: 0;
`;

const MetricBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 6px;
  min-width: 0;

  .label {
    font-size: 0.72rem;
    font-weight: 800;
    letter-spacing: 0.05em;
    color: rgba(255, 255, 255, 0.55);
    text-transform: uppercase;
  }

  .value {
    font-size: 0.94rem;
    font-weight: 900;
    letter-spacing: 0.01em;
    color: ${Colors.white};
    line-height: 1.2;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

const ChangePill = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 28px;
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 0.86rem;
  font-weight: 900;
  letter-spacing: 0.01em;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(0, 0, 0, 0.18);
  color: rgba(255, 255, 255, 0.9);
  max-width: 100%;
  box-sizing: border-box;

  &.pos {
    background: rgba(20, 209, 20, 0.12);
    border-color: rgba(20, 209, 20, 0.28);
    color: #9bff9b;
  }
  &.neg {
    background: rgba(231, 76, 60, 0.12);
    border-color: rgba(231, 76, 60, 0.28);
    color: #ffb3aa;
  }
`;

const ActionRow = styled.div`
  display: flex;
  gap: 10px;
  justify-content: flex-start;
  flex-wrap: wrap;
  margin-top: 14px;
  align-items: center;

  .explore-link {
    text-decoration: none;
  }
`;

const PrimaryButton = styled(Button)`
  font-size: 0.98rem;
  font-weight: 800;
  border-radius: 12px;
  padding: 0.55rem 1rem;
  background: ${Colors.accent};
  color: ${Colors.charcoal};
  border: none;
  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.18);
  transition: transform 0.15s ease, background 0.15s ease, color 0.15s ease;

  &:hover {
    background: ${Colors.primary};
    color: ${Colors.white};
    transform: translateY(-1px);
  }

  &:focus-visible {
    outline: 2px solid ${Colors.accent};
    outline-offset: 2px;
  }
`;

const SecondaryButton = styled.button`
  height: 38px;
  padding: 0 12px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(0, 0, 0, 0.18);
  color: rgba(255, 255, 255, 0.9);
  font-weight: 900;
  font-family: ${FontFamily.primary};
  cursor: pointer;
  transition: background 0.15s ease, transform 0.15s ease;

  &:hover {
    background: rgba(245, 230, 179, 0.14);
    transform: translateY(-1px);
  }

  &:focus-visible {
    outline: 2px solid ${Colors.accent};
    outline-offset: 2px;
  }
`;

const FavoriteButton = styled.button`
  height: 38px;
  width: 38px;
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background: ${Surfaces.cardPanelStrong};
  border-radius: 999px;
  padding: 0;
  border: 1px solid rgba(255, 255, 255, 0.12);
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.12);
  transition: background 0.18s, transform 0.18s;

  &:hover {
    background: rgba(255, 215, 0, 0.18);
    transform: translateY(-1px);
  }

  &:focus-visible {
    outline: 2px solid ${Colors.accent};
    outline-offset: 2px;
  }
`;

const Drawer = styled.div`
  margin-top: 12px;
  border-radius: ${BorderRadius.medium};
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: ${Surfaces.cardPanel};
  overflow: hidden;
  max-height: 0;
  opacity: 0;
  transition: max-height 260ms ease, opacity 200ms ease;

  &[data-open="true"] {
    max-height: 480px;
    opacity: 1;
  }
`;

const DrawerGrid = styled.div`
  padding: 12px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px 12px;

  @media (max-width: 420px) {
    grid-template-columns: 1fr;
  }
`;

const DrawerItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;

  .k {
    font-size: 0.78rem;
    font-weight: 800;
    letter-spacing: 0.04em;
    color: rgba(255, 255, 255, 0.65);
    text-transform: uppercase;
  }

  .v {
    font-size: 0.95rem;
    font-weight: ${FontWeight.bold};
    color: rgba(255, 255, 255, 0.92);
  }
`;

export default AssetCard;
