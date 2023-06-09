import React, { useMemo } from "react";
import { SearchFilter } from "../lib/searchFilter";
import { useFilterContext } from "./useFilterContext";

/**
 * useSearchFilter - Hook that enables text searching on the data.
 *
 * @param selectorFunction - Function used to select what part of the data you want to be able to search by. You can select to search by some string property or multiple string properties.
 *  @example const data=[{name:Peter,last:Parker}]
 *  const selectorFn = (el) => { return el.name } //searches only over first names, or
 *  const selectorFn = (el) => { return [el.name, el.last] } // will search by both parameters.
 *
 * @param Component - React Functional component that will be returned or a default component if a custom one is not provided. If you do provide a Component you MUST have it take a {filterChangeFunction} props parameter and call that whenever you want filtering to occur passing it the element object.
 *  @example const MySearchComp = ({filterChangeFunction}:{filterChangeFunction:Function}) => {
 *  return <input onChange={(e)=>{filterChangeFunction(e)}} />
 * }
 * @returns - The Search input component passed as Component or a default search component.
 *
 */
export function useSearchFilter<DT>(
  selectorFunction: (element: DT) => string | string[],
  Component?: React.FC<{ filterChangeFunction: Function }>
): React.JSX.Element {
  const dataContext = useFilterContext().context;
  return useMemo(() => {
    const sf = new SearchFilter(dataContext, selectorFunction);
    const searchFilterComponent = sf.addSearchFilter(Component);
    return searchFilterComponent;
  }, [Component, dataContext]);
}
