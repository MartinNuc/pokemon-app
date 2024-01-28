"use client";
import { Pokemon, PokemonCardFragment } from "@/app/__generated__/graphql";
import { gql, useFragment } from "@apollo/client";
import { LikeHeart } from "./like-heart";

type Props = {
  pokemonId: Pokemon['id'];
}

const fragment = gql`
  fragment PokemonCard on Pokemon {
    id
    image
    name
    types
    ...LikeHeart
  }
  ${LikeHeart.fragments.LikeHeart}
`;

export function PokemonCard({ pokemonId }: Props) {

  const { data: pokemon } = useFragment<PokemonCardFragment>({
    fragment,
    fragmentName: 'PokemonCard',
    from: {
      __typename: 'Pokemon',
      id: pokemonId
    }
  });

  return <div>
    {pokemon.name} <LikeHeart pokemonId={pokemonId} />
  </div>
}

PokemonCard.fragments = {
  PokemonCard: fragment
}