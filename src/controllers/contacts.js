import createHttpError from 'http-errors';
import {
  getContacts,
  getContactById,
  createContact,
  patchContact,
  deleteContactById,
} from '../services/contacts.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';

export const getContactsController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const filter = {
    ...parseFilterParams(req.query),
  };

  const contacts = await getContacts({
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
    userId: req.user._id,
  });

  res.json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
};

export const getContactsByIdController = async (req, res) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId, req.user._id);

  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }

  res.json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data: contact,
  });
};

export const createContactController = async (req, res, next) => {
  try {
    const photo = req.file;
    let photoUrl;
    if (photo) {
      photoUrl = await saveFileToCloudinary(photo);
    }
    const contact = await createContact({
      ...req.body,
      photo: photoUrl,
      userId: req.user._id,
    });
    res.status(201).json({
      status: 201,
      message: 'Successfully created a contact!',
      data: contact,
    });
  } catch (error) {
    console.error(' Error in createContactsController:', error);
    next(error);
  }
};

export const patchContactController = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const userId = req.user._id;
    const photo = req.file;

    let photoUrl;
    if (photo) {
      photoUrl = await saveFileToCloudinary(photo);
    }
    const updates = {
      ...req.body,
      ...(photoUrl && { photo: photoUrl }),
    };

    const result = await patchContact(contactId, userId, updates);

    if (!result) {
      throw createHttpError(404, 'Contact not found');
    }

    res.status(200).json({
      status: 'success',
      message: 'Contact updated successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteContactByIdController = async (req, res) => {
  const { contactId } = req.params;
  const contact = await deleteContactById(contactId, req.user._id);

  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }

  res.status(204).send();
};
