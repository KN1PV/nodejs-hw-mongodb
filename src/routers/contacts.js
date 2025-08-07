import { Router } from "express";
import { getContactsController, getContactsByIdController, createContactController, patchContactController, deleteContactByIdController } from "../controllers/contacts.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";

const contactRouter = Router();

contactRouter.get('/contacts', ctrlWrapper(getContactsController));

contactRouter.get('/contacts/:contactId', ctrlWrapper(getContactsByIdController));

contactRouter.post('/contacts', ctrlWrapper(createContactController));

contactRouter.patch('/contacts/:contactId', ctrlWrapper(patchContactController));

contactRouter.delete('/contacts/:contactId', ctrlWrapper(deleteContactByIdController));

export default contactRouter;