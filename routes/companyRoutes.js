const express = require("express");
const router = express.Router();

const isAuthenticated = require("../middleware/isAuthenticated");
const {
  createCompany,
} = require("../controllers/companyController");

router.post("/", isAuthenticated, createCompany);

module.exports = router;