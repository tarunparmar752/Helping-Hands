const mongoose = require("mongoose");
const { Schema } = mongoose;

const serviceSchema = new Schema({
  service: String,
  charges: String,
  image: String,
  text: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  location: String,
  geometry: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
});

module.exports = mongoose.model("addservice", serviceSchema);
