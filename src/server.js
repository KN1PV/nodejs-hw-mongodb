import express from 'express'
import cors from 'cors'
import pino from 'pino-http'
import { getEnvVar } from './utils/getEnvVar.js';
import { ENV_VARS } from './constants/envVars.js';
import { getUsers, getUserById } from './services/contacts.js';


export const setupServer = () => {
    const app = express();
    const PORT = getEnvVar(ENV_VARS.PORT, 3000)

    app.use([cors(), pino()])

        app.get('/contacts', async (req, res) => {
        const users = await getUsers();

        res.json({
            status: 200,
            message: "Successfully found contacts!",
            data: users,
        });
    });

    app.get('/contacts/:contactId', async (req, res) => {
        const { userId } = req.params;
        const user = await getUserById(userId);

        if (!user) {
            return res.status(404).json({
            status: 404,
            message: 'Contact not found',
            });
        }

        res.json({
            status: 200,
            message: "Successfully found contact with id {contactId}!",
            data: {
                user,
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