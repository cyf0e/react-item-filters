[react-item-filters](../README.md) / [Exports](../modules.md) / SearchFilter

# Class: SearchFilter<DT, SelectorReturnType\>

## Type parameters

| Name | Type |
| :------ | :------ |
| `DT` | `DT` |
| `SelectorReturnType` | extends `string` \| `string`[] |

## Hierarchy

- [`FilterBase`](FilterBase.md)<`DT`\>

  ↳ **`SearchFilter`**

## Table of contents

### Constructors

- [constructor](SearchFilter.md#constructor)

### Properties

- [dataContext](SearchFilter.md#datacontext)
- [filterFunction](SearchFilter.md#filterfunction)
- [searchTerm](SearchFilter.md#searchterm)
- [selectorFunction](SearchFilter.md#selectorfunction)

### Methods

- [addSearchFilter](SearchFilter.md#addsearchfilter)
- [dispatchUpdate](SearchFilter.md#dispatchupdate)
- [getDataContext](SearchFilter.md#getdatacontext)
- [updateSearchFilter](SearchFilter.md#updatesearchfilter)

## Constructors

### constructor

• **new SearchFilter**<`DT`, `SelectorReturnType`\>(`context`, `selectorFunction`, `fuzzy?`)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `DT` | `DT` |
| `SelectorReturnType` | extends `string` \| `string`[] |

#### Parameters

| Name | Type |
| :------ | :------ |
| `context` | [`DataContainer`](DataContainer.md)<`DT`\> |
| `selectorFunction` | (`element`: `DT`) => `SelectorReturnType` |
| `fuzzy?` | `boolean` |

#### Overrides

[FilterBase](FilterBase.md).[constructor](FilterBase.md#constructor)

#### Defined in

[lib/searchFilter.tsx:10](https://github.com/cyf0e/react-item-filters/blob/6cc6e63/src/lib/searchFilter.tsx#L10)

## Properties

### dataContext

• `Optional` **dataContext**: [`DataContainer`](DataContainer.md)<`DT`\>

#### Inherited from

[FilterBase](FilterBase.md).[dataContext](FilterBase.md#datacontext)

#### Defined in

[lib/filtering.ts:49](https://github.com/cyf0e/react-item-filters/blob/6cc6e63/src/lib/filtering.ts#L49)

___

### filterFunction

• **filterFunction**: (`element`: `DT`) => `boolean`

#### Type declaration

▸ (`element`): `boolean`

##### Parameters

| Name | Type |
| :------ | :------ |
| `element` | `DT` |

##### Returns

`boolean`

#### Inherited from

[FilterBase](FilterBase.md).[filterFunction](FilterBase.md#filterfunction)

#### Defined in

[lib/filtering.ts:50](https://github.com/cyf0e/react-item-filters/blob/6cc6e63/src/lib/filtering.ts#L50)

___

### searchTerm

• **searchTerm**: `string` = `""`

#### Defined in

[lib/searchFilter.tsx:8](https://github.com/cyf0e/react-item-filters/blob/6cc6e63/src/lib/searchFilter.tsx#L8)

___

### selectorFunction

• **selectorFunction**: (`element`: `DT`) => `SelectorReturnType`

#### Type declaration

▸ (`element`): `SelectorReturnType`

##### Parameters

| Name | Type |
| :------ | :------ |
| `element` | `DT` |

##### Returns

`SelectorReturnType`

#### Defined in

[lib/searchFilter.tsx:9](https://github.com/cyf0e/react-item-filters/blob/6cc6e63/src/lib/searchFilter.tsx#L9)

## Methods

### addSearchFilter

▸ **addSearchFilter**(`Component?`): `Element`

#### Parameters

| Name | Type |
| :------ | :------ |
| `Component?` | `FC`<{ `filterChangeFunction`: `Function`  }\> |

#### Returns

`Element`

#### Defined in

[lib/searchFilter.tsx:36](https://github.com/cyf0e/react-item-filters/blob/6cc6e63/src/lib/searchFilter.tsx#L36)

___

### dispatchUpdate

▸ **dispatchUpdate**(): `void`

#### Returns

`void`

#### Inherited from

[FilterBase](FilterBase.md).[dispatchUpdate](FilterBase.md#dispatchupdate)

#### Defined in

[lib/filtering.ts:61](https://github.com/cyf0e/react-item-filters/blob/6cc6e63/src/lib/filtering.ts#L61)

___

### getDataContext

▸ **getDataContext**(): [`DataContainer`](DataContainer.md)<`DT`\>

#### Returns

[`DataContainer`](DataContainer.md)<`DT`\>

#### Inherited from

[FilterBase](FilterBase.md).[getDataContext](FilterBase.md#getdatacontext)

#### Defined in

[lib/filtering.ts:56](https://github.com/cyf0e/react-item-filters/blob/6cc6e63/src/lib/filtering.ts#L56)

___

### updateSearchFilter

▸ **updateSearchFilter**(`e`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `e` | `ChangeEvent`<`HTMLInputElement`\> |

#### Returns

`void`

#### Defined in

[lib/searchFilter.tsx:51](https://github.com/cyf0e/react-item-filters/blob/6cc6e63/src/lib/searchFilter.tsx#L51)
