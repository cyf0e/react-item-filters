export class DataContainer<DT> {
  sessionStorageSerializationEnabled = false;
  data: DT[];
  filters: Array<(element: DT) => boolean>;
  filterUpdateFunction?: () => DT[];
  constructor(data?: DT[], sessionStorageEnabled?: boolean) {
    if (!data) throw new Error("Initial Data is undefined.");
    this.data = data;
    this.filters = new Array<(element: any) => boolean>();
    this.sessionStorageSerializationEnabled = sessionStorageEnabled ?? false;
  }

  getFilteredData() {
    let fd = [...this.data];
    this.filters.forEach((f) => {
      fd = fd.filter(f);
    });
    return fd;
  }

  setOnUpdateFilters(fn: (...args: any) => any) {
    this.filterUpdateFunction = fn;
  }
  onFiltersUpdated() {
    if (this.filterUpdateFunction) this.filterUpdateFunction();
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
    return Array.from(possibleValues);
  }
  addFilter(filter: (...args: any) => any) {
    if (!filter) throw new Error("Filter function is undefined");
    this.filters.push(filter);
  }
}
export class FilterBase<DT> {
  dataContext?: DataContainer<DT>;
  filterFunction: (element: DT) => boolean;
  name: string;
  sessionStorageSerializationEnabled: boolean;
  constructor(
    context: DataContainer<DT>,
    filterFn: (element: DT) => boolean,
    name: string
  ) {
    this.dataContext = context;
    this.filterFunction = filterFn;
    this.getDataContext().addFilter(this.filterFunction);
    this.name = name;
    this.sessionStorageSerializationEnabled =
      this.getDataContext().sessionStorageSerializationEnabled;
  }
  getDataContext() {
    if (!this.dataContext)
      throw new Error("Context is undefined in FilterBase.");
    return this.dataContext;
  }
  dispatchUpdate() {
    this.getDataContext().onFiltersUpdated();
  }
}
export interface ISessionStorage {
  serializeToStorage: () => void;
  loadFromStorage: () => void;
}
