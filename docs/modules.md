[react-item-filters](README.md) / Exports

# react-item-filters

## Table of contents

### Classes

- [CheckboxFilter](classes/CheckboxFilter.md)
- [DataContainer](classes/DataContainer.md)
- [FilterBase](classes/FilterBase.md)
- [SearchFilter](classes/SearchFilter.md)

### Type Aliases

- [CheckboxPropType](modules.md#checkboxproptype)

### Functions

- [FilterProvider](modules.md#filterprovider)
- [useCheckboxFilter](modules.md#usecheckboxfilter)
- [useClearFilter](modules.md#useclearfilter)
- [useFilter](modules.md#usefilter)
- [useSearchFilter](modules.md#usesearchfilter)

## Type Aliases

### CheckboxPropType

Ƭ **CheckboxPropType**<`SelectorReturnType`\>: `Object`

#### Type parameters

| Name |
| :------ |
| `SelectorReturnType` |

#### Type declaration

| Name | Type |
| :------ | :------ |
| `filterChangeFunction` | (`event`: `ChangeEvent`<`HTMLInputElement`\>) => `void` |
| `labelValue` | `string` \| `SelectorReturnType` |

#### Defined in

[lib/checkboxFilter.tsx:21](https://github.com/cyf0e/react-item-filters/blob/6587d08/src/lib/checkboxFilter.tsx#L21)

## Functions

### FilterProvider

▸ **FilterProvider**<`InitialDataType`\>(`props`): `Element`

Provider - Function component that wraps children with the filtering context.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `InitialDataType` | extends `any`[] |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `props` | `Object` | props.initialData is the starting point for unfiltered data that you want to be filtered. |
| `props.children?` | `any` | - |
| `props.initialData` | `InitialDataType` | - |

#### Returns

`Element`

#### Defined in

[components/FilterProvider.tsx:15](https://github.com/cyf0e/react-item-filters/blob/6587d08/src/components/FilterProvider.tsx#L15)

___

### useCheckboxFilter

▸ **useCheckboxFilter**<`DataArrayElementType`, `SelectorReturnType`\>(`selectorFunction`, `Component?`, `nameMap?`, `prettyLabels?`): `React.JSX.Element`[]

useCheckboxFilter - hook that creates a checkbox filter and retruns basic checkbox components to render with the options.

**`Example`**

```jsx
   const Comp = ( { labelValue, filterChangeFunction } : { labelValue: string, filterChangeFunction: Function }) =>
   {
   return (
           <>
           <input type="checkbox" onChange={filterChangeFunction}/>
           <label>{labelValue}</label>}
           </>
   )
```
 If no custom Component is passed in, the returned checkbox elements will be the default element.
 You should really pass in a custom component in most cases.
```jsx

 <div>
    <input name={labelValue} id={labelValue} type="checkbox" />
    <label htmlFor={labelValue}>{labelValue}</label>
 </div>

```

**`Remark`**

DataArrayElement is the type of element from the supplied data array.

**`Example`**

For example if the data is
```jsx
const data=[{name:John,lastname:John},{name:Peter,lastname:Parker}]
typeof data = DataArrayElement[]
typeof DataArrayEleemnt would be {name:string,lastname:string}
```

SelectorReturnType is the type of element that the selector function returns.
For the last example if we wanted to filter by lastname the selector function we would pass in would be
```
const selectorFunction = (el:DataArrayElement)=>{return el.lastname}
````
and the type would be string or ReturnType of the selection function.

#### Type parameters

| Name |
| :------ |
| `DataArrayElementType` |
| `SelectorReturnType` |

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `selectorFunction` | (`arg`: `DataArrayElementType`) => `SelectorReturnType` | `undefined` | The function that returns the part of the data we want to filter by. |
| `Component?` | <T\>(`props`: `T`) => `Element` | `undefined` | The Component that will be wrapped around. It gets passed in the filterChangeFunction function and the value to display. The type of props that the components gets is { labelValue: string \| SelectorReturnType, filterChangeFunction: Function } and should be used like: |
| `nameMap?` | `Map`<`SelectorReturnType`, `string`\> | `undefined` | A map that is used to lookup names you wish to assign to the checkbox labels for possible values of the checkbox filter. KEYS have to be the values the selector function returns and VALUES must be their respective string labels. If the the data is an array of {color: 'red'\|'blue'} objects, useCheckboxHook will automatically get all the possible values for color and after some clean up offer those values as labels for the checkboxes. If you instead pass in a nameMap the names specified in the map will be used. |
| `prettyLabels` | `boolean` | `true` | Boolean that selects if the user wants some clean up (capitalize first words, remove underscore) done on the possible values that are used as labels when nameMap is NOT provided. |

#### Returns

`React.JSX.Element`[]

Components[] - The components to render.

#### Defined in

[hooks/useCheckboxFilter.tsx:58](https://github.com/cyf0e/react-item-filters/blob/6587d08/src/hooks/useCheckboxFilter.tsx#L58)

___

### useClearFilter

▸ **useClearFilter**(): `Function`

NOTE: React by default will not reset the state of your Filter elements like the checkbox for example. This is because it doesnt reset state of components that are rendered in the same place so the checkboxes will stay checked after clearing unless you explicitly make them reset by adding a dynamic key to them for example
```jsx
function CustomCheckboxComp(){
 return <div key={randomString() || Math.random()}>

</div>
}
```

#### Returns

`Function`

clearFilters function

#### Defined in

[hooks/useClearFilter.tsx:13](https://github.com/cyf0e/react-item-filters/blob/6587d08/src/hooks/useClearFilter.tsx#L13)

___

### useFilter

▸ **useFilter**<`T`\>(): `T`[]

useFilter - Hook to access the filtered data.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Returns

`T`[]

Data[] - Returns the filtered dataafter all filters in the same context have been applied.

#### Defined in

[hooks/useFilter.tsx:9](https://github.com/cyf0e/react-item-filters/blob/6587d08/src/hooks/useFilter.tsx#L9)

___

### useSearchFilter

▸ **useSearchFilter**<`DT`\>(`selectorFunction`, `Component?`): `React.JSX.Element`

useSearchFilter - Hook that enables text searching on the data.

**`Example`**

```ts
const data=[{name:Peter,last:Parker}]
 const selectorFn = (el) => { return el.name } //searches only over first names, or
 const selectorFn = (el) => { return [el.name, el.last] } // will search by both parameters.
```

**`Example`**

```ts
const MySearchComp = ({filterChangeFunction}:{filterChangeFunction:Function}) => {
 return <input onChange={(e)=>{filterChangeFunction(e)}} />
}
```

#### Type parameters

| Name |
| :------ |
| `DT` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `selectorFunction` | (`element`: `DT`) => `string` \| `string`[] | Function used to select what part of the data you want to be able to search by. You can select to search by some string property or multiple string properties. |
| `Component?` | `FC`<{ `filterChangeFunction`: `Function`  }\> | React Functional component that will be returned or a default component if a custom one is not provided. If you do provide a Component you MUST have it take a {filterChangeFunction} props parameter and call that whenever you want filtering to occur passing it the element object. |

#### Returns

`React.JSX.Element`

- The Search input component passed as Component or a default search component.

#### Defined in

[hooks/useSearchFilter.tsx:20](https://github.com/cyf0e/react-item-filters/blob/6587d08/src/hooks/useSearchFilter.tsx#L20)
