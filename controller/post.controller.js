const db = require("../db");

class PostController {
  async createPost(req, res) {
    const { title, content, userId } = req.body;
    console.log(title, content, userId);
    const newPost = await db.query(
      "INSERT INTO posts (title, content, user_id) values ($1, $2, $3) RETURNING *",
      [title, content, userId]
    );
    res.json(newPost.rows);
  }

  async getPostByUser(req, res) {
    const id = req.query.id;
    const posts = await db.query("SELECT * FROM posts where user_id = $1", [
      id,
    ]);
    res.json(posts.rows);
  }
}

module.exports = new PostController();
