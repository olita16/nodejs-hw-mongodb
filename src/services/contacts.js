import Contact from '../models/contactModel.js';
import ContactModel from '../models/contactModel.js';

export const getAllContacts = async () => {
  try {
    const contacts = await Contact.find();
    return contacts;
  } catch (error) {
    throw new Error('Failed to fetch contacts');
  }
};

export const findContactById = async (contactId) => {
  try {
    return await ContactModel.findById(contactId);
  } catch (error) {
    console.error('Error finding contact:', error);
    throw new Error('Database query failed');
  }
};
