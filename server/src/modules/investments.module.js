// src/modules/investments.module.js
const express = require("express");
const prisma = require("../db/prisma/client.prisma");
const Exception = require("../exceptions");

const investmentsRouter = express.Router();

/**
 * BigInt 안전 변환 유틸
 */
function serializeBigInts(obj) {
  return JSON.parse(
    JSON.stringify(obj, (_, value) =>
      typeof value === "bigint" ? value.toString() : value
    )
  );
}

/**
 * 1. 가상 투자 등록 (유저 자동 생성 포함)
 */
investmentsRouter.post("/", async (req, res, next) => {
  try {
    const { username, email, password, startupId, amount, comment } = req.body;

    if (!username || !email || !password || !startupId || !amount) {
      throw new Exception(400, "필수 항목 누락");
    }

    // 유저 생성 or 조회
    let user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      user = await prisma.user.create({
        data: { username, email, password },
      });
    }

    const investment = await prisma.investment.create({
      data: {
        amount: BigInt(amount),
        comment,
        password,
        startupId: Number(startupId),
        userId: user.id,
      },
    });

    await prisma.startup.update({
      where: { id: Number(startupId) },
      data: {
        vmsTotalInvestment: {
          increment: BigInt(amount),
        },
      },
    });

    res.status(201).json({
      message: "가상 투자 등록 완료",
      investmentId: investment.id,
    });
  } catch (e) {
    next(e);
  }
});

/**
 * 2. 가상 투자 수정
 */
investmentsRouter.put("/:investmentId", async (req, res, next) => {
  try {
    const { investmentId } = req.params;
    const { password, amount, comment } = req.body;

    const investment = await prisma.investment.findUnique({
      where: { id: investmentId },
    });
    if (!investment) throw new Exception(404, "투자 내역이 존재하지 않습니다.");
    if (investment.password !== password)
      throw new Exception(403, "비밀번호가 일치하지 않습니다.");

    const updated = await prisma.investment.update({
      where: { id: investmentId },
      data: {
        amount: BigInt(amount),
        comment,
      },
    });

    res.json({
      message: "투자 수정 완료",
      updated: serializeBigInts(updated),
    });
  } catch (e) {
    next(e);
  }
});

/**
 * 3. 가상 투자 삭제
 */
investmentsRouter.delete("/:investmentId", async (req, res, next) => {
  try {
    const { investmentId } = req.params;
    const { password } = req.body;

    const investment = await prisma.investment.findUnique({
      where: { id: investmentId },
    });
    if (!investment) throw new Exception(404, "투자 내역이 존재하지 않습니다.");
    if (investment.password !== password)
      throw new Exception(403, "비밀번호가 일치하지 않습니다.");

    await prisma.startup.update({
      where: { id: investment.startupId },
      data: {
        vmsTotalInvestment: {
          decrement: investment.amount,
        },
      },
    });

    await prisma.investment.delete({ where: { id: investmentId } });
    res.json({ message: "투자 삭제 완료" });
  } catch (e) {
    next(e);
  }
});

/**
 * 4. 가상 투자 순위 조회
 */
investmentsRouter.get("/rankings", async (req, res, next) => {
  try {
    const startups = await prisma.startup.findMany({
      orderBy: {
        vmsTotalInvestment: "desc",
      },
      select: {
        id: true,
        companyName: true,
        category: true,
        introduce: true,
        vmsTotalInvestment: true,
      },
    });

    const ranked = startups.map((startup, index) => ({
      rank: index + 1,
      companyId: startup.id,
      companyName: startup.companyName,
      category: startup.category,
      introduce: startup.introduce,
      vmsTotalInvestment: startup.vmsTotalInvestment.toString(),
    }));

    res.json(ranked);
  } catch (e) {
    next(e);
  }
});

/**
 * 6. 전체 가상 투자 내역 조회
 */
investmentsRouter.get("/", async (req, res, next) => {
  try {
    const investments = await prisma.investment.findMany({
      include: {
        startup: {
          select: {
            id: true,
            companyName: true,
          },
        },
        user: {
          select: {
            id: true,
            username: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const formatted = investments.map((inv) => ({
      id: inv.id,
      amount: inv.amount.toString(),
      comment: inv.comment,
      createdAt: inv.createdAt,
      startup: inv.startup,
      user: inv.user,
    }));

    res.json(formatted);
  } catch (e) {
    next(e);
  }
});

module.exports = investmentsRouter;
