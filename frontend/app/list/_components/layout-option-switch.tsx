"use client"

import Link from "next/link";
import { useValueInQueryParam } from "../_hooks/use-value-in-query-param";

type LayoutOption = 'list' | 'grid';

export function LayoutOptionSwitch({}) {
  const [_, __, createLink] = useValueInQueryParam<LayoutOption>('layout');


  return <>
    <Link href={{query: createLink('list')}}>list</Link>
    <Link href={{query: createLink('grid')}}>grid</Link>
  </>
}