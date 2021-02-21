const { static } = require("express");

if(process.env.NODE_ENV !== 'production'){
  require('dotenv').parse()
}
const mongoose = require("mongoose");

const express = require("express");
const expressLayouts = require("express-ejs-layouts");

const bodyParser = require("body-parser");

const app = express();

mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);

mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => console.log("Database is connected.."))
  .catch((e) => console.error(e));

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("layout", "layouts/layout");

app.use(expressLayouts);
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: false }));

const route = require("./routes/index_routes");
const authors = require("./routes/authors");
app.use("/", route);
app.use("/authors", authors);

app.listen(process.env.PORT || 3000, () => console.log("is Running"));
