import { DataContainer, FilterBase, ISessionStorage } from "./filtering";
import {
  cleanPossibleValue,
  loadHistoryFilters,
  storeToSessionStorage,
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

  constructor({
    dataContainer,
    selectorFunction,
    name,
    nameValueMap,
    prettyLabels = true,
  }: {
    dataContainer: DataContainer<DataElementType>;
    selectorFunction: (element: DataElementType) => SelectorReturnType;
    name: string;
    nameValueMap?: Map<SelectorReturnType, string>;
    prettyLabels?: boolean;
  }) {
    const filterFunction = (element: DataElementType) => {
      if (this.checked.size == 0) return true;
      const cleanLabel = this.parseLabelValue(selectorFunction(element));
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
    });
    this.selectorFunction = selectorFunction;
    this.prettyLabels = prettyLabels;
    this.nameValueMap = nameValueMap;
    this.loadFromStorage();
    //Get possible values
    this.possibleValues = this.getDataContainer().getPossibleValues(
      this.selectorFunction
    ) as Set<SelectorReturnType>;
  }
  getParsedPossibleValues() {
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

  serializeToStorage() {
    if (!this.sessionStorageSerializationEnabled) return;

    storeToSessionStorage(this.name, Array.from(this.checked).join(","));
  }
  loadFromStorage() {
    if (!this.sessionStorageSerializationEnabled) return;

    const storedValues = loadHistoryFilters(this.name);
    if (!storedValues) return;
    const checkedValues = storedValues.split(",");
    checkedValues.forEach((value) => {
      if (value && typeof value == "string") {
        this.checked.add(value as SelectorReturnType);
      }
    });
  }
  setChecked(value: string | SelectorReturnType, state: boolean) {
    if (state) {
      this.checked.add(value as SelectorReturnType);
    } else {
      this.checked.delete(value as SelectorReturnType);
    }
    this.serializeToStorage();
    this.dispatchUpdate();
  }
}
