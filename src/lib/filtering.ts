import { EventBase } from "./eventBase";

export class DataContainer<DataType> extends EventBase {
  private data: DataType[];
  private filters: Array<FilterBase<DataType>>;
  constructor({ data }: { data?: DataType[] }) {
    super();
    if (!data) throw new Error("Initial Data is undefined.");
    this.data = data;
    this.filters = new Array<FilterBase<DataType>>();
  }

  getData() {
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
    this.filters.push(filter);
  }
}

export class FilterBase<DataType> {
  private dataContainer: DataContainer<DataType>;
  private filterFunction: (element: DataType) => boolean;
  protected filterClearFunction: () => void;
  protected name: string;
  protected sessionStorageSerializationEnabled: boolean = false;
  constructor({
    filterFunction,
    name,
    dataContainer,
    filterClearFunction,
  }: {
    filterClearFunction: () => void;
    dataContainer: DataContainer<DataType>;
    filterFunction: (element: DataType) => boolean;
    name: string;
  }) {
    if (!dataContainer) throw new Error("Invalid data container.");
    this.dataContainer = dataContainer;
    this.filterFunction = filterFunction;
    this.filterClearFunction = filterClearFunction;
    this.name = name;
  }

  getFilterFunction() {
    return this.filterFunction;
  }
  clearFilter() {
    if (this.filterClearFunction) {
      this.filterClearFunction();
    }
  }
  getDataContainer() {
    if (!this.dataContainer)
      throw new Error("Context is undefined in FilterBase.");
    return this.dataContainer;
  }

  dispatchUpdate() {
    this.getDataContainer().emit("filterValueUpdate");
  }

  onEventFired(eventName: string, fn: (...args: any) => any) {
    this.getDataContainer().on(eventName, () => {
      if (typeof fn !== "function") {
        throw new Error(`${eventName} callback can only be a function.`);
      } else {
        fn();
      }
    });

    return () => this.dataContainer.remove(eventName, fn);
  }
  onFilterUpdate(fn: (...args: any) => any) {
    return this.onEventFired("filterValueUpdate", fn);
  }
  onFilterClear(fn: (...args: any) => any) {
    return this.onEventFired("filterClear", fn);
  }
}
export interface ISessionStorage {
  serializeToStorage: () => void;
  loadFromStorage: () => void;
}
