import { SORT_ORDER } from '../constants/index.js';

const parseSortOrder = (sortOrder) => {
  return sortOrder === SORT_ORDER.DESC ? SORT_ORDER.DESC : SORT_ORDER.ASC;
};

const parseSortBy = (sortBy) => {
  const validSortFields = ['name', 'phoneNumber', 'email', 'isFavourite', 'contactType', 'createdAt', 'updatedAt'];

  return validSortFields.includes(sortBy) ? sortBy : 'name';
};

export const parseSortParams = (query) => {
  const { sortBy, sortOrder } = query;
  const parsedSortBy = parseSortBy(sortBy);
  const parsedSortOrder = parseSortOrder(sortOrder);

  return { sortBy: parsedSortBy, sortOrder: parsedSortOrder };
};
