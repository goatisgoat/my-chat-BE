const Message = require("../models/Message");

const messageController = {};

messageController.createMessage = async (req, res, next) => {
  try {
    const { conversationId, senderId, text } = req.body;

    const newMessage = new Message({
      conversationId,
      senderId,
      text,
    });
    const savedMessage = await newMessage.save();

    next();

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
