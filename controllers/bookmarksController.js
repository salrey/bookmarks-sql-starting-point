const express = require("express");

const { getAllBookmarks, getBookmark, createBookmark, deleteBookmark, updateBookmark } = require("../queries/bookmarks");

const bookmarks = express.Router();

bookmarks.get("/", async (_, response) => {
  console.log("GET request to /bookmarks");
  const allBookmarks = await getAllBookmarks();
  if (allBookmarks.length === 0) {
    response.status(500).json({ error: "server error" });

    return;
  }

  response.status(200).json(allBookmarks);
});

bookmarks.get("/:id", async (request, response) => {
  console.log("GET request to /:id");
  const bookmark = await getBookmark(request.params.id)

  if (bookmark.id) {
    response.status(200).json(bookmark)
  } else {
    response.redirect("/redirect")
  }
})

bookmarks.post("/", async (request, response) => {
  console.log("CREATE request to /");
  const bookmark = await createBookmark(request.body)
  response.status(201).json(bookmark)
})

bookmarks.delete("/:id", async (request, response) => {
  const { id } = request.params
  console.log("DELETE from /:id")
  const bookmark = await deleteBookmark(id)
  //if bookmark doesn't exist it'll still show up as an object so check if id exists to make sure it's the right object
  if (bookmark.id) {
    response.status(200).json(bookmark)
  } else {
    response.redirect("/redirect")
  }
})

bookmarks.put("/:id", async (request, response) => {
  const {id} = request.params
  const updatedBookmark = request.body
  
  const bookmark = await updateBookmark(id, updatedBookmark)
  response.status(200).json(bookmark)
  
})


module.exports = bookmarks;
