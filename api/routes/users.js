import express from "express";
import { getUser, updateUser, deleteUser } from "../controllers/user.js";

const router = express.Router();

router.get("/find/:userId", getUser);
router.put("/", updateUser);
router.delete("/:userId", deleteUser);

export default router;
