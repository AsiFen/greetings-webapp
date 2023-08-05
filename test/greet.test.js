import assert from 'assert';
import GreetingsExercise from "../greet.js";
import pgPromise from "pg-promise";
import dotenv from 'dotenv';

dotenv.config();

// import db from '../db.js';
const connectPromise = {
  connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }, // this line to enable SSL/TLS with self-signed certificates
};

const pgp = pgPromise();

const db = pgp(connectPromise);

describe('Database Tests For Greetings WebApp', () => {

  it('should insert a new greeting count into the database', async () => {
    // this.timeout(10000)
    const greet_instance = GreetingsExercise(db);
    greet_instance.makeGreet('Khrozanti', 'english');
    greet_instance.countGreet();

    const result = await db.one('SELECT count FROM greeting_counts WHERE name = $1', ['Khrozanti']);
    console.log(result);

    // Compare the value of 'result.count' directly to the expected value
    assert.strictEqual(result.count, 1);

    // done();
  });

});
