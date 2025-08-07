import { Contact } from "../db/models/contact.js"

export const getContacts = async () => {
    const contacts = await Contact.find();
    return contacts;
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
    await Contact.findByIdAndDelete(contactId);
}