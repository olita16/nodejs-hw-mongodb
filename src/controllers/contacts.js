import createHttpError from 'http-errors';
import * as contactsService from '../services/contacts.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';

export const getAllContacts = async (req, res, next) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query); 

  const { type, isFavourite } = req.query;

  const filters = {};


  if (type) {
    filters.contactType = type;
  }

  if (isFavourite !== undefined) {
    filters.isFavourite = isFavourite === 'true';
  }

  try {

    const contacts = await contactsService.getAllContacts({
      page,
      perPage,
      sortBy,
      sortOrder,
      filters,
    });

    res.status(200).json({
      status: 200,
      message: 'Successfully found contacts!',
      data: contacts,
    });
  } catch (error) {
    next(error);
  }
};



export const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const contact = await contactsService.getContactById(contactId);

  // 2. Створюємо та налаштовуємо помилку за умовою ДЗ
  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }

  res.status(200).json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data: contact,
  });
};

export const createContact = async (req, res) => {
  const newContact = await contactsService.createContact(req.body);

  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data: newContact,
  });
};

export const updateContact = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await contactsService.updateContact(contactId, req.body);

  if (!result) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }

  res.json({
    status: 200,
    message: `Successfully patched a contact!`,
    data: result,
  });
};

export const deleteContact = async (req, res) => {
  const { contactId } = req.params;

  const contact = await contactsService.getContactById(contactId);

  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }

  await contactsService.deleteContact(contactId);

  res.status(204).send();
};
