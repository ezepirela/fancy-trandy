const   User        =   require('../Models/userModel'),
        passport    =   require("passport"),
        jwt         =   require('jsonwebtoken'),
        HttpError   =   require('../Models/HttpErrors');
        const   express         =   require('express'),
        http                    =   require('http'),
        app                     =   express();
        const server = http.createServer(app);
const io = require('socket.io')(server , {
  cors: {
    origin: 'http://localhost:3000',
    methods: ["GET", "POST"]
  }
});
const controller = {
    addSocketIdToSession:  (req, res, next) => {
        req.session.socketId = req.query.socketId
        next()
    },
    signUp: async (req, res, next) => {
        const {username, password, firstName, lastName} = req.body;
        const newUser = {
            username,
            firstName,
            lastName
        };
        let user;
        let token
        try {
            user = await User.register(newUser, password);
        } catch (e) {
           return next(new HttpError(`${e.message}`, 500))
        }
        passport.authenticate("local")(req, res, function(){
            try{
                token = jwt.sign(
                    {
                    userId: user._id, email: user.username
                    }, "secret", {expiresIn: '1h' }
                );
            }
            catch(e){
                return next (new HttpError('token failed', 500));
            }
            res.json({user: user, token: token});
        });
    },
    login: async (req, res, next) => {
        let token;
        let user;
        const {username} = req.body
        try {
            user = await User.findOne({username:username})
        }catch(e){
            return next(new HttpError('cannot find the user', 500))
        }
            passport.authenticate("local")(req, res, function(){
            try{
                token = jwt.sign(
                    {
                    userId: user.id, email: req.user.username
                    }, "secret", {expiresIn: '1h' }
                );
            }
            catch(e){
                return next (new HttpError('credentials wrong', 500));
            }
             res.json({user: user, token: token});
        });
    },
    loginGoogle: async (req, res, next) => {
        console.log('handled1');
        passport.authenticate('google', {scope: ['profile', 'email']})(req, res, function(){
            console.log('first');
        });
    },
    redirect: async (req, res, next)=> {
        console.log('redirect')
        passport.authenticate('google', {scope: ['profile', 'email']})(req, res, function(){
            console.log('redirect loged')
            try{
                token = jwt.sign(
                    {
                    userId: req.user.id, email: req.user.username
                    }, "secret", {expiresIn: '1h' }
                );
            }
            catch(e){
                return next (new HttpError('credentials wrong', 500));
            }
            console.log(req.user);
            io.in(req.session.socketId).emit('user', req.user)
            res.end()
        });
    }
}
module.exports = controller;