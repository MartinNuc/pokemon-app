"use client"

import { GetPokemonTypesQuery } from "@/app/__generated__/graphql";
import { gql, useSuspenseQuery } from "@apollo/client";
import { useValueInQueryParam } from "../_hooks/use-value-in-query-param";

const query = gql`
  query GetPokemonTypes {
    pokemonTypes
  }
`;

export function TypeFilter() {
  const [type, setType] = useValueInQueryParam('type');
 
  const { data: { pokemonTypes } } = useSuspenseQuery<GetPokemonTypesQuery>(query);

  return (
    <select value={type} onChange={(e) => setType(e.target.value)}>
      <option value="">All types</option>
      {pokemonTypes.map(type => <option key={type} value={type}>{type}</option>)}
    </select >
  )
}