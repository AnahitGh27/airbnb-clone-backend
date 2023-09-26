import express from "express";
import multer from "multer";
import path from 'path';
import { uploadByLink, upload } from "../controllers/uploadController.js";

const router = express.Router();

router.post("/upload-by-link", uploadByLink);

const photosMiddlewar = multer({ dest: `uploads` });
router.post("/upload", photosMiddlewar.array("photos", 100), upload);

export default router;
