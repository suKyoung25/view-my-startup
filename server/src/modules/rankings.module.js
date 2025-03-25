const express = require("express");
const prisma = require("../db/prisma/client.prisma");
const Exception = require("../exceptions");

const rankingsRouter = express.Router();

/**
 * View My Startup 투자 현황 조회 (가상 투자 총합 기준)
 */
rankingsRouter.get("/virtual", async (req, res, next) => {
  try {
    const startups = await prisma.startup.findMany();

    const ranked = await Promise.all(
      startups.map(async (startup) => {
        const total = await prisma.investment.aggregate({
          where: { startupId: startup.id },
          _sum: { amount: true },
        });

        return {
          id: startup.id,
          companyName: startup.companyName,
          introduce: startup.introduce,
          category: startup.category,
          totalInvestment: total._sum.amount ?? BigInt(0),
        };
      })
    );

    const sorted = ranked
      .sort((a, b) => Number(b.totalInvestment - a.totalInvestment))
      .map((startup, index) => ({
        rank: index + 1,
        companyName: startup.companyName,
        category: startup.category,
        introduce: startup.introduce,
        totalInvestment: startup.totalInvestment.toString(),
      }));

    res.json(sorted);
  } catch (e) {
    next(e);
  }
});

module.exports = rankingsRouter;
