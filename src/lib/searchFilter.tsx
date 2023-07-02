import { ChangeEvent } from "react";
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
export class SearchFilter<DT, SelectorReturnType extends string | string[]>
  extends FilterBase<DT>
  implements ISessionStorage
{
  searchTerm: string = "";
  selectorFunction: (element: DT) => SelectorReturnType;
  constructor(
    context: DataContainer<DT>,
    selectorFunction: (element: DT) => SelectorReturnType,
    name: string,
    fuzzy?: boolean
  ) {
    const filterFunction = (el: DT) => {
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
    super(context, filterFunction, name);
    this.selectorFunction = selectorFunction;
    this.loadFromStorage();
  }
  addSearchFilter(Component?: React.FC<SearchFilterPropType>) {
    if (!Component) {
      return (
        <div>
          <input
            type="text"
            name="searchFilter"
            defaultValue={this.searchTerm}
            onChange={(e) =>
              this.updateSearchFilter.call(this, e.currentTarget.value)
            }
          ></input>
        </div>
      );
    }
    return (
      <Component
        preloadedValue={this.searchTerm}
        filterUpdateFunction={(searchString: string) => {
          if (typeof searchString !== "string") {
            throw new Error("Search query has to be string.");
          }
          this.updateSearchFilter.call(this, searchString);
        }}
      />
    );
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
    this.dispatchUpdate();
  }
  serializeToStorage() {
    if (!this.sessionStorageSerializationEnabled) return;
    storeToSessionStorage(this.name, this.searchTerm);
  }
}
