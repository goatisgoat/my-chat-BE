const express = require("express");
const conversationController = require("../controller/conversation.controller");
const router = express.Router();

router.post("/", conversationController.createConversation);
router.get("/:userId", conversationController.getConversation);

module.exports = router;
