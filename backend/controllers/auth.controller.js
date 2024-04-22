import User from "../models/user.model.js"
import bcryptjs from 'bcryptjs';
import { errorHandler } from "../utils/error.js";

export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password || username === '' || email === '' || password === '') {
        next(errorHandler(400, 'all fields required'))
    } 

    const hashedPassword = bcryptjs.hashSync(password, 10)

    const newUser = new User({
        username,
        email,
        password: hashedPassword
    });

    try {
        const user = await newUser.save();
        res.status(201).json(user);
    } catch (error) {
        next(error);
    }
}