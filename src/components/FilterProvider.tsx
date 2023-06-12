import { createContext, useMemo, useState } from "react";
import { DataContainer } from "../lib/filtering";

export const Context = createContext<{
  context: DataContainer<any>;
  clearAllFilters: Function;
}>(null as any);

/**
 * Provider - Function component that wraps children with the filtering context.
 *
 * @param {typeof props} props - props.initialData is the starting point for unfiltered data that you want to be filtered.
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
  const [dataContext, setDataContext] = useState<any>(
    new DataContainer(props.initialData)
  );
  useMemo(() => {
    setDataContext(new DataContainer(props.initialData));
  }, [props.initialData]);

  const resetDataContext = () => {
    setDataContext(new DataContainer([...props.initialData]));
  };
  return (
    <Context.Provider
      value={{ context: dataContext, clearAllFilters: resetDataContext }}
    >
      {props.children}
    </Context.Provider>
  );
}
