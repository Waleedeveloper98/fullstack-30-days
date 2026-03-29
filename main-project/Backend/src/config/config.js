import "dotenv/config"

if (!process.env.MONGO_URI) {
    throw new Error(`MONGO_URI is not defined`)
}

if (!process.env.PORT) {
    throw new Error("PORT is not defined in .env default running on port 8000")
}

if (!process.env.ALLOWED_ORIGIN && process.env.NODE_ENV === "production") {
    throw new Error(`ALLOWED_ORIGIN must be set in production`)
}

const config = {
    MONGO_URI: process.env.MONGO_URI,
    PORT: process.env.PORT || 8000,
    NODE_ENV: process.env.NODE_ENV,
    ALLOWED_ORIGIN: process.env.ALLOWED_ORIGIN,
}

export default config;