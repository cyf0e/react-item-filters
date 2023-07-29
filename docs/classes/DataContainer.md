[react-item-filters](../README.md) / [Exports](../modules.md) / DataContainer

# Class: DataContainer<DataType\>

## Type parameters

| Name |
| :------ |
| `DataType` |

## Hierarchy

- `EventBase`

  ↳ **`DataContainer`**

## Table of contents

### Constructors

- [constructor](DataContainer.md#constructor)

### Properties

- [data](DataContainer.md#data)
- [events](DataContainer.md#events)
- [filters](DataContainer.md#filters)

### Methods

- [addFilter](DataContainer.md#addfilter)
- [clearFilters](DataContainer.md#clearfilters)
- [emit](DataContainer.md#emit)
- [getFilteredData](DataContainer.md#getfiltereddata)
- [getInitialData](DataContainer.md#getinitialdata)
- [getPossibleValues](DataContainer.md#getpossiblevalues)
- [on](DataContainer.md#on)
- [remove](DataContainer.md#remove)

## Constructors

### constructor

• **new DataContainer**<`DataType`\>(`«destructured»`)

#### Type parameters

| Name |
| :------ |
| `DataType` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `data?` | `DataType`[] |

#### Overrides

EventBase.constructor

#### Defined in

[lib/filtering.ts:6](https://github.com/cyf0e/react-item-filters/blob/5e1c60a/src/lib/filtering.ts#L6)

## Properties

### data

• `Private` **data**: `DataType`[]

#### Defined in

[lib/filtering.ts:4](https://github.com/cyf0e/react-item-filters/blob/5e1c60a/src/lib/filtering.ts#L4)

___

### events

• **events**: `Map`<`string`, `Set`<(...`args`: `any`) => `any`\>\>

#### Inherited from

EventBase.events

#### Defined in

[lib/eventBase.ts:2](https://github.com/cyf0e/react-item-filters/blob/5e1c60a/src/lib/eventBase.ts#L2)

___

### filters

• `Private` **filters**: `Set`<[`FilterBase`](FilterBase.md)<`DataType`\>\>

#### Defined in

[lib/filtering.ts:5](https://github.com/cyf0e/react-item-filters/blob/5e1c60a/src/lib/filtering.ts#L5)

## Methods

### addFilter

▸ **addFilter**(`filter`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `filter` | [`FilterBase`](FilterBase.md)<`DataType`\> |

#### Returns

`void`

#### Defined in

[lib/filtering.ts:59](https://github.com/cyf0e/react-item-filters/blob/5e1c60a/src/lib/filtering.ts#L59)

___

### clearFilters

▸ **clearFilters**(): `void`

#### Returns

`void`

#### Defined in

[lib/filtering.ts:26](https://github.com/cyf0e/react-item-filters/blob/5e1c60a/src/lib/filtering.ts#L26)

___

### emit

▸ **emit**(`event`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `string` |

#### Returns

`void`

#### Inherited from

EventBase.emit

#### Defined in

[lib/eventBase.ts:18](https://github.com/cyf0e/react-item-filters/blob/5e1c60a/src/lib/eventBase.ts#L18)

___

### getFilteredData

▸ **getFilteredData**(): `DataType`[]

#### Returns

`DataType`[]

#### Defined in

[lib/filtering.ts:17](https://github.com/cyf0e/react-item-filters/blob/5e1c60a/src/lib/filtering.ts#L17)

___

### getInitialData

▸ **getInitialData**(): `DataType`[]

#### Returns

`DataType`[]

#### Defined in

[lib/filtering.ts:13](https://github.com/cyf0e/react-item-filters/blob/5e1c60a/src/lib/filtering.ts#L13)

___

### getPossibleValues

▸ **getPossibleValues**<`SF`\>(`selectorFunction`): `Set`<`string`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `SF` | extends (...`args`: `any`) => `any` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `selectorFunction` | `SF` |

#### Returns

`Set`<`string`\>

#### Defined in

[lib/filtering.ts:41](https://github.com/cyf0e/react-item-filters/blob/5e1c60a/src/lib/filtering.ts#L41)

___

### on

▸ **on**(`event`, `listener`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `string` |
| `listener` | (...`args`: `any`) => `any` |

#### Returns

`void`

#### Inherited from

EventBase.on

#### Defined in

[lib/eventBase.ts:7](https://github.com/cyf0e/react-item-filters/blob/5e1c60a/src/lib/eventBase.ts#L7)

___

### remove

▸ **remove**(`event`, `listener`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `string` |
| `listener` | (...`args`: `any`) => `any` |

#### Returns

`void`

#### Inherited from

EventBase.remove

#### Defined in

[lib/eventBase.ts:3](https://github.com/cyf0e/react-item-filters/blob/5e1c60a/src/lib/eventBase.ts#L3)
