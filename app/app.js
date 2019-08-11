const express = require('express');
// nedb is a lightweight mongodb
const Datastore = require('nedb');
const app = express();
const port = 4444;
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const hbs = require('express-handlebars');
var path = require('path');

//passport config
require('./config/passport')(passport);

//config for handlebars and path
mongoose.connect('mongodb://localhost/byteFit');
let db = mongoose.connection;

//Check for DB errors
db.on('error', function (err) {
    console.log(err);
})

//Check connection
db.once('open', function () {
    console.log('connected to MongoDB');
})

//Bring in models (user schema's)
let User = require('./db/usersDB');
let Food = require('./db/foodDB');

//express layouts, described in more detail on layouts view.
app.engine('ejs', require('ejs-locals'));
app.set('views', __dirname + '/views');
// app.use(expressLayouts);
app.set('view engine', 'ejs');

// BodyParser
app.use(express.urlencoded({
    extended: false
}));

//Express Session 
app.use(
    session({
        secret: 'secret',
        resave: true,
        saveUninitialized: true
    })
);


//Passport initialises the session for the User.
app.use(passport.initialize());
app.use(passport.session());

// Connect Flash
app.use(flash());

//Global Vars - Allows popup messages to occur with relevant information.
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
})

//Initialises the URL routes declared in the routes folder.
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));
app.use('/foods', require('./routes/foods'));

app.use(express.static(__dirname + '/public'));
app.use("/public", express.static('./public/'));

//checks whether a user is logged in
app.use(function (req, res, next) {
    res.locals.login = req.isAuthenticated();
    next();
});



app.listen(port, () => console.log(`Server listening on port http://127.0.0.1:${port}`));

// nedb's recommended way to define a database
const database = new Datastore('db/users.db');

// if the database doesnt exist, this function will create it.
database.loadDatabase();

// Set up the api, /api will be used for now.
app.post('/api', (request, response) => {
    // Get the body of the request, this is from calorie_calc.js and will contain a UUID and an integer.
    const data = request.body;
    const timestamp = Date.now();
    // add the timestamp to the data
    data.timestamp = timestamp;
    // Respond to the get request and send another object containing the status, uuid and result. This is just a placeholder and sends it back to the client. From here, it will be added into a database. This database will be
    // where the users are stored. 

    // add it to the database
    database.insert(data);

    // similarly to calorie_calc.js, this just returns it to the clientside. may not be useful.
    response.json({
        status: 'success',
        timestamp: data.timestamp,
        user: data.uuid,
        calories: data.calories,
        num_meals: data.num_meals
    });
});