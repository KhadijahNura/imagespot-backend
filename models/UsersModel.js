// import the database connection
import db from '../config/database.js';

// create table
export const createUsersTable = () => {
  db.query(
    `
  CREATE TABLE IF NOT EXISTS users (
    id int NOT NULL AUTO_INCREMENT,
    username varchar(30) UNIQUE NOT NULL,
    password varchar(500) NOT NULL,

    PRIMARY KEY (id)
  );`,
    () => console.log('Users table created successfully')
  );
};

// get all users
export const getUsers = () => {
  const text = 'SELECT * FROM users';

  return new Promise((resolve, reject) => {
    db.query(text, values, (err, res, _) => {
      if (err) reject(err);
      else resolve(res);
    });
  });
};

// get single user by ID
export const getUserById = (id) => {
  const text = 'SELECT * FROM users WHERE id = ?';
  const values = [id];

  return new Promise((resolve, reject) => {
    db.query(text, values, (err, res, _) => {
      if (err) reject(err);
      else resolve(res[0]);
    });
  });
};

// get single user by Username
export const getUserByUsername = (username) => {
  const text = 'SELECT * FROM users WHERE username = ?';
  const values = [username];

  return new Promise((resolve, reject) => {
    db.query(text, values, (err, res, _) => {
      if (err) reject(err);
      else resolve(res[0]);
    });
  });
};

// insert user into database
export const insertUser = async (data) => {
  const text = 'INSERT INTO users(username, password) VALUES(?, ?)';
  const values = [data.username, data.password];

  return new Promise((resolve, reject) => {
    db.query(text, values, async (err, res, _) => {
      if (err) reject(err);
      else {
        try {
          const response = await getUserById(res.insertId);
          resolve(response);
        } catch (err) {
          reject(err);
        }
      }
    });
  });
};
