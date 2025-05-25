import Button from "@/components/commons/buttons/Button";
import { currencyFormat } from "@/helpers/formatters/currency";
import {
  formatPercentage,
  numberWithCommas,
} from "@/helpers/formatters/thousands";
import { FormatUnixTimeWithTime } from "@/helpers/formatters/time";
import { ADD_FAVORITE, REMOVE_FAVORITE } from "@/helpers/mutations/user";
import { GET_USER } from "@/helpers/queries/user";
import { Colors, FontWeight } from "@/styles/variables";
import { useMutation } from "@apollo/client";
import { motion, useCycle } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import styled from "styled-components";

interface AssetCardProps {
  asset: Asset;
  key?: string;
  email: string | null;
  favorited: boolean;
  refetchFavorites?: () => void;
}

export type Asset = {
  title: string;
  name: string;
  description: string;
  symbol: string;
  image: string;
  current_price: number;
  ath: number;
  atl: number;
  ath_change_percentage: number;
  atl_change_percentage: number;
  circulating_supply: number;
  total_supply: number;
  atl_date: number;
  ath_date: number;
};

const AssetCard = ({ asset, email, favorited }: AssetCardProps) => {
  const [cardView, setCardView] = useState("A");
  const [isFlipped, setIsFlipped] = useCycle(false, true);

  const flipVariants = {
    front: { rotateY: 0 },
    back: { rotateY: 180 },
  };

  const handleSnapshotClick = () => {
    setIsFlipped();
  };

  const {
    title,
    name,
    symbol,
    image,
    current_price,
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

  const changeCardView = (newView) => {
    handleSnapshotClick();
    setCardView(newView);
  };

  return (
    <motion.div
      whileHover={{
        scale: 1.03,
        transition: { duration: 0.7 },
      }}
      whileTap={{
        scale: 1.03,
        zIndex: 10,
        transition: { duration: 0.7 },
      }}
    >
      <CardContainer>
        <motion.div
          className="card-flip"
          initial={false}
          animate={isFlipped ? "back" : "front"}
          variants={flipVariants}
          transition={{ duration: 0.4 }}
        >
          {cardView === "A" && (
            <CardFront>
              <div className={"card-body holder"}>
                <FavoriteButton
                  onClick={favorited ? removeFromFavorites : addToFavorites}
                  data-testid={favorited ? "remove-button" : "add-button"}
                >
                  <img
                    src={
                      favorited
                        ? "/images/filled-star.svg"
                        : "/images/empty-star.svg"
                    }
                    className={"pointer-link"}
                    height={"32px"}
                    width={"32px"}
                    alt={
                      favorited
                        ? "favorited asset icon"
                        : "non-favorited asset icon"
                    }
                  />
                </FavoriteButton>
                <Title>{title || name || "Card Title"}</Title>
                <Symbol>{symbol.toUpperCase() || "Card subtitle"}</Symbol>
                <ImageContainer>
                  <img className="image" src={image} alt={name || title} />
                </ImageContainer>
                <ButtonRow>
                  <Link
                    href={exploreLink}
                    as={`/assets/${symbol}?name=${name}`}
                    className="explore-link"
                  >
                    <StyledButton primary>Explore</StyledButton>
                  </Link>
                  <StyledButton secondary onClick={() => changeCardView("B")}>
                    Snapshot
                  </StyledButton>
                </ButtonRow>
              </div>
            </CardFront>
          )}

          {cardView === "B" && (
            <CardBack>
              <div className={"card-body holder"}>
                <Title>{title || name}</Title>
                <SnapshotContainer>
                  <SnapshotItem>
                    All Time High: <span>{currencyFormat(ath)}</span>
                  </SnapshotItem>
                  <SnapshotItem>
                    All Time Low: <span>{currencyFormat(atl)}</span>
                  </SnapshotItem>
                  <SnapshotItem>
                    Ath Change %:{" "}
                    <span>{formatPercentage(ath_change_percentage)}</span>
                  </SnapshotItem>
                  <SnapshotItem>
                    ATH Date: <span>{FormatUnixTimeWithTime(ath_date)}</span>
                  </SnapshotItem>
                  <SnapshotItem>
                    ATL Change %:{" "}
                    <span>{formatPercentage(atl_change_percentage)}</span>
                  </SnapshotItem>
                  <SnapshotItem>
                    ATL Date: <span>{FormatUnixTimeWithTime(atl_date)}</span>
                  </SnapshotItem>
                  <SnapshotItem>
                    Circulating Supply:{" "}
                    <span>{numberWithCommas(circulating_supply)}</span>
                  </SnapshotItem>
                  <SnapshotItem>
                    Total Supply: <span>{numberWithCommas(total_supply)}</span>
                  </SnapshotItem>
                </SnapshotContainer>
                <ButtonRow>
                  <StyledButton onClick={() => changeCardView("A")}>
                    Main View
                  </StyledButton>
                </ButtonRow>
              </div>
            </CardBack>
          )}
        </motion.div>
      </CardContainer>
    </motion.div>
  );
};

// Styled-components redesign
const CardContainer = styled.div`
  background: rgba(24, 26, 32, 0.98);
  border-radius: 18px;
  box-shadow: 0 4px 24px 0 rgba(0, 0, 0, 0.18), 0 1.5px 6px 0 rgba(0, 0, 0, 0.1);
  color: #fff;
  margin: 1.5rem 0;
  padding: 2.2rem 1.5rem 1.5rem 1.5rem;
  text-align: center;
  position: relative;
  min-width: 0;
  transition: box-shadow 0.3s, transform 0.3s;

  &:hover {
    box-shadow: 0 8px 32px 0 rgba(40, 40, 60, 0.35), 0 2px 0 0 #ffd700;
    transform: translateY(-2px) scale(1.025);
  }

  .holder {
    position: relative;
  }

  .favorite-button {
    position: absolute;
    top: 18px;
    right: 18px;
    z-index: 2;
    background: rgba(30, 30, 40, 0.7);
    border-radius: 50%;
    padding: 4px;
    box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.12);
    transition: background 0.2s;
    &:hover {
      background: rgba(255, 215, 0, 0.15);
    }
  }

  .card-title {
    font-weight: ${FontWeight.bold};
    font-size: 1.45rem;
    color: ${Colors.white};
    margin: 1.2rem 0 0.2rem 0;
    letter-spacing: 0.01em;
  }

  .card-subtitle {
    font-weight: ${FontWeight.bold};
    font-size: 1.1rem;
    color: ${Colors.gold};
    margin-bottom: 1.1rem;
    letter-spacing: 0.08em;
  }

  .button-container {
    display: flex;
    gap: 1.2rem;
    justify-content: center;
    margin-top: 1.5rem;
  }

  .snapshot-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.5rem 1.2rem;
    padding: 0 0.5rem 1.2rem 0.5rem;
    background: rgba(30, 30, 40, 0.7);
    border-radius: 10px;
    margin-bottom: 1.2rem;
    p {
      font-weight: ${FontWeight.bold};
      color: ${Colors.white};
      font-size: 1.02rem;
      margin: 0.2rem 0;
    }
  }

  @media (max-width: 600px) {
    padding: 1.2rem 0.5rem 1rem 0.5rem;
    .card-title {
      font-size: 1.1rem;
    }
    .card-subtitle {
      font-size: 0.95rem;
    }
    .button-container {
      gap: 0.7rem;
    }
  }
`;

const CardFront = styled.div`
  padding: 2.2rem 1.5rem 1.5rem 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CardBack = styled.div`
  padding: 2.2rem 1.5rem 1.5rem 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h4`
  font-size: 1.45rem;
  font-weight: 700;
  margin: 0.5rem 0 0.2rem 0;
  color: #fff;
  letter-spacing: 0.01em;
`;

const Symbol = styled.h6`
  font-size: 1.1rem;
  font-weight: 600;
  color: #b0b8c1;
  margin-bottom: 1.1rem;
  letter-spacing: 0.08em;
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto 1.2rem auto;
  .image {
    width: 84px;
    height: 84px;
    border-radius: 50%;
    background: linear-gradient(135deg, #23283a 60%, #181c24 100%);
    box-shadow: 0 2px 12px 0 rgba(40, 40, 60, 0.18);
    object-fit: cover;
    border: 2.5px solid ${Colors.gold};
    padding: 6px;
  }
`;

const ButtonRow = styled.div`
  display: flex;
  gap: 1.1rem;
  justify-content: center;
  margin-top: 1.2rem;
`;

const StyledButton = styled(Button)`
  font-size: 1rem;
  font-weight: 600;
  border-radius: 8px;
  padding: 0.6rem 1.4rem;
  background: ${({ primary }) => (primary ? Colors.primary : "transparent")};
  color: ${({ primary }) => (primary ? "#fff" : Colors.primary)};
  border: 2px solid ${Colors.primary};
  box-shadow: none;
  transition: background 0.18s, color 0.18s;
  &:hover {
    background: ${Colors.primary};
    color: #fff;
    opacity: 0.92;
  }
`;

const FavoriteButton = styled.div`
  position: absolute;
  top: 18px;
  right: 18px;
  cursor: pointer;
  z-index: 2;
  background: rgba(24, 26, 32, 0.85);
  border-radius: 50%;
  padding: 0.3rem;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.12);
  transition: background 0.18s;
  &:hover {
    background: rgba(255, 215, 0, 0.18);
  }
`;

const SnapshotContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem 1.2rem;
  padding: 0 0.5rem 1.2rem 0.5rem;
  background: rgba(30, 30, 40, 0.7);
  border-radius: 10px;
  margin-bottom: 1.2rem;
`;

const SnapshotItem = styled.div`
  font-weight: ${FontWeight.bold};
  color: ${Colors.white};
  font-size: 1.02rem;
  margin: 0.2rem 0;
`;

export default AssetCard;
