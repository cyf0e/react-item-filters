import { DataContainer, FilterBase, ISessionStorage } from "./filtering";
import {
  cleanPossibleValue,
  loadHistoryFiltersFromURL,
  storeHistoryToURL,
} from "./util";

export class CheckboxFilter<DataElementType, SelectorReturnType = string>
  extends FilterBase<DataElementType>
  implements ISessionStorage
{
  checked: Set<SelectorReturnType> = new Set<SelectorReturnType>();
  possibleValues: Set<SelectorReturnType> = new Set();
  selectorFunction: (element: DataElementType) => SelectorReturnType;
  nameValueMap?: Map<SelectorReturnType, string>;
  prettyLabels?: boolean;
  allParsedLabels: Map<SelectorReturnType, string> = new Map();
  constructor({
    dataContainer,
    selectorFunction,
    name,
    nameValueMap,
    prettyLabels = true,
    serializeToHistory = false,
    customHistorySearchParams,
  }: {
    dataContainer: DataContainer<DataElementType>;
    selectorFunction: (element: DataElementType) => SelectorReturnType;
    name: string;
    nameValueMap?: Map<SelectorReturnType, string>;
    prettyLabels?: boolean;
    serializeToHistory?: boolean;
    customHistorySearchParams?: string;
  }) {
    const filterFunction = (element: DataElementType) => {
      if (this.checked.size == 0) return true;
      const cleanLabel = this.allParsedLabels.get(
        this.selectorFunction(element)
      );
      if (cleanLabel) return this.checked.has(cleanLabel as SelectorReturnType);
      return false;
    };
    super({
      filterGetValueFunction: () => this.checked,
      dataContainer,
      filterFunction,
      name,
      filterClearFunction: () => {
        this.checked.clear();
      },
      serializeToHistory,
    });

    this.customHistorySearchParams = customHistorySearchParams;
    this.selectorFunction = selectorFunction;
    this.prettyLabels = prettyLabels;
    this.nameValueMap = nameValueMap;

    //Get possible values
    this.possibleValues = this.getDataContainer().getPossibleValues(
      this.selectorFunction
    ) as Set<SelectorReturnType>;

    //Save clean possible values for faster filtering
    this.possibleValues.forEach((pv) => {
      const cleanLabel = this.parseLabelValue(pv);
      if (cleanLabel) this.allParsedLabels.set(pv, cleanLabel);
    });

    //load search param values
    this.loadHistory();
    this.dispatchHistoryLoad();
  }
  getNumberOfItemsWithLabel(label: string, items: DataElementType[]) {
    const newFilterFn = (item: DataElementType) =>
      this.parseLabelValue(this.selectorFunction(item)) == label;

    return items.filter(newFilterFn).length;
  }

  getParsedPossibleValues() {
    if (this.nameValueMap) return Array.from(this.nameValueMap.values());
    return Array.from(this.possibleValues).map((pv) =>
      this.parseLabelValue(pv)
    );
  }
  parseLabelValue(rawLabel: SelectorReturnType) {
    if (!rawLabel) return undefined;
    if (typeof rawLabel !== "string")
      throw new Error(
        `A label can only be of type string. Got ${rawLabel} with type ${typeof rawLabel}`
      );
    if (this.nameValueMap) {
      return this.nameValueMap.get(rawLabel);
    } else if (this.prettyLabels) {
      return cleanPossibleValue(rawLabel);
    }
    return rawLabel;
  }

  saveHistory() {
    if (!this.serializeToHistory) return;
    storeHistoryToURL(this.name, Array.from(this.checked).join(","));
  }
  loadHistory() {
    if (!this.serializeToHistory) return;

    this.checked.clear();
    const storedValues = loadHistoryFiltersFromURL(
      this.name,
      this.customHistorySearchParams
    );

    if (!storedValues) return;

    const checkedValues = storedValues.split(",");

    checkedValues.forEach((value) => {
      if (value && typeof value == "string") {
        this.checked.add(value as SelectorReturnType);
      }
    });
  }
  setChecked(value: SelectorReturnType, state: boolean) {
    if (state) {
      this.checked.add(value);
    } else {
      this.checked.delete(value);
    }

    this.saveHistory();
    this.dispatchUpdate();
  }
}
