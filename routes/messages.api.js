const express = require("express");
const meaasgeController = require("../controller/message.controller");
const conversationController = require("../controller/conversation.controller");
const router = express.Router();

router.post(
  "/",
  meaasgeController.createMessage,
  conversationController.updateConversation
);
router.get("/:conversationId", meaasgeController.getMessages);
router.get("/last/:conversationId", meaasgeController.getLastMessages);

module.exports = router;
