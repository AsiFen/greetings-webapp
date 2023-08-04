import pgPromise from 'pg-promise';

const connectPromise = {
  connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }, // this line to enable SSL/TLS with self-signed certificates
};

const pgp = pgPromise();

const db = pgp(connectPromise);
//export the database

export default db;

