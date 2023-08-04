import assert from assert;
import GreetingsExercise from "../greet";
import pgPromise from "pg-promise";

const connectPromise = {
    connectionString: 'postgres://asifen:mBANIlUToXYk6YQhwlqX3Um62XLUaZmx@dpg-cj4l5os5kgrc739mq7l0-a.oregon-postgres.render.com/users_db_rymv',
    ssl: { rejectUnauthorized: false }, // this line to enable SSL/TLS with self-signed certificates
};
const pgp = pgPromise();

const db = pgp(connectPromise);

describe('Database Tests', () => {
  before(async () => {   
    //  this.timeout(3000);

    // Run any database setup before the tests start
    await db.none('CREATE TABLE greeting_counts(name VARCHAR(50) PRIMARY KEY, count INT NOT NULL)');
  });

  beforeEach(async () => {
    this.timeout(3000);

    // Run any database setup before each test
    await db.none('TRUNCATE TABLE greeting_counts RESTART IDENTITY');
  });

  it('should insert a new greeting count into the database', async () => {
    this.timeout(3000);
    const greet_instance = GreetingsExercise(db);
    greet_instance.makeGreet('Thando', 'english');
    greet_instance.countGreet();

    const result = await db.one('SELECT count FROM greeting_counts WHERE name = $1', ['Thando']);
    assert.strictEqual(result.count, 1);
  });


after(async () => {
    // this.timeout(3000);

  await db.none('DROP TABLE greeting_counts');
});