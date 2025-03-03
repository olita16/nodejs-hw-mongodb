import Contact from '../db/models/contactsModel.js';
import { SORT_ORDER } from '../constants/index.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const getAllContacts = async ({
  userId,
  page = 1,
  perPage = 10,
  sortBy = 'name',
  sortOrder = SORT_ORDER.ASC,
  // filters = {},
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  // const contactsQuery = Contact.find(filters);

  const contactsQuery = Contact.find({ userId });

  const sortCriteria = { [sortBy]: sortOrder === SORT_ORDER.DESC ? -1 : 1 };

  const [contactsCount, contacts] = await Promise.all([
    Contact.find().merge(contactsQuery).countDocuments(),
    contactsQuery.skip(skip).limit(limit).sort(sortCriteria).exec(),
  ]);

  const paginationData = calculatePaginationData(contactsCount, perPage, page);

  return {
    data: contacts,
    ...paginationData,
  };
};

export const getContactById = async (contactId,  userId) => {
  return await Contact.findOne({ _id:contactId, userId });
};

export const createContact = async (contactData) => {
  return await Contact.create(contactData);
};

export const updateContact = async (contactId,  userId, contactData) => {
  return await Contact.findOneAndUpdate({ _id: contactId, userId }, contactData, {
    new: true,
  });
};

export const deleteContact = async (contactId,  userId) => {
  return await Contact.findOneAndDelete({ _id: contactId, userId });
};

