[react-item-filters](../README.md) / [Exports](../modules.md) / SearchFilter

# Class: SearchFilter<DataType, SelectorReturnType\>

## Type parameters

| Name | Type |
| :------ | :------ |
| `DataType` | `any` |
| `SelectorReturnType` | `any` |

## Hierarchy

- [`FilterBase`](FilterBase.md)<`DataType`\>

  ↳ **`SearchFilter`**

## Implements

- [`ISessionStorage`](../interfaces/ISessionStorage.md)

## Table of contents

### Constructors

- [constructor](SearchFilter.md#constructor)

### Properties

- [events](SearchFilter.md#events)
- [filterClearFunction](SearchFilter.md#filterclearfunction)
- [name](SearchFilter.md#name)
- [searchTerm](SearchFilter.md#searchterm)
- [selectorFunction](SearchFilter.md#selectorfunction)
- [serializeToHistory](SearchFilter.md#serializetohistory)

### Methods

- [clearFilter](SearchFilter.md#clearfilter)
- [dispatchUpdate](SearchFilter.md#dispatchupdate)
- [emit](SearchFilter.md#emit)
- [getDataContainer](SearchFilter.md#getdatacontainer)
- [getFilterFunction](SearchFilter.md#getfilterfunction)
- [getFilterName](SearchFilter.md#getfiltername)
- [loadHistory](SearchFilter.md#loadhistory)
- [on](SearchFilter.md#on)
- [onEventFired](SearchFilter.md#oneventfired)
- [onFilterClear](SearchFilter.md#onfilterclear)
- [onFilterUpdate](SearchFilter.md#onfilterupdate)
- [remove](SearchFilter.md#remove)
- [saveHistory](SearchFilter.md#savehistory)
- [updateSearchFilter](SearchFilter.md#updatesearchfilter)

## Constructors

### constructor

• **new SearchFilter**<`DataType`, `SelectorReturnType`\>(`«destructured»`)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `DataType` | `any` |
| `SelectorReturnType` | `any` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `dataContainer` | [`DataContainer`](DataContainer.md)<`DataType`\> |
| › `fuzzy?` | `boolean` |
| › `name` | `string` |
| › `selectorFunction` | (`element`: `DataType`) => `SelectorReturnType` |
| › `serializeToHistory?` | `boolean` |

#### Overrides

[FilterBase](FilterBase.md).[constructor](FilterBase.md#constructor)

#### Defined in

[lib/searchFilter.ts:12](https://github.com/cyf0e/react-item-filters/blob/5e1c60a/src/lib/searchFilter.ts#L12)

## Properties

### events

• **events**: `Map`<`string`, `Set`<(...`args`: `any`) => `any`\>\>

#### Inherited from

[FilterBase](FilterBase.md).[events](FilterBase.md#events)

#### Defined in

[lib/eventBase.ts:2](https://github.com/cyf0e/react-item-filters/blob/5e1c60a/src/lib/eventBase.ts#L2)

___

### filterClearFunction

• `Protected` **filterClearFunction**: () => `void`

#### Type declaration

▸ (): `void`

##### Returns

`void`

#### Inherited from

[FilterBase](FilterBase.md).[filterClearFunction](FilterBase.md#filterclearfunction)

#### Defined in

[lib/filtering.ts:81](https://github.com/cyf0e/react-item-filters/blob/5e1c60a/src/lib/filtering.ts#L81)

___

### name

• `Protected` **name**: `string`

#### Inherited from

[FilterBase](FilterBase.md).[name](FilterBase.md#name)

#### Defined in

[lib/filtering.ts:82](https://github.com/cyf0e/react-item-filters/blob/5e1c60a/src/lib/filtering.ts#L82)

___

### searchTerm

• **searchTerm**: `string`

#### Defined in

[lib/searchFilter.ts:9](https://github.com/cyf0e/react-item-filters/blob/5e1c60a/src/lib/searchFilter.ts#L9)

___

### selectorFunction

• **selectorFunction**: (`element`: `DataType`) => `SelectorReturnType`

#### Type declaration

▸ (`element`): `SelectorReturnType`

##### Parameters

| Name | Type |
| :------ | :------ |
| `element` | `DataType` |

##### Returns

`SelectorReturnType`

#### Defined in

[lib/searchFilter.ts:10](https://github.com/cyf0e/react-item-filters/blob/5e1c60a/src/lib/searchFilter.ts#L10)

___

### serializeToHistory

• `Protected` **serializeToHistory**: `boolean` = `false`

#### Inherited from

[FilterBase](FilterBase.md).[serializeToHistory](FilterBase.md#serializetohistory)

#### Defined in

[lib/filtering.ts:83](https://github.com/cyf0e/react-item-filters/blob/5e1c60a/src/lib/filtering.ts#L83)

## Methods

### clearFilter

▸ **clearFilter**(): `void`

#### Returns

`void`

#### Inherited from

[FilterBase](FilterBase.md).[clearFilter](FilterBase.md#clearfilter)

#### Defined in

[lib/filtering.ts:111](https://github.com/cyf0e/react-item-filters/blob/5e1c60a/src/lib/filtering.ts#L111)

___

### dispatchUpdate

▸ **dispatchUpdate**(): `void`

#### Returns

`void`

#### Inherited from

[FilterBase](FilterBase.md).[dispatchUpdate](FilterBase.md#dispatchupdate)

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

[FilterBase](FilterBase.md).[emit](FilterBase.md#emit)

#### Defined in

[lib/eventBase.ts:18](https://github.com/cyf0e/react-item-filters/blob/5e1c60a/src/lib/eventBase.ts#L18)

___

### getDataContainer

▸ **getDataContainer**(): [`DataContainer`](DataContainer.md)<`DataType`\>

#### Returns

[`DataContainer`](DataContainer.md)<`DataType`\>

#### Inherited from

[FilterBase](FilterBase.md).[getDataContainer](FilterBase.md#getdatacontainer)

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

#### Inherited from

[FilterBase](FilterBase.md).[getFilterFunction](FilterBase.md#getfilterfunction)

#### Defined in

[lib/filtering.ts:108](https://github.com/cyf0e/react-item-filters/blob/5e1c60a/src/lib/filtering.ts#L108)

___

### getFilterName

▸ **getFilterName**(): `string`

#### Returns

`string`

#### Inherited from

[FilterBase](FilterBase.md).[getFilterName](FilterBase.md#getfiltername)

#### Defined in

[lib/filtering.ts:105](https://github.com/cyf0e/react-item-filters/blob/5e1c60a/src/lib/filtering.ts#L105)

___

### loadHistory

▸ **loadHistory**(): `void`

#### Returns

`void`

#### Implementation of

[ISessionStorage](../interfaces/ISessionStorage.md).[loadHistory](../interfaces/ISessionStorage.md#loadhistory)

#### Defined in

[lib/searchFilter.ts:74](https://github.com/cyf0e/react-item-filters/blob/5e1c60a/src/lib/searchFilter.ts#L74)

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

[FilterBase](FilterBase.md).[on](FilterBase.md#on)

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

#### Inherited from

[FilterBase](FilterBase.md).[onEventFired](FilterBase.md#oneventfired)

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

#### Inherited from

[FilterBase](FilterBase.md).[onFilterClear](FilterBase.md#onfilterclear)

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

#### Inherited from

[FilterBase](FilterBase.md).[onFilterUpdate](FilterBase.md#onfilterupdate)

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

[FilterBase](FilterBase.md).[remove](FilterBase.md#remove)

#### Defined in

[lib/eventBase.ts:3](https://github.com/cyf0e/react-item-filters/blob/5e1c60a/src/lib/eventBase.ts#L3)

___

### saveHistory

▸ **saveHistory**(): `void`

#### Returns

`void`

#### Implementation of

[ISessionStorage](../interfaces/ISessionStorage.md).[saveHistory](../interfaces/ISessionStorage.md#savehistory)

#### Defined in

[lib/searchFilter.ts:81](https://github.com/cyf0e/react-item-filters/blob/5e1c60a/src/lib/searchFilter.ts#L81)

___

### updateSearchFilter

▸ **updateSearchFilter**(`searchString`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `searchString` | `string` |

#### Returns

`void`

#### Defined in

[lib/searchFilter.ts:68](https://github.com/cyf0e/react-item-filters/blob/5e1c60a/src/lib/searchFilter.ts#L68)
