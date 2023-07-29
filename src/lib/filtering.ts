import { EventBase } from "./eventBase";

export class DataContainer<DataType> extends EventBase {
  private data: DataType[];
  private filters: Set<FilterBase<DataType>>;
  constructor({ data }: { data?: DataType[] }) {
    super();
    if (!data) throw new Error("Initial Data is undefined.");
    this.data = data;
    this.filters = new Set<FilterBase<DataType>>();
  }

  getInitialData() {
    return this.data;
  }

  getFilteredData() {
    let fd = this.data;
    this.filters.forEach((f) => {
      const filterFn = f.getFilterFunction();
      fd = fd.filter(filterFn);
    });
    return fd;
  }

  clearFilters() {
    this.filters.forEach((filter) => filter.clearFilter());
    this.emit("filterClear");
    window.sessionStorage.setItem("react-item-filters", "");
    const oldSearchParams = new URLSearchParams(window.location.search);
    this.filters.forEach((filter) =>
      oldSearchParams.delete(filter.getFilterName())
    );
    window.history.replaceState(
      window.history.state,
      "",
      "?" + oldSearchParams.toString()
    );
  }

  getPossibleValues<SF extends (...args: any) => any>(selectorFunction: SF) {
    if (!this.data)
      throw new Error("Data in DataContainer is null or undefined.");
    const possibleValues: Set<string> = new Set<string>();
    this.data.map((element) => {
      const eLReturn = selectorFunction(element);
      if (eLReturn) {
        if (typeof eLReturn == "string") {
          possibleValues.add(eLReturn);
        } else {
          throw new Error(
            "A value returned from the selector function is not of type string. Only strings are curently supported."
          );
        }
      }
    });
    return possibleValues;
  }
  addFilter(filter: FilterBase<DataType>) {
    if (!filter) throw new Error("Filter function is undefined");
    this.emit("filtersUpdated");

    //  Delete any filters with the same name.
    //  Without this React.Strict mode creates two filters for the same filter and breaks the filtering.
    this.filters.forEach((f) => {
      if (f.getFilterName() == filter.getFilterName()) {
        this.filters.delete(f);
      }
    });

    this.filters.add(filter);
    filter.onFilterUpdate(() => {
      this.emit("filterValueUpdate");
    });
  }
}

export class FilterBase<DataType> extends EventBase {
  private dataContainer: DataContainer<DataType>;
  private filterFunction: (element: DataType) => boolean;
  protected filterClearFunction: () => void;
  protected name: string;
  protected serializeToHistory: boolean = false;
  constructor({
    filterFunction,
    name,
    dataContainer,
    filterClearFunction,
    serializeToHistory = false,
  }: {
    filterClearFunction: () => void;
    dataContainer: DataContainer<DataType>;
    filterFunction: (element: DataType) => boolean;
    name: string;
    serializeToHistory?: boolean;
  }) {
    super();
    if (!dataContainer) throw new Error("Invalid data container.");
    this.dataContainer = dataContainer;
    this.filterFunction = filterFunction;
    this.filterClearFunction = filterClearFunction;
    this.name = name;
    this.serializeToHistory = serializeToHistory;
  }
  getFilterName() {
    return this.name;
  }
  getFilterFunction() {
    return this.filterFunction;
  }
  clearFilter() {
    if (this.filterClearFunction) {
      this.filterClearFunction();
    }

    this.emit("filterClear");
  }
  getDataContainer() {
    if (!this.dataContainer)
      throw new Error("Context is undefined in FilterBase.");
    return this.dataContainer;
  }

  dispatchUpdate() {
    this.emit("filterValueUpdate");
  }

  onEventFired(eventName: string, fn: (...args: any) => any) {
    const listenerFunction = () => {
      if (typeof fn !== "function") {
        throw new Error(`${eventName} callback can only be a function.`);
      } else {
        fn();
      }
    };

    this.on(eventName, listenerFunction);

    return () => this.remove(eventName, listenerFunction);
  }
  onFilterUpdate(fn: (...args: any) => any) {
    return this.onEventFired("filterValueUpdate", fn);
  }
  onFilterClear(fn: (...args: any) => any) {
    return this.onEventFired("filterClear", fn);
  }
}
export interface ISessionStorage {
  saveHistory: () => void;
  loadHistory: () => void;
}
