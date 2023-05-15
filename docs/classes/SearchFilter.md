[filteringlibrary](../README.md) / [Exports](../modules.md) / SearchFilter

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

• **new SearchFilter**<`DT`, `SelectorReturnType`\>(`context`, `selectorFunction`)

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

#### Overrides

[FilterBase](FilterBase.md).[constructor](FilterBase.md#constructor)

#### Defined in

lib/searchFilter.tsx:10

## Properties

### dataContext

• `Optional` **dataContext**: [`DataContainer`](DataContainer.md)<`DT`\>

#### Inherited from

[FilterBase](FilterBase.md).[dataContext](FilterBase.md#datacontext)

#### Defined in

lib/filtering.tsx:48

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

lib/filtering.tsx:49

___

### searchTerm

• **searchTerm**: `string` = `""`

#### Defined in

lib/searchFilter.tsx:8

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

lib/searchFilter.tsx:9

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

lib/searchFilter.tsx:32

___

### dispatchUpdate

▸ **dispatchUpdate**(): `void`

#### Returns

`void`

#### Inherited from

[FilterBase](FilterBase.md).[dispatchUpdate](FilterBase.md#dispatchupdate)

#### Defined in

lib/filtering.tsx:60

___

### getDataContext

▸ **getDataContext**(): [`DataContainer`](DataContainer.md)<`DT`\>

#### Returns

[`DataContainer`](DataContainer.md)<`DT`\>

#### Inherited from

[FilterBase](FilterBase.md).[getDataContext](FilterBase.md#getdatacontext)

#### Defined in

lib/filtering.tsx:55

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

lib/searchFilter.tsx:47
