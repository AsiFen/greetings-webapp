///checking if env is set or not 
import dotenv from 'dotenv';

dotenv.config();

if (process.env.DATABASE_URL) {
  console.log('DATABASE_URL is set:');
} else {
  console.log('DATABASE_URL is not set.');
}
