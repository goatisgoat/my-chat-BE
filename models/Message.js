const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MessageSchema = Schema(
  {
    conversationId: { type: String },
    senderId: { type: String },
    text: { type: String },
  },
  { timestamps: true }
);

MessageSchema.methods.toJSON = function () {
  const obj = this._doc;
  delete obj.__v;
  return obj;
};

const Message = mongoose.model("message", MessageSchema);

module.exports = Message;
