import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";

export function useValueInQueryParam<T extends string>(queryParamKey: string) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [value, setValue] = useState(() => searchParams.get(queryParamKey) || '');

  const set = useCallback((newValue: T) => {
    setValue(newValue);
    const params = new URLSearchParams(searchParams.toString())
    if (!!newValue) {
      params.set(queryParamKey, newValue)
    } else {
      params.delete(queryParamKey);
    }

    const url = `${pathname}?${params}`
    router.push(url, { scroll: false });
  }, [router, searchParams, setValue]);

  const createLink = useCallback(
    (layout: T): string => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(queryParamKey, layout)
 
      return params.toString()
    },
    [searchParams]
  )

  return [value, set, createLink] as const;
}