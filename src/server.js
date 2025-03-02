import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import router from './routes/index.js';

import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { initMongoConnection } from './db/initMongoConnection.js';

import { UPLOAD_DIR } from './constants/index.js';
import swaggerDocs from './middlewares/swaggerDocs.js';

const PORT = process.env.PORT || 3000;

export const setupServer = async () => {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(cookieParser());

  app.use('/uploads', express.static(UPLOAD_DIR));
  app.use('/api-docs', swaggerDocs());

  app.use('/', router);

  app.get('/', (req, res) => {
    res.send('Welcome to the Contacts API');
  });

  app.use(notFoundHandler);

  app.use(errorHandler);

  try {
    await initMongoConnection();

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err.message);
    process.exit(1);
  }
};
