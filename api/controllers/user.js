import { db } from "../connect.js";

export const getUser = (req, res) => {
  const userId = req.params.userId;
  const q = "SELECT * FROM users WHERE id=?";

  db.query(q, [userId], (err, data) => {
    if (err) return res.status(500).json(err);
    const { password, ...info } = data[0];
    return res.json(info);
  });
};

export const updateUser = (req, res) => {
  const q = "UPDATE users SET `name`=?,`profilepicture`=? WHERE id=? ";

  const values = [req.body.name, req.body.profilepicture, req.user.id];
  db.query(q, values, (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).json(err);
    }
    if (data.affectedRows > 0) return res.json("Updated!");
    return res.status(403).json("You can update only your user!");
  });
};

export const deleteUser = (req, res) => {
  const q = "DELETE FROM users WHERE id=?";

  db.query(q, [req.user.id], (err, data) => {
    if (err) res.status(500).json(err);
    if (data.affectedRows > 0) return res.json("User is Deleted!");
    return res.status(403).json("You can delete only your user!");
  });
};
