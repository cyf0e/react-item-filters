import { useFilterContext } from "./useFilterContext";
/**
 * NOTE: React by default will not reset the state of your Filter elements like the checkbox for example. This is because it doesnt reset state of components that are rendered in the same place so the checkboxes will stay checked after clearing unless you explicitly make them reset by adding a dynamic key to them for example
 * ```jsx
 * function CustomCheckboxComp(){
 *  return <div key={randomString() || Math.random()}>
 *
 * </div>
 * }
 * ```
 * @returns clearFilters function
 */
export function useClearFilter() {
  const clearFilters = useFilterContext().clearAllFilters;
  return clearFilters;
}
