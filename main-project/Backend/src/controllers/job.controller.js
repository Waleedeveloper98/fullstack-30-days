import mongoose from "mongoose";
import jobModel from "../models/job.model.js";
import userModel from "../models/user.model.js";

export const createAJob = async (req, res) => {
    const userId = req.user.id;
    const { title, description, salary, company, createdBy } = req.body

    const user = await userModel.findById(userId)

    if (user.role !== "Recruiter") {
        return res.status(400).json({
            message: "Only Recruiter can create a job"
        })
    }

    const job = await jobModel.create({
        title,
        description,
        salary,
        company,
        createdBy: user._id
    })

    return res.status(201).json({
        message: "job created successfully",
        job
    })
}

export const getAllJobs = async (req, res) => {
    const jobs = await jobModel.find();

    return res.status(200).json({
        message: "All jobs fetched successfully",
        jobs
    })
}

export const getAJob = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            message: "Invalid Id"
        })
    }

    const job = await jobModel.findById(id)

    return res.status(200).json({
        message: "Job fetched successfully",
        job
    })
}

export const updateAJob = async (req, res) => {
    const userId = req.user.id;
    const { id } = req.params;
    const { title, description, salary, company } = req.body
    const user = await userModel.findById(userId)

    if (user.role !== "Recruiter") {
        return res.status(400).json({
            message: "Only Recruiter can update a job"
        })
    }

    const updatedJob = await jobModel.findByIdAndUpdate(id, { title, description, salary, company }, { new: true })

    return res.status(200).json({
        message: "job updated successfully",
        updatedJob
    })
}

export const deleteAJob = async (req, res) => {
    const userId = req.user.id;
    const { id } = req.params;
    const user = await userModel.findById(userId)

    if (user.role !== "Recruiter") {
        return res.status(400).json({
            message: "Only Recruiter can delete a job"
        })
    }

    await jobModel.findByIdAndDelete(id)

    return res.status(200).json({
        message: "job deleted successfully",
    })
}