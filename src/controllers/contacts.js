import createError from 'http-errors';
import * as contactsService from '../services/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

export const getAllContacts = ctrlWrapper(async (req, res) => {
  const contacts = await contactsService.getAllContacts();

  res.status(200).json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
});

export const getContactById = ctrlWrapper(async (req, res) => {
  const { contactId } = req.params;
  const contact = await contactsService.getContactById(contactId);

  if (!contact) {
    throw createError(404, 'Contact not found');
  }

  res.status(200).json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data: contact,
  });
});

export const createContact = ctrlWrapper(async (req, res) => {
  const { name, phoneNumber, email, isFavourite, contactType } = req.body;

  if (!name || !phoneNumber || !contactType) {
    throw createError(
      400,
      'Missing required fields: name, phoneNumber, and contactType',
    );
  }

  const newContact = await contactsService.createContact({
    name,
    phoneNumber,
    email,
    isFavourite,
    contactType,
  });

  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data: newContact,
  });
});

export const updateContact = ctrlWrapper(async (req, res) => {
  const { contactId } = req.params;
  const { name, phoneNumber, email, isFavourite, contactType } = req.body;

  const contact = await contactsService.getContactById(contactId);

  if (!contact) {
    throw createError(404, 'Contact not found');
  }

  if (name) contact.name = name;
  if (phoneNumber) contact.phoneNumber = phoneNumber;
  if (email) contact.email = email;
  if (isFavourite !== undefined) contact.isFavourite = isFavourite;
  if (contactType) contact.contactType = contactType;

  await contact.save();

  res.status(200).json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: contact,
  });
});

export const deleteContact = ctrlWrapper(async (req, res) => {
  const { contactId } = req.params;

  const contact = await contactsService.getContactById(contactId);

  if (!contact) {
    throw createError(404, 'Contact not found');
  }

  await contactsService.deleteContact(contactId);

  res.status(204).send();
});
