const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  roomname: String,
  chats: [
    {
      user: String,
      message: String,
      date: Date,
    },
  ],
});

const chatModel = mongoose.model("chats", chatSchema);

module.exports = chatModel;
