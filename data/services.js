const mongoose = require('mongoose');
const services = require('../models/services');

const db = mongoose.connection;

mongoose.connect("mongodb://127.0.0.1:27017/helpingHand");

db.on("error", console.error.bind(console,"connection error:"));

db.once("open",() => {
    console.log('database connected');
})


const data = [
  {
    title: "House Maid",
    text: "For those seeking a reliable and skilled housemaid to enhance the quality of their home life, look no further. Our housekeeping service, led by dedicated professionals, is committed to providing an unparalleled level of cleanliness and organization. Our experienced housemaids bring a meticulous approach to every task, ensuring that your living space not only meets but exceeds your expectations. We understand the unique needs of each household, offering tailored services to accommodate your specific preferences. With a focus on trustworthiness, flexibility, and open communication, we aim to take the burden of household chores off your shoulders, allowing you to enjoy a pristine and well-maintained home. Discover the difference our housemaid service can make in transforming your living space into a haven of comfort and cleanliness. Your satisfaction is our priority, and we are ready to contribute to the overall well-being of your home.",
    link: "/house_maid",
    image: "/images/house_maid.png",
  },
  {
    title: "Plumber",
    text: "When it comes to your home, every leak, clog, or plumbing issue deserves immediate attention from a reliable and skilled professional. We are your dedicated plumber ready to tackle all your plumbing needs. With years of experience, We bring not only expertise but also a commitment to prompt and efficient service. From fixing leaks to addressing drainage problems, We take pride in delivering solutions that stand the test of time. Our focus is on transparent communication, reliability, and ensuring your plumbing works seamlessly. Don't let plumbing concerns disrupt your daily life—trust us to provide dependable and expert plumbing services. Your satisfaction is our priority, and I'm here to ensure your home's plumbing is in top-notch condition.",
    link: "/plumber",
    image: "/images/plumber.png",
  },
  {
    title: "Electrician",
    text: "When it comes to your home's electrical needs, precision and reliability are non-negotiable. I am  We are ready to provide expert solutions for all your electrical requirements. With a wealth of experience,  We specialize in ensuring the safety and efficiency of your electrical systems. From troubleshooting and repairs to installations and upgrades, We bring a commitment to quality workmanship and a focus on exceeding your expectations. Your satisfaction is our priority, and we are dedicated to delivering timely and transparent service. Trust us to illuminate your space with expertise, keeping your home powered and secure.",
    link: "/electrician",
    image: "/images/electrician1.png",
  },

  {
    title: "Gardener",
    text: "Elevate the beauty of your outdoor haven with the expertise of our dedicated group of gardeners. We understand that your garden is a living canvas, and we are passionate about bringing it to life. Our team combines a deep appreciation for horticulture with years of hands-on experience to create vibrant, sustainable landscapes tailored to your preferences. Whether you seek lush greenery, colorful blooms, or a harmonious blend of both, our gardeners are committed to transforming your outdoor space into a thriving oasis. From meticulous lawn care to thoughtful plant selection and landscape design, we bring a holistic approach to gardening. Trust us to cultivate the garden of your dreams, where every leaf and petal reflects our commitment to excellence.",
    link: "/gardener",
    image: "/images/gardener1.png",
  },
  {
    title: "Mason",
    text: "Transforming your vision of a perfect space into reality requires the expertise of skilled masons, and we are the team you can rely on. As a dedicated group of masons, we bring a wealth of experience and precision to every project. From intricate stone work to solid brick construction, we specialize in crafting structures that stand the test of time. Our commitment to quality craftsmanship, attention to detail, and a customer-centric approach sets us apart. Whether you're envisioning a stunning outdoor patio, a durable retaining wall, or any masonry project, we are ready to turn your dreams into tangible, lasting structures. Trust our team to build with excellence, creating spaces that enhance the beauty and functionality of your property.",
    link: "/mason",
    image: "/images/mason1.png",
  },
  {
    title: "Driver",
    text: "Transforming your vision of a perfect space into reality requires the expertise of skilled masons, and we are the team you can rely on. As a dedicated group of masons, we bring a wealth of experience and precision to every project. From intricate stone work to solid brick construction, we specialize in crafting structures that stand the test of time. Our commitment to quality craftsmanship, attention to detail, and a customer-centric approach sets us apart. Whether you're envisioning a stunning outdoor patio, a durable retaining wall, or any masonry project, we are ready to turn your dreams into tangible, lasting structures. Trust our team to build with excellence, creating spaces that enhance the beauty and functionality of your property.",
    link: "/driver",
    image: "/images/driver.png",
  },
];


services.insertMany(data)
        .then((data) => console.log(data))
        .catch((err) => console.log('Oops error', err));