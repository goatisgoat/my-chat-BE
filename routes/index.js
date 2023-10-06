const express = require("express");
const router = express.Router();
const userApi = require("./user.api");
const conversationApi = require("./conversations.api");
const messageApi = require("./messages.api");

router.use("/user", userApi);
router.use("/conversation", conversationApi);
router.use("/message", messageApi);

module.exports = router;
