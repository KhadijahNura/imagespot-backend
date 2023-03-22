import express from 'express';
import {
  addImageDescription,
  deleteImage,
  getImageById,
  getImages,
  uploadImage,
} from '../controllers/images.controller.js';
import validateJwt from '../middleware/validateJwt.js';
import { upload } from '../utils/multer.js';

const uploadFile = upload.single('image');

// initialize express router
const router = express.Router();

// get all images from database
router.get('/images', getImages);

// get single image
router.get('/images/:id', getImageById);

// upload new image
router.post(
  '/images',
  validateJwt,
  function (req, res, next) {
    uploadFile(req, res, (err) => {
      if (err) {
        if (err.message === 'Unexpected end of form')
          return res.status(400).json({ error: 'Image not provided' });
        return res.status(400).json({ error: err.message });
      }

      next();
    });
  },
  uploadImage
);

router.patch('/images/:id', validateJwt, addImageDescription);

// delete image
router.delete('/images/:id', validateJwt, deleteImage);

export default router;
