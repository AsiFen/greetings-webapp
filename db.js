import pgPromise from 'pg-promise';

const connectPostgres = {
    connectionString: 'postgres://asifen:mBANIlUToXYk6YQhwlqX3Um62XLUaZmx@dpg-cj4l5os5kgrc739mq7l0-a.oregon-postgres.render.com/users_db_rymv',
    ssl: { rejectUnauthorized: false }, // this line to enable SSL/TLS with self-signed certificates
};

// Create an instance of the promise
const pgp = pgPromise();

// Link promise module with my postgres URL
const db = pgp(connectPostgres);

//export the database
// Insert a new greeting count into the database
async function insertGreetingCount(name, count) {
    try {
        await db.none('INSERT INTO greeting_counts (name, count) VALUES ($1, $2) ON CONFLICT (name) DO NOTHING', [name, count]);
    } catch (error) {
        console.error('Error inserting greeting count into database:', error);
        throw error;
    }
}

// Update an existing greeting count in the database
async function updateGreetingCount(name) {
    try {
        await db.none('UPDATE greeting_counts SET count = count + 1 WHERE name = $1', [name]);
    } catch (error) {
        console.error('Error updating greeting count in database:', error);
        throw error;
    }
}

export default db;

export { insertGreetingCount, updateGreetingCount };
