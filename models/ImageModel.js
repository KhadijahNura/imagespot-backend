// importing db related functions
import { createNewConnection, releaseConnection } from '../config/database.js';

// create table
export const createImagesTable = async () => {
  const conn = await createNewConnection();

  conn.query(
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
      releaseConnection(conn);
    }
  );
};

// get all images
export const getImages = async () => {
  const text = 'SELECT * FROM images';

  const conn = await createNewConnection();

  return new Promise((resolve, reject) => {
    conn.query(text, (err, res, _) => {
      releaseConnection(conn);

      if (err) reject(err);
      else resolve(res);
    });
  });
};

// get single image
export const getImageById = async (id) => {
  const text = 'SELECT * FROM images WHERE id = ?';
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

export const getImagesByUserID = async (userID) => {
  const text = 'SELECT * FROM images WHERE author = ?';
  const values = [userID];

  const conn = await createNewConnection();

  return new Promise((resolve, reject) => {
    conn.query(text, values, (err, res, _) => {
      releaseConnection(conn);

      if (err) reject(err);
      else resolve(res);
    });
  });
};

// insert image into database
export const insertImage = async (data) => {
  const text = 'INSERT INTO images(author, image_url) VALUES(?, ?)';
  const values = [data.author, data.imageURL];

  const conn = await createNewConnection();

  return new Promise((resolve, reject) => {
    conn.query(text, values, async (err, res, _) => {
      if (err) reject(err);
      else {
        try {
          const response = await getImageById(res.insertId);
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

export const updateImageDescription = async (data) => {
  const text = 'UPDATE images SET description = ? WHERE id = ?';
  const values = [data.description, data.id];

  const conn = await createNewConnection();

  return new Promise((resolve, reject) => {
    conn.query(text, values, async (err, _, __) => {
      if (err) reject(err);
      else {
        try {
          const response = await getImageById(data.id);
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

// delete image by id
export const deleteImageById = async (id) => {
  const text = 'DELETE FROM images WHERE id = ?';
  const values = [id];

  const conn = await createNewConnection();

  return new Promise((resolve, reject) => {
    conn.query(text, values, (err, _, __) => {
      releaseConnection(conn);

      if (err) reject(err);
      else resolve({});
    });
  });
};
