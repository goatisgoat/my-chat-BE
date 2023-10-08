const express = require("express");
const userController = require("../controller/user.controller");
const authController = require("../controller/auth.controller");

const router = express.Router();

//회원 생성
router.post("/", userController.createUser);
router.post("/login", userController.loginWithEmail);

//회원 찾기
router.get("/:userId", userController.findUser);
router.post("/find-friend", userController.findUserInMessage);
router.get("/all-users/:userId", userController.findAllUsers);

//스토리지 값으로 유저 찾기
router.get("/auth/me", authController.authenticate, userController.getUser);

module.exports = router;
