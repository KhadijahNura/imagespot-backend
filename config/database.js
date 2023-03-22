import * as dotenv from 'dotenv';
import mysql from 'mysql';
dotenv.config();

// create the connection to database

const db = mysql.createPool({
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
});

export default db;
