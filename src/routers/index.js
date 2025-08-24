import { Router } from 'express';
import contactRouter from './contacts.js';
import authRouter from './auth.js';

const router = Router();

router.use(authRouter);
router.use(contactRouter);

export default router;
