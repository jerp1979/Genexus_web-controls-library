# gx-tab-caption

A container for tab items caption. Must be followed by a `gx-tab-page` element containing the tab item content.

### Child images

`gx-tab-caption` accepts two child `<img>` elements that work as the main image and the unselected image. The unselected image is the image to display when the tab caption isn't selected.

To tag an image as the main one, use the `slot` attribute with value "main-image". For example:

`<img href="..." slot="main-image" />`

To tag an image as the unselected one, use the slot attribute with value "disabled-image". For example:

`<img href="..." slot="disabled-image" />`

The element will show one or the other, depending on the value of the [selected](../common/readme.md#selected) attribute.
If the main image is the only image specified, it will be displayed both when the tab caption is selected and unselected.

<!-- Auto Generated Below -->

## Properties

| Property           | Attribute            | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Type                                                    | Default     |
| ------------------ | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------- | ----------- |
| `cssClass`         | `css-class`          | A CSS class to set as the `gx-tab-caption` element class when `selected = false`.                                                                                                                                                                                                                                                                                                                                                                                                                      | `string`                                                | `undefined` |
| `disabled`         | `disabled`           | This attribute lets you specify if the tab page is disabled.                                                                                                                                                                                                                                                                                                                                                                                                                                           | `boolean`                                               | `false`     |
| `highlightable`    | `highlightable`      | True to highlight control when an action is fired.                                                                                                                                                                                                                                                                                                                                                                                                                                                     | `boolean`                                               | `true`      |
| `imagePosition`    | `image-position`     | This attribute lets you specify the relative location of the image to the text. \| Value \| Details \| \| -------- \| ------------------------------------------------------- \| \| `above` \| The image is located above the text. \| \| `before` \| The image is located before the text, in the same line. \| \| `after` \| The image is located after the text, in the same line. \| \| `below` \| The image is located below the text. \| \| `behind` \| The image is located behind the text. \| | `"above" \| "after" \| "before" \| "behind" \| "below"` | `"above"`   |
| `selected`         | `selected`           | This attribute lets you specify if the tab page corresponding to this caption is selected                                                                                                                                                                                                                                                                                                                                                                                                              | `boolean`                                               | `false`     |
| `selectedCssClass` | `selected-css-class` | A CSS class to set as the `gx-tab-caption` element class when `selected = true`.                                                                                                                                                                                                                                                                                                                                                                                                                       | `string`                                                | `undefined` |
| `tabCssClass`      | `tab-css-class`      | A CSS class that is used by the `gx-tab` parent container.                                                                                                                                                                                                                                                                                                                                                                                                                                             | `string`                                                | `undefined` |

## Events

| Event       | Description                             | Type               |
| ----------- | --------------------------------------- | ------------------ |
| `tabSelect` | Fired when the tab caption is selected. | `CustomEvent<any>` |

## Slots

| Slot               | Description                      |
| ------------------ | -------------------------------- |
| `"disabled-image"` | The slot for the disabled `img`. |
| `"main-image"`     | The slot for the main `img`.     |

## Shadow Parts

| Part          | Description                                                                      |
| ------------- | -------------------------------------------------------------------------------- |
| `"caption"`   | The caption displayed at the center of the control.                              |
| `"indicator"` | The indicator bar displayed at the bottom of the control when `selected = true`. |
| `"link"`      | The `a` tag of the control.                                                      |

---

_Built with [StencilJS](https://stenciljs.com/)_
