const Company = require("../models/Company");

const createCompany = async (req, res) => {
  try {
    const { name, description, website, location } = req.body;

    const company = await Company.create({
      name,
      description,
      website,
      location,
      createdBy: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: "Company created successfully",
      company,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createCompany,
};