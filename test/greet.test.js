import assert from 'assert';
import db from '../db.js';
import GreetingsExercise from "../greet.js";

console.log(process.env.DATABASE_URL);
// console.log(db.one('SELECT * FROM greeting_counts'))
dotenv.config();

// import db from '../db.js';
const connectPromise = {
  connectionString: process.env.DATABASE_URL,
    ssl: true
    // this line to enable SSL/TLS with self-signed certificates
};

const pgp = pgPromise();

const db = pgp(connectPromise);

describe('Database Tests For Greetings WebApp', () => {
  // this.timeout(10000);

  // beforeEach(async () => {
  //   await db.none("TRUNCATE TABLE greeting_counts RESTART IDENTITY CASCADE;");

  // });

  it('should insert a new greeting count into the database', async() => {
    // this.timeout(10000)
    const greet_instance = GreetingsExercise(db);
    greet_instance.makeGreet('silili', 'english');
    greet_instance.countGreet();

    const result = await db.one('SELECT * FROM greeting_counts');

    console.log(result);

    // Compare the value of 'result.count' directly to the expected value

    // assert.strictoutputEqual(result, 2);

    // done();
  });

});
