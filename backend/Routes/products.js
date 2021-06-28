const 	express 			= require('express'),
		Router				=	express.Router(),
		productsController	=	require('../Controllers/products');

Router.get('/', productsController.getAllProducts);
Router.get('/:id', productsController.getProductById);

module.exports = Router;