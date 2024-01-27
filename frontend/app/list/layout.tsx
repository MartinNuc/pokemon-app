import { PropsWithChildren } from "react";
import { NavigationTabs } from "./_components/navigation-tabs";
import { Filters } from "./_components/filters";
import { LayoutOptionSwitcher } from "./_components/layout-option-switcher";

export default function ListLayout({ children }: PropsWithChildren) {
  return <>
    <NavigationTabs />
    <Filters />
    <LayoutOptionSwitcher />
    {children}
  </>
}