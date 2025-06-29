import User from "../models/user.model.js";

import mongoose from "mongoose"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { JWT_EXPIRES_IN, JWT_SECRET, NODE_ENV } from "../config/env.js";

export const regiter = async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {

        const { name, email, password } = req.body;

        const userExists = await User.findOne({ email });

        if (userExists) {
            const error = new Error('User already exists');
            error.statusCode = 409;
            throw error;
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUsers = await User.create([{
            name,
            email,
            password: hashedPassword
        }], { session })

        const token = jwt.sign({
            userId: newUsers[0]._id,
        }, process.env.JWT_SECRET, {
            expiresIn: JWT_EXPIRES_IN
        });

        const isProd = NODE_ENV === 'production'

        res.cookie('token', token, {
            httpOnly: true,
            secure: isProd,
            sameSite: isProd ? 'None' : 'Lax',
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });

        await session.commitTransaction();
        session.endSession();

        res.status(201).json({
            success: true,
            message: 'User created successfully',
            data: {
                user: newUsers[0]
            }
        })
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        next(error);
    }
}

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email }).select('+password');

        if (!user) {
            const error = new Error('User not found');
            error.statusCode = 404;
            throw error;
        }

        const isPasswordMatched = await bcrypt.compare(password, user.password);

        if (!isPasswordMatched) {
            const error = new Error('Invalid credentials');
            error.statusCode = 401;
            throw error;
        }

        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

        const isProd = NODE_ENV === 'production'

        res.cookie('token', token, {
            httpOnly: true,
            secure: isProd,
            sameSite: isProd ? 'None' : 'Lax',
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });

        res.status(200).json({
            success: true,
            message: "User logged in successfully",
            data: {
                user
            }
        });
    } catch (error) {
        next(error);
    }
}

export const checkAuth = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.status(200).json({ success: true, user });
    } catch (error) {
        console.log("Error in checkAuth");
        return res.status(500).json({ success: false, message: "Server error in checkAuth" });
    }
}

export const logout = async (req, res, next) => {
    try {
        if (req.session) {
            req.session.destroy(err => {
                if (err) {
                    return next(err);
                }
            })
        }

        const isProd = NODE_ENV === 'production'

        res.clearCookie("token", {
            httpOnly: true,
            secure: isProd,
            sameSite: isProd ? 'None' : 'Lax',
        });
        res.status(200).json({ success: true, message: "Logged out successfully" });
    } catch (error) {
        next(error);
    }
}