import httpErrors from 'http-errors';
import { Contact } from '../models/contactsModel.js';

export const getAllContacts = async () => {
  try {
    return await Contact.find();
  } catch (error) {
    console.error('Error fetching contacts:', error);
    throw new Error('Failed to fetch contacts');
  }
};

export const findContactById = async (contactId) => {
  try {
    const contact = await Contact.findById(contactId);
    if (!contact) {
      throw new Error('Contact not found');
    }
    return contact;
  } catch (error) {
    console.error('Error finding contact by ID:', error);
    throw new Error('Database query failed');
  }
};

export const createNewContact = async (contactData) => {
  const { name, phoneNumber, email, isFavourite, contactType } = contactData;

  const contact = new Contact({
    name,
    phoneNumber,
    email,
    isFavourite: isFavourite || false,
    contactType,
  });

  try {
    await contact.save();
    return contact;
  } catch (error) {
    throw new Error('Failed to create contact');
  }
};

export const updateContactService = async (contactId, updateData) => {
  try {
    const updatedContact = await Contact.findByIdAndUpdate(
      contactId,
      updateData,
      { new: true, runValidators: true },
    );

    if (!updatedContact) {
      throw createError(404, 'Contact not found');
    }

    return updatedContact;
  } catch (error) {
    throw createError(500, 'Failed to update contact');
  }
};

export const removeContact = async (contactId) => {
  const deletedContact = await Contact.findByIdAndDelete(contactId);

  if (!deletedContact) {
    throw httpErrors(404, 'Contact not found');
  }

  return deletedContact;
};
