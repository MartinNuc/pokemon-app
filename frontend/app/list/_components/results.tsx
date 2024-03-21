"use client"
import { GetPokemonsQuery } from "@/app/__generated__/graphql";
import { gql, useSuspenseQuery } from "@apollo/client";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo } from "react";
import { PokemonCard } from "./pokemon-card";
import useVirtual, { LoadMoreEvent } from "react-cool-virtual";
import styles from "./results.module.css";

type Props = {
  onlyFavorites: boolean;
}

const POKEMON_PAGE_SIZE = 10;

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
    limit: POKEMON_PAGE_SIZE,
  }), [onlyFavorites, searchParams.get('type'), searchParams.get('search')]);

  const { data: { pokemons }, fetchMore, error, refetch } = useSuspenseQuery<GetPokemonsQuery>(resultsQuery, {
    variables: {
      ...pokemonQueryVariables,
      offset: 0,
    }
  });

  useEffect(() => {
    refetch(pokemonQueryVariables);
  }, [pokemonQueryVariables]);

  const isBatchLoaded = useMemo(() => new Set<number>([0]), []);
  const { outerRef, innerRef, items } = useVirtual<HTMLDivElement>({
    itemCount: pokemons.count,
    isItemLoaded: (loadIndex) => isBatchLoaded.has(loadIndex),
    loadMore,
    loadMoreCount: POKEMON_PAGE_SIZE
  });

  async function loadMore({ loadIndex, startIndex, stopIndex }: LoadMoreEvent) {
    isBatchLoaded.add(loadIndex);
    try {
      return fetchMore({
        variables: {
          ...pokemonQueryVariables,
          offset: startIndex,
          limit: stopIndex - startIndex + 1,
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          const newEntries = fetchMoreResult.pokemons.edges;
          return {
            pokemons: {
              ...previousResult.pokemons,
              edges: [...previousResult.pokemons.edges, ...newEntries],
            }
          };
        },
      });
    } catch (e) {
      isBatchLoaded.delete(loadIndex);
    }
  }

  return <div
    style={{ height: "100vh", overflow: "auto" }}
    ref={outerRef}
  >
    <div ref={innerRef}>
      <ul className={styles.list}>
        {items
          .map(({ index, measureRef }) => ({ pokemon: pokemons.edges[index], measureRef }))
          .filter(({ pokemon }) => pokemon)
          // due to client-side updates to favorite field there could be a pokemon which is in the cache but is not favorite anymore
          .filter(({ pokemon }) => !onlyFavorites || pokemon.isFavorite)
          .map(({ pokemon, measureRef }) => <li className={styles['list-item']} key={pokemon.id} ref={measureRef}><PokemonCard pokemonId={pokemon.id} /></li>)}
      </ul>
    </div>
  </div>
}