const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/user');
const user = require('./models/user');
mongoose.set('strictQuery', false);

dotenv.config({ path: './.env' }); 

mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

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
    await User.deleteMany(); 
    await User.create(userData);
    console.log("Data seeding completed!");
  } catch (error) {
    console.error("Error seeding data:", error);
  } finally {
    mongoose.disconnect();
  }
};

seedData();
