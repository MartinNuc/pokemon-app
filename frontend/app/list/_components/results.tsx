"use client"
import { PokemonsQuery } from "@/app/__generated__/graphql";

import { gql, useSuspenseQuery } from "@apollo/client";

const query = gql`query Pokemons($showFavorite: Boolean! = false) {
  pokemons(query: {filter: {isFavorite: $showFavorite}, limit: 10}) {
    edges {
      id
      name
    }
  }
}`;

export function Results() {
  const { data } = useSuspenseQuery<PokemonsQuery>(query);

  return <ul>
    {data.pokemons.edges.map(pokemon => <li key={pokemon.id}>{pokemon.name}</li>)}
  </ul>
}