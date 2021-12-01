# Tooltipper

A lightweight (750 byte) JavaScript library for implementing tooltips.

## Installation

Install via NPM:

```sh
npm i -S tooltipper
```

Install via CDN:

```html
<script type="module" src="https://unpkg.com/tooltipper@1/tooltipper.min.mjs"></script>
<script defer src="https://unpkg.com/tooltipper@1/tooltipper.min.js"></script>
```

## Usage

Create tooltips using the `tooltip` attribute:

```html
<a href="#" tooltip="Edit file">
    <svg />
</a>
```

Create tooltips by adding the `tooltip` attribute to an element with an `aria-label` attribute:

```html
<a href="#" aria-label="Edit file" tooltip>
    <svg />
</a>
```

> **Please note** that tooltipper is an unopinionated library. All we aim to do is create, track, and remove custom `<tool-tip>` elements within the DOM. You are responsible for providing the CSS.

## Example SCSS

[Click here](https://codewithkyle.github.io/tooltipper/) to view the example.

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
