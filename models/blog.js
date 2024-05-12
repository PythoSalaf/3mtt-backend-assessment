const mongoose = require("mongoose");
const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      trim: true,
    },
    author: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    state: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
    },
    read_count: {
      type: Number,
      default: 0,
    },
    reading_time: {
      type: Number,
    },
    tags: {
      type: [String],
    },
    body: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
