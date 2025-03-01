import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import * as contactsController from '../controllers/contacts.js';
import { validateBody } from '../middlewares/validateBody.js';
import { isValidId } from '../middlewares/isValidId.js';
import { createContactSchema, updateContactSchema } from '../validation/contacts.js';
import { authenticate } from '../middlewares/authenticate.js';

const contactRouter = Router();

contactRouter.use(authenticate);


contactRouter.get('/', ctrlWrapper(contactsController.getAllContacts));

contactRouter.get(
  '/:contactId',
  isValidId,
  ctrlWrapper(contactsController.getContactById),
);
contactRouter.post(
  '/',
  validateBody(createContactSchema),
  ctrlWrapper(contactsController.createContact),
);
contactRouter.patch(
  '/:contactId',
  isValidId,
  validateBody(updateContactSchema),
  ctrlWrapper(contactsController.updateContact),
);
contactRouter.delete(
  '/:contactId',
  isValidId,
  ctrlWrapper(contactsController.deleteContact),
);

export default contactRouter;

