import { Response, NextFunction } from 'express';
import httpStatus from 'http-status';
// eslint-disable-next-line import/no-extraneous-dependencies
import jwt from 'jsonwebtoken';

import config from '@config/config';
import AppError from '@core/utils/appError';
import logger from '@core/utils/logger';
import { RequestWithUser } from 'utils/RequestWithUser.interface';

const AuthMiddleware = (
  req: RequestWithUser,
  res: Response,
  next: NextFunction,
) => {
  try {
    let authToken: string;
    if (req.header('authorization')) {
      authToken = req.header('authorization').replace('Bearer ', '').trim();
    }
    if (authToken) {
      const userVerified = jwt.verify(authToken, config.secretToken);
      logger.info('User verified: %O', userVerified);
      req.user = userVerified;
      return next();
    }
    logger.error('Missing authorization in request header');
    throw new AppError(httpStatus.UNAUTHORIZED, 'Access forbidden');
  } catch (error) {
    if (error as AppError) {
      throw error;
    }
    throw new AppError(httpStatus.UNAUTHORIZED, 'Access forbidden');
  }
};

export default AuthMiddleware;
