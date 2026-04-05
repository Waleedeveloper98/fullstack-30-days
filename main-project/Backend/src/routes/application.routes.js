import { Router } from "express"
import { createApplication } from "../controllers/application.controller.js"
const applicationRouter = Router()
import multer from "multer"
import identifyUser from "../middlewares/auth.middleware.js"

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

applicationRouter.post("/create/:jobId", identifyUser, upload.single("pdf"), createApplication)

export default applicationRouter