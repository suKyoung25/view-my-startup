// src/modules/compare.module.js
const express = require("express");
const prisma = require("../db/prisma/client.prisma");
const Exception = require("../exceptions");
const compareRouter = express.Router();

/**
 * BigInt 변환 유틸 함수
 */
function serializeBigInts(obj) {
  return JSON.parse(
    JSON.stringify(obj, (_, value) =>
      typeof value === "bigint" ? value.toString() : value
    )
  );
}

/**
 * 스타트업 비교
 */
compareRouter.post("/", async (req, res, next) => {
  try {
    const { myCompanyId, compareCompanyIds } = req.body;

    if (!myCompanyId || !compareCompanyIds || compareCompanyIds.length === 0) {
      throw new Exception(400, "비교할 기업 정보를 제공해주세요.");
    }

    const companies = await prisma.startup.findMany({
      where: {
        id: {
          in: [myCompanyId, ...compareCompanyIds],
        },
      },
      orderBy: {
        totalAmount: "desc",
      },
    });

    const formatted = companies.map(serializeBigInts);
    res.json(formatted);
  } catch (e) {
    next(e);
  }
});

module.exports = compareRouter;
