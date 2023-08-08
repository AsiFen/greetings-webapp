// create factory function that will handle the name and count variables I used in my table greetings.
// the function takes in the db as a parameter
//all functions are asynchronous 
//functions to start of with
// - get all my my current names and their tally function
// - get count / tally for a specific names
// - insert names into my database using the make greeting function
// -update the names as well as their counts 
// - delete the db for my reset button

export default function Greetings(db) {

    async function getAll() {
        const all_data = await db.any('SELECT * FROM greeting')
        return all_data;
    }

    async function getName(nameGreeted) {
        const result = await db.oneOrNone('SELECT * FROM greeting WHERE name = $1', [nameGreeted]);
        return result
    }
    
    async function reset() {
        const cleared = await db.none('DELETE FROM greeting')
        return cleared;
    }

    async function insertValues(usersName) {
        try {
            await db.none('INSERT INTO greeting (name, count) VALUES($1, 1) ON CONFLICT (name) DO UPDATE SET count = greeting.count + 1', [usersName]);
        } catch (error) {
            console.error('Error inserting greeting data:', error);
        }
    }

    async function updateName(username, usercount) {
        const result = await db.none('UPDATE greeting SET count = $2 WHERE name = $1', [username, usercount]);
        return result;
    }

    async function getCount(username) {
        const result = await db.oneOrNone('SELECT count FROM greeting WHERE name =$1', [username])
        return count;
    }

    return {
        getAll,
        getName,
        getCount,
        reset,
        insertValues,
        updateName
    }
}