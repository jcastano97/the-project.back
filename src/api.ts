import { Router } from 'express';
import cors from 'cors';

import healthCheck from '@components/healthcheck/healthCheck.router';
import user from '@components/account/user/user.router';

// const frontUrl = process.env.APP_FRONT_URL || 'http://localhost:3000';

const router: Router = Router();
router.use('/', cors({ origin: '*' }));
router.use(healthCheck);
router.use(user);

export default router;
