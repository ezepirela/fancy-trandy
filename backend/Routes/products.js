const 	express 			= require('express'),
		Router				=	express.Router(),
		productsController	=	require('../Controllers/products');

Router.get('/test', productsController.test);
Router.get('/', productsController.getAllProducts)
Router.post('/', productsController.createProducts);

module.exports = Router;