import { Op } from "sequelize";
import Job from "../models/Jobs.js";

/** POST /api/jobs */
export const createJob = async (req, res) => {
  try {
    const { title, company, location, description, isActive = true, requirements = [] } = req.body;

    // Basic validation
    if (!title || !company || !location || !description) {
      return res.status(400).json({
        error: "title, company, location, and description are required",
      });
    }

    // Ensure requirements is always an array
    const job = await Job.create({
      title,
      company,
      location,
      description,
      isActive,
      requirements: Array.isArray(requirements) ? requirements : [],
    });

    res.status(201).json(job);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

/** GET /api/jobs?q=&location= */
export const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.findAll();
    res.status(200).json(jobs);   // ✅ always respond with res
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/** DELETE /api/jobs/:id */
export const deleteJob = async (req, res) => {
  try {
    const job = await Job.findByPk(req.params.id);
    if (!job) return res.status(404).json({ error: "Job not found" });
    await job.destroy();
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};