import { EventBase } from "./eventBase";
export const DataContainerEvents = {
  FILTERED_DATA_RECALCULATED: "filteredDataRecalculated",
  FILTER_VALUE_UPDATE: "filterValueUpdate",
  FILTER_HISTORY_LOADED: "filterHistoryLoaded",
  FILTER_CLEAR: "filterClear",
  FILTERS_UPDATED: "filtersUpdated",
} as const;
export type PossibleDataContainerEvents =
  (typeof DataContainerEvents)[keyof typeof DataContainerEvents];
export class DataContainer<
  DataType
> extends EventBase<PossibleDataContainerEvents> {
  private data: DataType[];
  filters: Set<FilterBase<DataType>>;
  filteredData: DataType[];
  constructor({ data }: { data?: DataType[] }) {
    super();
    if (!data) throw new Error("Initial Data is undefined.");
    this.data = data;
    this.filters = new Set<FilterBase<DataType>>();
    this.filteredData = data;
  }

  getInitialData() {
    return this.data;
  }

  getFilteredData() {
    return this.filteredData;
  }

  clearFilters() {
    this.filters.forEach((filter) => filter.clearFilter());
    const oldSearchParams = new URLSearchParams(window.location.search);
    this.filters.forEach((filter) =>
      oldSearchParams.delete(filter.getFilterName())
    );
    window.history.pushState(
      window.history.state,
      "",
      "?" + oldSearchParams.toString()
    );

    //recalculate filtered data
    this.calculateFilteredData();

    this.emit(DataContainerEvents.FILTER_CLEAR);
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

  calculateFilteredData() {
    let fd = this.data;
    //replace with inplace filtering on performance issues.
    this.filters.forEach((f) => {
      const filterFn = f.getFilterFunction();
      fd = fd.filter(filterFn);
    });

    this.filteredData = fd;
    this.emit(DataContainerEvents.FILTERED_DATA_RECALCULATED);
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

    //add the filter to the list
    this.filters.add(filter);

    //recalculate new filtered data, this will be expensive with a lot of data and a lot of filters
    //if we ever run into performance problems optimize this later.
    this.calculateFilteredData();

    filter.subscribe("filterValueUpdate", () => {
      this.calculateFilteredData();
      this.emit(
        DataContainerEvents.FILTER_VALUE_UPDATE,
        this.getFilteredData()
      );
    });
    filter.subscribe("filterHistoryLoad", () => {
      this.calculateFilteredData();
      this.emit(
        DataContainerEvents.FILTER_HISTORY_LOADED,
        this.getFilteredData()
      );
    });
  }
}
const FilterBaseEvents = {
  FILTER_VALUE_UPDATE: "filterValueUpdate",
  FILTER_HISTORY_LOAD: "filterHistoryLoad",
  FILTER_CLEAR: "filterClear",
} as const;
export type PossibleFilterEvents =
  (typeof FilterBaseEvents)[keyof typeof FilterBaseEvents];
export class FilterBase<DataType> extends EventBase<PossibleFilterEvents> {
  private dataContainer: DataContainer<DataType>;
  private filterFunction: (element: DataType) => boolean;
  protected filterClearFunction: () => void;
  protected filterGetValueFunction: () => any;
  protected name: string;
  serializeToHistory: boolean = false;
  customHistorySearchParams?: string;
  constructor({
    filterFunction,
    name,
    dataContainer,
    filterClearFunction,
    filterGetValueFunction,
    serializeToHistory = false,
  }: {
    filterClearFunction: () => void;
    filterGetValueFunction: () => any;
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
    this.filterGetValueFunction = filterGetValueFunction;
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
  dispatchHistoryLoad() {
    this.dispatchEvent("filterHistoryLoad");
  }
  dispatchUpdate() {
    this.dispatchEvent("filterValueUpdate");
  }
  dispatchEvent(event: PossibleFilterEvents) {
    this.emit(event, this.filterGetValueFunction());
  }
}
export interface ISessionStorage {
  saveHistory: () => void;
  loadHistory: () => void;
}
