"use client"
import { GetPokemonsQuery } from "@/app/__generated__/graphql";
import { gql, useSuspenseQuery } from "@apollo/client";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo } from "react";
import { PokemonCard } from "./pokemon-card";

type Props = {
  onlyFavorites: boolean;
}

export const resultsQuery = gql`
  query GetPokemons($onlyFavorites: Boolean, $type: String, $search: String, $limit: Int, $offset: Int) {
    pokemons(query: {
      filter: {
        isFavorite: $onlyFavorites,
        type: $type
      },
      search: $search,
      limit: $limit,
      offset: $offset
    }) {
      edges {
        id
        isFavorite
        ...PokemonCard
      }
      count
    }
  }
  ${PokemonCard.fragments.PokemonCard}
`;

export function Results({ onlyFavorites }: Props) {
  const searchParams = useSearchParams();

  const pokemonQueryVariables = useMemo(() => ({
    onlyFavorites,
    type: searchParams.get('type'),
    search: searchParams.get('search'),
    limit: 10,
  }), [onlyFavorites, searchParams.get('type'), searchParams.get('search')]);

  const { data: { pokemons }, fetchMore, refetch } = useSuspenseQuery<GetPokemonsQuery>(resultsQuery, {
    variables: {
      ...pokemonQueryVariables,
      offset: 0,
    }
  });

  useEffect(() => {
    refetch(pokemonQueryVariables);
  }, [pokemonQueryVariables]);

  const hasMore = pokemons.count > pokemons.edges.length;

  function handleLoadMore() {
    fetchMore({
      variables: {
        ...pokemonQueryVariables,
        offset: pokemons.edges.length,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        const newEntries = fetchMoreResult.pokemons.edges;
        return {
          pokemons: {
            count: previousResult.pokemons.count + fetchMoreResult.pokemons.count,
            edges: [...previousResult.pokemons.edges, ...newEntries],
          }
        };
      },
    });
  }

  return <ul>
    {pokemons.edges
      // due to client-side updates to favorite field there could be a pokemon which is in the cache but is not favorite anymore
      .filter(pokemon => !onlyFavorites || pokemon.isFavorite)
      .map(pokemon => <PokemonCard key={pokemon.id} pokemonId={pokemon.id} />)}
    {hasMore && <button onClick={handleLoadMore}>next page</button>}
  </ul>
}