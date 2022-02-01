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
  const { name, url, category, is_favorite } = newBookmark
  const query = `INSERT INTO bookmarks (name, url, category, is_favorite) VALUES ($1, $2, $3, $4) RETURNING *`
  try {
    const bookmark = await db.one(query, [name, url, category, is_favorite])
    return bookmark

  } catch(err) {
    return err
  }
}

module.exports = {
  getAllBookmarks,
  getBookmark, 
  createBookmark
}
