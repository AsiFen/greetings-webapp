import assert from assert;
import GreetingsExercise from "../greet";
import pgPromise from "pg-promise";

const connectPromise = process.env.DATABASE_URL || 'postgres://asifen:mBANIlUToXYk6YQhwlqX3Um62XLUaZmx@dpg-cj4l5os5kgrc739mq7l0-a.oregon-postgres.render.com/users_db_rymv';

const pgp = pgPromise();

const db = pgp(connectPromise);

describe("The basic database web app", function () {
    beforeEach(async function () {
        try {
            // clean the tables before each test run
            await db.none("TRUNCATE TABLE products RESTART IDENTITY CASCADE;");
            await db.none("TRUNCATE TABLE categories RESTART IDENTITY CASCADE;");
        } catch (err) {
            console.log(err);
            throw err;
        }
    });
});
