# PostCSS Short Size [<img src="https://postcss.github.io/postcss/logo.svg" alt="PostCSS" width="90" height="90" align="right">][postcss]

[![NPM Version][npm-img]][npm-url]
[![Build Status][cli-img]][cli-url]
[![Support Chat][git-img]][git-url]

[PostCSS Short Size] lets you use `size` properties to represent `width` and
`height` in CSS, following the [1-to-2 syntax].

```pcss
.image {
  size: 100px;
}

.video {
  max-size: 400px 300px;
}

/* becomes */

.image {
  width: 100px;
  height: 100px;
}

.video {
  max-width: 400px;
  max-height: 300px;
}
```

The supported properties are `size`, `min-size`, and `max-size`.

## Usage

Add [PostCSS Short Size] to your project:

```bash
npm install postcss-short-size --save-dev
```

Use [PostCSS Short Size] to process your CSS:

```js
const postcssShortSize = require('postcss-short-size');

postcssShortSize.process(YOUR_CSS /*, processOptions, pluginOptions */);
```

Or use it as a [PostCSS] plugin:

```js
const postcss = require('postcss');
const postcssShortSize = require('postcss-short-size');

postcss([
  postcssShortSize(/* pluginOptions */)
]).process(YOUR_CSS /*, processOptions */);
```

[PostCSS Short Size] runs in all Node environments, with special instructions for:

| [Node](INSTALL.md#node) | [PostCSS CLI](INSTALL.md#postcss-cli) | [Webpack](INSTALL.md#webpack) | [Create React App](INSTALL.md#create-react-app) | [Gulp](INSTALL.md#gulp) | [Grunt](INSTALL.md#grunt) |
| --- | --- | --- | --- | --- | --- |

## Options

#### prefix

The `prefix` option defines a prefix required by properties being transformed.
Wrapping dashes are automatically applied, so that `x` would transform
`-x-margin`.

```js
postcssShortSize({ prefix: 'x' });
```

```pcss
.image {
  x-size: 100px;
}

/* becomes */

.image {
  width: 100px;
  height: 100px;
}
```

#### skip

The `skip` option defines the skip token used to ignore portions of the
shorthand.

```js
postcssShortSize({ skip: '-' });
```

```pcss
.image {
  size: - 100px;
}

/* becomes */

.image {
  height: 100px;
}
```

[cli-img]: https://img.shields.io/travis/jonathantneal/postcss-short-size.svg
[cli-url]: https://travis-ci.org/jonathantneal/postcss-short-size
[git-img]: https://img.shields.io/badge/support-chat-blue.svg
[git-url]: https://gitter.im/postcss/postcss
[npm-img]: https://img.shields.io/npm/v/postcss-short-size.svg
[npm-url]: https://www.npmjs.com/package/postcss-short-size

[1-to-2 syntax]: https://developer.mozilla.org/en-US/docs/Web/CSS/Shorthand_properties#Tricky_edge_cases
[PostCSS]: https://github.com/postcss/postcss
[PostCSS Short Size]: https://github.com/jonathantneal/postcss-short-size
