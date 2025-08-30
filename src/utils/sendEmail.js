import nodemailer from 'nodemailer';

import { getEnvVar } from './getEnvVar.js';
import { ENV_VARS } from '../constants/envVars.js';
import createHttpError from 'http-errors';

const transporter = nodemailer.createTransport({
  host: getEnvVar(ENV_VARS.SMTP_HOST),
  port: Number(getEnvVar(ENV_VARS.SMTP_PORT)),
  secure: true,
  auth: {
    user: getEnvVar(ENV_VARS.SMTP_USER),
    pass: getEnvVar(ENV_VARS.SMTP_PASSWORD),
  },
});

export const sendEmail = async (options) => {
  try {
    await transporter.sendMail(options);
  } catch (error) {
    console.log(error);
    throw createHttpError(
      500,
      'Failed to send the email, please try again later.',
    );
  }
};
