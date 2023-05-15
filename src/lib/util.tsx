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
