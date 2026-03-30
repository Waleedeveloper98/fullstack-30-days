import express from "express"
import helmet from "helmet"
import cors from "cors"
import config from "./config/config.js";
import { rateLimit } from 'express-rate-limit'
import morgan from "morgan"
import authRouter from "./routes/auth.routes.js";
import cookieParser from "cookie-parser"

const app = express();

app.use(helmet())
app.use(cors({
    origin: config.ALLOWED_ORIGIN,
    credentials: true,
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
}))

app.use(express.json())

app.use(morgan(config.NODE_ENV === "production" ? "combined" : "dev"))

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
app.use(cookieParser())

app.use("/api/auth", authRouter)

app.use((req, res) => {
    return res.status(404).json({
        message: "Does not found route"
    })
})


export default app;