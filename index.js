const PORT = process.env.PORT || 5000;

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cookieSession = require('cookie-session');
const passport = require('passport');

const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const xss = require("xss-clean");

const keys = require("./config/keys");

require("./models/user");
require("./models/survey");
require("./services/passport");
require("./services/cache");

const MONGOOSE_OPTIONS = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 10000
};

const COOKIE_EXP_DATE = new Date(Date.now() + 60 * 60 * 1000); // 1 Hour

// Options for cors midddleware
const OPTIONS = {
  allowedHeaders: [
    'Origin',
    'X-Requested-With',
    'Content-Type',
    'Accept',
    'X-Access-Token',
  ],
  credentials: true,
  methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
  origin: `http://localhost:${PORT}`,
  preflightContinue: false,
};

mongoose.Promise = global.Promise;
mongoose.connect(keys.mongodbURI, MONGOOSE_OPTIONS);

const app = express();

// Middlewares
// Helmet can help protect your app from some well-known web vulnerabilities
// by setting HTTP headers appropriately
app.use(helmet());
// Enables CORS with various options
app.use(cors(OPTIONS));
// This is a way to deal with DOS attacks, by adding a limit to the body payload
app.use(bodyParser.json({ limit: '1024kb' }));
app.use(bodyParser.urlencoded({ extended: true }));
// Data sanitization against XSS
app.use(xss());
// Data sanitization against NoSQL injection attacks
app.use(mongoSanitize());
app.use(
  cookieSession({
    name: 'cookie-session',
    // maxAge: COOKIE_EXP_DATE,
    keys: [keys.cookieKey],
    cookie: {
      secure: true,
      httpOnly: true,
      // domain: 'example.com',
      // path: 'foo/bar',
      expires: COOKIE_EXP_DATE
    }
  })
);
app.use(passport.initialize());
app.use(passport.session());

require("./routes/authRoutes")(app);
require("./routes/billingRoutes")(app);
require("./routes/surveyRoutes")(app);
require("./routes/uploadRoutes")(app);

if (["production", "ci"].includes(process.env.NODE_ENV)) {
  // Express will serve up production assets like files from front-end
  app.use(express.static("client/build"));

  // Express will serve index.html, if doesn't recognize the route
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Server listens on port: ${PORT}`);
});
