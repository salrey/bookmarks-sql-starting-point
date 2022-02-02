const db = require("../db/dbConfig");

const getAllBookmarks = async () => {
  try {
    //any returns array of objects
    const bookmarks = await db.any("SELECT * from bookmarks");
    return bookmarks;

  } catch (error) {
    return error;
  }
};

const getBookmark = async (id) => {
  try {
    //One returns an object, not array of objects
    const bookmark = await db.one(`SELECT * FROM bookmarks WHERE id =$1`, id)
    // const bookmark = await db.any(`SELECT * FROM bookmarks WHERE id =$1, $2`, [id, somethingelse])
    return bookmark
  } catch(err) {
    return err
  }
}

const createBookmark = async (newBookmark) => {
  try {
    const { name, url, category, is_favorite } = newBookmark
    const query = `INSERT INTO bookmarks (name, url, category, is_favorite) VALUES ($1, $2, $3, $4) RETURNING *`
    const bookmark = await db.one(query, [name, url, category, is_favorite])
    return bookmark

  } catch(err) {
    return err
  }
}

const deleteBookmark = async (id) => {
  try {
    const deletedBookmark = await db.one("DELETE FROM bookmarks WHERE id=$1 RETURNING *", id)
    return deletedBookmark;

  } catch(err) {
    return err
  }
}

const updateBookmark = async (id, bookmark) => {
  //Have your deconstruction inside try so that if there's an error, the deconstruction need not run
  try {
    const { name, url, category, is_favorite } = bookmark
    const updatedBookmark = await db.one("UPDATE bookmarks SET name=$1, url=$2, category=$3, is_favorite=$4 WHERE id=$5 RETURNING *", [name, url, category, is_favorite, id])
    return updatedBookmark

  } catch(err) {
    return err
  }
}

module.exports = {
  getAllBookmarks,
  getBookmark, 
  createBookmark,
  deleteBookmark,
  updateBookmark
}
