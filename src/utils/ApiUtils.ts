import { Response } from 'express';
import httpStatus from 'http-status';
import AppError from '@core/utils/appError';

const catchError = (res: Response, error: any) => {
  let code = httpStatus.INTERNAL_SERVER_ERROR;
  if (error as AppError) {
    if (error.httpCode) code = error.httpCode;
    res.status(code);
    return res.send({
      state: false,
      code: code.toString(),
      message: error.message,
    });
  }
  res.status(httpStatus.INTERNAL_SERVER_ERROR);
  return res.send({
    state: false,
    code: '500',
    message: 'Internal Server Error',
  });
};

const sendResponse = (
  res: Response,
  code: number,
  message: string,
  response?: any,
) => {
  res.status(code);
  if (response)
    return res.send({
      state: true,
      code: code.toString(),
      message,
      data: response,
    });
  return res.send({
    state: true,
    code: code.toString(),
    message,
  });
};

export { catchError, sendResponse };
