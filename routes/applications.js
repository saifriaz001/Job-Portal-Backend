import { Router } from "express";
import { applyToJob, getAllApplications , deleteApplication } from "../controllers/applicationsController.js";

const router = Router();

// Applicant submits form
router.post("/apply/:jobId", applyToJob);

// Admin fetches all applications (optionally filter by jobId)
router.get("/allApplications", getAllApplications);

router.delete("/deleteApplication/:id", deleteApplication);

export default router;
