// compares.module.js
const express = require("express");
const prisma = require("../db/prisma/client.prisma");
const Exception = require("../exceptions");

const comparesRouter = express.Router();

/**
 * 기업 비교 API
 * body: {
 *   myCompanyId: 1,
 *   compareCompanyIds: [2, 3, 4],
 *   sortBy: "totalInvestment" | "salesRevenue" | "numOfEmployees",
 *   order: "desc" | "asc"
 * }
 */
comparesRouter.post("/", async (req, res, next) => {
  try {
    const { myCompanyId, compareCompanyIds, sortBy, order } = req.body;

    if (!myCompanyId || !compareCompanyIds || compareCompanyIds.length === 0) {
      throw new Exception(400, "비교할 기업 정보를 제공해주세요.");
    }

    const idsToFetch = [myCompanyId, ...compareCompanyIds];

    const companies = await prisma.startup.findMany({
      where: {
        id: {
          in: idsToFetch,
        },
      },
    });

    const companiesWithInvestment = await Promise.all(
      companies.map(async (company) => {
        const total = await prisma.investment.aggregate({
          where: { startupId: company.id },
          _sum: { amount: true },
        });

        return {
          id: company.id,
          companyName: company.companyName,
          introduce: company.introduce,
          category: company.category,
          totalAmount: company.totalAmount.toString(),
          salesRevenue: company.salesRevenue.toString(),
          numOfEmployees: company.numOfEmployees,
          totalInvestment: total._sum.amount ?? BigInt(0),
          createdAt: company.createdAt,
        };
      })
    );

    // 정렬 옵션 처리
    const validSortFields = {
      totalInvestment: "totalInvestment",
      salesRevenue: "salesRevenue",
      numOfEmployees: "numOfEmployees",
    };

    if (sortBy && validSortFields[sortBy]) {
      companiesWithInvestment.sort((a, b) => {
        const valA = BigInt(a[validSortFields[sortBy]]);
        const valB = BigInt(b[validSortFields[sortBy]]);
        return order === "asc" ? Number(valA - valB) : Number(valB - valA);
      });
    }

    // BigInt to string 변환 후 응답
    const formatted = companiesWithInvestment.map((c) => ({
      ...c,
      totalInvestment: c.totalInvestment.toString(),
    }));

    res.json(formatted);
  } catch (e) {
    next(e);
  }
});

module.exports = comparesRouter;
