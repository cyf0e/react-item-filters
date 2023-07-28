import { useMemo, useState } from "react";
import { DataContainer } from "../lib/filtering";
import { useFilterContext } from "./useFilterContext";
/**
 * useFilter - Hook to access the filtered data.
 *
 * @returns {Array<T>} Data[] - Returns the filtered data after all filters in the same context have been applied.
 */
export function useFilter<T>() {
  const ctx = useFilterContext().context as DataContainer<T>;
  const [data, setData] = useState<T[]>(() => ctx.getInitialData());
  //useEffect execution is deffered and executes last in a component. useMemo executes in order. Changing this to useEffect breaks filter loading from URL
  useMemo(() => {
    const clearFunction = ctx.on("filterValueUpdate", () => {
      const newData = ctx.getFilteredData();
      setData(newData);
    });
    setData(ctx.getInitialData()); //update the state after context changes for example from fetching data
    return clearFunction;
  }, [ctx]);
  return data;
}
