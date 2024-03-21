"use client"

import Link from "next/link";
import { useValueInQueryParam } from "../_hooks/use-value-in-query-param";
import styles from "./layout-option-switch.module.css";
import { ListIcon } from "./list-icon";
import { GridIcon } from "./grid-icon";

type LayoutOption = 'list' | 'grid';

export function LayoutOptionSwitch({}) {
  const [_, __, createLink] = useValueInQueryParam<LayoutOption>('layout');

  return <>
    <Link href={{query: createLink('list')}}><ListIcon /></Link>
    <div className={styles.separator}></div>
    <Link href={{query: createLink('grid')}}><GridIcon /></Link>
  </>
}