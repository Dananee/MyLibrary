const express = require("express");

const router = express.Router();

const AuthorShema = require("../model/models");

router.get("/", async (req, res) => {
  let search = {};
  if (req.query.name != null && req.query.name !== "") {
    search.name = new RegExp(req.query.name, "i");
  }
  try {
    const authors = await AuthorShema.find(search);
    res.render("authors/index_author", { authors: authors, search: req.query });
  } catch {
    res.redirect("/authors");
  }
});

router.get("/new", (req, res) => {
  res.render("authors/new", { author: new AuthorShema() });
});

router.post("/", async (req, res) => {
  const author = new AuthorShema({
    name: req.body.name,
  });
  try {
    const newAuthor = await author.save();
    res.redirect("authors");
  } catch {
    console.log("Error");
    res.render("authors/new", {
      author: author,
      errorMessage: "Error fix",
    });
  }
});

module.exports = router;
