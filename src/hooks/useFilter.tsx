import { useEffect, useMemo, useState } from "react";
import { DataContainer } from "../lib/filtering";
import { useFilterContext } from "./useFilterContext";
/**
 * useFilter - Hook to access the filtered data.
 *
 * @returns Object { data: Data[], onFiltersCleared: function} - Returns the filtered data after all filters in the same context have been applied and way to add listeners to the filters cleared event.
 */
export function useFilter<T>() {
  const ctx = useFilterContext().context as DataContainer<T>;
  const [data, setData] = useState<T[]>(() => ctx.getInitialData());
  useMemo(() => {
    const clearFunction = ctx.on("filterValueUpdate", () => {
      const newData = ctx.getFilteredData();
      setData(newData);
    });
    setData(ctx.getInitialData()); //update the state after context changes for example from fetching data
    return clearFunction;
  }, [ctx]);
  useEffect(() => {
    setData(ctx.getFilteredData());
  }, []);
  return { data, onFiltersCleared: ctx.onFilterClear.bind(ctx) };
}
