const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  conversationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Conversation",
    required: true,
  },
  sender: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  content: { type: String, required: true },
  ImageOrVedio: { type: String },
  contentType: { type: String, enum: ["text", "image", "video"] },
  reactions: [{ userId: mongoose.Schema.Types.ObjectId, emoji: String }],
  messageStatus: { type: String, enum: ["sent", "delivered", "read"], default: "sent" },
},
{ timestamps: true });


module.exports = mongoose.model("Message", messageSchema);
