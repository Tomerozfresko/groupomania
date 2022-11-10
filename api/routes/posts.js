import express from "express";
import { getPosts, addPost, deletePost } from "../controllers/post.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

router.get("/", auth, getPosts);
router.post("/", auth, addPost);
router.delete("/:id", auth, deletePost);

export default router;
