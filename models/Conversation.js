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

ConversationSchema.methods.toJSON = function () {
  const obj = this._doc;
  delete obj.__v;
  return obj;
};

const Conversation = mongoose.model("conversation", ConversationSchema);

module.exports = Conversation;
