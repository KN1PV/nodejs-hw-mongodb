import createHttpError from 'http-errors'

export const validateBody = (schema) => {
  return async (req, res, next) => {
    try {
      await schema.validateAsync(req.body, {
        allowUnknown: false,
        abortEarly: false,
        convert: false,
      });
      next();
    } catch (err) {
      next(createHttpError(400, err.details));
    }
  };
};