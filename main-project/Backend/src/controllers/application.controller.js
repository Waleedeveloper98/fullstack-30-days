import applicationModel from "../models/application.model.js";
import { uploadFile } from "../services/imagekit.service.js"


export const createApplication = async (req, res) => {
    try {
        const { jobId } = req.params;
        const { status, appliedAt } = req.body
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        const result = await uploadFile(req.file);

        const application = await applicationModel.create({
            user: req.user.id,
            job: jobId,
            cv: result.url,
            status,
            appliedAt
        })

        return res.status(201).json({
            message: "Application created successfully",
            application
        })

    } catch (error) {
        console.error("Upload Error:", error);
        res.status(500).json({ message: "Upload failed", error: error.message });
    }
}