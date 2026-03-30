import userModel from "../models/user.model.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import config from "../config/config.js"

export const register = async (req, res) => {
    try {
        const { username, email, password } = req.body
        const isUserAlreadyExists = await userModel.findOne({
            $or: [
                { username },
                { email }
            ]
        });

        if (isUserAlreadyExists) {
            return res.status(409).json({
                message: "User already exist. Please log in"
            })
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const user = await userModel.create({
            username,
            email,
            password: hashPassword
        })

        const refreshToken = jwt.sign({
            id: user._id,
        }, config.JWT_SECRET, { expiresIn: "7d" })

        const accessToken = jwt.sign({
            id: user._id,
        }, config.JWT_SECRET, { expiresIn: "15m" })

        res.cookie("refreshToken", refreshToken, {
            HttpOnly: true,
            secure: true,
            sameSite: "Strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        })

        return res.status(201).json({
            message: "User registered successfully",
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
            },
            accessToken
        })



    } catch (error) {
        console.error(error)
        throw new Error("Register operation failed❌")
    }
}

export const login = async (req, res) => {
    try {
        const { username, email, password } = req.body

        const user = await userModel.findOne({
            $or: [
                { username },
                { email }
            ]
        })

        if (!user) {
            return res.status(401).json({
                message: "Invalid credentials"
            })
        }

        const isPasswordMatched = await bcrypt.compare(password, user.password);

        if (!isPasswordMatched) {
            return res.status(401).json({
                message: "Invalid credentials"
            })
        }

        const refreshToken = jwt.sign({
            id: user._id,
        }, config.JWT_SECRET, { expiresIn: "7d" })

        const accessToken = jwt.sign({
            id: user._id,
        }, config.JWT_SECRET, { expiresIn: "15m" })

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "Strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        return res.status(200).json({
            message: "User logged in successfully",
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            },
            accessToken
        })

    } catch (error) {
        console.error(error)
        throw new Error("Login operation failed❌")
    }
}


export const getMe = async (req, res) => {
    const userId = req.user.id;

    const user = await userModel.findById(userId);

    return res.status(200).json({
        message: "User fetched successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })
}

