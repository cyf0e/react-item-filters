import { DataContainer, FilterBase, ISessionStorage } from "./filtering";
import Fuzzy from "fuzzy";
import { loadHistoryFiltersFromURL, storeHistoryToURL } from "./util";

export class SearchFilter<DataType = any, SelectorReturnType = any>
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
    serializeToHistory,
  }: {
    dataContainer: DataContainer<DataType>;
    selectorFunction: (element: DataType) => SelectorReturnType;
    name: string;
    fuzzy?: boolean;
    serializeToHistory?: boolean;
  }) {
    const filterFunction = (el: DataType) => {
      const stringsToSearch = this.selectorFunction(el);
      if (this.searchTerm == "") return true;
      if (!stringsToSearch) return false;
      if (Array.isArray(stringsToSearch)) {
        let result = false;
        stringsToSearch.forEach((s) => {
          if (typeof s == "string") {
            result =
              result ||
              s.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1;
          }
        });
        return result;
      } else if (typeof stringsToSearch == "string") {
        if (stringsToSearch.length == 0) return true;
        if (fuzzy) {
          return Fuzzy.test(this.searchTerm.toLowerCase(), stringsToSearch);
        }
        return (
          stringsToSearch.toLowerCase().indexOf(this.searchTerm.toLowerCase()) >
          -1
        );
      } else {
        throw new Error("Search filter can only filter string fields.");
      }
    };
    super({
      dataContainer,
      name,
      serializeToHistory,
      filterFunction,
      filterClearFunction: () => {
        this.searchTerm = "";
      },
    });
    this.searchTerm = "";
    this.selectorFunction = selectorFunction;

    //load search params value
    this.loadHistory();
  }

  updateSearchFilter(searchString: string) {
    searchString = searchString ?? "";
    this.searchTerm = searchString;
    this.saveHistory();
    this.dispatchUpdate();
  }
  loadHistory() {
    if (!this.serializeToHistory) return;
    const storageSearchString = loadHistoryFiltersFromURL(this.name);

    if (!storageSearchString || storageSearchString.length == 0) return;
    this.searchTerm = storageSearchString;
  }
  saveHistory() {
    if (!this.serializeToHistory) return;
    storeHistoryToURL(this.name, this.searchTerm);
  }
}
