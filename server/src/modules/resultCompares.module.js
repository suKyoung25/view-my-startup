const express = require("express");
const prisma = require("../db/prisma/client.prisma");
const Exception = require("../exceptions");

const resultCompareRouter = express.Router();

resultCompareRouter.get("/", async (req, res, next) => {
  try {
    const { sortBy = "pickAsMyStartupCount", order = "desc" } = req.query;

    const companies = await prisma.company.findMany();

    const validSortFields = {
      pickAsMyStartupCount: "pickAsMyStartupCount",
      pickAsComparisonCount: "pickAsComparisonCount",
    };

    let sortedCompanies = [...companies];

    if (validSortFields[sortBy]) {
      sortedCompanies.sort((a, b) => {
        const valA = a[validSortFields[sortBy]];
        const valB = b[validSortFields[sortBy]];
        return order === "asc" ? valA - valB : valB - valA;
      });
    }

    const result = sortedCompanies.map((company) => ({
      id: company.id,
      imageUrl: company.imageUrl,
      name: company.name,
      description: company.description,
      category: company.category,
      pickAsMyStartupCount: company.pickAsMyStartupCount,
      pickAsComparisonCount: company.pickAsComparisonCount,
    }));

    res.json(result);
  } catch (e) {
    next(e);
  }
});

module.exports = resultCompareRouter;
