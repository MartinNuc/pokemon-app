"use client";
import { Pokemon, PokemonCardFragment } from "@/app/__generated__/graphql";
import { gql, useFragment } from "@apollo/client";
import { LikeHeart } from "./like-heart";
import styles from "./pokemon-card.module.css";

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

  return <div className={styles.card}>
    <img className={styles.image} src={pokemon.image} alt={pokemon.name} />
    <div className={styles.info}>
      <div className={styles['left-slot']}>
        <div className={styles.name}>
          {pokemon.name}
        </div>
        <div className={styles.types}>
          {pokemon.types?.join(', ')}
        </div>
      </div>

      <div className={styles['right-slot']}>
        <LikeHeart pokemonId={pokemonId} />
      </div>
    </div>
  </div>
}

PokemonCard.fragments = {
  PokemonCard: fragment
}