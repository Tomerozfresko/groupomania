import express from "express";
import { getUser, updateUser, deleteUser } from "../controllers/user.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

router.get("/find/:userId", getUser);
router.put("/", auth, updateUser);
router.delete("/:userId", auth, deleteUser);

export default router;
