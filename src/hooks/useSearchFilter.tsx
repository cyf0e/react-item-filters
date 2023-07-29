import { useMemo } from "react";
import { SearchFilter } from "../lib/searchFilter";
import { useFilterContext } from "./useFilterContext";

/**
 * useSearchFilter - Hook that enables text searching on the data.
 *
 *
 *
 * @param selectorFunction - Function used to select what part of the data you want to be able to search by. You can select to search by some string property or multiple string properties.
 *  @example const data=[{name:Peter,last:Parker}]
 *  const selectorFn = (el) => { return el.name } //searches only over first names, or
 *  const selectorFn = (el) => { return [el.name, el.last] } // will search by both parameters.
 *
 * @param name - A user supplied string that is used to keep track of the filter internally as well as saving the filters into search parameters. This can be any unique string for the filter scope.
 *
 * @param fuzzy - Optional fuzzy parameter to turn fuzzy search on. By default FALSE.
 *
 * @param serializeToHistory - Boolean value that selects if you want to save the filter values to search parameters so they can be shared via url. By default FALSE.
 *
 * @remark
 * DataArrayElement is the type of element from the supplied data array.
 * @example
 * For example if the data is
 * ```jsx
 * const data=[{name:John,lastname:John},{name:Peter,lastname:Parker}]
 * typeof data is DataArrayElement[]
 * typeof DataArrayEleemnt would be {name:string,lastname:string}
 * ```
 *
 * SelectorReturnType is the type of element that the selector function returns.
 * For the last example if we wanted to filter by lastname the selector function we would pass in would be
 * ```
 * const selectorFunction = (el:DataArrayElement)=>{return el.lastname}
 * ````
 * and the type would be string or ReturnType of the selection function.
 *
 * @returns - The Search input component passed as Component or a default search component.
 *
 */
export function useSearchFilter<DataType = any, SelectorReturnType = any>({
  name,
  selectorFunction,
  fuzzy,
  serializeToHistory,
}: {
  name: string;
  selectorFunction: (element: DataType) => SelectorReturnType;
  fuzzy?: boolean;
  serializeToHistory?: boolean;
}) {
  const dataContext = useFilterContext().context;

  const searchFilter = useMemo(() => {
    const sf = new SearchFilter({
      dataContainer: dataContext,
      selectorFunction,
      name,
      fuzzy,
      serializeToHistory,
    });

    dataContext.addFilter(sf);

    return sf;
  }, [dataContext]);

  return useMemo(() => {
    return {
      onFilterUpdate: searchFilter.onFilterUpdate.bind(searchFilter),
      setSearchString: searchFilter.updateSearchFilter.bind(searchFilter),
      onFilterClear: searchFilter.onFilterClear.bind(searchFilter),
      preloadedSearchValue: searchFilter.searchTerm,
    };
  }, [searchFilter]);
}

export type SearchFilterProps<
  DataType = any,
  SelectorReturnType = any
> = ReturnType<typeof useSearchFilter<DataType, SelectorReturnType>>;
