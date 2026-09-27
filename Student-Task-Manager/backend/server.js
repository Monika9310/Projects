
const express = require("express");
const cors = require("cors");

const mongoose = require("mongoose");
require("dotenv").config();



const app = express();
const Task = require("./models/Task");

// Middleware
app.use(cors());
app.use(express.json());

// Basic route
app.get("/", (req, res) => {
  res.send("Student Manager Backend is Running");
});

app.post("/api/tasks", async (req, res) => {
  try {
    const { title, description } = req.body;

    const newTask = new Task({
      title,
      description,
    });

    const savedTask = await newTask.save();

    res.status(201).json({
      message: "Task created successfully",
      task: savedTask,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating task",
      error: error.message,
    });
  }
});
// GET all tasks
app.get("/api/tasks", async (req, res) => {
  try {
    const tasks = await Task.find();

    res.status(200).json({
      message: "Tasks fetched successfully",
      tasks: tasks,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching tasks",
      error: error.message,
    });
  }
});
// UPDATE task
app.put("/api/tasks/:id", async (req, res) => {
  try {
    const { status } = req.body;

    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({
        message: "Task not found"
      });
    }

    res.status(200).json({
      message: "Task updated successfully",
      task: updatedTask
    });

  } catch (error) {
    res.status(500).json({
      message: "Error updating task",
      error: error.message
    });
  }
});
// DELETE task
app.delete("/api/tasks/:id", async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);

    if (!deletedTask) {
      return res.status(404).json({
        message: "Task not found"
      });
    }

    res.status(200).json({
      message: "Task deleted successfully",
      task: deletedTask
    });

  } catch (error) {
    res.status(500).json({
      message: "Error deleting task",
      error: error.message
    });
  }
});
const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected Successfully");
  })
  .catch((error) => {
    console.log("MongoDB Connection Error:", error.message);
  });
// Start server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});