const 	stripe 		= 	require('stripe')('sk_test_51IQkB1Fsyfu7OQPB72ZyeUnL9qvY8H2z7AxR1WZopMBsbSJC7y6TNmLO9KQtEsUlnyHmIFwibVtPPTHO5rf8TzUS00raKG00oU'),
		Order 		= 	require('../Models/Orders'),
		User		= 	require('../Models/userModel'),
		HttpError	=	require('../Models/HttpErrors');
const controller = {
	getOrders: async (req, res, next) => {
		const {userId} = req.params
		let registeredUser;
		try{
			registeredUser = await User.findById(userId).populate('orders');
		}catch(e){
			return next(new HttpError('orders not found', 404))
		}
		if(!registeredUser || registeredUser.orders.length < 0){
            return next(new HttpError('user not found', 404))
        }
        const orders = registeredUser.orders.map(order =>({...order.toObject({getters: true}), date: order._id.getTimestamp()}));
        res.status(200).json({orders: orders});
	},
	createOrder: async (req, res, next) => {
		const {amount, basket, user} = req.body;
		let order
		try {
			order = await new Order({
			basket, 
			amount,
			user
			});
		}catch(e){
			return next(new HttpError('cant create order', 400 ))
		}
		let registeredUser;
		try{
			registeredUser = await User.findById(user)
		}catch(e){
			return next(new HttpError('user not found', 404))
		}
		try{
			await registeredUser.orders.push(order);
			await order.save()
			await registeredUser.save()
		}catch(e){
			return next(new HttpError('order was not save', 500))
		}
		res.status(201).json({message: 'order created'})
	}, 
	createCheckoutSession : async (req, res, next) => {
		const session = await stripe.checkout.sessions.create({
			payment_method_types: ['card'],
			mode: 'payment',
			line_items: req.body.arrayProp,
			success_url: `${process.env.DB_FRONT_URL}/success`,
    		cancel_url: `${process.env.DB_FRONT_URL}/canceled`,
		});
		res.status(201).json({sessionId: session.id});
	}
}
module.exports = controller;