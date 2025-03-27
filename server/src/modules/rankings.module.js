const express = require("express");
const prisma = require("../db/prisma/client.prisma");

const rankingsRouter = express.Router();

/**
 * [선택] 가상 투자 상위 3개 기업만 조회
 */
rankingsRouter.get("/virtual/top3", async (req, res, next) => {
  try {
    const topCompanies = await prisma.$queryRaw`
      SELECT
        c.id,
        c.name,
        c.description,
        c.category,
        c."realInvestmentAmount",
        c."revenue",
        c."numberOfEmployees",
        COALESCE(SUM(i.amount), 0) AS "totalVirtualInvestment"
      FROM "Company" c
      LEFT JOIN "Investment" i ON c.id = i."companyId"
      GROUP BY c.id
      ORDER BY "totalVirtualInvestment" DESC
      LIMIT 3
    `;

    const result = topCompanies.map((company, index) => ({
      rank: index + 1,
      companyId: company.id,
      name: company.name,
      category: company.category,
      description: company.description,
      realInvestmentAmount: company.realInvestmentAmount,
      revenue: company.revenue,
      numberOfEmployees: company.numberOfEmployees,
      totalVirtualInvestment: Number(company.totalVirtualInvestment),
    }));

    res.json(result);
  } catch (e) {
    next(e);
  }
});

/**
 * View My Startup 투자 랭킹 조회 (가상 투자 총합 기준)
 */
rankingsRouter.get("/virtual", async (req, res, next) => {
  try {
    const rankedCompanies = await prisma.$queryRaw`
      SELECT
        c.id,
        c.name,
        c.description,
        c.category,
        c."realInvestmentAmount",
        c."revenue",
        c."numberOfEmployees",
        COALESCE(SUM(i.amount), 0) AS "totalVirtualInvestment"
      FROM "Company" c
      LEFT JOIN "Investment" i ON c.id = i."companyId"
      GROUP BY c.id
      ORDER BY "totalVirtualInvestment" DESC
    `;

    const result = rankedCompanies.map((company, index) => ({
      rank: index + 1,
      companyId: company.id,
      name: company.name,
      category: company.category,
      description: company.description,
      realInvestmentAmount: company.realInvestmentAmount,
      revenue: company.revenue,
      numberOfEmployees: company.numberOfEmployees,
      totalVirtualInvestment: Number(company.totalVirtualInvestment),
    }));

    res.json(result);
  } catch (e) {
    next(e);
  }
});

module.exports = rankingsRouter;
