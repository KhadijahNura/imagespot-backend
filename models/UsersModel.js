// import db related functions
import { createNewConnection, releaseConnection } from '../config/database.js';

// create table
export const createUsersTable = async () => {
  const conn = await createNewConnection();

  conn.query(
    `
  CREATE TABLE IF NOT EXISTS users (
    id int NOT NULL AUTO_INCREMENT,
    username varchar(30) UNIQUE NOT NULL,
    password varchar(500) NOT NULL,

    PRIMARY KEY (id)
  );`,
    () => {
      releaseConnection(conn);
      console.log('Users table created successfully');
    }
  );
};

// get all users
export const getUsers = async () => {
  const text = 'SELECT * FROM users';

  const conn = await createNewConnection();

  return new Promise((resolve, reject) => {
    conn.query(text, values, (err, res, _) => {
      releaseConnection(conn);

      if (err) reject(err);
      else resolve(res);
    });
  });
};

// get single user by ID
export const getUserById = async (id) => {
  const text = 'SELECT * FROM users WHERE id = ?';
  const values = [id];

  const conn = await createNewConnection();

  return new Promise((resolve, reject) => {
    conn.query(text, values, (err, res, _) => {
      releaseConnection(conn);

      if (err) reject(err);
      else resolve(res[0]);
    });
  });
};

// get single user by Username
export const getUserByUsername = async (username) => {
  const text = 'SELECT * FROM users WHERE username = ?';
  const values = [username];

  const conn = await createNewConnection();

  return new Promise((resolve, reject) => {
    conn.query(text, values, (err, res, _) => {
      releaseConnection(conn);

      if (err) reject(err);
      else resolve(res[0]);
    });
  });
};

// insert user into database
export const insertUser = async (data) => {
  const text = 'INSERT INTO users(username, password) VALUES(?, ?)';
  const values = [data.username, data.password];

  const conn = await createNewConnection();

  return new Promise((resolve, reject) => {
    conn.query(text, values, async (err, res, _) => {
      if (err) reject(err);
      else {
        try {
          const response = await getUserById(res.insertId);
          resolve(response);
        } catch (err) {
          reject(err);
        } finally {
          releaseConnection(conn);
        }
      }
    });
  });
};
