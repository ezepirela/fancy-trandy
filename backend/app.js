const   express                 =   require('express'),
        app                     =   express(),
        dotenv                  =   require('dotenv').config(),
        http                    =   require('http'),
        loginRoutes             =   require('./Routes/registration'),
        paymentsRoutes          =   require('./Routes/payment'),
        path                    =   require('path'),
        jwt                     =   require('jsonwebtoken'),
        HttpError               =   require('./Models/HttpErrors'),
        mongoose                =   require('mongoose'),
        passport			          =   require("passport"),
        User                    =   require('./Models/userModel'),
        expressSession		      =   require("express-session"),
        LocalStrategy		        =   require("passport-local").Strategy,
        googleStrategy          =   require('passport-google-oauth20');
const server = http.createServer(app);
const io = require('socket.io')(server , {
  cors: {
    origin: 'http://localhost:3000',
    methods: ["GET", "POST"]
  }
});
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-headers', 
  'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  next();
});
app.use(expressSession({
	secret: "maria es linda",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session()); 
passport.use(new LocalStrategy(User.authenticate()));
passport.use(new googleStrategy({
  clientID: process.env.GOOGLE_CLIENTID,
  clientSecret: process.env.GOOGLE_CLIENTSECRET,
  callbackURL: 'http://127.0.0.1:4000/login/auth/google/redirect'
}, (accessToken, refreshToken, profile, done) => {
  User.findOne({googleID: profile.id}).then(currentUser => {
    if(currentUser){
      done(null, currentUser);
    }else {
      new User({
        googleID: profile.id,
        username: profile.emails[0].value,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName
      }).save().then(newUser => {
        done(null, newUser);
      });
    }
  })
}));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.ai1xb.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('DB  running'))
.catch(error => console.log(error.message));
app.use(express.static(path.join('public')));
app.use('/', paymentsRoutes);
app.use('/login', loginRoutes);
app.get('/login/auth/google/redirect', passport.authenticate('google', {scope: ['profile', 'email']}), (req, res) => {
    let token;
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

    io.in(req.session.socketId).emit('user', {user: req.user, token: token})
    res.end()
});
app.use((req, res) => {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});
app.use((error, req, res, next) => {
    if(res.headerSent){
        return next(error);
    };
    res.json({error: error.message, code: error.code})
})
const host = '127.0.0.1'
server.listen(4000, host,  () => {
  console.log('server running');
})


