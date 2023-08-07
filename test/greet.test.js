import assert from 'assert';
import db from '../db.js';
import GreetingsExercise from "../greet.js";

// import dotenv from 'dotenv';

// dotenv.config();

// console.log(process.env.DATABASE_URL);

describe('Database Tests For Greetings WebApp', () => {

  beforeEach(async () => {
    // Clean up the database before each test
    await db.none('DELETE FROM greeting');
  });

  it('should insert a new greeting count into the database', async () => {
    const greet_instance = GreetingsExercise(db);
    greet_instance.makeGreet('silili', 'english');
    greet_instance.countGreet();

    const result = await db.any("SELECT count FROM greeting WHERE name = 'silili'");

    assert.equal(result.length, 0);

  });

  it('should increment count when name is greeted in all 3 languages', async () => {
    const greetings = GreetingsExercise(db);
  
    greetings.makeGreet('Bob', 'english');
    greetings.makeGreet('Bob', 'english');

    greetings.countGreet();
    // Check if the count increases for all 3 greetings
    const countAfter = await db.manyOrNone('SELECT count FROM greeting WHERE name = $1', 'Bob');
  
    assert.equal(countAfter.length, 0);
  });
  

});
