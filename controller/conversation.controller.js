const Conversation = require("../models/Conversation");

const conversationController = {};

conversationController.createConversation = async (req, res) => {
  try {
    const newConversation = new Conversation({
      members: [req.body.senderId, req.body.receiverId],
      lastSenderName: "",
      lastMessage: "",
    });

    const savedConversation = await newConversation.save();

    res.status(200).json({ status: "success", savedConversation });
  } catch (error) {
    res.status(400).json({ status: "fail", error: error });
  }
};

conversationController.getConversation = async (req, res) => {
  try {
    const conversation = await Conversation.find({
      members: { $in: [req.params.userId] },
    }).sort({ updatedAt: -1 });

    if (conversation) {
      return res.status(200).json({ status: "success", conversation });
    }
  } catch (error) {
    res.status(400).json({ status: "fail", error: error });
  }
};

module.exports = conversationController;
