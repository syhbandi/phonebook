const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const exphbs = require("express-handlebars");
const hbs = require("handlebars");
const {
  allowInsecurePrototypeAccess,
} = require("@handlebars/allow-prototype-access");
const methodOverride = require("method-override");

const app = express();

// db connect
mongoose.connect(
  "mongodb://localhost/phonebook",
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log(`DB terkoneksi`);
  }
);

//body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main",
    handlebars: allowInsecurePrototypeAccess(hbs),
  })
);
app.set("view engine", "handlebars");

// method override middleware
app.use(methodOverride("_method"));

//custom router
const kontakRouter = require("./router/kontak");

app.get("/", (req, res) => {
  res.render("index");
});
app.use("/kontak", kontakRouter);

// setting port app
const port = 3000;
app.listen(port, () => {
  console.log(`App berjalan pada port ${port}`);
});
