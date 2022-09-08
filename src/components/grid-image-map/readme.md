# gx-image-map

<!-- Auto Generated Below -->

## Properties

| Property        | Attribute        | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Type                         | Default      |
| --------------- | ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------- | ------------ |
| `autoGrow`      | `auto-grow`      | This attribute defines if the control size will grow automatically, to adjust to its content size. If set to `false`, it won't grow automatically and it will show scrollbars if the content overflows. This property is not currently supported in the gx-image-map control.                                                                                                                                                                                                                       | `boolean`                    | `false`      |
| `cssClass`      | `css-class`      | A CSS class to set as the `gx-grid-image-map` element class.                                                                                                                                                                                                                                                                                                                                                                                                                                        | `string`                     | `undefined`  |
| `highlightable` | `highlightable`  | True to highlight control when an action is fired.                                                                                                                                                                                                                                                                                                                                                                                                                                                  | `boolean`                    | `false`      |
| `invisibleMode` | `invisible-mode` | This attribute lets you specify how this element will behave when hidden. \| Value \| Details \| \| ------------ \| --------------------------------------------------------------------------- \| \| `keep-space` \| The element remains in the document flow, and it does occupy space. \| \| `collapse` \| The element is removed form the document flow, and it doesn't occupy space. \|                                                                                                        | `"collapse" \| "keep-space"` | `"collapse"` |
| `loadingState`  | `loading-state`  | Grid loading State. It's purpose is to know rather the Grid Loading animation or the Grid Empty placeholder should be shown. \| Value \| Details \| \| ------------ \| ------------------------------------------------------------------------------------------------ \| \| `loading` \| The grid is waiting the server for the grid data. Grid loading mask will be shown. \| \| `loaded` \| The grid data has been loaded. If the grid has no records, the empty place holder will be shown. \| | `"loaded" \| "loading"`      | `undefined`  |
| `longPressable` | `long-pressable` | True if the control should implement and emit longPress event.                                                                                                                                                                                                                                                                                                                                                                                                                                      | `boolean`                    | `false`      |
| `recordCount`   | `record-count`   | Grid current row count. This property is used in order to be able to re-render the Grid every time the Grid data changes. If not specified, then grid empty and loading placeholders may not work correctly.                                                                                                                                                                                                                                                                                        | `number`                     | `undefined`  |
| `src`           | `src`            | This attribute lets you specify the src of the background image.                                                                                                                                                                                                                                                                                                                                                                                                                                    | `string`                     | `undefined`  |
| `tooltipText`   | `tooltip-text`   | This property lets you specify a user tip that will be displayed as a message on the image map when the mouse is over it. This hint is used to indicate the image map can be zoomed. When the user zooms into the image map for the first time, this hint will no longer be displayed.                                                                                                                                                                                                              | `string`                     | `null`       |

## Events

| Event                        | Description                                                                                            | Type                |
| ---------------------------- | ------------------------------------------------------------------------------------------------------ | ------------------- |
| `gxInfiniteThresholdReached` | This Handler will be called every time grid threshold is reached. Needed for infinite scrolling grids. | `CustomEvent<void>` |
| `gxZoom`                     | Emitted when the element is zoomed in or out.                                                          | `CustomEvent<any>`  |
| `longPress`                  | Emitted when the element is long pressed.                                                              | `CustomEvent<any>`  |

---

_Built with [StencilJS](https://stenciljs.com/)_