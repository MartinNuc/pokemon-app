"use client"
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export function NavigationTabs() {
  const searchParams = useSearchParams();

  return (<>
    <Link href={{pathname: '/list', search: searchParams.toString()}}>All</Link>
    <Link href={{pathname: '/list/favorites', search: searchParams.toString()}}>Favorites</Link>
  </>)
}