import { Contact } from "../db/models/contact.js"
import { calculatePaginationData } from "../utils/calculatePaginationData.js";
import { SORT_ORDER } from "../constants/index.js";
import createHttpError from "http-errors";

export const getContacts = async ({
  page = 1,
  perPage = 10,
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id',
  filter = {},
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const contactsQuery = Contact.find();

    if (filter.contactType) {
    contactsQuery.where('contactType').equals(filter.contactType);
    };
  if (typeof filter.isFavourite !== 'undefined') {
    contactsQuery.where('isFavourite').equals(filter.isFavourite);
    };

  const [contactsCount, contacts] = await Promise.all([
    Contact.find().merge(contactsQuery).countDocuments(),
    contactsQuery.skip(skip).limit(limit).sort({ [sortBy]: sortOrder }).exec(),
  ]);

  const paginationData = calculatePaginationData(contactsCount, perPage, page);

  return {
    data: contacts,
    ...paginationData,
  };
};

export const getContactById = async (userId) => {
    const contact = await Contact.findById(userId);
    return contact;
}

export const createContact = async (payload) => {
    const contact = await Contact.create(payload);
    return contact;
};

export const patchContact = async (contactId, payload) => {
    const contact = await Contact.findByIdAndUpdate(contactId, payload, {
        new: true,
    });
    return contact;
};

export const deleteContactById = async (contactId) => {
    const contact = await Contact.findByIdAndDelete(contactId);

    if (!contact) {
        throw createHttpError(404, 'Contact not found');
    }
}