import { db } from "../connect.js";
import moment from "moment";
import fs from "fs";

export const getPosts = (req, res) => {
  const q = `SELECT p.*, u.id AS userId, name, profilepicture FROM posts AS p JOIN users AS u ON (u.id = p.userId) ORDER BY p.createdAt DESC`;

  const values = [req.user.id, req.user.id];

  db.query(q, values, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const addPost = (req, res) => {
  const q =
    "INSERT INTO posts(`desc`, `img`, `createdAt`, `userId`) VALUES (?)";

  const values = [
    req.body.desc,
    req.body.img,
    moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
    req.user.id,
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json("Post has been created.");
  });
};

export const deletePost = (req, res) => {
  // there is an img in the post?
  const qImg = "SELECT img FROM posts WHERE id = ?";

  db.query(qImg, req.params.id, (err, data) => {
    if (err) return res.status(500).json(err);
    const img = data[0].img;
    // if there is an img, delete it from folder
    if (img) {
      fs.unlink(`../client/public/upload/${img}`, (err) => {
        if (err) return res.status(500).json(err);
      });
    }
  });

  const q = "DELETE FROM posts WHERE `id`=? AND `userId` = ?";

  db.query(q, [req.params.id, req.user.id], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.affectedRows > 0)
      return res.status(200).json("Post has been deleted.");
    return res.status(403).json("You can delete only your post");
  });
};
