import { createContext, useMemo, useState } from "react";
import { DataContainer } from "../lib/filtering";

export const Context = createContext<{
  context: DataContainer<any>;
}>(null as any);

/**
 * Provider - Function component that wraps children with the filtering context.
 *
 * @param {typeof props} props - props.initialData is the starting point for unfiltered data that you want to be filtered. Pass [] if you have to async load initial data.
 * @returns
 */
export function FilterProvider<InitialDataType extends Array<any>>(props: {
  initialData: InitialDataType;
  children?: any;
}) {
  if (!Array.isArray(props.initialData)) {
    throw new Error(
      `Initial Data passed to the provider MUST be an array. Instead got: ${typeof props.initialData}. Use [] for empty initialization.`
    );
  }
  const dataContext = useMemo(() => {
    return new DataContainer({
      data: props.initialData,
    });
  }, [props.initialData]);

  return (
    <Context.Provider value={{ context: dataContext }}>
      {props.children}
    </Context.Provider>
  );
}
