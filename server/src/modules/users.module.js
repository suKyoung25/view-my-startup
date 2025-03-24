const express = require("express");
const prisma = require("../db/prisma/client.prisma");
const Exception = require("../exceptions");
const bcrypt = require("bcrypt");

const usersRouter = express.Router();

/**
 * 회원가입
 */
usersRouter.post("/sign-up", async (req, res, next) => {
  try {
    const { email, username, password } = req.body;

    const existingUser = await prisma.user.findUnique({ where: { username } });
    if (existingUser) throw new Exception(400, "이미 사용중인 username입니다.");

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
      },
    });

    // 비밀번호 제외하고 응답
    const { password: _, ...safeUser } = user;
    res.json(safeUser);
  } catch (e) {
    next(e);
  }
});

/**
 * 로그인
 */
usersRouter.post("/log-in", async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const existingUser = await prisma.user.findUnique({ where: { username } });
    if (!existingUser)
      throw new Exception(404, "존재하지 않는 username입니다.");

    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) throw new Exception(400, "비밀번호가 일치하지 않습니다.");

    res.send("로그인 되었습니다.");
  } catch (e) {
    next(e);
  }
});

/**
 * 전체 사용자 리스트 조회
 */
usersRouter.get("/", async (req, res, next) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        username: true,
        createdAt: true,
      },
    });
    res.json(users);
  } catch (e) {
    next(e);
  }
});

module.exports = usersRouter;
