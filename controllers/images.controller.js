// import functions from image model
import {
  deleteImageById as deleteImageFromDB,
  getImageById as getImageFromDB,
  getImages as getImagesFromDB,
  getImagesByUserID,
  insertImage as insertImageIntoDB,
  updateImageDescription,
} from '../models/ImageModel.js';
import { getUserById } from '../models/UsersModel.js';

const insertUserData = async (result) => {
  try {
    const userData = await getUserById(result.author);
    delete userData.password;
    result.author_data = userData;
  } catch (err) {}
};

// get all images
export const getImages = async (_, res) => {
  try {
    const images = await getImagesFromDB();
    // inserting user data into images
    for (let i = 0; i < images.length; i++) {
      await insertUserData(images[i]);
    }

    res.json(images);
  } catch (err) {
    res.status(500).json(err);
  }
};

// get all user uploads
export const getUploads = async (_, res) => {
  try {
    const uploads = await getImagesByUserID(req.user.id);

    // inserting user data into images
    for (let i = 0; i < uploads.length; i++) {
      await insertUserData(uploads[i]);
    }

    res.json(uploads);
  } catch (err) {
    res.status(500).json(err);
  }
};

// get image by id
export const getImageById = async (req, res) => {
  try {
    const image = await getImageFromDB(req.params.id);

    if (!image) return res.status(404).json({ error: 'Image not found' });
    await insertUserData(image);

    res.json(image);
  } catch (err) {
    res.status(500).json(err);
  }
};

// upload image
export const uploadImage = async (req, res) => {
  const file = req.file;

  if (!file) res.status(400).json({ error: 'Image is required' });

  const data = {
    author: req.user.id,
    imageURL: file.path,
  };

  try {
    const image = await insertImageIntoDB(data);
    await insertUserData(image);
    res.status(201).json(image);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

// get image by id
export const addImageDescription = async (req, res) => {
  if (!req.body.description) {
    return res.status(400).json({ error: 'Description is required' });
  }

  try {
    const image = await getImageFromDB(req.params.id);
    if (!image) return res.status(404).json({ error: 'Image not found' });

    const data = { id: req.params.id, description: req.body.description };
    const updatedImage = await updateImageDescription(data);

    await insertUserData(updatedImage);
    res.json(updatedImage);
  } catch (err) {
    res.status(500).json(err);
  }
};

// delete image
export const deleteImage = async (req, res) => {
  const id = req.params.id;

  try {
    const image = await getImageFromDB(id);
    if (!image) return res.status(404).json({ error: 'Image not found' });
    await deleteImageFromDB(id);

    res.status(204).send();
  } catch (err) {
    res.status(500).json(err);
  }
};
