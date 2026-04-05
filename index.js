const express = require("express");
const app = express();
const cookieParser = require('cookie-parser');
const path = require('path');
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const PORT = process.env.PORT || 8000;

const urlRoute = require('./routes/url');
const { connectDB } = require('./config/connect');
const staticRoute = require('./routes/staticRouter');
const userRoute = require('./routes/user');
const { checkForAuthentication, restrictTo } = require('./middlewares/auth');

// Security Middleware
app.use(helmet());

app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
}));

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthentication);

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use("/url", restrictTo(["Normal", "Admin"]), urlRoute);
app.use("/", staticRoute);
app.use("/user", userRoute);

app.listen(PORT, () => {
  console.log(`🚀 Server running at PORT: ${PORT}`);
});