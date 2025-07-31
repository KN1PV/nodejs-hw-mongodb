import { User } from "../db/models/user.js"

export const getUsers = async () => {
    const users = await User.find();
    return users;
};

export const getUserById = async (userId) => {
    const users = await User.findById(userId);
    return users;
}

