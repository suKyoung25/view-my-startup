const express = require("express");
const prisma = require("../db/prisma/client.prisma");
const Exception = require("../exceptions");
const bcrypt = require("bcrypt");

const investmentsRouter = express.Router();

/**
 * 특정 투자 내역 비밀번호 확인
 */
investmentsRouter.post(
  "/:investmentId/verify-password",
  async (req, res, next) => {
    try {
      const { investmentId } = req.params;
      const { password } = req.body;

      const investment = await prisma.investment.findUnique({
        where: { id: investmentId },
      });

      if (!investment)
        throw new Exception(404, "투자 내역이 존재하지 않습니다.");
      if (!investment.encryptedPassword)
        throw new Exception(500, "비밀번호 정보가 존재하지 않습니다.");

      const isMatch = await bcrypt.compare(
        password,
        investment.encryptedPassword
      );
      if (!isMatch) throw new Exception(403, "비밀번호가 일치하지 않습니다.");

      res.json({ message: "비밀번호 일치", success: true });
    } catch (e) {
      next(e);
    }
  }
);

/**
 * 가상 투자 등록
 */
investmentsRouter.post("/", async (req, res, next) => {
  try {
    const { investorName, password, companyId, amount, comment } = req.body;

    if (!investorName || !password || !companyId || amount === undefined) {
      throw new Exception(400, "필수 항목 누락");
    }

    const parsedAmount = Number(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      throw new Exception(400, "투자 금액이 올바르지 않습니다.");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const investment = await prisma.investment.create({
      data: {
        investorName,
        encryptedPassword: hashedPassword,
        companyId,
        amount: parsedAmount, // 억 단위 그대로 저장
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
 * 가상 투자 수정
 */
investmentsRouter.put("/:investmentId", async (req, res, next) => {
  try {
    const { investmentId } = req.params;
    const { password, amount, comment, investorName } = req.body; // 투자자 이름도 추가

    console.log("[PUT] 투자 수정 요청:", {
      investmentId,
      investorName,
      amount,
      comment,
      password,
    });

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

    const parsedAmount = Number(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      throw new Exception(400, "수정할 투자 금액이 올바르지 않습니다.");
    }

    const updated = await prisma.investment.update({
      where: { id: investmentId },
      data: {
        investorName,
        amount: parsedAmount,
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
 * 가상 투자 삭제
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
 * 개별 투자 내역 전체 조회 (투자 내역용)
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
            imageUrl: true, // 이미지 잘 뜨도록 추가함
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

/**
 * 투자 현황 요약 조회 (기업별 누적 가상 투자 집계)
 */
investmentsRouter.get("/status", async (req, res, next) => {
  try {
    const virtualInvestments = await prisma.investment.groupBy({
      by: ["companyId"],
      _sum: {
        amount: true,
      },
    });

    const companies = await prisma.company.findMany();

    const result = companies.map((company) => {
      const investment = virtualInvestments.find(
        (v) => v.companyId === company.id
      );

      return {
        id: company.id,
        imageUrl: company.imageUrl,
        name: company.name,
        description: company.description,
        category: company.category,
        totalVirtualInvestmentAmount: investment?._sum.amount || 0,
        realInvestmentAmount: company.realInvestmentAmount,
      };
    });

    res.json(result);
  } catch (e) {
    next(e);
  }
});

module.exports = investmentsRouter;
