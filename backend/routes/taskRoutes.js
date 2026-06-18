console.log("TASK ROUTES LOADED");
const express = require("express");
const Task = require("../models/Task");
const protect = require("../middleware/authMiddleware");


const router = express.Router();

console.log("TASK MODEL =>", Task);

router.post("/", protect, async (req, res) => {
  try {
    const { title } = req.body;

    const task = await Task.create({
      title,
      user: req.user._id,
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

 // Get All Tasks (for logged-in user)
router.get("/", protect, async (req, res) => {
  try {
    const tasks = await Task.find({
      user: req.user._id,
    });

    res.json(tasks);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.put("/:id", protect, async (req, res) => {
  try {
    const { title, completed } = req.body;

    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // ensure user owns task
    if (task.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    task.title = title ?? task.title;
    task.completed = completed ?? task.completed;

    const updatedTask = await task.save();

    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.delete("/:id", protect, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (task.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await task.deleteOne();

    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;