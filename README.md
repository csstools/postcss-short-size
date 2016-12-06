# Size Shorthand <a href="https://github.com/postcss/postcss"><img src="https://postcss.github.io/postcss/logo.svg" alt="PostCSS Logo" width="90" height="90" align="right"></a>

[![NPM Version][npm-img]][npm-url]
[![Build Status][cli-img]][cli-url]
[![Licensing][lic-image]][lic-url]
[![Changelog][log-image]][log-url]
[![Gitter Chat][git-image]][git-url]

[Size Shorthand] lets you use `size` properties to represent `width` and `height` in CSS, following the [1-to-2 syntax].

```css
/* before */

.example-1 {
	size: 100px;
}

.example-2 {
	max-size: 400px 300px;
}

/* after */

.example-1 {
	width: 100px;
	height: 100px;
}

.example-2 {
	max-width: 400px;
	max-height: 300px;
}
```

Use an aspect ratio to denote the proportion between width and height.

```css
/* before */

.example-1 {
	size: 16/9 1080px;
}

.example-2 {
	size: 400px 4/3;
}

/* after */

.example-1 {
	width: 1920px;
	height: 1080px;
}

.example-2 {
	width: 400px;
	height: 300px;
}
```

Use a skip token (`*`) to ignore specific lengths.

```css
/* before */

.example-1 {
	min-size: 1em *;
	size: * 2.5em;
}

/* after */

.example-1 {
	min-width: 1em;
	height: 2.5em;
}
```

## Options

#### `prefix`

Type: `String`  
Default: `""`

Adds an optional prefix to the `size` property (e.g. `"x"` for `-x-size`). Wrapping dashes (`-`) are automatically applied.

#### `skip`

Type: `String`  
Default: `"*"`

Specifies the skip token used to ignore a length.

## Usage

Add [Size Shorthand] to your build tool:

```bash
npm install postcss-short-size --save-dev
```

#### Node

```js
require('postcss-short-size').process(YOUR_CSS, { /* options */ });
```

#### PostCSS

Add [PostCSS] to your build tool:

```bash
npm install postcss --save-dev
```

Load [Size Shorthand] as a PostCSS plugin:

```js
postcss([
	require('postcss-short-size')({ /* options */ })
]).process(YOUR_CSS, /* options */);
```

#### Gulp

Add [Gulp PostCSS] to your build tool:

```bash
npm install gulp-postcss --save-dev
```

Enable [Size Shorthand] within your Gulpfile:

```js
var postcss = require('gulp-postcss');

gulp.task('css', function () {
	return gulp.src('./src/*.css').pipe(
		postcss([
			require('postcss-short-size')({ /* options */ })
		])
	).pipe(
		gulp.dest('.')
	);
});
```

#### Grunt

Add [Grunt PostCSS] to your build tool:

```bash
npm install grunt-postcss --save-dev
```

Enable [Size Shorthand] within your Gruntfile:

```js
grunt.loadNpmTasks('grunt-postcss');

grunt.initConfig({
	postcss: {
		options: {
			use: [
				require('postcss-short-size')({ /* options */ })
			]
		},
		dist: {
			src: '*.css'
		}
	}
});
```

[npm-url]: https://www.npmjs.com/package/postcss-short-size
[npm-img]: https://img.shields.io/npm/v/postcss-short-size.svg
[cli-url]: https://travis-ci.org/jonathantneal/postcss-short-size
[cli-img]: https://img.shields.io/travis/jonathantneal/postcss-short-size.svg
[lic-url]: LICENSE.md
[lic-image]: https://img.shields.io/npm/l/postcss-short-size.svg
[log-url]: CHANGELOG.md
[log-image]: https://img.shields.io/badge/changelog-md-blue.svg
[git-url]: https://gitter.im/postcss/postcss
[git-image]: https://img.shields.io/badge/chat-gitter-blue.svg

[Size Shorthand]: https://github.com/jonathantneal/postcss-short-size
[PostCSS]: https://github.com/postcss/postcss
[Gulp PostCSS]: https://github.com/postcss/gulp-postcss
[Grunt PostCSS]: https://github.com/nDmitry/grunt-postcss
[1-to-2 syntax]: https://developer.mozilla.org/en-US/docs/Web/CSS/Shorthand_properties#Tricky_edge_cases
