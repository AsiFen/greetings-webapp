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

export default db;

