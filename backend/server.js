import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import pkg from "pg";

const { Pool } = pkg;
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());

// ------------------ MONGODB CONNECTION ------------------
dotenv.config();

const connectMongoDB = async () => {
  try {
    console.log("MONGO_URI from .env:", process.env.MONGO_URI);

    await mongoose.connect(process.env.MONGO_URI); // removed deprecated options

    console.log("✅ Connected to MongoDB");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

export default connectMongoDB;


// ------------------ POSTGRESQL CONNECTION ------------------
const pool = new Pool({
  user: process.env.PGUSER || "postgres",
  host: process.env.PGHOST || "localhost",
  database: process.env.PGDATABASE || "mydb",
  password: process.env.PGPASSWORD || "password",
  port: process.env.PGPORT || 5432,
});

// Test PostgreSQL connection
const connectPostgres = async () => {
  try {
    const client = await pool.connect();
    console.log("✅ Connected to PostgreSQL");
    client.release();
  } catch (err) {
    console.error("❌ PostgreSQL connection failed:", err.message);
    process.exit(1);
  }
};

// ------------------ CONNECT BOTH DATABASES ------------------
await connectMongoDB();
await connectPostgres();

// ------------------ ROUTES ------------------

// Health Check
app.get("/", (req, res) => {
  res.send("🚀 API is running... MongoDB + PostgreSQL connected");
});

// PostgreSQL Example: Get current server time
app.get("/time", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW() as current_time");
    res.json({ server_time: result.rows[0].current_time });
  } catch (err) {
    res.status(500).json({ error: "PostgreSQL query failed" });
  }
});

// MongoDB Example: Create a sample document
const SampleSchema = new mongoose.Schema({
  name: String,
  message: String,
});
const Sample = mongoose.model("Sample", SampleSchema);

app.post("/samples", async (req, res) => {
  try {
    const { name, message } = req.body;
    const newSample = await Sample.create({ name, message });
    res.status(201).json(newSample);
  } catch (err) {
    res.status(500).json({ error: "Failed to save to MongoDB" });
  }
});

// ------------------ START SERVER ------------------
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
