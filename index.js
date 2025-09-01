import express from 'express';
import { connection ,sequelize } from "./DB/connection.js";
import dotenv from 'dotenv'
import cors from "cors";
import jobsRouter from "./routes/jobs.js";
import applicationRouter from "./routes/applications.js";
import uploadRouter from "./routes/upload.js";
dotenv.config()
const app = express()
const PORT = process.env.PORT || 4000


// ✅ Enable CORS for React dev server
app.use(
  cors({
    origin: "*", // allow frontend
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"]
  })
);

app.use(express.json());
app.use("/api/jobs", jobsRouter);
app.use("/api/upload", uploadRouter);
app.use("/api/applications", applicationRouter);

app.get ("/", (req, res) => {
    res.send("Hello World")
})

await connection();
// This will create the 'jobs' table if it doesn't exist
await sequelize.sync(); // use { alter: true } in dev to auto-update columns
console.log("✅ Database synced");


  

app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });

