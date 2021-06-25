const stripe = require('stripe')('sk_test_51IQkB1Fsyfu7OQPB72ZyeUnL9qvY8H2z7AxR1WZopMBsbSJC7y6TNmLO9KQtEsUlnyHmIFwibVtPPTHO5rf8TzUS00raKG00oU');
const Order = require('../Models/Orders');
const User	=	require('../Models/userModel');
const controller = {
	getOrders: async (req, res, next) => {
		const {userId} = req.params
		let registeredUser;
		try{
			registeredUser = await User.findById(userId).populate('orders');
		}catch(e){
			console.log(e)
		}
		if(!registeredUser || registeredUser.orders.length < 0){
            return console.log('that user doesnt have orders ');
        }
        const orders = registeredUser.orders.map(order =>({...order.toObject({getters: true}), date: order._id.getTimestamp()}));
        res.json({orders: orders});
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
			console.log('cant create order', + e)
		}
		let registeredUser;
		try{
			registeredUser = await User.findById(user)
		}catch(e){
			console.log(e);
		}
		try{
			registeredUser.orders.push(order);
			await order.save()
			await registeredUser.save()
		}catch(e){
			console.log('cant save the models'+ e)
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
		res.json({sessionId: session.id});
	}
}
module.exports = controller;