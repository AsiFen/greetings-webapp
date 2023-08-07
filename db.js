import pgPromise from 'pg-promise';
import 'dotenv/config';

const connectPromise = {
    connectionString: process.env.DATABASE_URL,
    ssl: {rejectUnauthorized: false},
    ssl : false

};

const db = pgPromise()(connectPromise);
db.connect() .then(result =>{
    console.log(result);
})
.catch(error =>{
    console.log(error);
})
//export the database
export default db;

