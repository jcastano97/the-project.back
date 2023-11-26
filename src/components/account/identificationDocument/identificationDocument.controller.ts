/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { create, read, update, deleteById } from './identificationDocument.service';
import { IIdentificationDocument } from './identificationDocument.interface';

const createIdentificationDocument = async (req: Request, res: Response) => {
  const identificationDocument = req.body as IIdentificationDocument;
  await create(identificationDocument);
  res.status(httpStatus.CREATED);
  return res.send({ message: 'Created' });
};

const readIdentificationDocument = async (req: Request, res: Response) => {
  res.status(httpStatus.OK);
  res.send({ message: 'Read', output: await read(req.params.id) });
};

const updateIdentificationDocument = async (req: Request, res: Response) => {
  const identificationDocument = req.body as IIdentificationDocument;
  await update(identificationDocument);
  res.status(httpStatus.OK);
  res.send({ message: 'Updated' });
};

const deleteIdentificationDocument = async (req: Request, res: Response) => {
  await deleteById(req.params.id);
  res.status(httpStatus.ACCEPTED);
  res.send({ message: 'Removed' });
};

export {
  createIdentificationDocument,
  readIdentificationDocument,
  updateIdentificationDocument,
  deleteIdentificationDocument,
};
