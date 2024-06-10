const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  connectedTo: { type: mongoose.Schema.Types.ObjectId, ref: "Astrologer" },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
