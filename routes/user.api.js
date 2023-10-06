const express = require("express");
const userController = require("../controller/user.controller");
const authController = require("../controller/auth.controller");

const router = express.Router();

router.post("/", userController.createUser);
router.post("/login", userController.loginWithEmail);
router.get("/:userId", userController.findUser);
router.post("/find-friend/:conversationId", userController.findUserInMessage);
router.get("/all-users/:userId", userController.findAllUsers);

router.get("/auth/me", authController.authenticate, userController.getUser);

module.exports = router;
