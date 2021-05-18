var express     =   require("express"),
	routes 	    =   express.Router(),
    controller  =   require('../Controllers/registration');    
routes.post('/registrate', controller.signUp);
routes.post('/inicio', controller.login);
routes.get('/inicioGoogle', controller.addSocketIdToSession, controller.loginGoogle);
// routes.get('/auth/google/redirect', controller.redirect)
module.exports = routes;