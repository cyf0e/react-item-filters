import { ChangeEvent } from "react";
import { DataContainer, FilterBase } from "./filtering";

export class SearchFilter<
  DT,
  SelectorReturnType extends string | string[]
> extends FilterBase<DT> {
  searchTerm: string = "";
  selectorFunction: (element: DT) => SelectorReturnType;
  constructor(
    context: DataContainer<DT>,
    selectorFunction: (element: DT) => SelectorReturnType
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
        return stringsToSearch
          .toLowerCase()
          .includes(this.searchTerm.toLowerCase());
      }
    };
    super(context, filterFunction);
    this.selectorFunction = selectorFunction;
  }
  addSearchFilter(Component?: React.FC<{ filterChangeFunction: Function }>) {
    if (!Component) {
      return (
        <div>
          <input
            type="text"
            onChange={this.updateSearchFilter.bind(this)}
          ></input>
        </div>
      );
    }
    return (
      <Component filterChangeFunction={this.updateSearchFilter.bind(this)} />
    );
  }
  updateSearchFilter(e: ChangeEvent<HTMLInputElement>) {
    this.searchTerm = e.currentTarget.value;
    this.dispatchUpdate();
  }
}
