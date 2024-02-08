const mongoose = require('mongoose');
require("dotenv").config();
const User = require('./models/user');
const connectwithDb = require("./config/db");

connectwithDb();

const userData = [
  {
    name: "Demo Seed User",
    email: "demo@gmail.com",
    phone: 1234567890,
    password: "password123",
  },
  {
    name: "User 2",
    email: "user2@example.com",
    phone: 9876543210,
    password: "user2pass",
  },
  {
    name: "User 3",
    email: "user3@example.com",
    phone: 5555555555,
    password: "user3pass",
  },
];

const seedData = async () => {
  try {
    /**
     * Here we are deleting all the existing documents from the User collection
     * But in a real-world scenario, you should be careful while deleting the data
     * as it can lead to data loss.
     * 
     * You can use a condition to delete only the documents that you want to delete.
     */
    await User.deleteMany(); 
    console.log("Data deleted successfully!");
    await User.create(userData);
    console.log("Data seeding completed!");
  } catch (error) {
    console.error("Error seeding data:", error);
  } finally {
    mongoose.disconnect();
  }
};

seedData();
