// test/sqlCommands.test.js

import { insertGreetingCount, updateGreetingCount } from '../db.js';
import assert from 'assert';
import pgPromise from 'pg-promise';

const connectPostgresTest = {
    // connectionString: 'postgres://asifen:mBANIlUToXYk6YQhwlqX3Um62XLUaZmx@dpg-cj4l5os5kgrc739mq7l0-a.oregon-postgres.render.com/users_db_rymv',
    ssl: false, // If your test database doesn't use SSL
};

const pgpTest = pgPromise();
const dbTest = pgpTest(connectPostgresTest);
// test/asyncFunctions.test.js

describe('Async/Await Functions Tests', () => {
    it('should insert a new greeting count into the database', async () => {
        // Use a mock database connection for testing
        // For example, you can use the 'pg-promise' mock: https://github.com/vitaly-t/pg-promise/blob/master/test/mock/db.js

        // Call the insertGreetingCount function with the mock database connection
        await insertGreetingCount('John', 0, dbTest);

        // Check if the greeting count was inserted correctly
        assert.strictEqual(dbTest.executedQueries[0].text, 'INSERT INTO greeting_counts (name, count) VALUES ($1, $2) ON CONFLICT (name) DO NOTHING');
        assert.deepStrictEqual(dbTest.executedQueries[0].values, ['John', 0]);
    });

    it('should update an existing greeting count in the database', async () => {
        // Use a mock database connection for testing
        // For example, you can use the 'pg-promise' mock: https://github.com/vitaly-t/pg-promise/blob/master/test/mock/db.js

        // Call the updateGreetingCount function with the mock database connection
        await updateGreetingCount('John', dbTest);

        // Check if the greeting count was updated correctly
        assert.strictEqual(dbTest.executedQueries[0].text, 'UPDATE greeting_counts SET count = count + 1 WHERE name = $1');
        assert.deepStrictEqual(dbTest.executedQueries[0].values, ['John']);
    });

    // Add more test cases for the async/await functions...

});
