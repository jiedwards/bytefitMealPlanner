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


//passport config
require('./config/passport')(passport);

//config for handlebars and path
mongoose.connect('mongodb://localhost/userAccounts');
let db = mongoose.connection;

//Check for DB errors

db.on('error', function(err){
    console.log(err);
})

//Check connection
db.once('open', function(){
    console.log('connected to MongoDB');
})

//Bring in models
let User = require('./db/usersDB')

//ejs
app.use(expressLayouts);
app.set('view engine', 'ejs');

// BodyParser
app.use(express.urlencoded({ extended: false }));

//Express Session 
app.use(
    session({
      secret: 'secret',
      resave: true,
      saveUninitialized: true
    })
  );

  //Passport 
app.use(passport.initialize());
app.use(passport.session());

// Connect Flash
app.use(flash());

//Global Vars
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
}) 

//routes
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));

app.use(express.static(__dirname + '/public'));
app.use("/public", express.static('./public/'));



app.listen(port, () => console.log(`Server listening on port http://127.0.0.1:${port}`));
//commented out in login/reg vid
// app.use(express.static('public'));
// app.use(express.json({ limit: '1mb' }));

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