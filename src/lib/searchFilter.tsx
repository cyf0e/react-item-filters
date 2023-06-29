import { ChangeEvent } from "react";
import { DataContainer, FilterBase, ISessionStorage } from "./filtering";
import Fuzzy from "fuzzy";
import { loadFromSessionStorage, storeToSessionStorage } from "./util";
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
  addSearchFilter(
    Component?: React.FC<{
      preloadedValue?: string;
      filterChangeFunction: Function;
    }>
  ) {
    if (!Component) {
      return (
        <div>
          <input
            type="text"
            defaultValue={this.searchTerm}
            onChange={this.updateSearchFilter.bind(this)}
          ></input>
        </div>
      );
    }
    return (
      <Component
        preloadedValue={this.searchTerm}
        filterChangeFunction={this.updateSearchFilter.bind(this)}
      />
    );
  }
  updateSearchFilter(e: ChangeEvent<HTMLInputElement>) {
    this.searchTerm = e.currentTarget.value;
    this.serializeToStorage();
    this.dispatchUpdate();
  }
  loadFromStorage() {
    if (!this.sessionStorageSerializationEnabled) return;
    const storageSearchString = loadFromSessionStorage(this.name);
    if (!storageSearchString || storageSearchString.length == 0) return;
    this.searchTerm = storageSearchString;
    this.dispatchUpdate();
  }
  serializeToStorage() {
    if (!this.sessionStorageSerializationEnabled) return;
    storeToSessionStorage(this.name, this.searchTerm);
  }
}
