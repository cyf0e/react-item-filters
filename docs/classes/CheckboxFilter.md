[react-item-filters](../README.md) / [Exports](../modules.md) / CheckboxFilter

# Class: CheckboxFilter<DataElementType, SelectorReturnType\>

## Type parameters

| Name | Type |
| :------ | :------ |
| `DataElementType` | `DataElementType` |
| `SelectorReturnType` | `string` |

## Hierarchy

- [`FilterBase`](FilterBase.md)<`DataElementType`\>

  ↳ **`CheckboxFilter`**

## Table of contents

### Constructors

- [constructor](CheckboxFilter.md#constructor)

### Properties

- [checked](CheckboxFilter.md#checked)
- [dataContext](CheckboxFilter.md#datacontext)
- [filterFunction](CheckboxFilter.md#filterfunction)
- [selectorFunction](CheckboxFilter.md#selectorfunction)

### Methods

- [addCheckboxFilter](CheckboxFilter.md#addcheckboxfilter)
- [dispatchUpdate](CheckboxFilter.md#dispatchupdate)
- [getDataContext](CheckboxFilter.md#getdatacontext)
- [setChecked](CheckboxFilter.md#setchecked)

## Constructors

### constructor

• **new CheckboxFilter**<`DataElementType`, `SelectorReturnType`\>(`context`, `selectorFunction`)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `DataElementType` | `DataElementType` |
| `SelectorReturnType` | `string` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `context` | [`DataContainer`](DataContainer.md)<`DataElementType`\> |
| `selectorFunction` | (`element`: `DataElementType`) => `SelectorReturnType` |

#### Overrides

[FilterBase](FilterBase.md).[constructor](FilterBase.md#constructor)

#### Defined in

[lib/checkboxFilter.tsx:31](https://github.com/cyf0e/react-item-filters/blob/f6485bb/src/lib/checkboxFilter.tsx#L31)

## Properties

### checked

• **checked**: `Set`<`SelectorReturnType`\>

#### Defined in

[lib/checkboxFilter.tsx:29](https://github.com/cyf0e/react-item-filters/blob/f6485bb/src/lib/checkboxFilter.tsx#L29)

___

### dataContext

• `Optional` **dataContext**: [`DataContainer`](DataContainer.md)<`DataElementType`\>

#### Inherited from

[FilterBase](FilterBase.md).[dataContext](FilterBase.md#datacontext)

#### Defined in

[lib/filtering.ts:48](https://github.com/cyf0e/react-item-filters/blob/f6485bb/src/lib/filtering.ts#L48)

___

### filterFunction

• **filterFunction**: (`element`: `DataElementType`) => `boolean`

#### Type declaration

▸ (`element`): `boolean`

##### Parameters

| Name | Type |
| :------ | :------ |
| `element` | `DataElementType` |

##### Returns

`boolean`

#### Inherited from

[FilterBase](FilterBase.md).[filterFunction](FilterBase.md#filterfunction)

#### Defined in

[lib/filtering.ts:49](https://github.com/cyf0e/react-item-filters/blob/f6485bb/src/lib/filtering.ts#L49)

___

### selectorFunction

• **selectorFunction**: (`element`: `DataElementType`) => `SelectorReturnType`

#### Type declaration

▸ (`element`): `SelectorReturnType`

##### Parameters

| Name | Type |
| :------ | :------ |
| `element` | `DataElementType` |

##### Returns

`SelectorReturnType`

#### Defined in

[lib/checkboxFilter.tsx:30](https://github.com/cyf0e/react-item-filters/blob/f6485bb/src/lib/checkboxFilter.tsx#L30)

## Methods

### addCheckboxFilter

▸ **addCheckboxFilter**(`Component?`, `nameValueMap?`, `prettyLabels?`): `any`[]

If a custom component is supplied it has to have props: {labelValue: any, filterChangeFunction: Function}.
The value is provided for labeling the checkbox.
The filterChangeFunction is supplied to the onEvent function you wish to call for

**`Example`**

```ts
onChange = {filterChangeFunction}
```

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `Component?` | (`props`: [`CheckboxPropType`](../modules.md#checkboxproptype)<`SelectorReturnType`\>) => `Element` | `undefined` |
| `nameValueMap?` | `Map`<`SelectorReturnType`, `string`\> | `undefined` |
| `prettyLabels` | `boolean` | `true` |

#### Returns

`any`[]

#### Defined in

[lib/checkboxFilter.tsx:47](https://github.com/cyf0e/react-item-filters/blob/f6485bb/src/lib/checkboxFilter.tsx#L47)

___

### dispatchUpdate

▸ **dispatchUpdate**(): `void`

#### Returns

`void`

#### Inherited from

[FilterBase](FilterBase.md).[dispatchUpdate](FilterBase.md#dispatchupdate)

#### Defined in

[lib/filtering.ts:60](https://github.com/cyf0e/react-item-filters/blob/f6485bb/src/lib/filtering.ts#L60)

___

### getDataContext

▸ **getDataContext**(): [`DataContainer`](DataContainer.md)<`DataElementType`\>

#### Returns

[`DataContainer`](DataContainer.md)<`DataElementType`\>

#### Inherited from

[FilterBase](FilterBase.md).[getDataContext](FilterBase.md#getdatacontext)

#### Defined in

[lib/filtering.ts:55](https://github.com/cyf0e/react-item-filters/blob/f6485bb/src/lib/filtering.ts#L55)

___

### setChecked

▸ **setChecked**(`value`, `state`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `any` |
| `state` | `boolean` |

#### Returns

`void`

#### Defined in

[lib/checkboxFilter.tsx:93](https://github.com/cyf0e/react-item-filters/blob/f6485bb/src/lib/checkboxFilter.tsx#L93)
