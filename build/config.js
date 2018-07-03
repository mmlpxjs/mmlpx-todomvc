const path = require('path');

module.exports = {

	dev: {
		publicPath: '/',
	},

	prod: {
		publicPath: '/mmlpx-todomvc',
		buildOutputPath: path.join(__dirname, '../docs')
	}

};
