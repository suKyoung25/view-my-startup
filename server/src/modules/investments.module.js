const express = require("express");
const prisma = require("../db/prisma/client.prisma");
const Exception = require("../exceptions");
const bcrypt = require("bcrypt");

const investmentsRouter = express.Router();

/**
 * [1] 가상 투자 등록
 */
investmentsRouter.post("/", async (req, res, next) => {
  try {
    const { investorName, password, companyId, amount, comment } = req.body;

    if (!investorName || !password || !companyId || !amount) {
      throw new Exception(400, "필수 항목 누락");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const investment = await prisma.investment.create({
      data: {
        investorName,
        encryptedPassword: hashedPassword,
        companyId,
        amount: parseFloat(amount),
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
 * [2] 가상 투자 수정
 */
investmentsRouter.put("/:investmentId", async (req, res, next) => {
  try {
    const { investmentId } = req.params;
    const { password, amount, comment } = req.body;

    const investment = await prisma.investment.findUnique({
      where: { id: investmentId },
    });

    if (!investment) throw new Exception(404, "투자 내역이 존재하지 않습니다.");
    if (!investment.encryptedPassword)
      throw new Exception(500, "비밀번호 정보가 존재하지 않습니다.");

    const isMatch = await bcrypt.compare(
      password,
      investment.encryptedPassword
    );
    if (!isMatch) throw new Exception(403, "비밀번호가 일치하지 않습니다.");

    const updated = await prisma.investment.update({
      where: { id: investmentId },
      data: {
        amount: parseFloat(amount),
        comment,
      },
    });

    res.json({
      message: "투자 수정 완료",
      updated,
    });
  } catch (e) {
    next(e);
  }
});

/**
 * [3] 가상 투자 삭제
 */
investmentsRouter.delete("/:investmentId", async (req, res, next) => {
  try {
    const { investmentId } = req.params;
    const { password } = req.body;

    const investment = await prisma.investment.findUnique({
      where: { id: investmentId },
    });

    if (!investment) throw new Exception(404, "투자 내역이 존재하지 않습니다.");
    if (!investment.encryptedPassword)
      throw new Exception(500, "비밀번호 정보가 존재하지 않습니다.");

    const isMatch = await bcrypt.compare(
      password,
      investment.encryptedPassword
    );
    if (!isMatch) throw new Exception(403, "비밀번호가 일치하지 않습니다.");

    await prisma.investment.delete({ where: { id: investmentId } });

    res.json({ message: "투자 삭제 완료" });
  } catch (e) {
    next(e);
  }
});

/**
 * [4] 전체 가상 투자 내역 조회 (투자 현황)
 */
investmentsRouter.get("/", async (req, res, next) => {
  try {
    const investments = await prisma.investment.findMany({
      include: {
        company: {
          select: {
            id: true,
            name: true,
            category: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const result = investments.map((i) => ({
      id: i.id,
      investorName: i.investorName,
      amount: i.amount,
      comment: i.comment,
      createdAt: i.createdAt,
      company: i.company,
    }));

    res.json(result);
  } catch (e) {
    next(e);
  }
});

module.exports = investmentsRouter;
