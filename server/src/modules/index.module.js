const express = require("express");
const startupsRouter = require("./startups.module");
const investmentsRouter = require("./investments.module");
const comparesRouter = require("./compares.module");
const rankingsRouter = require("./rankings.module");

const router = express.Router();

router.use("/startups", startupsRouter);
router.use("/investments", investmentsRouter);
router.use("/compares", comparesRouter);
router.use("/rankings", rankingsRouter);

module.exports = router;
