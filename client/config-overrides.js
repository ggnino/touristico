const { config } = require('dotenv');
const webpack = require('webpack');

module.exports = function override(config) {
	const fallback = config.resolve.fallback || {};
	Object.assign(fallback, {
		crypto: require.resolve('crypto-browserify'),
		stream: require.resolve('stream-browserify'),
		assert: require.resolve('assert'),
		http: require.resolve('stream-http'),
		https: require.resolve('https-browserify'),
		os: require.resolve('os-browserify'),
		path: require.resolve('path-browserify'),
		url: require.resolve('url'),
		zlib: require.resolve('browserify-zlib'),
		fs: require.resolve('browserify-fs'),
		net: require.resolve('net-browserify'),
	});

	config.resolve.fallback = fallback;
	config.plugins = (config.plugins || []).concat([
		new webpack.ProvidePlugin({
			process: 'process/browser',
			Buffer: ['buffer', 'Buffer'],
		}),
	]);

	// config.watchOptions.ignored = ['./public/imgs'];
	console.log(config);
	// config.target = 'node';
	// config.externals = [{ express: { commonjs: 'express' } }];
	return config;
};
