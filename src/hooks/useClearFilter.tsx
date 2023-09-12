import { useFilterContext } from "./useFilterContext";
/**
 * NOTE: To clear the state of your filters, subscribe to the filterClear event.
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
  const ctx = useFilterContext().context;
  return () => {
    ctx.clearFilters();
  };
}
