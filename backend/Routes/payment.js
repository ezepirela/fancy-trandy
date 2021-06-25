const express = require('express');
const Router = express.Router();
const controller = require('../Controllers/payment');
const checkAuth = require('../Middleware/check-auth');
Router.get('/payments/orders/:userId', controller.getOrders);
Router.post('/payments/orders', checkAuth, controller.createOrder);
Router.post('/create-checkout-session',checkAuth, controller.createCheckoutSession)
module.exports = Router;