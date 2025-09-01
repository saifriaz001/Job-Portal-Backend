import { Router } from "express";
import multer from "multer";
import fs from "fs";
import imagekit from "../utils/imagekit.js";

const router = Router();
const upload = multer({ dest: "uploads/" }); // temp folder

router.post("/resume", upload.single("resume"), async (req, res) => {
  try {
    const file = req.file;

    const result = await imagekit.upload({
      file: fs.readFileSync(file.path), // upload from buffer
      fileName: file.originalname,      // keep original name
      folder: "/resumes",               // optional: put all in /resumes
    });

    fs.unlinkSync(file.path); // cleanup local temp file

    res.json({ url: result.url });
  } catch (err) {
    console.error("ImageKit Upload Error:", err);
    res.status(500).json({ error: "Upload failed" });
  }
});

export default router;
