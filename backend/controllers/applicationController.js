const Application = require("../models/Application");

const applyJob = async (req, res) => {
  try {
    const { jobId, userId, coverLetter, resumeUrl } = req.body;

    // 1. validation
    if (!jobId || !userId) {
      return res.status(400).json({
        success: false,
        message: "jobId and userId are required",
      });
    }

    // 2. check duplicate application
    const existingApplication = await Application.findOne({
      jobId,
      userId,
    });

    if (existingApplication) {
      return res.status(400).json({
        success: false,
        message: "You have already applied for this job",
      });
    }

    // 3. create application
    const application = await Application.create({
      jobId,
      userId,
      coverLetter,
      resumeUrl,
    });

    return res.status(201).json({
      success: true,
      message: "Job applied successfully",
      application,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// get user application

const getUserApplications = async (req, res) => {
  try {
    const userId = req.user.id;

    const applications = await Application.find({
      userId,
    })
      .populate({
  path: "jobId",
  select: "title salary location company",
  populate: {
    path: "company",
    select: "name",
  },
})
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      applications,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// get job applicants

const getJobApplicants = async (req, res) => {
  try {
    const { jobId } = req.params;

    const applications = await Application.find({ jobId })
      .populate("userId", "name email")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: applications.length,
      applications,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// application status

const updateApplicationStatus = async (req, res) => {
  try {
    const { applicationId } = req.params;
    const { status } = req.body;

    const allowedStatus = [
      "applied",
      "shortlisted",
      "rejected",
      "selected",
    ];

    if (!allowedStatus.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status",
      });
    }

    const application = await Application.findByIdAndUpdate(
      applicationId,
      { status },
      { new: true }
    );

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Status updated successfully",
      application,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  applyJob,
  getUserApplications,
  getJobApplicants,
  updateApplicationStatus
};