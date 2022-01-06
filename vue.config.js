const path = require('path')

module.exports = {
	publicPath: '/servicios/citas',
	configureWebpack: {
		resolve: {
			alias: {
				'@': path.resolve(__dirname, './src')
			}
		}
	}
}