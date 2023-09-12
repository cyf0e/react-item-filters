import { useEffect, useMemo, useState } from "react";
import {
  DataContainer,
  DataContainerEvents,
  PossibleDataContainerEvents,
} from "../lib/filtering";
import { useFilterContext } from "./useFilterContext";
/**
 * useFilter - Hook to access the filtered data.
 *
 * @returns Object { data: Data[], onFiltersCleared: function} - Returns the filtered data after all filters in the same context have been applied and way to add listeners to the filters cleared event.
 */
export function useFilter<T>() {
  const ctx = useFilterContext().context as DataContainer<T>;
  const [data, setData] = useState<T[]>(() => ctx.getFilteredData());

  useEffect(() => {
    const unsub = ctx.subscribe(
      DataContainerEvents.FILTERED_DATA_RECALCULATED,
      () => {
        const newData = ctx.getFilteredData();
        setData(newData);
      }
    );
    //update the state after context changes for example from fetching data
    setData(ctx.getFilteredData());
    return () => unsub();
  }, [ctx]);

  return {
    data,

    subscribe: (
      event: PossibleDataContainerEvents,
      fn: (filteredData?: Array<T>) => any
    ) => ctx.subscribe(event, fn).bind(ctx),
  };
}
