import express from 'express'
import cors from 'cors'
import pino from 'pino-http'
import { getEnvVar } from './utils/getEnvVar.js';
import { ENV_VARS } from './constants/envVars.js';
import { getContacts, getContactById } from './services/contacts.js';


export const setupServer = () => {
    const app = express();
    const PORT = getEnvVar(ENV_VARS.PORT, 3000)

    app.use([cors(), pino()])

    app.get('/contacts', async (req, res) => {
        const contacts = await getContacts();

        res.json({
            status: 200,
            message: "Successfully found contacts!",
            data: contacts,
        });
    });

    app.get('/contacts/:contactId', async (req, res) => {
        const { contactId } = req.params;
        const contact = await getContactById(contactId);

        if (!contact) {
            return res.status(404).json({
            status: 404,
            message: 'Contact not found',
            });
        }

        res.json({
            status: 200,
            message: `Successfully found contact with id ${contactId}!`,
            data: {
                contact,
            }
        });
    });

    app.use((req, res) => {
        res.status(404).json({
            message: "Route not found",
            status: 404,
        })
    })

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}