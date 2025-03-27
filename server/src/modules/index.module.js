const express = require("express");
const companiesRouter = require("./companies.module");
const investmentsRouter = require("./investments.module");
const resultCompareRouter = require("./resultCompares.module");
const rankingsRouter = require("./rankings.module");

const router = express.Router();

// 실제 페이지 기능에 맞는 경로 설정
router.use("/api/companies", companiesRouter);
router.use("/api/investments", investmentsRouter);
router.use("/api/resultCompare", resultCompareRouter);
router.use("/api/rankings", rankingsRouter);

module.exports = router;
