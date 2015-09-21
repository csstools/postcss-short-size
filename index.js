var postcss = require('postcss');

module.exports = postcss.plugin('postcss-short-size', function (opts) {
	var prefix = opts && opts.prefix ? '-' + opts.prefix + '-' : '';

	return function (css) {
		css.walkDecls(new RegExp('^' + prefix + '(max-|min-)?size$'), function (decl) {
			var name = prefix ? decl.prop.slice(prefix.length, -4) : decl.prop.slice(0, -4);
			var size = postcss.list.space(decl.value);

			if (size.length) {
				if (!size[1]) size[1] = size[0];

				if (size[1] !== '*') decl.cloneAfter({ prop: name + 'height', value: size[1] });
				if (size[0] !== '*') decl.cloneAfter({ prop: name + 'width',  value: size[0] });
			}

			decl.remove();
		});
	};
});
