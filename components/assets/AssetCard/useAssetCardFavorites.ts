import { ADD_FAVORITE, REMOVE_FAVORITE } from "@/helpers/mutations/user";
import { GET_USER } from "@/helpers/queries/user";
import { useMutation } from "@apollo/client";

type FavoriteAssetFields = {
  name: string;
  symbol: string;
  image: string;
};

/** Apollo mutations for toggling favorites on an asset card. */
export function useAssetCardFavorites(
  asset: FavoriteAssetFields,
  email: string | null
) {
  const [addFavorite] = useMutation(ADD_FAVORITE, {
    refetchQueries: [{ query: GET_USER, variables: { email: email } }],
  });

  const [removeFavorite] = useMutation(REMOVE_FAVORITE, {
    refetchQueries: [{ query: GET_USER, variables: { email: email } }],
  });

  const addToFavorites = () => {
    addFavorite({
      variables: {
        input: {
          email,
          asset: {
            title: asset.name,
            symbol: asset.symbol.toUpperCase(),
            image: asset.image,
          },
        },
      },
    });
  };

  const removeFromFavorites = () => {
    removeFavorite({
      variables: {
        input: {
          email,
          asset: {
            title: asset.name,
            symbol: asset.symbol.toUpperCase(),
            image: asset.image,
          },
        },
      },
    });
  };

  return { addToFavorites, removeFromFavorites };
}
