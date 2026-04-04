const express = require("express");
const app = express();
const PORT = 8000;
const urlRoute = require('./routes/url');
const { connectDB } = require('./config/connect');
const URL = require('./models/url');


app.use(express.json());
connectDB();

app.use("/url", urlRoute);





app.listen(PORT, () => {
  console.log(`Server Started at PORT: ${PORT}`);
})