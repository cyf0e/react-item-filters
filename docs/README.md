react-item-filters / [Exports](modules.md)

# React Item Filters

[GitHub](https://github.com/cyf0e/react-item-filters)
[NPM Package](https://www.npmjs.com/package/react-item-filters)
<br>
Easily create components that offer product filtering in client side react. Created as a way to simply add filtering to a list of products on a web store. Currently only usable client side access with hooks.

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
import { FilterProvider,useCheckboxFilter,useFilter } from 'react-item-filters';

function CheckboxElement (props: { labelValue:string, filterUpdateFunction: any }) {
    //labelValue returns a clean value to display in the label element so 'Light Blue' for example.
    //You can use that value as an id or modify it in some way.
    return (
        <div>
        <input id={labelValue} type="checkbox" onChange={filterUpdateFunction}/>
        <label htmlFor={labelValue}>{labelValue}</label>
        </div>
    )
}
function App() {
  const [products,setProducts]=useState([])
  useEffect(()=>{
      //fetch data
      setProducts(data)
  },[])
  const checkboxSelectorFunction=(element)=>element.color
  const filteredData=useFilter()
  const checkboxComponents=useCheckboxFilter(checkboxSelectorFunction,CheckboxElement)

  return (
          <FilterProvider initialData={}>
                <div>
                    <h1>Colors:</h1>
                    {checkboxComponents}
                </div>
                <div>
                  <h1>Item List</h1>
                  {filtereData.map((e)=>{return <DataComponent data={e}/> )
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
