import { Router } from "express";
import { createACompany, deleteACompany, getACompany, updateACompany } from "../controllers/company.controller.js";
import identifyUser from "../middlewares/auth.middleware.js";
const companyRouter = Router()

companyRouter.post("/create", identifyUser, createACompany)
companyRouter.get("/:id", identifyUser, getACompany)
companyRouter.delete("/:id", identifyUser, deleteACompany)
companyRouter.patch("/:id", identifyUser, updateACompany)

export default companyRouter