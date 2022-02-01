const express = require("express");

const getAllBookmarks = require("../queries/bookmarks");

const bookmarks = express.Router();

bookmarks.get("/", async (_, response) => {
  console.log("GET request to /bookmarks");
  const allBookmarks = await getAllBookmarks();
  if (allBookmarks.length === 0) {
    res.status(500).json({ error: "server error" });

    return;
  }

  response.status(200).json(allBookmarks);
});

module.exports = bookmarks;
