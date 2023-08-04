import assert from 'assert';
import GreetingsExercise from "../greet.js";
import pgPromise from "pg-promise";
import dotenv from 'dotenv';

dotenv.config();

const connectionString = process.env.DATABASE_URL

const pgp = pgPromise();

const db = pgp(connectionString);

describe('Database Tests For Greetings WebApp', () => {

  it('should insert a new greeting count into the database', async () => {
    this.timeout(10000);
    const greet_instance = GreetingsExercise(db);
    greet_instance.makeGreet('Thando', 'english');
    greet_instance.countGreet();

    const result = await db.any('SELECT * FROM greeting_counts WHERE name = $1', ['Thando']);
    console.log(result);
    assert.strictEqual(result.count, 1);
  });
});
