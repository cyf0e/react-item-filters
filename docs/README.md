react-item-filters / [Exports](modules.md)

# React Item Filters

[GitHub](https://github.com/cyf0e/react-item-filters)
[NPM Package](https://www.npmjs.com/package/react-item-filters)
<br>
Easily create components that offer product filtering in client side react. Created as a way to simply add filtering to a list of items. Currently only usable client side access with hooks.

**Note:** This is a hobby project in early stage. There is no doubt it has unexpected errors from unforseen edge cases. If you plan on using this, consider testing thoroughly with your use case.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Docs](#Docs)
- [Plans](#Plans)
- [Contributing](#contributing)
- [License](#license)

## Installation

To install this React addon, you can use either npm or yarn. Run the following command in your project directory:

```bash
npm install react-item-filters
```

or

```bash
yarn add react-item-filters
```

## Usage

Import the necessary components from the `react-item-filters` package and include them in your code.
For example using the checkbox filter ...

```jsx
import { useEffect, useState } from "react";
import {
  CheckboxFilterProps,
  FilterProvider,
  useCheckboxFilter,
  useFilter,
} from "react-item-filters/src";

function CheckboxElement(props: CheckboxFilterProps) {
  const [checked, setChecked] = useState(
    props.preloadedCheckedLabels.includes(props.label)
  );
  useEffect(() => {
    //must return a function to clear the event listeners or you will have memory leaks.
    const clearingFunction = props.onFilterClear(() => {
      setChecked(false);
    });
    const updateClearFunction = props.onFilterUpdate(() =>
      console.log("Filter updated.")
    );
    return () => {
      clearingFunction();
      updateClearFunction();
    };
  }, [props.onFilterClear]);
  return (
    <div>
      <input
        id={props.label}
        type="checkbox"
        onChange={(e) => {
          props.setChecked(props.label, checked);
        }}
      />
      <label htmlFor={props.label}>{props.label}</label>
    </div>
  );
}
function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    //fetch data
    setProducts(someData);
    //or
    setProducts([
      { color: "Red", weight: 0.2 },
      { color: "Blue", weight: 0.3 },
    ]);
  }, []);

  const checkboxSelectorFunction = (element) => element.color;

  const filteredData = useFilter();

  const colorCheckboxes = useCheckboxFilter({
    selectorFunction: checkboxSelectorFunction,
    name: "ColorCheckboxFilter",
    prettyLabels: true,
    serializeToHistory: true,
  });

  const checkboxLabels = colorCheckboxes.labels ?? [];

  return (
    <FilterProvider initialData={products}>
      <div>
        <h1>Colors:</h1>
        {checkboxLabels.map((label) =>
          label ? (
            <CheckboxElement
              key={label}
              label={label}
              onFilterUpdate={colorCheckboxes.onFilterUpdate}
              onFilterClear={colorCheckboxes.onFilterClear}
              setChecked={colorCheckboxes.setChecked}
              preloadedCheckedLabels={colorCheckboxes.preloadedCheckedLabels}
            />
          ) : null
        )}
      </div>
      <div>
        <h1>Item List</h1>
        {filteredData.map((e) => (
          <DataComponent data={e} />
        ))}
      </div>
    </FilterProvider>
  );
}

export default App;
```

## Docs

[Link to Documentation](docs/modules.md)
or can be generated using:

```bash
npm run docs
```

## Plans

Future plans are to increase robustness and usability of the library and possibly add some other features like ...

- [ ] Add range selector filter
- [ ] Add sorting functionality

## Contributing

Contributions are welcome! If you have any ideas, suggestions, or bug reports, please open an issue.

## License

This project is licensed under the [MIT License](LICENSE). Feel free to use and modify the code as per the terms of the license.
