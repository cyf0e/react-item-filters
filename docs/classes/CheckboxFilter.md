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

## Implements

- [`ISessionStorage`](../interfaces/ISessionStorage.md)

## Table of contents

### Constructors

- [constructor](CheckboxFilter.md#constructor)

### Properties

- [allParsedLabels](CheckboxFilter.md#allparsedlabels)
- [checked](CheckboxFilter.md#checked)
- [events](CheckboxFilter.md#events)
- [filterClearFunction](CheckboxFilter.md#filterclearfunction)
- [name](CheckboxFilter.md#name)
- [nameValueMap](CheckboxFilter.md#namevaluemap)
- [possibleValues](CheckboxFilter.md#possiblevalues)
- [prettyLabels](CheckboxFilter.md#prettylabels)
- [selectorFunction](CheckboxFilter.md#selectorfunction)
- [serializeToHistory](CheckboxFilter.md#serializetohistory)

### Methods

- [clearFilter](CheckboxFilter.md#clearfilter)
- [dispatchUpdate](CheckboxFilter.md#dispatchupdate)
- [emit](CheckboxFilter.md#emit)
- [getDataContainer](CheckboxFilter.md#getdatacontainer)
- [getFilterFunction](CheckboxFilter.md#getfilterfunction)
- [getFilterName](CheckboxFilter.md#getfiltername)
- [getParsedPossibleValues](CheckboxFilter.md#getparsedpossiblevalues)
- [loadHistory](CheckboxFilter.md#loadhistory)
- [on](CheckboxFilter.md#on)
- [onEventFired](CheckboxFilter.md#oneventfired)
- [onFilterClear](CheckboxFilter.md#onfilterclear)
- [onFilterUpdate](CheckboxFilter.md#onfilterupdate)
- [parseLabelValue](CheckboxFilter.md#parselabelvalue)
- [remove](CheckboxFilter.md#remove)
- [saveHistory](CheckboxFilter.md#savehistory)
- [setChecked](CheckboxFilter.md#setchecked)

## Constructors

### constructor

• **new CheckboxFilter**<`DataElementType`, `SelectorReturnType`\>(`«destructured»`)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `DataElementType` | `DataElementType` |
| `SelectorReturnType` | `string` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `dataContainer` | [`DataContainer`](DataContainer.md)<`DataElementType`\> |
| › `name` | `string` |
| › `nameValueMap?` | `Map`<`SelectorReturnType`, `string`\> |
| › `prettyLabels?` | `boolean` |
| › `selectorFunction` | (`element`: `DataElementType`) => `SelectorReturnType` |
| › `serializeToHistory?` | `boolean` |

#### Overrides

[FilterBase](FilterBase.md).[constructor](FilterBase.md#constructor)

#### Defined in

[lib/checkboxFilter.ts:19](https://github.com/cyf0e/react-item-filters/blob/5033516/src/lib/checkboxFilter.ts#L19)

## Properties

### allParsedLabels

• **allParsedLabels**: `Map`<`SelectorReturnType`, `string`\>

#### Defined in

[lib/checkboxFilter.ts:17](https://github.com/cyf0e/react-item-filters/blob/5033516/src/lib/checkboxFilter.ts#L17)

___

### checked

• **checked**: `Set`<`SelectorReturnType`\>

#### Defined in

[lib/checkboxFilter.ts:12](https://github.com/cyf0e/react-item-filters/blob/5033516/src/lib/checkboxFilter.ts#L12)

___

### events

• **events**: `Map`<`string`, `Set`<(...`args`: `any`) => `any`\>\>

#### Inherited from

[FilterBase](FilterBase.md).[events](FilterBase.md#events)

#### Defined in

[lib/eventBase.ts:2](https://github.com/cyf0e/react-item-filters/blob/5033516/src/lib/eventBase.ts#L2)

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

[lib/filtering.ts:72](https://github.com/cyf0e/react-item-filters/blob/5033516/src/lib/filtering.ts#L72)

___

### name

• `Protected` **name**: `string`

#### Inherited from

[FilterBase](FilterBase.md).[name](FilterBase.md#name)

#### Defined in

[lib/filtering.ts:73](https://github.com/cyf0e/react-item-filters/blob/5033516/src/lib/filtering.ts#L73)

___

### nameValueMap

• `Optional` **nameValueMap**: `Map`<`SelectorReturnType`, `string`\>

#### Defined in

[lib/checkboxFilter.ts:15](https://github.com/cyf0e/react-item-filters/blob/5033516/src/lib/checkboxFilter.ts#L15)

___

### possibleValues

• **possibleValues**: `Set`<`SelectorReturnType`\>

#### Defined in

[lib/checkboxFilter.ts:13](https://github.com/cyf0e/react-item-filters/blob/5033516/src/lib/checkboxFilter.ts#L13)

___

### prettyLabels

• `Optional` **prettyLabels**: `boolean`

#### Defined in

[lib/checkboxFilter.ts:16](https://github.com/cyf0e/react-item-filters/blob/5033516/src/lib/checkboxFilter.ts#L16)

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

[lib/checkboxFilter.ts:14](https://github.com/cyf0e/react-item-filters/blob/5033516/src/lib/checkboxFilter.ts#L14)

___

### serializeToHistory

• `Protected` **serializeToHistory**: `boolean` = `false`

#### Inherited from

[FilterBase](FilterBase.md).[serializeToHistory](FilterBase.md#serializetohistory)

#### Defined in

[lib/filtering.ts:74](https://github.com/cyf0e/react-item-filters/blob/5033516/src/lib/filtering.ts#L74)

## Methods

### clearFilter

▸ **clearFilter**(): `void`

#### Returns

`void`

#### Inherited from

[FilterBase](FilterBase.md).[clearFilter](FilterBase.md#clearfilter)

#### Defined in

[lib/filtering.ts:102](https://github.com/cyf0e/react-item-filters/blob/5033516/src/lib/filtering.ts#L102)

___

### dispatchUpdate

▸ **dispatchUpdate**(): `void`

#### Returns

`void`

#### Inherited from

[FilterBase](FilterBase.md).[dispatchUpdate](FilterBase.md#dispatchupdate)

#### Defined in

[lib/filtering.ts:115](https://github.com/cyf0e/react-item-filters/blob/5033516/src/lib/filtering.ts#L115)

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

[lib/eventBase.ts:18](https://github.com/cyf0e/react-item-filters/blob/5033516/src/lib/eventBase.ts#L18)

___

### getDataContainer

▸ **getDataContainer**(): [`DataContainer`](DataContainer.md)<`DataElementType`\>

#### Returns

[`DataContainer`](DataContainer.md)<`DataElementType`\>

#### Inherited from

[FilterBase](FilterBase.md).[getDataContainer](FilterBase.md#getdatacontainer)

#### Defined in

[lib/filtering.ts:109](https://github.com/cyf0e/react-item-filters/blob/5033516/src/lib/filtering.ts#L109)

___

### getFilterFunction

▸ **getFilterFunction**(): (`element`: `DataElementType`) => `boolean`

#### Returns

`fn`

▸ (`element`): `boolean`

##### Parameters

| Name | Type |
| :------ | :------ |
| `element` | `DataElementType` |

##### Returns

`boolean`

#### Inherited from

[FilterBase](FilterBase.md).[getFilterFunction](FilterBase.md#getfilterfunction)

#### Defined in

[lib/filtering.ts:99](https://github.com/cyf0e/react-item-filters/blob/5033516/src/lib/filtering.ts#L99)

___

### getFilterName

▸ **getFilterName**(): `string`

#### Returns

`string`

#### Inherited from

[FilterBase](FilterBase.md).[getFilterName](FilterBase.md#getfiltername)

#### Defined in

[lib/filtering.ts:96](https://github.com/cyf0e/react-item-filters/blob/5033516/src/lib/filtering.ts#L96)

___

### getParsedPossibleValues

▸ **getParsedPossibleValues**(): (`undefined` \| `string`)[]

#### Returns

(`undefined` \| `string`)[]

#### Defined in

[lib/checkboxFilter.ts:66](https://github.com/cyf0e/react-item-filters/blob/5033516/src/lib/checkboxFilter.ts#L66)

___

### loadHistory

▸ **loadHistory**(): `void`

#### Returns

`void`

#### Implementation of

[ISessionStorage](../interfaces/ISessionStorage.md).[loadHistory](../interfaces/ISessionStorage.md#loadhistory)

#### Defined in

[lib/checkboxFilter.ts:88](https://github.com/cyf0e/react-item-filters/blob/5033516/src/lib/checkboxFilter.ts#L88)

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

[lib/eventBase.ts:7](https://github.com/cyf0e/react-item-filters/blob/5033516/src/lib/eventBase.ts#L7)

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

[lib/filtering.ts:119](https://github.com/cyf0e/react-item-filters/blob/5033516/src/lib/filtering.ts#L119)

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

[lib/filtering.ts:135](https://github.com/cyf0e/react-item-filters/blob/5033516/src/lib/filtering.ts#L135)

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

[lib/filtering.ts:132](https://github.com/cyf0e/react-item-filters/blob/5033516/src/lib/filtering.ts#L132)

___

### parseLabelValue

▸ **parseLabelValue**(`rawLabel`): `undefined` \| `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `rawLabel` | `SelectorReturnType` |

#### Returns

`undefined` \| `string`

#### Defined in

[lib/checkboxFilter.ts:72](https://github.com/cyf0e/react-item-filters/blob/5033516/src/lib/checkboxFilter.ts#L72)

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

[lib/eventBase.ts:3](https://github.com/cyf0e/react-item-filters/blob/5033516/src/lib/eventBase.ts#L3)

___

### saveHistory

▸ **saveHistory**(): `void`

#### Returns

`void`

#### Implementation of

[ISessionStorage](../interfaces/ISessionStorage.md).[saveHistory](../interfaces/ISessionStorage.md#savehistory)

#### Defined in

[lib/checkboxFilter.ts:84](https://github.com/cyf0e/react-item-filters/blob/5033516/src/lib/checkboxFilter.ts#L84)

___

### setChecked

▸ **setChecked**(`value`, `state`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` \| `SelectorReturnType` |
| `state` | `boolean` |

#### Returns

`void`

#### Defined in

[lib/checkboxFilter.ts:103](https://github.com/cyf0e/react-item-filters/blob/5033516/src/lib/checkboxFilter.ts#L103)
