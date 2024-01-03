const mongoose = require('mongoose');
const people = require('../models/people');

const db = mongoose.connection;

mongoose.connect('mongodb://127.0.0.1:27017/helpingHand');

db.on('error', console.error.bind(console,"connection error:"));

db.once("open",() => {
    console.log("Database Connected");
});

const data = [
  {
    service: "gardener",
    title: "Gardening",
    people: [
    ],
  },
  {
    service: "house_maid",
    title: "House Maid",
    people: [
    ],
  },
  {
    service: "plumber",
    title: "Plumber",
    people: [
     
    ],
  },
  {
    service: "electrician",
    title: "Electrician",
    people: [
     
    ],
  },
  {
    service: "farmer",
    title: "Farmer",
    people: [
      
    ],
  },
  {
    service: "mason",
    title: "Mason",
    people: [
      
    ],
  },
];

people.insertMany(data)
        .then((data) => console.log(data))
        .catch((err) => console.log("Oops error", err))