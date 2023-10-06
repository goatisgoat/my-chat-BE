const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ConversationSchema = Schema(
  {
    members: { type: Array },
    lastSenderName: { type: String },
    lastMessage: { type: String },
  },
  { timestamps: true }
);

const Conversation = mongoose.model("conversation", ConversationSchema);

module.exports = Conversation;
