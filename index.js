// setting up a server using express module written in es6

// importing the modules 
import express from 'express'
import GreetingsExercise from './greet.js'
import exphbs from 'express-handlebars'
import bodyParser from 'body-parser';
//flash - still don't know what it does. How is different to normal templating?
import flash from 'express-flash';
import session from 'express-session';
//import my db 
import db from './db.js';
import Greetings from './db/db-logic.js';

//import routes
import indexRoute from './routes/route_index.js';
import greetedRoute from './routes/route_greet.js';
import counterRoute from './routes/route_counter.js';

// instantiate db logic ff Greetings
let dblogic = Greetings(db);
//creating an instance of the epxress module
let app = express()
//create an instance of my greetings function imported as module
let greet_instance = GreetingsExercise()

//configuring the handlebars module
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');
// app.set('views', './views');

//instantiate the routes
let index_route = indexRoute(greet_instance, dblogic);
let greeted_route = greetedRoute(greet_instance);
let counter_route = counterRoute(greet_instance);

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

//

// Test route to select data from the 'greetings' table
app.get('/test', async (req, res) => {
    try {
        // Replace 'greetings' with the name of your table
        const result = await db.any('DELETE FROM greeting');
        res.json(result);
    } catch (error) {
        console.error('Error executing query:', error);
        res.status(500).json({ error: 'Failed to retrieve data from the database.' });
    }
});

//root directory
//displays greetings index page 
app.get('/', index_route.make_greeting);
app.post('/', index_route.reset)
//creates greetings and error messages
app.post('/greetings', greeted_route.showGreeting);
//display list of all users that have been greeted 
app.get('/greeted', greeted_route.get_names);
//display for each use show many times they have been greeted
app.get('/counter/:users_name', counter_route.get_counter)
//reset the db
app.post('/reset', index_route.reset)
//process the enviroment the port is running on
let PORT = process.env.PORT || 3005;
//listen on te port 
app.listen(PORT, () => {
    console.log('App started...', PORT);
})

