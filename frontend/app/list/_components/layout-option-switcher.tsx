"use client"

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCallback } from "react";

type LayoutOption = 'list' | 'grid';

export function LayoutOptionSwitcher({}) {
  const searchParams = useSearchParams();

  const createLayoutLink = useCallback(
    (layout: LayoutOption): string => {
      const params = new URLSearchParams(searchParams.toString())
      params.set('layout', layout)
 
      return params.toString()
    },
    [searchParams]
  )

  return <>
    <Link href={{query: createLayoutLink('list')}}>list</Link>
    <Link href={{query: createLayoutLink('grid')}}>grid</Link>
  </>
}