import { Router } from "express"
import { createAJob, getAJob, deleteAJob, getAllJobs, updateAJob } from "../controllers/job.controller.js";
import identifyUser from "../middlewares/auth.middleware.js";
const jobRouter = Router()

jobRouter.post("/create", identifyUser, createAJob)
jobRouter.get("/", identifyUser, getAllJobs)
jobRouter.get("/:id", identifyUser, getAJob)
jobRouter.patch("/:id", identifyUser, updateAJob)
jobRouter.delete("/:id", identifyUser, deleteAJob)

export default jobRouter;