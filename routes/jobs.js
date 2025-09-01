import { Router } from "express";
import { createJob, getAllJobs,  deleteJob } from "../controllers/jobsController.js";

const router = Router();

// Create a job
router.post("/createJob", createJob);

// Get all jobs
router.get("/getJobs", getAllJobs);



router.delete("/deleteJob/:id", deleteJob);

export default router;