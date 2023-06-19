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
import { Image } from "react-bootstrap";
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
      <motion.div
        className="card-flip"
        initial={false}
        animate={isFlipped ? "back" : "front"}
        variants={flipVariants}
        transition={{ duration: 0.4 }}
      >
        {cardView === "A" && (
          <AssetCardWrapper>
            <div className={"card-body py-4 holder"}>
              {!favorited && (
                <div
                  onClick={addToFavorites}
                  className="favorite-button"
                  data-testid="add-button"
                >
                  <Image
                    src={"/images/empty-star.svg"}
                    className={"pointer-link"}
                    height={"40px"}
                    width={"40px"}
                    alt="non-favorited asset icon"
                  />
                </div>
              )}
              {favorited && (
                <div
                  onClick={removeFromFavorites}
                  className="favorite-button"
                  data-testid="remove-button"
                >
                  <Image
                    src={"/images/filled-star.svg"}
                    className={"pointer-link"}
                    height={"40px"}
                    width={"40px"}
                    alt="favorited asset icon"
                  />
                </div>
              )}

              <h4 className="card-title">{title || name || "Card Title"}</h4>

              <h6 className="card-subtitle my-2 text-muted">
                {symbol.toUpperCase() || "Card subtitle"}
              </h6>

              <ImageContainer>
                <Image
                  className="image"
                  src={image}
                  alt={name || title}
                  // @ts-ignore
                  unoptimized={"true"}
                />
              </ImageContainer>

              <Link href={exploreLink} as={`/assets/${symbol}?name=${name}`}>
                <button>Explore</button>
              </Link>

              <button onClick={() => changeCardView("B")}>Snapshot</button>
            </div>
          </AssetCardWrapper>
        )}

        {cardView === "B" && (
          <AssetCardWrapper className={cardView === "B" ? "flipped" : ""}>
            <div className={"card-body py-4 holder"}>
              <h4>{title || name}</h4>

              <div className="snapshot-container">
                <p>All Time High: {currencyFormat(ath)}</p>
                <p>All Time Low: {currencyFormat(atl)}</p>
                <p>
                  Ath Change Percentage:{" "}
                  {formatPercentage(ath_change_percentage)}
                </p>
                <p>ATH Date: {FormatUnixTimeWithTime(ath_date)}</p>
                <p>
                  ATL Change Percentage:{" "}
                  {formatPercentage(atl_change_percentage)}
                </p>
                <p>ATL Date: {FormatUnixTimeWithTime(atl_date)}</p>
                <p>
                  Circulating Supply: {numberWithCommas(circulating_supply)}
                </p>
                <p>Total Supply: {numberWithCommas(total_supply)}</p>
              </div>

              <button onClick={() => changeCardView("A")}>Main View</button>
            </div>
          </AssetCardWrapper>
        )}
      </motion.div>
    </motion.div>
  );
};

const ImageContainer = styled.div`
  padding: 2rem;

  .image {
    width: 100px;
    height: 100px;
  }
`;

const CardFront = styled.div`
  border-radius: 12px;
  background-color: ${Colors.lightGray};
  border: 1px solid black;
  text-align: center;
  margin: 1rem 0;
  box-shadow: 2px 4px 8px gray;

  .holder {
    position: relative;
  }

  .favorite-button {
    position: absolute;
    top: 10px;
    right: 10px;
  }

  button {
    color: ${Colors.elegant.white};
    background-color: ${Colors.elegant.accentPurple};
    border-radius: 8px;
    padding: 8px;
    font-weight: 600;
  }
  /* Styles for the front side of the card */
`;

const CardBack = styled.div`
  /* Styles for the back side of the card */
`;

const AssetCardWrapper = styled.div`
  border-radius: 12px;
  background-color: ${Colors.lightGray};
  border: 1px solid black;
  text-align: center;
  margin: 1rem 0;
  box-shadow: 2px 4px 8px gray;

  .holder {
    position: relative;
  }

  .favorite-button {
    position: absolute;
    top: 10px;
    right: 10px;
  }

  &.flipped {
    transform: rotateY(180deg);
  }

  .snapshot-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding: 0 12px;

    p {
      font-weight: ${FontWeight.bold};
    }
  }

  button {
    color: ${Colors.elegant.white};
    background-color: ${Colors.elegant.accentPurple};
    border-radius: 8px;
    padding: 8px;
    font-weight: 600;
  }
`;

export default AssetCard;
