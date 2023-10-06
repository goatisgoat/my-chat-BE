const Message = require("../models/Message");
const Conversation = require("../models/Conversation");

const messageController = {};

messageController.createMessage = async (req, res) => {
  try {
    const newMessage = new Message({
      conversationId: req.body.conversationId,
      sender: req.body.sender,
      text: req.body.text,
    });
    const savedMessage = await newMessage.save();
    await Conversation.updateOne(
      { _id: req.body.conversationId },
      {
        $set: {
          updatedAt: new Date(),
          lastSenderName: req.body.lastSenderName,
          lastMessage: req.body.text,
        },
      }
    );

    res.status(200).json({ status: "success", savedMessage });
  } catch (error) {
    res.status(400).json({ status: "fail", error: error });
  }
};

messageController.getMessages = async (req, res) => {
  try {
    const messages = await Message.find({
      conversationId: req.params.conversationId,
    });

    res.status(200).json({ status: "success", messages });
  } catch (error) {
    res.status(400).json({ status: "fail", error: error });
  }
};

messageController.getLastMessages = async (req, res) => {
  try {
    const message = await Message.findOne({
      conversationId: req.params.conversationId,
    }).sort({ createdAt: -1 });

    res.status(200).json({ status: "success", message });
  } catch (error) {
    res.status(400).json({ status: "fail", error: error });
  }
};

module.exports = messageController;
