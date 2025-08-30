import express, { json } from 'express';
import cors from 'cors';
import pino from 'pino-http';
import { getEnvVar } from './utils/getEnvVar.js';
import { ENV_VARS } from './constants/envVars.js';
import router from './routers/index.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';
import cookieParser from 'cookie-parser';
import { UPLOAD_DIR } from './constants/path.js';

export const setupServer = () => {
  const app = express();
  const PORT = getEnvVar(ENV_VARS.PORT, 3000);

  app.use([cors(), pino(), cookieParser()]);
  app.use(json());

  app.use(router);
  app.use('/uploads', express.static(UPLOAD_DIR));

  app.use(notFoundHandler);
  app.use(errorHandler);

  app.use((req, res) => {
    res.status(404).json({
      message: 'Route not found',
      status: 404,
    });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
