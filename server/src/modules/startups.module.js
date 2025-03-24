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
      vmsTotalInvestment,
    } = req.body;

    const startup = await prisma.startup.create({
      data: {
        companyName,
        introduce,
        category,
        totalAmount: BigInt(totalAmount),
        salesRevenue: BigInt(salesRevenue),
        numOfEmployees,
        vmsTotalInvestment: BigInt(vmsTotalInvestment),
      },
    });

    res.json(formatStartupBigInt(startup));
  } catch (e) {
    next(e);
  }
});

/**
 * 전체 기업 리스트 조회
 */
startupsRouter.get("/", async (req, res, next) => {
  try {
    const startups = await prisma.startup.findMany({
      select: {
        id: true,
        companyName: true,
        introduce: true,
        category: true,
        totalAmount: true,
        salesRevenue: true,
        numOfEmployees: true,
        createdAt: true,
      },
    });

    const formatted = startups.map(formatStartupBigInt);
    res.json(formatted);
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

    if (isNaN(startupId)) {
      throw new Exception(400, "올바르지 않은 ID입니다.");
    }

    const startup = await prisma.startup.findUnique({
      where: { id: startupId },
    });

    if (!startup) {
      throw new Exception(404, "존재하지 않는 기업입니다.");
    }

    res.json(formatStartupBigInt(startup));
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

    if (isNaN(startupId)) {
      throw new Exception(400, "올바르지 않은 ID입니다.");
    }

    const existing = await prisma.startup.findUnique({
      where: { id: startupId },
    });

    if (!existing) {
      throw new Exception(404, "해당 기업이 존재하지 않습니다.");
    }

    await prisma.investment.deleteMany({ where: { startupId } });
    await prisma.startup.delete({ where: { id: startupId } });

    res.json({ message: "기업 및 가상 투자 내역 삭제 완료" });
  } catch (e) {
    next(e);
  }
});

/**
 * BigInt 필드를 string으로 변환하는 함수
 */
function formatStartupBigInt(startup) {
  return {
    ...startup,
    totalAmount: startup.totalAmount?.toString(),
    salesRevenue: startup.salesRevenue?.toString(),
    vmsTotalInvestment: startup.vmsTotalInvestment?.toString(),
  };
}

module.exports = startupsRouter;
