const express = require("express");
const prisma = require("../db/prisma/client.prisma");
const Exception = require("../exceptions");
const bcrypt = require("bcrypt");

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
 * 1. 가상 투자 등록
 */
investmentsRouter.post("/", async (req, res, next) => {
  try {
    const { username, password, startupId, amount, comment } = req.body;

    if (!username || !password || !startupId || !amount) {
      throw new Exception(400, "필수 항목 누락");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const investment = await prisma.investment.create({
      data: {
        username,
        password: hashedPassword,
        startupId: Number(startupId),
        amount: BigInt(amount),
        comment,
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
      where: { id: Number(investmentId) },
    });

    if (!investment) throw new Exception(404, "투자 내역이 존재하지 않습니다.");

    const isMatch = await bcrypt.compare(password, investment.password);
    if (!isMatch) throw new Exception(403, "비밀번호가 일치하지 않습니다.");

    const updated = await prisma.investment.update({
      where: { id: Number(investmentId) },
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
      where: { id: Number(investmentId) },
    });

    if (!investment) throw new Exception(404, "투자 내역이 존재하지 않습니다.");

    const isMatch = await bcrypt.compare(password, investment.password);
    if (!isMatch) throw new Exception(403, "비밀번호가 일치하지 않습니다.");

    await prisma.investment.delete({ where: { id: Number(investmentId) } });

    res.json({ message: "투자 삭제 완료" });
  } catch (e) {
    next(e);
  }
});

/**
 * 4. 전체 가상 투자 내역 조회
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
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const formatted = investments.map((inv) => ({
      id: inv.id,
      username: inv.username,
      amount: inv.amount.toString(),
      comment: inv.comment,
      createdAt: inv.createdAt,
      startup: inv.startup,
    }));

    res.json(formatted);
  } catch (e) {
    next(e);
  }
});


module.exports = investmentsRouter;
