// const express = require("express");
// const prisma = require("../db/prisma/client.prisma");
// const Exception = require("../exceptions");

// const resultCompareRouter = express.Router();

// resultCompareRouter.get("/", async (req, res, next) => {
//   try {
//     const { sortBy = "pickAsMyStartupCount", order = "desc" } = req.query;

//     const companies = await prisma.company.findMany();

//     const validSortFields = {
//       pickAsMyStartupCount: "pickAsMyStartupCount",
//       pickAsComparisonCount: "pickAsComparisonCount",
//     };

//     let sortedCompanies = [...companies];

//     if (validSortFields[sortBy]) {
//       sortedCompanies.sort((a, b) => {
//         const valA = a[validSortFields[sortBy]];
//         const valB = b[validSortFields[sortBy]];
//         return order === "asc" ? valA - valB : valB - valA;
//       });
//     }

//     const result = sortedCompanies.map((company) => ({
//       id: company.id,
//       imageUrl: company.imageUrl,
//       name: company.name,
//       description: company.description,
//       category: company.category,
//       pickAsMyStartupCount: company.pickAsMyStartupCount,
//       pickAsComparisonCount: company.pickAsComparisonCount,
//     }));

//     res.json(result);
//   } catch (e) {
//     next(e);
//   }
// });

// module.exports = resultCompareRouter;


const express = require("express");
const prisma = require("../db/prisma/client.prisma");
const Exception = require("../exceptions");

const resultCompareRouter = express.Router();

resultCompareRouter.get("/", async (req, res, next) => {
  try {
    const { myCompanyId, compareCompanyIds = "" } = req.query;

    if (!myCompanyId) {
      throw new Exception.BadRequest("myCompanyId is required");
    }

    const compareIdsArray = compareCompanyIds
      .split(",")
      .map((id) => Number(id))
      .filter((id) => !isNaN(id));

    const [myCompany, compareCompanies] = await Promise.all([
      prisma.company.findUnique({
        where: { id: Number(myCompanyId) },
      }),
      prisma.company.findMany({
        where: {
          id: {
            in: compareIdsArray,
          },
        },
      }),
    ]);

    if (!myCompany) {
      throw new Exception.NotFound("My company not found");
    }

    res.json({
      myCompany: {
        id: myCompany.id,
        name: myCompany.name,
        imageUrl: myCompany.imageUrl,
        description: myCompany.description,
        category: myCompany.category,
        pickAsMyStartupCount: myCompany.pickAsMyStartupCount,
        pickAsComparisonCount: myCompany.pickAsComparisonCount,
        investmentAmount: myCompany.investmentAmount,
        revenue: myCompany.revenue,
        employees: myCompany.employees,
      },
      compareCompanies: compareCompanies.map((company) => ({
        id: company.id,
        name: company.name,
        imageUrl: company.imageUrl,
        description: company.description,
        category: company.category,
        pickAsMyStartupCount: company.pickAsMyStartupCount,
        pickAsComparisonCount: company.pickAsComparisonCount,
        investmentAmount: company.investmentAmount,
        revenue: company.revenue,
        employees: company.employees,
      })),
    });
  } catch (e) {
    next(e);
  }
});

module.exports = resultCompareRouter;
