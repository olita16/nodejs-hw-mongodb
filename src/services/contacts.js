import Contact from '../models/contactsModel.js';

export const getAllContacts = async () => {
  return await Contact.find({});
};

export const getContactById = async (contactId) => {
  return await Contact.findById(contactId);
};

export const createContact = async (contactData) => {
  const newContact = new Contact(contactData);
  await newContact.save();
  return newContact;
};

export const updateContact = async (contactId, contactData) => {
  const contact = await Contact.findById(contactId);

  if (!contact) {
    throw new Error('Contact not found');
  }

  Object.assign(contact, contactData);
  await contact.save();

  return contact;
};

export const deleteContact = async (contactId) => {
  const contact = await Contact.findById(contactId);

  if (!contact) {
    throw new Error('Contact not found');
  }

  await Contact.deleteOne({ _id: contactId });
};
