import { useContext } from "react";
import { Context } from "../components/FilterProvider";

/**
 * useFilterContext - hook to return the filtering context.
 *
 * @returns context - The context used for filtering.
 */
export function useFilterContext() {
  return useContext(Context);
}
