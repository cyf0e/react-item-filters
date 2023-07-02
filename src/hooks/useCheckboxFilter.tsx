import React, { useEffect, useState } from "react";
import { CheckboxFilter, CheckboxPropType } from "../lib/checkboxFilter";
import { useFilterContext } from "./useFilterContext";

/**
 * useCheckboxFilter - hook that creates a checkbox filter and retruns basic checkbox components to render with the options.
 *  @param {(arg:DataArrayElementType)=>SelectorReturnType} selectorFunction - The function that returns the part of the data we want to filter by.
 *
 *  @param Component - The Component that will be wrapped around. It gets passed in the filterUpdateFunction function and the value to display.
 *  The type of props that the components gets is { labelValue: string | SelectorReturnType, filterUpdateFunction: Function } and should be used like:
 * @example
 * ```jsx
 *    const Comp = ( { labelValue, filterUpdateFunction } : { labelValue: string, filterUpdateFunction: Function }) =>
 *    {
 *    return (
 *            <>
 *            <input type="checkbox" onChange={filterUpdateFunction}/>
 *            <label>{labelValue}</label>}
 *            </>
 *    )
 * ```
 *  If no custom Component is passed in, the returned checkbox elements will be the default element.
 *  You should really pass in a custom component in most cases.
 * ```jsx
 *
 *  <div>
 *     <input name={labelValue} id={labelValue} type="checkbox" />
 *     <label htmlFor={labelValue}>{labelValue}</label>
 *  </div>
 *
 * ```
 *  @param {typeof nameMap} nameMap - A map that is used to lookup names you wish to assign to the checkbox labels for possible values of the checkbox filter.
 *  KEYS have to be the values the selector function returns and VALUES must be their respective string labels.
 *  If the the data is an array of {color: 'red'|'blue'} objects, useCheckboxHook will automatically get all the possible values for color and
 *  after some clean up offer those values as labels for the checkboxes. If you instead pass in a nameMap the names specified in the map will be used.
 *
 *  @param {boolean} prettyLabels - Boolean that selects if the user wants some clean up (capitalize first words, remove underscore) done on the possible values that are used as labels when nameMap is NOT provided.
 *
 *  @return {Array<React.JSX.Element>} Components[] - The components to render.
 *
 * @remark
 * DataArrayElement is the type of element from the supplied data array.
 * @example
 * For example if the data is
 * ```jsx
 * const data=[{name:John,lastname:John},{name:Peter,lastname:Parker}]
 * typeof data = DataArrayElement[]
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
export function useCheckboxFilter<DataArrayElementType, SelectorReturnType>(
  name: string,
  selectorFunction: (arg: DataArrayElementType) => SelectorReturnType,
  Component?: <T extends CheckboxPropType<SelectorReturnType>>(
    props: T
  ) => React.JSX.Element,
  nameMap?: Map<SelectorReturnType, string>,
  prettyLabels = true
): Array<React.JSX.Element> {
  const dataContext = useFilterContext().context;
  const [checkboxComponents, setCheckboxComponents] = useState<any>(undefined);

  useEffect(() => {
    const checkbox = new CheckboxFilter<
      DataArrayElementType,
      SelectorReturnType
    >(dataContext, selectorFunction, name);

    const createdCheckboxComponents = checkbox.addCheckboxFilter(
      Component,
      nameMap,
      prettyLabels
    );

    setCheckboxComponents(createdCheckboxComponents);
  }, [Component, dataContext]);

  return checkboxComponents;
}
