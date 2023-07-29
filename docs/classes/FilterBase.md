[react-item-filters](../README.md) / [Exports](../modules.md) / FilterBase

# Class: FilterBase<DataType\>

## Type parameters

| Name |
| :------ |
| `DataType` |

## Hierarchy

- `EventBase`

  ↳ **`FilterBase`**

  ↳↳ [`CheckboxFilter`](CheckboxFilter.md)

  ↳↳ [`SearchFilter`](SearchFilter.md)

## Table of contents

### Constructors

- [constructor](FilterBase.md#constructor)

### Properties

- [dataContainer](FilterBase.md#datacontainer)
- [events](FilterBase.md#events)
- [filterClearFunction](FilterBase.md#filterclearfunction)
- [filterFunction](FilterBase.md#filterfunction)
- [name](FilterBase.md#name)
- [serializeToHistory](FilterBase.md#serializetohistory)

### Methods

- [clearFilter](FilterBase.md#clearfilter)
- [dispatchUpdate](FilterBase.md#dispatchupdate)
- [emit](FilterBase.md#emit)
- [getDataContainer](FilterBase.md#getdatacontainer)
- [getFilterFunction](FilterBase.md#getfilterfunction)
- [getFilterName](FilterBase.md#getfiltername)
- [on](FilterBase.md#on)
- [onEventFired](FilterBase.md#oneventfired)
- [onFilterClear](FilterBase.md#onfilterclear)
- [onFilterUpdate](FilterBase.md#onfilterupdate)
- [remove](FilterBase.md#remove)

## Constructors

### constructor

• **new FilterBase**<`DataType`\>(`«destructured»`)

#### Type parameters

| Name |
| :------ |
| `DataType` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `dataContainer` | [`DataContainer`](DataContainer.md)<`DataType`\> |
| › `filterClearFunction` | () => `void` |
| › `filterFunction` | (`element`: `DataType`) => `boolean` |
| › `name` | `string` |
| › `serializeToHistory?` | `boolean` |

#### Overrides

EventBase.constructor

#### Defined in

[lib/filtering.ts:84](https://github.com/cyf0e/react-item-filters/blob/5e1c60a/src/lib/filtering.ts#L84)

## Properties

### dataContainer

• `Private` **dataContainer**: [`DataContainer`](DataContainer.md)<`DataType`\>

#### Defined in

[lib/filtering.ts:79](https://github.com/cyf0e/react-item-filters/blob/5e1c60a/src/lib/filtering.ts#L79)

___

### events

• **events**: `Map`<`string`, `Set`<(...`args`: `any`) => `any`\>\>

#### Inherited from

EventBase.events

#### Defined in

[lib/eventBase.ts:2](https://github.com/cyf0e/react-item-filters/blob/5e1c60a/src/lib/eventBase.ts#L2)

___

### filterClearFunction

• `Protected` **filterClearFunction**: () => `void`

#### Type declaration

▸ (): `void`

##### Returns

`void`

#### Defined in

[lib/filtering.ts:81](https://github.com/cyf0e/react-item-filters/blob/5e1c60a/src/lib/filtering.ts#L81)

___

### filterFunction

• `Private` **filterFunction**: (`element`: `DataType`) => `boolean`

#### Type declaration

▸ (`element`): `boolean`

##### Parameters

| Name | Type |
| :------ | :------ |
| `element` | `DataType` |

##### Returns

`boolean`

#### Defined in

[lib/filtering.ts:80](https://github.com/cyf0e/react-item-filters/blob/5e1c60a/src/lib/filtering.ts#L80)

___

### name

• `Protected` **name**: `string`

#### Defined in

[lib/filtering.ts:82](https://github.com/cyf0e/react-item-filters/blob/5e1c60a/src/lib/filtering.ts#L82)

___

### serializeToHistory

• `Protected` **serializeToHistory**: `boolean` = `false`

#### Defined in

[lib/filtering.ts:83](https://github.com/cyf0e/react-item-filters/blob/5e1c60a/src/lib/filtering.ts#L83)

## Methods

### clearFilter

▸ **clearFilter**(): `void`

#### Returns

`void`

#### Defined in

[lib/filtering.ts:111](https://github.com/cyf0e/react-item-filters/blob/5e1c60a/src/lib/filtering.ts#L111)

___

### dispatchUpdate

▸ **dispatchUpdate**(): `void`

#### Returns

`void`

#### Defined in

[lib/filtering.ts:124](https://github.com/cyf0e/react-item-filters/blob/5e1c60a/src/lib/filtering.ts#L124)

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

### getDataContainer

▸ **getDataContainer**(): [`DataContainer`](DataContainer.md)<`DataType`\>

#### Returns

[`DataContainer`](DataContainer.md)<`DataType`\>

#### Defined in

[lib/filtering.ts:118](https://github.com/cyf0e/react-item-filters/blob/5e1c60a/src/lib/filtering.ts#L118)

___

### getFilterFunction

▸ **getFilterFunction**(): (`element`: `DataType`) => `boolean`

#### Returns

`fn`

▸ (`element`): `boolean`

##### Parameters

| Name | Type |
| :------ | :------ |
| `element` | `DataType` |

##### Returns

`boolean`

#### Defined in

[lib/filtering.ts:108](https://github.com/cyf0e/react-item-filters/blob/5e1c60a/src/lib/filtering.ts#L108)

___

### getFilterName

▸ **getFilterName**(): `string`

#### Returns

`string`

#### Defined in

[lib/filtering.ts:105](https://github.com/cyf0e/react-item-filters/blob/5e1c60a/src/lib/filtering.ts#L105)

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

### onEventFired

▸ **onEventFired**(`eventName`, `fn`): () => `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` |
| `fn` | (...`args`: `any`) => `any` |

#### Returns

`fn`

▸ (): `void`

##### Returns

`void`

#### Defined in

[lib/filtering.ts:128](https://github.com/cyf0e/react-item-filters/blob/5e1c60a/src/lib/filtering.ts#L128)

___

### onFilterClear

▸ **onFilterClear**(`fn`): () => `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `fn` | (...`args`: `any`) => `any` |

#### Returns

`fn`

▸ (): `void`

##### Returns

`void`

#### Defined in

[lib/filtering.ts:144](https://github.com/cyf0e/react-item-filters/blob/5e1c60a/src/lib/filtering.ts#L144)

___

### onFilterUpdate

▸ **onFilterUpdate**(`fn`): () => `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `fn` | (...`args`: `any`) => `any` |

#### Returns

`fn`

▸ (): `void`

##### Returns

`void`

#### Defined in

[lib/filtering.ts:141](https://github.com/cyf0e/react-item-filters/blob/5e1c60a/src/lib/filtering.ts#L141)

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
