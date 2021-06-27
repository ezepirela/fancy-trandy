const HttpError = require('../Models/HttpErrors');
const jwt = require('jsonwebtoken');
module.exports = (req, res, next) => {
    if(req.method === 'OPTIONS'){
       return next();
    }
    try{
        // authorization must be small caps in the req.headers
        const token = req.headers.authorization.split(' ')[1];  
        if(!token){
            throw new Error('Authoritzation failed', 500);
        }
        const decodedToken = jwt.verify(token, 'secret');
        req.userData = {userId: decodedToken.userId};
        next();

    }catch(err){
        const error = new HttpError('You are not authorized. Need to be sign in first', 401);
        return next(error);
    }
    
  
};