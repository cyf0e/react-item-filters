[filteringlibrary](../README.md) / [Exports](../modules.md) / CheckboxFilter

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

lib/checkboxFilter.tsx:15

## Properties

### checked

• **checked**: `Set`<`SelectorReturnType`\>

#### Defined in

lib/checkboxFilter.tsx:13

___

### dataContext

• `Optional` **dataContext**: [`DataContainer`](DataContainer.md)<`DataElementType`\>

#### Inherited from

[FilterBase](FilterBase.md).[dataContext](FilterBase.md#datacontext)

#### Defined in

lib/filtering.tsx:48

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

lib/filtering.tsx:49

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

lib/checkboxFilter.tsx:14

## Methods

### addCheckboxFilter

▸ **addCheckboxFilter**(`Component`, `nameValueMap?`, `prettyLabels?`): `undefined` \| `any`[]

If a custom component is supplied it has to have props: {value: any, filterChangeFunction: Function}.
The value is provided for labeling the checkbox.
The filterChangeFunction is supplied to the onEvent function you wish to call for example onChange = {filterChangeFunction}

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `Component` | (`props`: [`CheckboxPropType`](../modules.md#checkboxproptype)<`SelectorReturnType`\>) => `Element` | `undefined` |
| `nameValueMap?` | `Map`<`SelectorReturnType`, `string`\> | `undefined` |
| `prettyLabels` | `boolean` | `true` |

#### Returns

`undefined` \| `any`[]

#### Defined in

lib/checkboxFilter.tsx:30

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

▸ **getDataContext**(): [`DataContainer`](DataContainer.md)<`DataElementType`\>

#### Returns

[`DataContainer`](DataContainer.md)<`DataElementType`\>

#### Inherited from

[FilterBase](FilterBase.md).[getDataContext](FilterBase.md#getdatacontext)

#### Defined in

lib/filtering.tsx:55

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

lib/checkboxFilter.tsx:70
