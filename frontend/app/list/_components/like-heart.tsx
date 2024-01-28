import { FavoriteMutation, LikeHeartFragment, Pokemon, UnFavoriteMutation } from "@/app/__generated__/graphql";
import { gql, useFragment, useMutation } from "@apollo/client";

type Props = {
  pokemonId: Pokemon['id'];
}

const fragment = gql`
  fragment LikeHeart on Pokemon {
    isFavorite
  }
`;

const favoriteMutation = gql`
  mutation Favorite($pokemonId: ID!) {
    favoritePokemon(id: $pokemonId) {
      id
      isFavorite
    }
  }
`;

const unFavoriteMutation = gql`
  mutation unFavorite($pokemonId: ID!) {
    unFavoritePokemon(id: $pokemonId) {
      id
      isFavorite
    }
  }
`;

export function LikeHeart({ pokemonId }: Props) {
  const { data: pokemon } = useFragment<LikeHeartFragment>({
    fragment,
    fragmentName: 'LikeHeart',
    from: {
      __typename: 'Pokemon',
      id: pokemonId
    }
  });

  const [favorite] = useMutation<FavoriteMutation>(favoriteMutation, {
    variables: { pokemonId },
  });
  const [unfavorite] = useMutation<UnFavoriteMutation>(unFavoriteMutation, {
    variables: { pokemonId },
  });

  return <>{pokemon.isFavorite ?
    <button onClick={() => unfavorite()}>❤️</button>
    :
    <button onClick={() => favorite()}>💔</button>}</>
}

LikeHeart.fragments = {
  LikeHeart: fragment
}