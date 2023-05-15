[filteringlibrary](../README.md) / [Exports](../modules.md) / DataContainer

# Class: DataContainer<DT\>

## Type parameters

| Name |
| :------ |
| `DT` |

## Table of contents

### Constructors

- [constructor](DataContainer.md#constructor)

### Properties

- [data](DataContainer.md#data)
- [filterUpdateFunction](DataContainer.md#filterupdatefunction)
- [filters](DataContainer.md#filters)

### Methods

- [addFilter](DataContainer.md#addfilter)
- [getFilteredData](DataContainer.md#getfiltereddata)
- [getPossibleValues](DataContainer.md#getpossiblevalues)
- [onFiltersUpdated](DataContainer.md#onfiltersupdated)
- [setOnUpdateFilters](DataContainer.md#setonupdatefilters)

## Constructors

### constructor

• **new DataContainer**<`DT`\>(`data?`)

#### Type parameters

| Name |
| :------ |
| `DT` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `data?` | `DT`[] |

#### Defined in

lib/filtering.tsx:5

## Properties

### data

• **data**: `DT`[]

#### Defined in

lib/filtering.tsx:2

___

### filterUpdateFunction

• `Optional` **filterUpdateFunction**: () => `DT`[]

#### Type declaration

▸ (): `DT`[]

##### Returns

`DT`[]

#### Defined in

lib/filtering.tsx:4

___

### filters

• **filters**: (`element`: `DT`) => `boolean`[]

#### Defined in

lib/filtering.tsx:3

## Methods

### addFilter

▸ **addFilter**(`filter`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `filter` | (...`args`: `any`) => `any` |

#### Returns

`void`

#### Defined in

lib/filtering.tsx:42

___

### getFilteredData

▸ **getFilteredData**(): `DT`[]

#### Returns

`DT`[]

#### Defined in

lib/filtering.tsx:11

___

### getPossibleValues

▸ **getPossibleValues**<`SF`\>(`selectorFunction`): `string`[]

#### Type parameters

| Name | Type |
| :------ | :------ |
| `SF` | extends (...`args`: `any`) => `any` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `selectorFunction` | `SF` |

#### Returns

`string`[]

#### Defined in

lib/filtering.tsx:25

___

### onFiltersUpdated

▸ **onFiltersUpdated**(): `void`

#### Returns

`void`

#### Defined in

lib/filtering.tsx:21

___

### setOnUpdateFilters

▸ **setOnUpdateFilters**(`fn`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `fn` | (...`args`: `any`) => `any` |

#### Returns

`void`

#### Defined in

lib/filtering.tsx:18
