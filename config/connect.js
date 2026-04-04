const mongoose = require('mongoose');
require('dotenv').config();
const connectDB = async() => {
  mongoose.connect(process.env.DB_URL)
  .then( () => {
    console.log("Connected to DB Successfully");
  })
  .catch((err) =>{
    console.err("Error while connecting to DB", err);
  });
}

module.exports = {connectDB};