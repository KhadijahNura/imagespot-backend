import express from 'express';

import { login, profile, signup } from '../controllers/auth.controller.js';
import validateJwt from '../middleware/validateJwt.js';

const router = express.Router();

router.post('/login', login);
router.post('/signup', signup);
router.get('/profile', validateJwt, profile);

export default router;
