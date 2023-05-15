[filteringlibrary](../README.md) / [Exports](../modules.md) / FilterBase

# Class: FilterBase<DT\>

## Type parameters

| Name |
| :------ |
| `DT` |

## Hierarchy

- **`FilterBase`**

  ↳ [`CheckboxFilter`](CheckboxFilter.md)

  ↳ [`SearchFilter`](SearchFilter.md)

## Table of contents

### Constructors

- [constructor](FilterBase.md#constructor)

### Properties

- [dataContext](FilterBase.md#datacontext)
- [filterFunction](FilterBase.md#filterfunction)

### Methods

- [dispatchUpdate](FilterBase.md#dispatchupdate)
- [getDataContext](FilterBase.md#getdatacontext)

## Constructors

### constructor

• **new FilterBase**<`DT`\>(`context`, `filterFn`)

#### Type parameters

| Name |
| :------ |
| `DT` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `context` | [`DataContainer`](DataContainer.md)<`DT`\> |
| `filterFn` | (`element`: `DT`) => `boolean` |

#### Defined in

lib/filtering.tsx:50

## Properties

### dataContext

• `Optional` **dataContext**: [`DataContainer`](DataContainer.md)<`DT`\>

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

#### Defined in

lib/filtering.tsx:49

## Methods

### dispatchUpdate

▸ **dispatchUpdate**(): `void`

#### Returns

`void`

#### Defined in

lib/filtering.tsx:60

___

### getDataContext

▸ **getDataContext**(): [`DataContainer`](DataContainer.md)<`DT`\>

#### Returns

[`DataContainer`](DataContainer.md)<`DT`\>

#### Defined in

lib/filtering.tsx:55
