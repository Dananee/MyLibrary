const { static } = require("express");
if(process.env.NODE_ENV !== 'production'){

    require('dotenv').load
}

const mongoose = require("mongoose");

const express = require("express");
const expressLayouts = require("express-ejs-layouts");



const app = express();

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

mongoose
  .connect('mongodb://localhost/myLibrary')
  .then(() => console.log("Database is connected.."))
  .catch((e) => console.error(e));

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("layout", "layouts/layout");

app.use(expressLayouts);
app.use(express.static("public"));

const route = require("./routes/index");

app.use("/", route);

app.listen(process.env.PORT || 3000, () => console.log("is Running"));
