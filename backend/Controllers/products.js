const 	mongoose 		=	require('mongoose'),
		productModel	=	require('../Models/products'),
		HttpError		=	require('../Models/HttpErrors');

const product = {
	title: 'Set de Labiales',
	price: 22,
	description: 'hermoso set de labiales de Huda Beauty colores pastel',
	image: 'https://janireviguri.com/wp-content/uploads/2019/03/labialesHuda.png'
}
const productsController = {
	test: (req, res) => {
		res.send('route works');
	}, 
	createProducts: async (req, res) => {
		const newProduct = await new productModel(product);
		await newProduct.save();
		res.send('product created');
	},
	getAllProducts: async (req, res, next) => {
		try {
			const allProducts = await productModel.find({});
			res.status(200).send({products: allProducts});
		}catch(e){
			return next(new HttpError('cant fetch products', 404));
		}
	}
}
module.exports = productsController;