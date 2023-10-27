/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import {
  signIn,
  signUp,
  verifyEmail,
  create,
  read,
  update,
  deleteById,
} from '@components/account/user/user.service';
import { IUser } from '@components/account/user/user.interface';
import { sendResponse, catchError } from 'utils/ApiUtils';
import logger from '@core/utils/logger';
import { RequestWithUser } from 'utils/RequestWithUser.interface';

const signInUser = async (req: Request, res: Response) => {
  try {
    const user = req.body as IUser;
    const response = await signIn(user);
    return sendResponse(res, httpStatus.CREATED, 'Created', response);
  } catch (error) {
    logger.error(error);
    return catchError(res, error);
  }
};

const signUpUser = async (req: Request, res: Response) => {
  try {
    const user = req.body as IUser;
    const newUser: IUser = await signUp(user);
    return sendResponse(res, httpStatus.CREATED, 'Created', newUser);
  } catch (error) {
    logger.error(error);
    return catchError(res, error);
  }
};

const verifyEmailUser = async (req: Request, res: Response) => {
  try {
    const response = await verifyEmail(req.params.emailToken);
    return sendResponse(res, httpStatus.OK, 'Verified', response);
  } catch (error) {
    logger.error(error);
    return catchError(res, error);
  }
};

const infoUser = async (req: RequestWithUser, res: Response) => {
  try {
    const response = await read(req.user._id);
    logger.debug('User info: %O', response);
    return sendResponse(res, httpStatus.OK, 'Read', response);
  } catch (error) {
    logger.error(error);
    return catchError(res, error);
  }
};

const createUser = async (req: Request, res: Response) => {
  const user = req.body as IUser;
  await create(user);
  res.status(httpStatus.CREATED);
  return res.send({ message: 'Created' });
};

const readUser = async (req: Request, res: Response) => {
  res.status(httpStatus.OK);
  res.send({ message: 'Read', output: await read(req.params.id) });
};

const updateUser = async (req: Request, res: Response) => {
  const user = req.body as IUser;
  await update(user);
  res.status(httpStatus.OK);
  res.send({ message: 'Updated' });
};

const deleteUser = async (req: Request, res: Response) => {
  await deleteById(req.params.email);
  res.status(httpStatus.ACCEPTED);
  res.send({ message: 'Removed' });
};

export {
  signInUser,
  signUpUser,
  verifyEmailUser,
  infoUser,
  createUser,
  readUser,
  updateUser,
  deleteUser,
};
