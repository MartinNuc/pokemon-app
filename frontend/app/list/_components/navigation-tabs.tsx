"use client"
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import styles from "./navigation-tabs.module.css";

export function NavigationTabs() {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  return (<div className={styles.tabs}>
    <Link className={`${styles.tab} ${pathname === '/list' ? styles.active : ''}`} href={{pathname: '/list', search: searchParams.toString()}}>All</Link>
    <Link className={`${styles.tab} ${pathname === '/list/favorites' ? styles.active : ''}`} href={{pathname: '/list/favorites', search: searchParams.toString()}}>Favorites</Link>
  </div>)
}