// tooling
const postcss = require('postcss');

// length matcher
const lengthRE = /^([-+]?0|[-+]?[0-9]*\.?[0-9]+)(%|\w+)$/;

// aspect ratio matcher
const aspectRatioRE = /^([-+]?[0-9]*\.?[0-9]+)\/([-+]?[0-9]*\.?[0-9]+)$/;

// plugin
module.exports = postcss.plugin('postcss-short-size', ({
	prefix = '',
	skip   = '*'
}) => {
	// dashed prefix
	const dashedPrefix = prefix ? '-' + prefix + '-' : '';

	// property pattern
	const propertyMatch = new RegExp(`^${ dashedPrefix }(max-|min-)?size$`);

	return (css) => {
		// walk each matching declaration
		css.walkDecls(propertyMatch, (decl) => {
			// min-max property
			const minmax = decl.prop.match(propertyMatch)[1] || '';

			// space-separated values (width, height)
			const values = postcss.list.space(decl.value);

			// width is the first value
			let width = values[0];

			// whether the width matches a length or aspect ratio
			const widthLength = width.match(lengthRE);
			const widthAspectRatio = width.match(aspectRatioRE);

			// height is the second value
			let height = values[1] || values[0];

			// whether the height matches a length or aspect ratio
			const heightLength = height.match(lengthRE);
			const heightAspectRatio = height.match(aspectRatioRE);

			// if the width is an aspect ratio and the height is a length
			if (widthAspectRatio && heightLength) {
				// update the width
				width = heightLength[1] / widthAspectRatio[2] * widthAspectRatio[1] + heightLength[2];
			}

			// if the height is an aspect ratio and the width is a length
			if (heightAspectRatio && widthLength) {
				// update the height
				height = widthLength[1] / heightAspectRatio[1] * heightAspectRatio[2] + widthLength[2];
			}

			// if the width is not a skip token
			if (width !== skip) {
				// create a new declaration for the width
				decl.cloneBefore({
					prop:  minmax + 'width',
					value: width
				});
			}

			// if the height is not a skip token
			if (height !== skip) {
				// create a new declaration for the height
				decl.cloneBefore({
					prop:  minmax + 'height',
					value: height
				});
			}

			// remove the original size declaration
			decl.remove();
		});
	};
});
