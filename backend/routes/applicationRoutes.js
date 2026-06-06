const express = require("express");

const {
  applyJob,
  getUserApplications,
  getJobApplicants,
  updateApplicationStatus,
} = require("../controllers/applicationController");

const isAuthenticated = require("../middleware/isAuthenticated");

const router = express.Router();

// Candidate
router.post(
  "/apply",
  isAuthenticated,
  applyJob
);

router.get(
  "/my-applications",
  isAuthenticated,
  getUserApplications
);

// Recruiter
router.get(
  "/job/:jobId",
  isAuthenticated,
  getJobApplicants
);

router.put(
  "/:applicationId/status",
  isAuthenticated,
  updateApplicationStatus
);

module.exports = router;