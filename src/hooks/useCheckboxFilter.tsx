import React, { ChangeEvent, useEffect, useState } from "react";
import { CheckboxFilter } from "../lib/checkboxFilter";
import { useFilterContext } from "./useFilterContext";

/**
 * useCheckboxFilter - hook that creates a checkbox filter and returns utilities to render checkbox components.
 *  @param {(arg:DataArrayElementType)=>SelectorReturnType} selectorFunction - The function that returns the part of the data we want to filter by.
 *
 *  @param {typeof nameMap} nameMap - A map that is used to lookup names you wish to assign to the checkbox labels for possible values of the checkbox filter.
 *  KEYS have to be the values the selector function returns and VALUES must be their respective string labels.
 *  If the the data is an array of {color: 'red'|'blue'} objects, useCheckboxHook will automatically get all the possible values for color and
 *  after some clean up (depends on prettyLabels, by default True) offer those values as labels for the checkboxes. If you instead pass in a nameMap the names specified in the map will be used.
 *
 *  @param {boolean} prettyLabels - Boolean that selects if the user wants some clean up (capitalize first words, remove underscore) done on the possible values that are used as labels when nameMap is NOT provided.
 *
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
}: {
  name: string;
  prettyLabels?: boolean;
  selectorFunction: (arg: DataArrayElementType) => SelectorReturnType;
  nameMap?: Map<SelectorReturnType, string>;
}) {
  const dataContainer = useFilterContext().context;
  const [checkbox, setCheckbox] = useState<
    CheckboxFilter<DataArrayElementType, SelectorReturnType>
  >(
    new CheckboxFilter<DataArrayElementType, SelectorReturnType>({
      dataContainer,
      selectorFunction,
      name,
      prettyLabels,
      nameValueMap: nameMap,
    })
  );
  useEffect(() => {
    const checkbox = new CheckboxFilter<
      DataArrayElementType,
      SelectorReturnType
    >({
      dataContainer,
      selectorFunction,
      name,
      prettyLabels,
      nameValueMap: nameMap,
    });
    setCheckbox(checkbox);
    dataContainer.addFilter(checkbox);
  }, [dataContainer]);
  return {
    setChecked: checkbox.setChecked.bind(checkbox),
    onFilterUpdate: checkbox.onFilterUpdate.bind(checkbox),
    onFilterClear: checkbox.onFilterClear.bind(checkbox),
    labels: checkbox.getParsedPossibleValues(),
  };
}
