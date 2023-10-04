import { useEffect, useMemo } from "react";
import { CheckboxFilter } from "../lib/checkboxFilter";
import { useFilterContext } from "./useFilterContext";
import { PossibleFilterEvents } from "../lib/filtering";

/**
 * useCheckboxFilter - hook that creates a checkbox filter and returns utilities to render checkbox components.
 *  @param selectorFunction - The function that returns the part of the data we want to filter by.
 *
 *  @param nameMap - A map that is used to lookup names you wish to assign to the checkbox labels for possible values of the checkbox filter.
 *  KEYS have to be the values the selector function returns and VALUES must be their respective string labels.
 *  If the the data is an array of {color: 'red'|'blue'} objects, useCheckboxHook will automatically get all the possible values for color and
 *  after some clean up (depends on prettyLabels, by default True) offer those values as labels for the checkboxes. If you instead pass in a nameMap the names specified in the map will be used.
 *
 *  @param prettyLabels - Boolean that selects if the user wants some clean up (capitalize first words, remove underscore) done on the possible values that are used as labels when nameMap is NOT provided.
 *
 *  @param name - A user supplied string that is used to keep track of the filter internally as well as saving the filters into search parameters. This can be any unique string for the filter scope.
 *
 *  @param serializeToHistory - Boolean value that selects if you want to save the filter values to search parameters so they can be shared via url. By default FALSE.
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
 */
export function useCheckboxFilter<DataArrayElementType, SelectorReturnType>({
  name,
  selectorFunction,
  nameMap,
  prettyLabels = true,
  serializeToHistory,
  customHistorySearchParams,
}: {
  name: string;
  prettyLabels?: boolean;
  selectorFunction: (arg: DataArrayElementType) => SelectorReturnType;
  nameMap?: Map<SelectorReturnType, string>;
  serializeToHistory?: boolean;
  customHistorySearchParams?: string;
}) {
  const dataContainer = useFilterContext().context;

  const checkbox = useMemo(() => {
    const checkbox = new CheckboxFilter({
      dataContainer,
      selectorFunction,
      name,
      prettyLabels,
      nameValueMap: nameMap,
      serializeToHistory,
      customHistorySearchParams,
    });

    dataContainer.addFilter(checkbox);

    return checkbox;
  }, [dataContainer]);

  useEffect(() => {
    //load history again after the component mounts
    //in nextjs without this the filters load history from the previous page
    checkbox.loadHistory();
    checkbox.dispatchHistoryLoad();
  }, []);

  useEffect(() => {
    if (checkbox.serializeToHistory) {
      const listenerFn = () => {
        checkbox.loadHistory();
        checkbox.dispatchHistoryLoad();
      };
      window.addEventListener("popstate", listenerFn);
      return () => window.removeEventListener("popstate", listenerFn);
    }
  }, [checkbox]);

  return {
    setChecked: checkbox.setChecked.bind(checkbox),
    subscribe: (event: PossibleFilterEvents, fn: (...args: any) => any) =>
      checkbox.subscribe(event, fn).bind(checkbox),
    labels: checkbox.getParsedPossibleValues(),
    preloadedCheckedLabels: Array.from(checkbox.checked),

    getNumberOfItemsWithLabel: (label: string) =>
      checkbox.getNumberOfItemsWithLabel(
        label,
        dataContainer.getFilteredData()
      ),
  };
}
export type CheckboxReturnType<
  DataType = unknown,
  SelectorReturnType = unknown
> = ReturnType<typeof useCheckboxFilter<DataType, SelectorReturnType>>;

type CheckboxLabelProps<
  DataType = unknown,
  SelectorReturnType = unknown
> = Omit<CheckboxReturnType<DataType, SelectorReturnType>, "labels"> & {
  label: string;
};
export type CheckboxFilterProps<
  DataType = unknown,
  SelectorReturnType = unknown
> = {
  [K in keyof Omit<
    CheckboxLabelProps<DataType, SelectorReturnType>,
    "label" | "setChecked"
  >]?: CheckboxLabelProps<DataType, SelectorReturnType>[K];
} & Pick<
  CheckboxLabelProps<DataType, SelectorReturnType>,
  "label" | "setChecked"
>;
