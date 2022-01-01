import User from '../models/usersModel';
import asyncHandler from 'express-async-handler'

//getUsers function to get all users
export const getUsers = asyncHandler(async (req, res) => {
    try {
        const users = await User.find({})
        res.json(users)
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
})

//getUserById function to retrieve user by id
export const getUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)

    //if user id match param id send user else throw error
    if (user) {
        res.json(user)
    } else {
        res.status(404).json({ message: "User not found" })
        throw new Error('User not found')
    }
})

export const createUser = asyncHandler(async (req, res) => {
    const user = await User.create(req.body)
    try {
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
});