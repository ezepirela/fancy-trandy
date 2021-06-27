const 	mongoose 		=	require('mongoose'),
		productModel	=	require('../Models/products'),
		HttpError		=	require('../Models/HttpErrors');
const productsController = {
	createProducts: async (req, res) => {
		const newProduct = await new productModel(product);
		await newProduct.save();
		res.send('product created');
	},
	getProductById: async (req, res, next) => {
		try{
			const product = await productModel.findById({_id: req.params.id});
			res.status(200).send(product);
		}catch(e){
			return next(new HttpError('cant fetch product by id', 404));
		}
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