module.exports = {
	'postcss-short-size': {
		'basic': {
			message: 'supports basic usage'
		},
		'basic:w-prefix': {
			message: 'ignores basic usage when { prefix: "x" }',
			options: {
				prefix: 'x'
			}
		},
		'prefix': {
			message: 'ignores prefix usage'
		},
		'prefix:w-prefix': {
			message: 'supports prefix usage when { prefix: "x" }',
			options: {
				prefix: 'x'
			}
		},
		'skipped': {
			message: 'supports skip tokens'
		}
	}
};
