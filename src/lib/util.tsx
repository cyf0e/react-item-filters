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
function checkHistoryExists() {
  //try/catch to stop window is not defined errors on server side rendering
  try {
    if (!window || !window.history) {
      return false;
    }
  } catch {
    return false;
  }
  return true;
}
function checkWindowExists() {
  //try/catch to stop window is not defined errors on server side rendering
  try {
    if (!window) {
      return false;
    }
  } catch {
    return false;
  }
  return true;
}

export function loadHistoryFiltersFromURL<T = string>(
  name: string,
  customUrl?: string
) {
  if (!checkWindowExists()) {
    const searchParams = new URLSearchParams(customUrl);
    if (searchParams.size == 0) return;
    return searchParams.get(name) as T;
  }
  const searchParams = new URLSearchParams(window.location.search);
  if (searchParams.size == 0) return;

  return searchParams.get(name) as T;
}
export function storeHistoryToURL(name: string, data: string) {
  if (!checkHistoryExists()) return;

  try {
    const oldSearchParams = new URLSearchParams(window.location.search);
    const oldSearchParamsObject = Object.fromEntries(oldSearchParams.entries());
    const newSearchParamsObject = {
      ...oldSearchParamsObject,
      [name]: data,
    };
    //delete empty filters from the search params
    for (let key of Object.keys(newSearchParamsObject)) {
      if (newSearchParamsObject[key] == "") {
        delete newSearchParamsObject[key];
      }
    }
    const newSearchParams = new URLSearchParams(newSearchParamsObject);
    window.history.pushState(
      window.history.state,
      "",
      "?" + newSearchParams.toString()
    );
  } catch (e) {
    console.error(e);
  }
}
