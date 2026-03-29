import express from "express"
import helmet from "helmet"
import cors from "cors"
import config from "./config/config";
import { rateLimit } from 'express-rate-limit'

const app = express();

app.use(helmet())
app.use(cors({
    origin: config.ALLOWED_ORIGIN || "*",
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
}))

app.use(express.json())

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, //15 minutes
    limit: 100,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        message: "Too many requests, please try again later."
    }
})

app.use(limiter)


export default app;