import createError from 'http-errors';
import { getAllContacts } from '../services/contacts.js';
import { findContactById } from '../services/contacts.js';
import * as contactService from '../services/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

export const getContacts = ctrlWrapper(async (req, res) => {
  const contacts = await getAllContacts();

  res.status(200).json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
});

export const getContactById = ctrlWrapper(async (req, res) => {
  const { contactId } = req.params;
  const contact = await findContactById(contactId);

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
      'Missing required fields: name, phoneNumber, or contactType',
    );
  }

  const newContact = await contactService.createNewContact({
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

export const updateContact = ctrlWrapper(async (req, res, next) => {
  const { contactId } = req.params;
  const { name, phoneNumber, email, isFavourite, contactType } = req.body;

  try {
    const updatedContact = await contactService.updateContactService(
      contactId,
      {
        name,
        phoneNumber,
        email,
        isFavourite,
        contactType,
      },
    );

    if (!updatedContact) {
      throw createError(404, 'Contact not found');
    }

    res.status(200).json({
      status: 200,
      message: 'Successfully patched a contact!',
      data: updatedContact,
    });
  } catch (error) {
    next(error);
  }
});

export const deleteContact = ctrlWrapper(async (req, res) => {
  const { contactId } = req.params;

  try {
    const deletedContact = await contactService.removeContact(contactId);
    if (!deletedContact) throw createError(404, 'Contact not found');

    res.status(204).send();
  } catch (error) {
    res.status(error.status || 500).json({
      status: error.status || 500,
      message: error.message || 'Failed to delete contact',
    });
  }
});
