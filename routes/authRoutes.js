const express = require("express");
const router = express.Router();
const isAuthenticated = require("../middleware/isAuthenticated");


const { register, login, getProfile } = require("../controllers/authController");

router.post("/register", register);
router.post("/login", login);
router.get("/profile", isAuthenticated, getProfile);

module.exports = router;