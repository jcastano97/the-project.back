import { Response } from 'express';
import httpStatus from 'http-status';
import AppError from '@core/utils/appError';

const catchError = (res: Response, error: any) => {
  res.status(httpStatus.INTERNAL_SERVER_ERROR);
  if (error as AppError) {
    if (error.httpCode) res.status(error.httpCode);
    return res.send({ message: error.message });
  }
  res.status(httpStatus.INTERNAL_SERVER_ERROR);
  return res.send({ message: 'Internal Server Error' });
};

const sendResponse = (
  res: Response,
  code: number,
  message: string,
  response?: any,
) => {
  res.status(code);
  if (response) return res.send({ message, data: response });
  return res.send({ message });
};

export { catchError, sendResponse };
