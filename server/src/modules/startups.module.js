const express = require("express");
const prisma = require("../db/prisma/client.prisma");
const Exception = require("../exceptions");

const startupsRouter = express.Router();

/**
 * 기업 등록
 */
startupsRouter.post("/", async (req, res, next) => {
  try {
    const {
      companyName,
      introduce,
      category,
      totalAmount,
      salesRevenue,
      numOfEmployees,
    } = req.body;

    const startup = await prisma.startup.create({
      data: {
        companyName,
        introduce,
        category,
        totalAmount: BigInt(totalAmount),
        salesRevenue: BigInt(salesRevenue),
        numOfEmployees,
      },
    });

    res.json(formatStartupBigInt(startup));
  } catch (e) {
    next(e);
  }
});


/**
 * 투자 랭킹 조회 (투자금 총액 기준) - 반드시 먼저 등록
 */
startupsRouter.get("/rankings", async (req, res, next) => {
  try {
    const startups = await prisma.startup.findMany();

    const withInvestmentTotals = await Promise.all(
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

    const sorted = withInvestmentTotals
      .sort((a, b) => Number(b.totalInvestment - a.totalInvestment))
      .map((startup, index) => ({
        rank: index + 1,
        companyId: startup.id,
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


/**
 * 전체 기업 리스트 조회
 */
startupsRouter.get("/", async (req, res, next) => {
  try {
    const startups = await prisma.startup.findMany();

    const result = await Promise.all(
      startups.map(async (startup) => {
        const total = await prisma.investment.aggregate({
          where: { startupId: startup.id },
          _sum: { amount: true },
        });

        return {
          ...formatStartupBigInt(startup),
          totalInvestment: total._sum.amount?.toString() ?? "0", // 동적으로 계산한 값만 응답
        };
      })
    );

    res.json(result);
  } catch (e) {
    next(e);
  }
});

/**
 * 특정 기업 상세 조회
 */
startupsRouter.get("/:startupId", async (req, res, next) => {
  try {
    const startupId = Number(req.params.startupId);
    if (isNaN(startupId)) throw new Exception(400, "올바르지 않은 ID입니다.");

    const startup = await prisma.startup.findUnique({
      where: { id: startupId },
    });

    if (!startup) throw new Exception(404, "존재하지 않는 기업입니다.");

    const total = await prisma.investment.aggregate({
      where: { startupId },
      _sum: { amount: true },
    });

    res.json({
      ...formatStartupBigInt(startup),
      totalInvestment: total._sum.amount?.toString() ?? "0", // 여기도 계산해서 응답
    });
  } catch (e) {
    next(e);
  }
});

/**
 * 기업 삭제
 */
startupsRouter.delete("/:startupId", async (req, res, next) => {
  try {
    const startupId = Number(req.params.startupId);

    if (isNaN(startupId)) throw new Exception(400, "올바르지 않은 ID입니다.");

    const existing = await prisma.startup.findUnique({
      where: { id: startupId },
    });

    if (!existing) throw new Exception(404, "해당 기업이 존재하지 않습니다.");

    await prisma.investment.deleteMany({ where: { startupId } });
    await prisma.startup.delete({ where: { id: startupId } });

    res.json({ message: "기업 및 가상 투자 내역 삭제 완료" });
  } catch (e) {
    next(e);
  }
});


/**
 * BigInt 필드 문자열 변환
 */
function formatStartupBigInt(startup) {
  return {
    id: startup.id,
    companyName: startup.companyName,
    introduce: startup.introduce,
    category: startup.category,
    totalAmount: startup.totalAmount?.toString(),
    salesRevenue: startup.salesRevenue?.toString(),
    numOfEmployees: startup.numOfEmployees,
    createdAt: startup.createdAt,
  };
}

module.exports = startupsRouter;
