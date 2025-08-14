import { Router } from 'express';
import {
  getContactsController,
  getContactsByIdController,
  createContactController,
  patchContactController,
  deleteContactByIdController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBodyMiddleware.js';
import { isValidId } from '../middlewares/isValidId.js';
import {
  createContactSchema,
  updateContactSchema,
} from '../validation/contact.js';

const contactRouter = Router();

contactRouter.get('/contacts', ctrlWrapper(getContactsController));

contactRouter.get(
  '/contacts/:contactId',
  isValidId,
  ctrlWrapper(getContactsByIdController),
);

contactRouter.post(
  '/contacts',
  validateBody(createContactSchema),
  ctrlWrapper(createContactController),
);

contactRouter.patch(
  '/contacts/:contactId',
  isValidId,
  validateBody(updateContactSchema),
  ctrlWrapper(patchContactController),
);

contactRouter.delete(
  '/contacts/:contactId',
  isValidId,
  ctrlWrapper(deleteContactByIdController),
);

export default contactRouter;