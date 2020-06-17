# Tooltipper

A lightweight JavaScript library for implementing tooltips.

## Installation

### NPM

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

### CDN

```html
<script type="module" src="https://cdn.jsdelivr.net/npm/tooltipper@0.1.0/tooltipper.min.js">
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
