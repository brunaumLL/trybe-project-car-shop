import { ZodError } from 'zod';
import { ErrorRequestHandler } from 'express';
import { ErrorTypes, errorCatalog } from '../errors/catalog';

const errorHandler: ErrorRequestHandler = (err: Error | ZodError, _req, res, _next) => {
  if (err instanceof ZodError) {
    return res.status(400).json({ message: err.issues });
  }

  const errorMessage = err.message as ErrorTypes;

  const thrownError = errorCatalog[errorMessage];

  if (thrownError) {
    const { error, httpStatus } = thrownError;
    return res.status(httpStatus).json({ error });
  }

  return res.status(500).json({ message: 'Internal error' });
};

export default errorHandler;