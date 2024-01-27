import Link from "next/link";

export function NavigationTabs() {
  return (<>
    <Link href="/list">All</Link>
    <Link href="/list/favorites">Favorites</Link>
  </>)
}