import postcss from 'postcss';

export default postcss.plugin('postcss-short-size', opts => {
	const prefix = 'prefix' in Object(opts) ? `-${opts.prefix}-` : '';
	const skip = 'skip' in Object(opts) ? String(opts.skip) : '*';

	// property pattern
	const sizePropertyRegExp = new RegExp(`^${prefix}((?:max|min)-)?size$`, 'i');

	return root => {
		// for each size declaration
		root.walkDecls(sizePropertyRegExp, decl => {
			// min-max property
			const minmax = decl.prop.match(sizePropertyRegExp)[1] || '';

			// space-separated values (width, height)
			const values = postcss.list.space(decl.value);

			// width is the first value
			let width = values[0];

			// whether the width matches a length or aspect ratio
			const widthLength = width.match(lengthRegExp);
			const widthAspectRatio = width.match(aspectRatioRegExp);

			// height is the second value
			let height = values[1] || values[0];

			// whether the height matches a length or aspect ratio
			const heightLength = height.match(lengthRegExp);
			const heightAspectRatio = height.match(aspectRatioRegExp);

			// conditionally update the width when it is an aspect ratio and the height is a length
			if (widthAspectRatio && heightLength) {
				width = heightLength[1] / widthAspectRatio[2] * widthAspectRatio[1] + heightLength[2];
			}

			// conditionally update the height when it is an aspect ratio and the width is a length
			if (heightAspectRatio && widthLength) {
				height = widthLength[1] / heightAspectRatio[1] * heightAspectRatio[2] + widthLength[2];
			}

			// conditionally create a new width declaration if the width is not a skip token
			if (width !== skip) {
				decl.cloneBefore({
					prop: `${minmax}width`,
					value: width
				});
			}

			// conditionally create a new height declaration if the height is not a skip token
			if (height !== skip) {
				decl.cloneBefore({
					prop: `${minmax}height`,
					value: height
				});
			}

			// remove the original size declaration
			decl.remove();
		});
	};
});

const lengthRegExp = /^([-+]?0|[-+]?[0-9]*\.?[0-9]+)(%|\w+)$/;
const aspectRatioRegExp = /^([-+]?[0-9]*\.?[0-9]+)\/([-+]?[0-9]*\.?[0-9]+)$/;
