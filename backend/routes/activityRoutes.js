
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Activity = require("../models/Activity");

console.log("Activity routes loaded successfully!");

// GET all activities with optional filters
router.get("/", async (req, res) => {
  console.log("GET ACTIVITIES ROUTE REACHED!");
  try {
    const { studentId, category, status, search } = req.query;
    const filter = {};

    if (studentId) filter.studentId = studentId;
    if (category && category.toLowerCase() !== "all") {
      filter.category = new RegExp(`^${category}$`, "i");
    }
    if (status && status.toLowerCase() !== "all") {
      filter.status = new RegExp(`^${status}$`, "i");
    }
    if (search) {
      filter.$or = [
        { title: new RegExp(search, "i") },
        { description: new RegExp(search, "i") },
        { location: new RegExp(search, "i") },
        { studentName: new RegExp(search, "i") },
      ];
    }

    const activities = await Activity.find(filter).sort({
      createdAt: -1,
    });

    res.json(activities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET one activity
router.get("/:id", async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid activity ID" });
    }

    const activity = await Activity.findById(req.params.id);

    if (!activity) {
      return res.status(404).json({ message: "Activity not found" });
    }

    res.json(activity);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST submit a new activity
router.post("/", async (req, res) => {
  try {
    const {
      studentId,
      studentName,
      studentEmail,
      studentAvatar,
      title,
      category,
      description,
      date,
      location,
      proofImage,
    } = req.body;

    if (
      !studentId ||
      !studentName ||
      !title?.trim() ||
      !category ||
      !description?.trim() ||
      !date ||
      !location?.trim()
    ) {
      return res.status(400).json({
        message: "Please provide all required activity details",
      });
    }

    const activity = await Activity.create({
      studentId,
      studentName,
      studentEmail,
      studentAvatar,
      title: title.trim(),
      category,
      description: description.trim(),
      date,
      location: location.trim(),
      proofImage: proofImage || "",
      status: "Pending",
      points: 25,
    });

    res.status(201).json(activity);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PATCH approve an activity
router.patch("/:id/approve", async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid activity ID" });
    }

    const activity = await Activity.findById(req.params.id);

    if (!activity) {
      return res.status(404).json({ message: "Activity not found" });
    }

    if (activity.status !== "Pending") {
      return res.status(409).json({
        message: "Only pending activities can be approved",
      });
    }

    const points = Number(req.body.points ?? activity.points ?? 25);

    if (!Number.isFinite(points) || points < 0) {
      return res.status(400).json({ message: "Invalid points value" });
    }

    activity.status = "Approved";
    activity.points = points;
    activity.rejectionReason = null;
    activity.reviewedAt = new Date();

    await activity.save();

    res.json(activity);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PATCH reject an activity
router.patch("/:id/reject", async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid activity ID" });
    }

    const activity = await Activity.findById(req.params.id);

    if (!activity) {
      return res.status(404).json({ message: "Activity not found" });
    }

    if (activity.status !== "Pending") {
      return res.status(409).json({
        message: "Only pending activities can be rejected",
      });
    }

    activity.status = "Rejected";
    activity.points = 0;
    activity.rejectionReason =
      req.body.rejectionReason ||
      "Does not meet campus verification criteria.";
    activity.reviewedAt = new Date();

    await activity.save();

    res.json(activity);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE an activity
router.delete("/:id", async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid activity ID" });
    }

    const activity = await Activity.findByIdAndDelete(req.params.id);

    if (!activity) {
      return res.status(404).json({ message: "Activity not found" });
    }

    res.json({ message: "Activity deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
module.exports = router;
