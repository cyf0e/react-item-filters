import { DataContainer, FilterBase, ISessionStorage } from "./filtering";
import Fuzzy from "fuzzy";
import { loadHistoryFilters, storeToSessionStorage } from "./util";
export type SearchFilterUpdateFunction = {
  (searchString: string): void;
};
export type SearchFilterPropType = {
  preloadedValue?: string;
  filterUpdateFunction: SearchFilterUpdateFunction;
};
export class SearchFilter<
    DataType,
    SelectorReturnType extends string | string[]
  >
  extends FilterBase<DataType>
  implements ISessionStorage
{
  searchTerm: string = "";
  selectorFunction: (element: DataType) => SelectorReturnType;
  constructor({
    dataContainer,
    selectorFunction,
    name,
    fuzzy,
  }: {
    dataContainer: DataContainer<DataType>;
    selectorFunction: (element: DataType) => SelectorReturnType;
    name: string;
    fuzzy?: boolean;
  }) {
    const filterFunction = (el: DataType) => {
      const stringsToSearch = this.selectorFunction(el);
      if (Array.isArray(stringsToSearch)) {
        let result = false;
        stringsToSearch.forEach((s) => {
          result =
            result || s.toLowerCase().includes(this.searchTerm.toLowerCase());
        });
        return result;
      } else {
        if (fuzzy) {
          return Fuzzy.test(this.searchTerm.toLowerCase(), stringsToSearch);
        }
        return stringsToSearch
          .toLowerCase()
          .includes(this.searchTerm.toLowerCase());
      }
    };
    super({ dataContainer, name, filterFunction });
    this.selectorFunction = selectorFunction;
    this.loadFromStorage();
  }

  updateSearchFilter(searchString: string) {
    searchString = searchString ?? "";
    this.searchTerm = searchString;
    this.serializeToStorage();
  }
  loadFromStorage() {
    if (!this.sessionStorageSerializationEnabled) return;
    const storageSearchString = loadHistoryFilters(this.name);
    if (!storageSearchString || storageSearchString.length == 0) return;
    this.searchTerm = storageSearchString;
  }
  serializeToStorage() {
    if (!this.sessionStorageSerializationEnabled) return;
    storeToSessionStorage(this.name, this.searchTerm);
  }
}
