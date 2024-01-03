const mongoose = require('mongoose');
const { Schema } = mongoose;

const servicesSchema = new Schema({
    title: String,
    text: String,
    link: String,
    image: String,
});

module.exports = mongoose.model("service", servicesSchema);