const express = require("express");
const app = express();
const path = require('path');
const PORT = 8000;
const urlRoute = require('./routes/url');
const { connectDB } = require('./config/connect');
const URL = require('./models/url');
const staticRoute = require('./routes/staticRouter');

app.use(express.json());
app.use(express.urlencoded({extended: false}));
connectDB();

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"))

app.get("/test", async(req, res) => {
  const allUrls = await URL.find({});
  return res.render('home', {
    urls: allUrls,
  })
})


app.use("/url", urlRoute);
app.use("/", staticRoute);





app.listen(PORT, () => {
  console.log(`Server Started at PORT: ${PORT}`);
})