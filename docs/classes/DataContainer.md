[react-item-filters](../README.md) / [Exports](../modules.md) / DataContainer

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

[lib/filtering.ts:5](https://github.com/cyf0e/react-item-filters/blob/a9642bc/src/lib/filtering.ts#L5)

## Properties

### data

• **data**: `DT`[]

#### Defined in

[lib/filtering.ts:2](https://github.com/cyf0e/react-item-filters/blob/a9642bc/src/lib/filtering.ts#L2)

___

### filterUpdateFunction

• `Optional` **filterUpdateFunction**: () => `DT`[]

#### Type declaration

▸ (): `DT`[]

##### Returns

`DT`[]

#### Defined in

[lib/filtering.ts:4](https://github.com/cyf0e/react-item-filters/blob/a9642bc/src/lib/filtering.ts#L4)

___

### filters

• **filters**: (`element`: `DT`) => `boolean`[]

#### Defined in

[lib/filtering.ts:3](https://github.com/cyf0e/react-item-filters/blob/a9642bc/src/lib/filtering.ts#L3)

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

[lib/filtering.ts:43](https://github.com/cyf0e/react-item-filters/blob/a9642bc/src/lib/filtering.ts#L43)

___

### getFilteredData

▸ **getFilteredData**(): `DT`[]

#### Returns

`DT`[]

#### Defined in

[lib/filtering.ts:11](https://github.com/cyf0e/react-item-filters/blob/a9642bc/src/lib/filtering.ts#L11)

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

[lib/filtering.ts:26](https://github.com/cyf0e/react-item-filters/blob/a9642bc/src/lib/filtering.ts#L26)

___

### onFiltersUpdated

▸ **onFiltersUpdated**(): `void`

#### Returns

`void`

#### Defined in

[lib/filtering.ts:22](https://github.com/cyf0e/react-item-filters/blob/a9642bc/src/lib/filtering.ts#L22)

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

[lib/filtering.ts:19](https://github.com/cyf0e/react-item-filters/blob/a9642bc/src/lib/filtering.ts#L19)
