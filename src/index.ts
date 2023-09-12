//HOOKS

export * from "./hooks/useCheckboxFilter";
export * from "./hooks/useSearchFilter";
export * from "./hooks/useFilter";
export * from "./hooks/useClearFilter";
export * from "./hooks/useCheckboxFilters";
export * from "./hooks/useFilterContext";

//COMPONENTS

export { FilterProvider } from "./components/FilterProvider";

//CLASSES

export * from "./lib/checkboxFilter";
export * from "./lib/filtering";
export * from "./lib/searchFilter";

export class FilterSubscriptionManager {
  subscriptions: Array<(...args: any) => any> = [];
  add(subscription: (...args: any) => any) {
    this.subscriptions.push(subscription);
  }
  unsubscribe() {
    for (let unsub of this.subscriptions) {
      unsub();
    }
  }
}
