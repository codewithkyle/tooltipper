# Tooltipper

A lightweight JavaScript library for implementing tooltips.

## NPM Installation

Install via NPM:

```sh
npm i -S tooltipper
```

Unpack the ES Module via [Snowpack](https://www.snowpack.dev/):

```json
"snowpack": {
	"webDependencies": [
		"tooltipper"
	]
}
```

## CDN

```html
<script type="module" src="https://cdn.jsdelivr.net/npm/tooltipper@0.1.0/tooltipper.min.js"></script>
```

## Usage

Create tooltips using the `tooltip` attribute:

```html
<a href="#" aria-label="Edit file" tooltip="Edit file">
    <svg />
</a>
```

Hotreload Tooltips:

```javascript
import { refresh } from "tooltipper";
refresh();
```

## Example CSS

```scss
tool-tip {
    background-color: #424242;
    color: #fff;
    border-radius: 0.125rem;
    line-height: 24px;
    height: 24px;
    white-space: nowrap;
    padding: 0 0.5rem;
    font-size: 0.75rem;
    font-weight: 600;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    pointer-events: none;
    transform-origin: center;

    /* The visible class is applied once the tool-tip element as been appended to the body & positioned correctly */
    &.visible {
        animation: limitedTooltip 1725ms 150ms linear forwards;
    }
}
@keyframes limitedTooltip {
    0% {
        opacity: 1;
    }
    4% {
        opacity: 1;
    }
    96% {
        opacity: 1;
    }
    100% {
        opacity: 0;
        animation-timing-function: ease-in-out;
    }
}
```
