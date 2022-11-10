import express from "express";
import { addFile } from "../controllers/upload.js";
import multer from "../middlewares/multer-config.js";

const router = express.Router();

router.post("/", multer, addFile);

export default router;
