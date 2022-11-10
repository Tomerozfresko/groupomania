import express from "express";
import { getLikes, addLike, deleteLike } from "../controllers/like.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

router.get("/", getLikes);
router.post("/", auth, addLike);
router.delete("/", auth, deleteLike);

export default router;
