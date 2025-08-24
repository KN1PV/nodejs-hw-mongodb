import { isHttpError } from "http-errors";
import { MongooseError } from 'mongoose';

export const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);

  if (isHttpError(err)) {
    return res.status(err.status).json({
      status: err.status,
      message: err.message,
    });
  }

    if (err.isJoi) {
    return res.status(400).json({
      status: 400,
      message: 'Bad Request',
      errors: err.details.map((err) => ({
        path: err.path,
        message: err.message,
      })),
    });
  }

    if (err instanceof MongooseError) {
    return res.status(500).json({
      status: 500,
      message: 'MongooseError',
      error: err.message,
    });
  }

  res.status(500).json({
    status: 500,
    message: "Internal Server Error",
  });
};