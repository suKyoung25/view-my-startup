const express = require("express");
const prisma = require("../db/prisma/client.prisma");
const Exception = require("../exceptions");

const resultCompareRouter = express.Router();

/**
 * 기업 비교 조회
 * body: {
 *   myCompanyId: "cuid",
 *   compareCompanyIds: ["cuid", "cuid"],
 *   sortBy: "totalInvestment" | "revenue" | "numberOfEmployees",
 *   order: "asc" | "desc"
 * }
 */
resultCompareRouter.post("/", async (req, res, next) => {
  try {
    const { myCompanyId, compareCompanyIds, sortBy, order } = req.body;

    if (!myCompanyId || !compareCompanyIds || compareCompanyIds.length === 0) {
      throw new Exception(400, "비교할 기업 정보를 제공해주세요.");
    }

    const idsToFetch = [myCompanyId, ...compareCompanyIds];

    const companies = await prisma.company.findMany({
      where: {
        id: {
          in: idsToFetch,
        },
      },
    });

    const companiesWithInvestment = await Promise.all(
      companies.map(async (company) => {
        const total = await prisma.investment.aggregate({
          where: { companyId: company.id },
          _sum: { amount: true },
        });

        return {
          id: company.id,
          name: company.name,
          description: company.description,
          category: company.category,
          realInvestmentAmount: company.realInvestmentAmount,
          revenue: company.revenue,
          numberOfEmployees: company.numberOfEmployees,
          totalInvestment: total._sum.amount ?? 0,
          createdAt: company.createdAt,
        };
      })
    );

    const validSortFields = {
      totalInvestment: "totalInvestment",
      revenue: "revenue",
      numberOfEmployees: "numberOfEmployees",
    };

    if (sortBy && validSortFields[sortBy]) {
      companiesWithInvestment.sort((a, b) => {
        const valA = a[validSortFields[sortBy]];
        const valB = b[validSortFields[sortBy]];
        return order === "asc" ? valA - valB : valB - valA;
      });
    }

    res.json(companiesWithInvestment);
  } catch (e) {
    next(e);
  }
});

module.exports = resultCompareRouter;
