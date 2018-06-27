const path = require('path');

module.exports = {

	dev: {
		publicPath: '/',
	},

	prod: {
		publicPath: '/mmlpx-todomvc/dist',
		buildOutputPath: path.join(__dirname, '../dist')
	}

};
