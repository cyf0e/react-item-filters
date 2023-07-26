import { DataContainer, FilterBase, ISessionStorage } from "./filtering";
import Fuzzy from "fuzzy";
import { loadHistoryFilters, storeToSessionStorage } from "./util";

export class SearchFilter<
    DataType = any,
    SelectorReturnType extends string | string[] = any
  >
  extends FilterBase<DataType>
  implements ISessionStorage
{
  searchTerm: string;
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
            result ||
            s.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1;
        });
        return result;
      } else {
        if (stringsToSearch.length == 0) return true;
        if (fuzzy) {
          return Fuzzy.test(this.searchTerm.toLowerCase(), stringsToSearch);
        }
        return (
          stringsToSearch.toLowerCase().indexOf(this.searchTerm.toLowerCase()) >
          -1
        );
      }
    };
    super({
      dataContainer,
      name,
      filterFunction,
      filterClearFunction: () => {
        this.searchTerm = "";
      },
    });
    this.searchTerm = "";
    this.selectorFunction = selectorFunction;
    this.loadFromStorage();
  }

  updateSearchFilter(searchString: string) {
    searchString = searchString ?? "";
    this.searchTerm = searchString;
    this.serializeToStorage();
    this.dispatchUpdate();
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
