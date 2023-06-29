import { ChangeEvent } from "react";
import { DataContainer, FilterBase, ISessionStorage } from "./filtering";
import {
  cleanPossibleValue,
  loadFromSessionStorage,
  storeToSessionStorage,
} from "./util";
function DefaultCheckboxComponent<T>(props: CheckboxPropType<T>) {
  const labelValue = props.labelValue as string;
  return (
    <div style={{ padding: "0.125rem 1rem", width: "100%" }}>
      <input
        name={labelValue}
        id={labelValue}
        onChange={props.filterChangeFunction}
        type="checkbox"
        style={{ width: "1rem", height: "1rem" }}
      />
      <label style={{ paddingLeft: "0.5rem" }} htmlFor={labelValue}>
        {labelValue}
      </label>
    </div>
  );
}
export type CheckboxPropType<SelectorReturnType> = {
  labelValue: string | SelectorReturnType;
  filterChangeFunction: (event: ChangeEvent<HTMLInputElement>) => void;
  preChecked?: boolean;
};

export class CheckboxFilter<DataElementType, SelectorReturnType = string>
  extends FilterBase<DataElementType>
  implements ISessionStorage
{
  checked: Set<SelectorReturnType> = new Set<SelectorReturnType>();
  selectorFunction: (element: DataElementType) => SelectorReturnType;
  constructor(
    context: DataContainer<DataElementType>,
    selectorFunction: (element: DataElementType) => SelectorReturnType,
    name: string
  ) {
    const filterFunction = (element: DataElementType) => {
      if (this.checked.size == 0) return true;
      return this.checked.has(selectorFunction(element));
    };
    super(context, filterFunction, name);
    this.selectorFunction = selectorFunction;
    this.loadFromStorage();
  }
  /** If a custom component is supplied it has to have props: {labelValue: any, filterChangeFunction: Function}.
   * The value is provided for labeling the checkbox.
   * The filterChangeFunction is supplied to the onEvent function you wish to call for
   * @example onChange = {filterChangeFunction}
   */
  addCheckboxFilter(
    Component?: (
      props: CheckboxPropType<SelectorReturnType>
    ) => React.JSX.Element,
    nameValueMap?: Map<SelectorReturnType, string>,
    prettyLabels: boolean = true
  ) {
    //Get possible values and return default checkbox component from those values
    const possibleValues = this.getDataContext().getPossibleValues(
      this.selectorFunction
    );
    const ComponentToRender = Component
      ? Component
      : DefaultCheckboxComponent<SelectorReturnType>;
    if (nameValueMap) {
      const comps = new Array<any>();
      nameValueMap.forEach((value, key) => {
        comps.push(
          <ComponentToRender
            key={value}
            labelValue={value}
            preChecked={this.checked.has(key)}
            filterChangeFunction={(event: ChangeEvent<HTMLInputElement>) => {
              this.setChecked(key, event.currentTarget.checked);
            }}
          />
        );
      });
      return comps;
    }
    if (ComponentToRender)
      return possibleValues.map((v, i) => {
        return (
          <ComponentToRender
            key={v as string}
            preChecked={this.checked.has(v as SelectorReturnType)}
            labelValue={prettyLabels ? cleanPossibleValue(v) : v}
            filterChangeFunction={(e: ChangeEvent<HTMLInputElement>) => {
              this.setChecked(v, e.currentTarget.checked);
            }}
          />
        );
      });
    else
      throw new Error(
        "Component must be defined. Please pass in a valid Component to useCheckboxFilter."
      );
  }
  serializeToStorage() {
    if (!this.sessionStorageSerializationEnabled) return;

    storeToSessionStorage(this.name, Array.from(this.checked).join(","));
  }
  loadFromStorage() {
    if (!this.sessionStorageSerializationEnabled) return;

    const storedValues = loadFromSessionStorage(this.name);
    if (!storedValues) return;
    const checkedValues = storedValues.split(",");
    checkedValues.forEach((value) => {
      if (value && typeof value == "string") {
        this.checked.add(value as SelectorReturnType);
      }
    });
    this.dispatchUpdate();
  }
  setChecked(value: any, state: boolean) {
    if (state) {
      this.checked.add(value as SelectorReturnType);
    } else {
      this.checked.delete(value as SelectorReturnType);
    }
    this.serializeToStorage();
    this.dispatchUpdate();
  }
}
