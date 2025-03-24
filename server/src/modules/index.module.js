const express = require("express");
const startupsRouter = require("./startups.module");
const usersRouter = require("./users.module");
const investmentsRouter = require("./investments.module");

const router = express.Router();

router.use("/startups", startupsRouter);
router.use("/users", usersRouter);
router.use("/investments", investmentsRouter);

module.exports = router;
