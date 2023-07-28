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
  }: {
    dataContainer: DataContainer<DataElementType>;
    selectorFunction: (element: DataElementType) => SelectorReturnType;
    name: string;
    nameValueMap?: Map<SelectorReturnType, string>;
    prettyLabels?: boolean;
    serializeToHistory?: boolean;
  }) {
    const filterFunction = (element: DataElementType) => {
      if (this.checked.size == 0) return true;
      const cleanLabel = this.allParsedLabels.get(selectorFunction(element));
      if (cleanLabel) return this.checked.has(cleanLabel as SelectorReturnType);
      return false;
    };

    super({
      dataContainer,
      filterFunction,
      name,
      filterClearFunction: () => {
        this.checked.clear();
      },
      serializeToHistory,
    });

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
  }
  getParsedPossibleValues() {
    if (this.nameValueMap) return Array.from(this.nameValueMap.values());
    return Array.from(this.possibleValues).map((pv) =>
      this.parseLabelValue(pv)
    );
  }
  parseLabelValue(rawLabel: SelectorReturnType) {
    if (typeof rawLabel !== "string")
      throw new Error("A label can only be of type string.");
    if (!rawLabel) return rawLabel;
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
    const storedValues = loadHistoryFiltersFromURL(this.name);
    if (!storedValues) return;
    const checkedValues = storedValues.split(",");

    checkedValues.forEach((value) => {
      if (value && typeof value == "string") {
        this.checked.add(value as SelectorReturnType);
      }
    });

    //update data container
    this.dispatchUpdate();
  }
  setChecked(value: string | SelectorReturnType, state: boolean) {
    if (state) {
      this.checked.add(value as SelectorReturnType);
    } else {
      this.checked.delete(value as SelectorReturnType);
    }
    this.saveHistory();
    this.dispatchUpdate();
  }
}
