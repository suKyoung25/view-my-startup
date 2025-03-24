const express = require("express");
const startupsRouter = require("./startups.module");
const usersRouter = require("./users.module");
const investmentsRouter = require("./investments.module");
const compareRouter = require("./compare.module");

const router = express.Router();

router.use("/startups", startupsRouter);
router.use("/users", usersRouter);
router.use("/investments", investmentsRouter);
router.use("/compare", compareRouter);

module.exports = router;
