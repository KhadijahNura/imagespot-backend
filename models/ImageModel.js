// import the database connection
import db from '../config/database.js';

// importing db related functions
import { createNewConnection, releaseConnection } from '../config/database.js';

// create table
export const createImagesTable = () => {
  createNewConnection();

  db.query(
    `
  CREATE TABLE IF NOT EXISTS images (
    id int NOT NULL AUTO_INCREMENT,
    author int NOT NULL,
    description varchar(300),
    image_url varchar(100) NOT NULL,

    PRIMARY KEY (id),
    FOREIGN KEY (author) REFERENCES users(id)
  );
  `,
    () => {
      console.log('Images table created successfully');
      releaseConnection();
    }
  );
};

// get all images
export const getImages = async () => {
  const text = 'SELECT * FROM images';

  createNewConnection();

  return new Promise((resolve, reject) => {
    db.query(text, (err, res, _) => {
      releaseConnection();

      if (err) reject(err);
      else resolve(res);
    });
  });
};

// get single image
export const getImageById = async (id) => {
  const text = 'SELECT * FROM images WHERE id = ?';
  const values = [id];

  createNewConnection();

  return new Promise((resolve, reject) => {
    db.query(text, values, (err, res, _) => {
      releaseConnection();

      if (err) reject(err);
      else resolve(res[0]);
    });
  });
};

export const getImagesByUserID = async (userID) => {
  const text = 'SELECT * FROM images WHERE author = ?';
  const values = [userID];

  createNewConnection();

  return new Promise((resolve, reject) => {
    db.query(text, values, (err, res, _) => {
      releaseConnection();

      if (err) reject(err);
      else resolve(res);
    });
  });
};

// insert image into database
export const insertImage = async (data) => {
  const text = 'INSERT INTO images(author, image_url) VALUES(?, ?)';
  const values = [data.author, data.imageURL];

  createNewConnection();

  return new Promise((resolve, reject) => {
    db.query(text, values, async (err, res, _) => {
      if (err) reject(err);
      else {
        try {
          const response = await getImageById(res.insertId);
          resolve(response);
        } catch (err) {
          reject(err);
        } finally {
          releaseConnection();
        }
      }
    });
  });
};

export const updateImageDescription = async (data) => {
  const text = 'UPDATE images SET description = ? WHERE id = ?';
  const values = [data.description, data.id];

  createNewConnection();

  return new Promise((resolve, reject) => {
    db.query(text, values, async (err, _, __) => {
      if (err) reject(err);
      else {
        try {
          const response = await getImageById(data.id);
          resolve(response);
        } catch (err) {
          reject(err);
        } finally {
          releaseConnection();
        }
      }
    });
  });
};

// delete image by id
export const deleteImageById = async (id) => {
  const text = 'DELETE FROM images WHERE id = ?';
  const values = [id];

  createNewConnection();

  return new Promise((resolve, reject) => {
    db.query(text, values, (err, _, __) => {
      releaseConnection();

      if (err) reject(err);
      else resolve({});
    });
  });
};
