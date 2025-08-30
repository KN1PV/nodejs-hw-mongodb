import { Router } from 'express';
import { validateBody } from '../middlewares/validateBodyMiddleware.js';
import { registerUserValidationSchema } from '../validation/registerUserValidationSchema.js';
import { loginUserValidationSchema } from '../validation/loginUserValidationSchema.js';
import {
  loginUserController,
  logoutUserController,
  refreshSessionController,
  registerUserController,
  requestResetEmailController,
  resetPasswordController,
} from '../controllers/auth.js';
import { requestResetEmailSchema } from '../validation/sentResetEmailSchema.js';
import { resetPasswordSchema } from '../validation/resetPasswordSchema.js';

const authRouter = Router();

authRouter.post(
  '/auth/register',
  validateBody(registerUserValidationSchema),
  registerUserController,
);

authRouter.post(
  '/auth/login',
  validateBody(loginUserValidationSchema),
  loginUserController,
);

authRouter.post('/auth/refresh', refreshSessionController);

authRouter.post('/auth/logout', logoutUserController);

authRouter.post(
  '/auth/send-reset-email',
  validateBody(requestResetEmailSchema),
  requestResetEmailController,
);

authRouter.post(
  '/auth/reset-pwd',
  validateBody(resetPasswordSchema),
  resetPasswordController,
);

export default authRouter;
