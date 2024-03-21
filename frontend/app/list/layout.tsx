import { PropsWithChildren } from "react";
import { NavigationTabs } from "./_components/navigation-tabs";
import { Search } from "./_components/search";
import { LayoutOptionSwitch } from "./_components/layout-option-switch";
import { TypeFilter } from "./_components/type-filter";
import styles from "./layout.module.css";

export default function ListLayout({ children }: PropsWithChildren) {
  return <>
    <NavigationTabs />
    <div className={styles.filters}>
      <Search />
      <TypeFilter />
      <LayoutOptionSwitch />
    </div >
    {children}
  </>
}