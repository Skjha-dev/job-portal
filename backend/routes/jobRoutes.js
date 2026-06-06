const express = require("express");
const router = express.Router();

const isAuthenticated = require("../middleware/isAuthenticated");

const {
  createJob,
  getAllJobs,
  getJobById,
  getRecruiterJobs
} = require("../controllers/jobController");

// CREATE JOB
router.post("/", isAuthenticated, createJob);

// GET ALL JOBS
router.get("/", getAllJobs);

// GET SINGLE JOB
router.get("/:id", getJobById);

// get requireter job

router.get(
  "/my-jobs",
  isAuthenticated,
  getRecruiterJobs
);

module.exports = router;