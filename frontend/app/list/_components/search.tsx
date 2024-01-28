"use client"

import { useEffect, useState } from "react";
import { useValueInQueryParam } from "../_hooks/use-value-in-query-param";

export function Search() {
  const [search, setSearch] = useValueInQueryParam('search');
  const [inputValue, setInputValue] = useState(search);
  
  useEffect(() => {
    // this is a simple debounce
    const timeoutRef = setTimeout(() => {
      setSearch(inputValue)
    }, 1000)

    return () => clearTimeout(timeoutRef);
  }, [inputValue]);

  return <input value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
}