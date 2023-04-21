// dotenv
require("dotenv").config();
const path = require("path");
const express = require("express");
const hbs = require("hbs");
const axios = require("axios");

const app = express();
const port = 3000;

// set templating engine
app.set("view engine", "hbs");
// setup public and static directory to serve
const publicPath = path.join(__dirname, "../public");
app.use(express.static(publicPath));

// set handlebar template engine  path
// set up partials
const viewPath = path.join(__dirname, "./templates/views");
const partialPath = path.join(__dirname, "./templates/partials");
app.set("views", viewPath);
hbs.registerPartials(partialPath, function (err) {});

// index
app.get("/", (req, res) => {
  res.render("index", {
    pageTitle: "Welcome",
    title: "Your Daily Forecast",
    caption:
      "Stay informed about the current weather conditions in your area with our simple and user-friendly weather app",
  });
});

// about
app.get("/about", (req, res) => {
  res.render("about", {
    pageTitle: "About Page",
    title: "About Me",
    content:
      "Seeking an entry-level software developer position utilizing my technical skills in JavaScript, TypeScript, CSS/SASS, Python, and SQL. Proficient in React, Redux, Express, MongoDB, NoSQL, Node.js, MERN Stack, Git, and Firebase. Some experience in React Native, Flutter, SwiftUI, and UIKit. Committed to producing high-quality code and continuous learning in the field.",
  });
});

// fetch weather
app.get("/currentWeather", (req, res) => {
  const appid = process.env.API_KEY;

  const { lat, lon } = req.query;

  if (!lat && lon) {
    return res.send({ error: "Error fetching weather data" });
  }

  const uri =
    "https://api.openweathermap.org/data/2.5/weather?lat=" +
    lat +
    "&lon=" +
    lon +
    "&appid=" +
    appid +
    "&units=metric";

  // make the request
  axios
    .get(uri)
    .then((response) => {
      return res.json(response.data);
    })
    .catch((error) => {
      return res.json({ error: "Unable to get location" });
    });
});

app.get("*", (req, res) => {
  res.render("404", {
    pageTitle: "Opps..",
    title: "404",
    content: "Opps... ",
    description: "Page Not Found ",
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
