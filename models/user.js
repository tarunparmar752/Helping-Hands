const mongoose = require('mongoose');
const { Schema } = mongoose;
const passportlocalmongoose = require('passport-local-mongoose');

const userSchema = new Schema({
  name: String,
  mobile: Number,
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

userSchema.plugin(passportlocalmongoose);
module.exports = mongoose.model('user',userSchema);