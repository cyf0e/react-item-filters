import { useMemo, useState } from "react";
import { DataContainer } from "../lib/filtering";
import { useFilterContext } from "./useFilterContext";
/**
 * useFilter - Hook to access the filtered data.
 *
 * @returns {Array<T>} Data[] - Returns the filtered dataafter all filters in the same context have been applied.
 */
export function useFilter<T>() {
  const ctx = useFilterContext().context as DataContainer<T>;
  const [data, setData] = useState<T[]>(ctx.data);
  useMemo(() => {
    setData(ctx.data); //update the state after context changes for example from fetching data
    ctx.setOnUpdateFilters(() => {
      const newData = ctx.getFilteredData();
      setData(newData);
    });
  }, [ctx]);
  return data;
}
