import { Router } from 'express';

import AuthMiddleware from '@components/common/middlewares/auth.middleware';
import validation from '@core/middlewares/validate.middleware';
import {
  readIdentificationDocument,
  createIdentificationDocument,
  updateIdentificationDocument,
  deleteIdentificationDocument,
} from './identificationDocument.controller';
import createValidation from './createIdentificationDocument.validation';

const router: Router = Router();

router.get(
  '/user/identificationDocument/',
  [AuthMiddleware],
  readIdentificationDocument,
);

router.post(
  '/user/identificationDocument/',
  [AuthMiddleware, validation(createValidation)],
  createIdentificationDocument,
);

router.put(
  '/user/identificationDocument/:id',
  [AuthMiddleware, validation(createValidation)],
  updateIdentificationDocument,
);

router.delete(
  '/user/identificationDocument/:id',
  [AuthMiddleware],
  deleteIdentificationDocument,
);

export default router;
