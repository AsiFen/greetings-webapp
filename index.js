// setting up a server using express module written in es6

// importing the modules 
import express from 'express'
import Greetings from './greet.js'
import exphbs from 'express-handlebars'
import bodyParser from 'body-parser';
//flash - still don't know what it does. How is different to normal templating?
import flash from 'express-flash';
import session from 'express-session';

import db from './db.js';

//creating an instance of the epxress module
let app = express()
//create an instance of my greetings function imported as module
let greet_instance = Greetings(db)

//configuring the handlebars module
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');
// app.set('views', './views');


// initialise session middleware - flash-express depends on it
app.use(session({
    secret: "<add a secret string here>",
    resave: false,
    saveUninitialized: true
}));

// initialise the flash middleware
app.use(flash());

// This ensures form variables can be read from the req.body variable
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

//built-in static middleware from ExpressJS to use static resources
app.use(express.static('public'))

//root directory
//displays greetings index page 
app.get('/', (req, res) => {
    const error_message = req.flash('errorDisplay')[0]
    res.render('index', {
        theGreeting: greet_instance.getGreeting(),
        counter: greet_instance.countGreet(),
        error_messages: error_message
    })
})

//creates greetings and error messages
app.post('/greetings', (req, res) => {
    greet_instance.makeGreet(req.body.nameInput, req.body.language)
    const errorMessages = greet_instance.errors(req.body.nameInput, req.body.language)
    req.flash('errorDisplay', errorMessages)
    //redirects you to the home route when done sending in parameters
    res.redirect('/')

})

//display list of all users that have been greeted 
app.get('/greeted', (req, res) => {
    res.render('greeted', {
        usernames: greet_instance.getNames()
    })
    // res.redirect('/')
})

app.get('/counter/:users_name', (req, res) => {
    const users_name = req.params.users_name;
    // const names = greet_instance.getNames();
    // console.log(names); // Output: ["John", "Jane", "Peter"]

    // names.forEach((name) => {
    const count = greet_instance.getValues(users_name);
    //   console.log(`${name}: ${count}`);
    // });
    res.render('counter', {
        username: users_name,
        userCount: count
    })
})
//process the enviroment the port is running on
let PORT = process.env.PORT || 3005;

app.listen(PORT, () => {
    console.log('App started...', PORT);
})

