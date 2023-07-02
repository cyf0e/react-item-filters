export function cleanPossibleValue<SelectorReturnType>(
  possibleValue: SelectorReturnType
) {
  if (typeof possibleValue === "string") {
    const noUnderscores = possibleValue.split("_");

    const firstLetterUppercase = noUnderscores.map(
      (word) => word[0].toUpperCase() + word.slice(1)
    );

    return firstLetterUppercase.join(" ") as SelectorReturnType;
  } else {
    return possibleValue;
  }
}
function checkSessionStorageExists() {
  //try/catch to stop window is not defined errors on server side rendering
  try {
    if (!window || !window.sessionStorage) {
      console.error(
        "No window or sessionStorage object. Cant use session storage."
      );
      return false;
    }
  } catch {
    return false;
  }
  return true;
}
/* export function loadFromSessionStorage(){
  const rootStoreObjectString =window.sessionStorage.getItem("react-item-filters");
  if (!rootStoreObjectString) return;
  try {
    const rootStoreObject = JSON.parse(rootStoreObjectString);
    const storageData = rootStoreObject[name];
    return storageData as T;
  } catch (e) {
    console.error(e);
  }
} */
export function loadHistoryFilters<T = string>(name: string) {
  if (!checkSessionStorageExists()) return;
  const searchParams = new URLSearchParams(window.location.search);
  if (searchParams.size == 0) return;
  return searchParams.get(name) as T;
}
export function storeToSessionStorage(name: string, data: string) {
  if (!checkSessionStorageExists()) return;
  try {
    const rootStoreObjectString =
      window.sessionStorage.getItem("react-item-filters");
    const rootStoreObject = rootStoreObjectString
      ? JSON.parse(rootStoreObjectString)
      : {};
    rootStoreObject[name] = data;
    const oldSearchParams = new URLSearchParams(window.location.search);
    const oldSearchParamsObject = Object.fromEntries(oldSearchParams.entries());
    const newSearchParams = new URLSearchParams({
      ...oldSearchParamsObject,
      ...rootStoreObject,
    });
    console.log(newSearchParams);
    window.history.replaceState("", "", "?" + newSearchParams.toString());
    window.sessionStorage.setItem(
      "react-item-filters",
      JSON.stringify(rootStoreObject)
    );
  } catch (e) {
    console.error(e);
  }
}
