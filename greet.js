

// made my function into a variable to 
export default function GreetingsExercise() {
    let userNames = {};
    let greeting;
    let countGreeting = 0;
    let name = '';
    let lang_chosen = '';

    function makeGreet(name1, language) {
        if (name1.match(/^[a-zA-Z]+$/)) {
            name = name1.charAt(0).toUpperCase() + name1.slice(1).toLocaleLowerCase()
            lang_chosen = language;
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

    async function countGreet(dblogic) {
        if (name && lang_chosen) {
            if (userNames[name] === undefined) {
                userNames[name] = 0; // Initialize the count for the name
                countGreeting++; // Increment the count

                // Use the insertValues function from greetingsDb
            await dblogic.insertValues(name)
            .catch((error) => {
                console.error('Error inserting/updating greeting count into database:', error);
            });
            }
            userNames[name] += 1; // Update the count in the userNames object
          
        // Use the updateName function from greetingsDb
        await dblogic.updateName(name, userNames[name])
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

        if (name == '' && language == null) {
            return "Please enter name and select language."
        }
        else if (language == null) {
            return "Language not selected."
        }
     else if (name == '') {
            return "Please enter your name."
        }
       else if (!name.match(/^[a-zA-Z]+$/)) {
            return "Enter alphabetical characters."
        }
    }

    async function reset(dblogic) {
        name = '';
        countGreeting = 0;
        greeting = '';
        userNames = {}; // Clear the userNames object
    // Use the reset function from greetingsDb
    await dblogic.reset()
    }

    return {
        getGreeting,
        countGreet,
        makeGreet,
        errors,
        getNames,
        getValues,
        reset
    }
}
