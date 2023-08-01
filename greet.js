// made my function into a variable to 
export default
    function GreetingsExercise() {
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
                userNames[name] = 0; // Initialize the count for the name
                countGreeting++; // Increment the count
            }
            userNames[name] += 1; // Update the count in the userNames object
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
        if (language == null) {
            return "Language not selected."
        }
        if (name == '') {
            return "Please enter your name."
        }

    }

    return {
        getGreeting,
        countGreet,
        makeGreet,
        errors,
        getNames,
        getValues
    }
}
