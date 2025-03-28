const express = require("express");
const prisma = require("../db/prisma/client.prisma");
const Exception = require("../exceptions");

const resultCompareRouter = express.Router();

// 비교 현황 조회 API
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

// 비교 결과 페이지용 API
resultCompareRouter.get("/data", async (req, res, next) => {
  try {
    const { sortBy = "investmentAmount", order = "desc" } = req.query;

    const validSortFields = {
      investmentAmount: "investmentAmount",
      revenue: "revenue",
      employees: "employees",
    };

    if (!validSortFields[sortBy]) {
      throw new Exception.BadRequest("Invalid sort field");
    }

    const companies = await prisma.company.findMany();

    const sorted = [...companies].sort((a, b) => {
      const valA = a[sortBy] ?? 0;
      const valB = b[sortBy] ?? 0;
      return order === "asc" ? valA - valB : valB - valA;
    });

    const result = sorted.map((company) => ({
      id: company.id,
      imageUrl: company.imageUrl,
      name: company.name,
      description: company.description,
      category: company.category,
      investmentAmount: company.investmentAmount,
      revenue: company.revenue,
      employees: company.employees,
    }));

    res.json(result);
  } catch (e) {
    next(e);
  }
});


module.exports = resultCompareRouter;
