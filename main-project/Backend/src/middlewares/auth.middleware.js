import config from "../config/config.js";
import jwt from "jsonwebtoken"

const identifyUser = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(400).json({
            message: "authHeader is not provided",
        })
    }

    const accessToken = authHeader?.split(" ")[1]

    if (!accessToken) {
        return res.status(400).json({
            message: "Token not found"
        })
    }

    try {
        const decoded = jwt.verify(accessToken, config.JWT_SECRET)
        req.user = decoded;
        next()
    } catch (error) {
        console.log(error.message)
    }
}

export default identifyUser