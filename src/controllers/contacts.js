import createHttpError from "http-errors";
import { getContacts, getContactById, createContact, patchContact, deleteContactById } from "../services/contacts.js";

export const getContactsController = async (req, res) => {
    const contacts = await getContacts();

    res.json({
        status: 200,
        message: 'Successfully found contacts!',
        data: contacts,
    });
};

export const getContactsByIdController = async (req, res) => {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);

    if (!contact) {
        throw createHttpError(404, 'Contact not found' )
    }

    res.json({
        status: 200,
        message: `Successfully found contact with id ${contactId}!`,
        data: contact,
    });
};

export const createContactController = async (req, res) => {
    const contacts = await createContact(req.body);

    res.status(201).json({
        status: 201,
        message: 'Successfully created a contact!',
        data: contacts,
    });
};

export const patchContactController = async (req, res) => {
    const { contactId } = req.params;
    const contact = await patchContact(contactId, req.body);

    if (!contact) {
        throw createHttpError(404, 'Contact not found');
    }

    res.json({
        status: 200,
        message: `Successfully patched a contact!`,
        data: contact,
    });
};

export const deleteContactByIdController = async (req, res) => {
    const { contactId } = req.params;
    const contact = await deleteContactById(contactId);

    if (!contact) {
        throw createHttpError(404, "Contact not found")
    }

    res.status(204).send();
}