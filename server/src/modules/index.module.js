const express = require("express");
const companiesRouter = require("./companies.module");
const investmentsRouter = require("./investments.module");
const resultCompareRouter = require("./resultCompares.module");
const rankingsRouter = require("./rankings.module");

const router = express.Router();

router.use("/api/companies", companiesRouter);
router.use("/api/investments", investmentsRouter);
router.use("/api/resultCompare", resultCompareRouter);
router.use("/api/rankings", rankingsRouter);

module.exports = router;
