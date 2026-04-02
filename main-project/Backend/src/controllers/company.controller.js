import mongoose from "mongoose";
import companyModel from "../models/company.model.js";
import userModel from "../models/user.model.js";

export const createACompany = async (req, res) => {
    const { name, details, location } = req.body
    const userId = req.user.id;

    const user = await userModel.findById(userId).select({ role: "Recruiter" })

    if (!user.role === "Recruiter") {
        return res.status(400).json(
            { message: "Only Recruiter can create company" }
        )
    }

    const company = await companyModel.create({
        name,
        details,
        location,
        createdBy: user._id
    })

    return res.status(201).json({
        message: "Company created successfully",
        company
    })
}

export const getACompany = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            message: "Invalid id"
        })
    }

    const company = await companyModel.findById(id);

    return res.status(200).json({
        message: "company fetched successfully",
        company
    })
}

export const deleteACompany = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            message: "Invalid Id"
        })
    }

    await companyModel.findByIdAndDelete(id)

    res.status(200).json({
        message: "company deleted successfully"
    })
}

export const updateACompany = async (req, res) => {
    const userId = req.user.id;
    const { id } = req.params;
    const { name, details, location } = req.body

    const user = await userModel.findById(userId)

    if (user.role !== "Recruiter") {
        return res.status(400).json({
            message: "Only Recruiter can update a company"
        })
    }

    const updatedCompany = await companyModel.findByIdAndUpdate(id, { name, details, location }, { new: true })

    return res.status(200).json({
        message: "Company updated successfully",
        updatedCompany
    })
}