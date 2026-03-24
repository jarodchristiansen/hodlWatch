import {
  AssetIcon,
  CardHeaderRow,
  FavoriteButton,
  Identity,
  Symbol,
  Title,
} from "./AssetCard.styled";

/** Top row: icon, title/symbol, favorite toggle. */
export function AssetCardHeader({
  title,
  name,
  symbol,
  image,
  favorited,
  onAddToFavorites,
  onRemoveFromFavorites,
}: {
  title: string;
  name: string;
  symbol: string;
  image: string;
  favorited: boolean;
  onAddToFavorites: () => void;
  onRemoveFromFavorites: () => void;
}) {
  return (
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
        onClick={favorited ? onRemoveFromFavorites : onAddToFavorites}
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
  );
}
