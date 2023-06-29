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
  if (!window || !window.sessionStorage) {
    console.error(
      "No window or sessionStorage object. Cant use session storage."
    );
    return false;
  }
  return true;
}
export function loadFromSessionStorage<T = string>(name: string) {
  if (!checkSessionStorageExists()) return;
  const rootStoreObjectString =
    window.sessionStorage.getItem("react-item-filters");
  if (!rootStoreObjectString) return;
  try {
    const rootStoreObject = JSON.parse(rootStoreObjectString);
    const storageData = rootStoreObject[name];
    return storageData as T;
  } catch (e) {
    console.error(e);
  }
}
export function storeToSessionStorage(name: string, data: string) {
  if (!checkSessionStorageExists()) return;
  try {
    const rootStoreObjectString =
      window.sessionStorage.getItem("react-item-filters");
    if (!rootStoreObjectString || !rootStoreObjectString.length) {
      const newRootStoreObject: any = {};
      newRootStoreObject[name] = data;
      window.sessionStorage.setItem(
        "react-item-filters",
        JSON.stringify(newRootStoreObject)
      );
    } else {
      const rootStoreObject = JSON.parse(rootStoreObjectString);
      rootStoreObject[name] = data;
      window.sessionStorage.setItem(
        "react-item-filters",
        JSON.stringify(rootStoreObject)
      );
    }
  } catch (e) {
    console.error(e);
  }
}
