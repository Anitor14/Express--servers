const express = require("express");
const path = require("path");
const app = express();
const exphbs = require("express-handlebars");
const logger = require("./middleware/logger");
const members = require("./Members");

// Init middleware
// app.use(logger);

//Handlebars  Middleware
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
// Body Parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Homepage Routes
app.get("/", (req, res) => {
  res.render("index", { title: "Member App", members });
});

//set a static folder
app.use(express.static(path.join(__dirname, "public")));

// Members API Routes
app.use("/api/members", require("./Routes/api/members"));

const PORT = process.env.PORT || 5000;

// Listen to the port.
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
