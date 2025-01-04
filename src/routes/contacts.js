import express from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import * as contactsController from '../controllers/contacts.js';

const router = express.Router();

router.get('/', ctrlWrapper(contactsController.getContacts));
router.get('/:contactId', ctrlWrapper(contactsController.getContactById));
router.post('/', ctrlWrapper(contactsController.createContact));
router.patch('/:contactId', ctrlWrapper(contactsController.updateContact));
router.delete('/:contactId', ctrlWrapper(contactsController.deleteContact));

export const contactsRouter = router;
