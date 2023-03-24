import cors from 'cors';
import * as dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import { AuthRouter, ImagesRouter } from './routes/index.js';

// import { createImagesTable } from './models/ImageModel.js';
// import { createUsersTable } from './models/UsersModel.js';

// exposing .env variables
dotenv.config();

// setting up database tables for the first time
// await createUsersTable();
// await createImagesTable();

const app = express();

// middlewares
app.use(express.json());
app.use(cors());

// serving static images
app.use('/uploads', express.static(path.resolve('uploads')));

// routers
app.use(AuthRouter);
app.use(ImagesRouter);

// setting up server
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
