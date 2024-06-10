const mongoose = require("mongoose");

const astrologerSchema = new mongoose.Schema({
  name: String,
  connectionCount: { type: Number, default: 0 },
  isTop: { type: Boolean, default: false },
});

const Astrologer = mongoose.model("Astrologer", astrologerSchema);

module.exports = Astrologer;
