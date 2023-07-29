[react-item-filters](README.md) / Exports

# react-item-filters

## Table of contents

### Classes

- [CheckboxFilter](classes/CheckboxFilter.md)
- [DataContainer](classes/DataContainer.md)
- [FilterBase](classes/FilterBase.md)
- [SearchFilter](classes/SearchFilter.md)

### Interfaces

- [ISessionStorage](interfaces/ISessionStorage.md)

### Type Aliases

- [CheckboxFilterProps](modules.md#checkboxfilterprops)
- [SearchFilterProps](modules.md#searchfilterprops)

### Functions

- [FilterProvider](modules.md#filterprovider)
- [useCheckboxFilter](modules.md#usecheckboxfilter)
- [useClearFilter](modules.md#useclearfilter)
- [useFilter](modules.md#usefilter)
- [useSearchFilter](modules.md#usesearchfilter)

## Type Aliases

### CheckboxFilterProps

Ƭ **CheckboxFilterProps**<`DataType`, `SelectorReturnType`\>: `Omit`<`ReturnType`<typeof [`useCheckboxFilter`](modules.md#usecheckboxfilter)\>, ``"labels"``\> & { `label`: `string`  }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `DataType` | `any` |
| `SelectorReturnType` | `any` |

#### Defined in

[hooks/useCheckboxFilter.tsx:78](https://github.com/cyf0e/react-item-filters/blob/5e1c60a/src/hooks/useCheckboxFilter.tsx#L78)

___

### SearchFilterProps

Ƭ **SearchFilterProps**<`DataType`, `SelectorReturnType`\>: `ReturnType`<typeof [`useSearchFilter`](modules.md#usesearchfilter)\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `DataType` | `any` |
| `SelectorReturnType` | `any` |

#### Defined in

[hooks/useSearchFilter.tsx:78](https://github.com/cyf0e/react-item-filters/blob/5e1c60a/src/hooks/useSearchFilter.tsx#L78)

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
| `props` | `Object` | props.initialData is the starting point for unfiltered data that you want to be filtered. Pass [] if you have to async load initial data. |
| `props.children?` | `any` | - |
| `props.initialData` | `InitialDataType` | - |

#### Returns

`Element`

#### Defined in

[components/FilterProvider.tsx:14](https://github.com/cyf0e/react-item-filters/blob/5e1c60a/src/components/FilterProvider.tsx#L14)

___

### useCheckboxFilter

▸ **useCheckboxFilter**<`DataArrayElementType`, `SelectorReturnType`\>(`«destructured»`): `Object`

useCheckboxFilter - hook that creates a checkbox filter and returns utilities to render checkbox components.

**`Remark`**

DataArrayElement is the type of element from the supplied data array.

**`Example`**

For example if the data is
```jsx
const data=[{name:John,lastname:John},{name:Peter,lastname:Parker}]
typeof data is DataArrayElement[]
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

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `name` | `string` |
| › `nameMap?` | `Map`<`SelectorReturnType`, `string`\> |
| › `prettyLabels?` | `boolean` |
| › `selectorFunction` | (`arg`: `DataArrayElementType`) => `SelectorReturnType` |
| › `serializeToHistory?` | `boolean` |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `labels` | (`undefined` \| `string`)[] |
| `onFilterClear` | (`fn`: (...`args`: `any`) => `any`) => () => `void` |
| `onFilterUpdate` | (`fn`: (...`args`: `any`) => `any`) => () => `void` |
| `preloadedCheckedLabels` | `SelectorReturnType`[] |
| `setChecked` | (`value`: `SelectorReturnType`, `state`: `boolean`) => `void` |

#### Defined in

[hooks/useCheckboxFilter.tsx:37](https://github.com/cyf0e/react-item-filters/blob/5e1c60a/src/hooks/useCheckboxFilter.tsx#L37)

___

### useClearFilter

▸ **useClearFilter**(): () => `void`

NOTE: React by default will not reset the state of your Filter elements like the checkbox for example. This is because it doesnt reset state of components that are rendered in the same place so the checkboxes will stay checked after clearing unless you explicitly make them reset by adding a dynamic key to them for example
```jsx
function CustomCheckboxComp(){
 return <div key={randomString() || Math.random()}>

</div>
}
```

#### Returns

`fn`

clearFilters function

▸ (): `void`

##### Returns

`void`

#### Defined in

[hooks/useClearFilter.tsx:13](https://github.com/cyf0e/react-item-filters/blob/5e1c60a/src/hooks/useClearFilter.tsx#L13)

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

Data[] - Returns the filtered data after all filters in the same context have been applied.

#### Defined in

[hooks/useFilter.tsx:9](https://github.com/cyf0e/react-item-filters/blob/5e1c60a/src/hooks/useFilter.tsx#L9)

___

### useSearchFilter

▸ **useSearchFilter**<`DataType`, `SelectorReturnType`\>(`«destructured»`): `Object`

useSearchFilter - Hook that enables text searching on the data.

**`Example`**

```ts
const data=[{name:Peter,last:Parker}]
 const selectorFn = (el) => { return el.name } //searches only over first names, or
 const selectorFn = (el) => { return [el.name, el.last] } // will search by both parameters.
```

**`Remark`**

DataArrayElement is the type of element from the supplied data array.

**`Example`**

For example if the data is
```jsx
const data=[{name:John,lastname:John},{name:Peter,lastname:Parker}]
typeof data is DataArrayElement[]
typeof DataArrayEleemnt would be {name:string,lastname:string}
```

SelectorReturnType is the type of element that the selector function returns.
For the last example if we wanted to filter by lastname the selector function we would pass in would be
```
const selectorFunction = (el:DataArrayElement)=>{return el.lastname}
````
and the type would be string or ReturnType of the selection function.

@returns - The Search input component passed as Component or a default search component.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `DataType` | `any` |
| `SelectorReturnType` | `any` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `fuzzy?` | `boolean` |
| › `name` | `string` |
| › `selectorFunction` | (`element`: `DataType`) => `SelectorReturnType` |
| › `serializeToHistory?` | `boolean` |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `onFilterClear` | (`fn`: (...`args`: `any`) => `any`) => () => `void` |
| `onFilterUpdate` | (`fn`: (...`args`: `any`) => `any`) => () => `void` |
| `preloadedSearchValue` | `string` |
| `setSearchString` | (`searchString`: `string`) => `void` |

#### Defined in

[hooks/useSearchFilter.tsx:41](https://github.com/cyf0e/react-item-filters/blob/5e1c60a/src/hooks/useSearchFilter.tsx#L41)
