//import database
import db from './db.js';

// made my function into a variable to 
export default function GreetingsExercise(db) {
    let userNames = {};
    let greeting;
    let countGreeting = 0;
    let name = '';

    function makeGreet(name1, language) {
        if (name1.match(/^[a-zA-Z]+$/)) {
            name = name1.charAt(0).toUpperCase() + name1.slice(1).toLocaleLowerCase()
            if (language == 'english') {
                greeting = 'Hello, ' + name
            }
            if (language == 'swahili') {
                greeting = 'Jambo, ' + name
            }
            if (language == 'isiXhosa') {
                greeting = 'Molo, ' + name
            }
        }

    }

    function getGreeting() {
        return greeting

    }

   function countGreet() {
    if (name) {
        if (userNames[name] === undefined) {
            userNames[name] = 0;
            countGreeting++;
            // Insert new row with initial count of 1
            db.none('INSERT INTO greeting(name, count) VALUES($1, 1) ON CONFLICT (name) DO UPDATE SET count = greeting.count + 1', [name])
                .catch((error) => {
                    console.error('Error inserting/updating greeting count into database:', error);
                });
        }
        userNames[name] += 1;
        // Update the count using 'SET count = count + 1'
        db.none('UPDATE greeting SET count = count + 1 WHERE name = $1', [name])
            .catch((error) => {
                console.error('Error updating greeting count in database:', error);
            });
        return countGreeting;
    } else {
        countGreeting += 0;
        return countGreeting;
    }
}


    function getNames() {
        let users_name = Object.keys(userNames)
        return users_name
    }
    function getValues(username) {
        let userCount = userNames[username]
        return userCount;
    }

    function errors(name, language) {
        if (!name.match(/^[a-zA-Z]+$/)) {
            return 'Enter alphabetical characters'
        }
        if (name == '' && language == null) {
            return "Please enter name and select language."
        }
        if (language == null) {
            return "Language not selected."
        }
        if (name == '') {
            return "Please enter your name."
        }
    }

   function reset(){
        db.none('DELETE * FROM greeting', [name])
        .catch((error) => {
            console.error('Error deleting greeting in database:', error);
        });
    }

    return {
        reset,
        getGreeting,
        countGreet,
        makeGreet,
        errors,
        getNames,
        getValues
    }
}
