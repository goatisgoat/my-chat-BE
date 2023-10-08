const Conversation = require("../models/Conversation");

const conversationController = {};

conversationController.createConversation = async (req, res) => {
  try {
    const { senderId, senderName, receiverId, receiverName } = req.body;

    const newConversation = new Conversation({
      members: [
        { userId: senderId, userName: senderName },
        { userId: receiverId, userName: receiverName },
      ],
      lastSenderName: "",
      lastMessage: "",
    });

    const savedConversation = await newConversation.save();

    if (!savedConversation) {
      throw new Error("대화를 찾을 수 없습니다.");
    }

    res.status(200).json({ status: "success", savedConversation });
  } catch (error) {
    res.status(400).json({ status: "fail", error });
  }
};

conversationController.getConversation = async (req, res) => {
  try {
    const conversation = await Conversation.find({
      members: {
        $elemMatch: {
          userId: req.params.userId,
        },
      },
    }).sort({ updatedAt: -1 });

    if (!conversation) {
      throw new Error("대화를 찾을 수 없습니다.");
    }
    res.status(200).json({ status: "success", conversation });
  } catch (error) {
    res.status(400).json({ status: "fail", error });
  }
};

conversationController.updateConversation = async (req, res) => {
  try {
    const response = await Conversation.updateOne(
      { _id: req.body.conversationId },
      {
        $set: {
          updatedAt: new Date(),
          lastSenderName: req.body.lastSenderName,
          lastMessage: req.body.text,
        },
      }
    );

    if (!response) throw new Error("업데이트 중 문제가 발생했습니다");
  } catch (error) {
    res.status(400).json({ status: "fail", error });
  }
};

module.exports = conversationController;
