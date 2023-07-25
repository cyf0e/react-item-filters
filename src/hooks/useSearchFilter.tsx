import React, { useEffect, useMemo, useState } from "react";
import {
  SearchFilter,
  SearchFilterPropType,
  SearchFilterUpdateFunction,
} from "../lib/searchFilter";
import { useFilterContext } from "./useFilterContext";

/**
 * useSearchFilter - Hook that enables text searching on the data.
 *
 * @param selectorFunction - Function used to select what part of the data you want to be able to search by. You can select to search by some string property or multiple string properties.
 *  @example const data=[{name:Peter,last:Parker}]
 *  const selectorFn = (el) => { return el.name } //searches only over first names, or
 *  const selectorFn = (el) => { return [el.name, el.last] } // will search by both parameters.
 *
 * @param Component - React Functional component that will be returned or a default component if a custom one is not provided. If you do provide a Component you must have it take a {filterUpdateFunction} props parameter and call that whenever you want filtering to occur passing it the element object.
 *  @example const MySearchComp = ({filterUpdateFunction}:{filterUpdateFunction:Function}) => {
 *  return <input onChange={(e)=>{filterUpdateFunction(e)}} />
 * }
 * @param fuzzy - Optional fuzzy parameter to turn fuzzy search on
 * @returns - The Search input component passed as Component or a default search component.
 *
 */
export function useSearchFilter<DataType = any>({
  name,
  selectorFunction,
  fuzzy,
}: {
  name: string;
  selectorFunction: (element: DataType) => string | string[];
  fuzzy?: boolean;
}) {
  const dataContext = useFilterContext().context;
  useEffect(() => {
    const sf = new SearchFilter({
      dataContainer: dataContext,
      selectorFunction,
      name,
      fuzzy,
    });
    dataContext.addFilter(sf);
  }, [dataContext]);
}
