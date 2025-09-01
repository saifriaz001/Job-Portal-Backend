import Application from "../models/Application.js";
import Job from "../models/Jobs.js";

/**
 * POST /api/applications/:jobId
 * Create a new application for a job
 */
export const applyToJob = async (req, res) => {
  try {
    const { jobId } = req.params;
    const { applicantName, email, resume,  education, experience } = req.body;

    // ✅ check job exists
    const job = await Job.findByPk(jobId);
    if (!job) {
      return res.status(404).json({ error: "Job not found" });
    }

    // ✅ validate required fields
    if (!applicantName || !email || !resume) {
      return res.status(400).json({ error: "Name, email, and resume are required" });
    }

    // ✅ create application
    const application = await Application.create({
      applicantName,
      email,
      resume,       // stored as URL
      education,    // expected array
      experience,   // expected array
      jobId: job.id,
    });

    res.status(201).json({
      message: "Application submitted successfully",
      application,
    });
  } catch (error) {
    console.error("❌ Error applying to job:", error);
    res.status(500).json({ error: error.message });
  }
};

/**
 * GET /api/applications
 * Get all applications (optionally filter by jobId)
 */
export const getAllApplications = async (req, res) => {
  try {
    const { jobId } = req.query;

    const whereClause = jobId ? { jobId } : {};

    const applications = await Application.findAll({
      where: whereClause,
      order: [["createdAt", "DESC"]],
      include: [{ model: Job, attributes: ["id", "title", "company", "location"] }],
    });

    res.status(200).json(applications);
  } catch (error) {
    console.error("❌ Error fetching applications:", error);
    res.status(500).json({ error: error.message });
  }
};


export const deleteApplication = async (req, res) => {
  try {
    const { id } = req.params;

    const application = await Application.findByPk(id);
    if (!application) {
      return res.status(404).json({ error: "Application not found" });
    }

    await application.destroy();
    res.status(200).json({ message: "✅ Application deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting application:", error);
    res.status(500).json({ error: error.message });
  }
};