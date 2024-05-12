const Blog = require("../models/blog");
const { calculateReadingTime } = require("../middleware/readTime");
const createBlog = async (req, res) => {
  const userId = req.user.id;
  const { title, description, tags, body } = req.body;
  try {
    const existingTitle = await Blog.findOne({ title });
    if (existingTitle) {
      return res
        .status(400)
        .json({ error: "Title is not available: Try another one!" });
    }
    const reading_time = calculateReadingTime(body);
    const newBlog = new Blog({
      author: userId,
      title,
      description,
      tags,
      body,
      reading_time,
    });

    await newBlog.save();
    res
      .status(201)
      .json({ message: "Blog created successfully", data: newBlog });
  } catch (error) {
    res
      .status(500)
      .json({ error: error.message, message: "Internal server error" });
  }
};

const allPublishedBlog = async (req, res) => {
  try {
    const blogs = await Blog.find({ state: "published" });
    if (blogs.length === 0) {
      return res.status(200).json({ error: "No blog" });
    }

    res.status(201).json({ message: "Blog created successfully", data: blogs });
  } catch (error) {
    res
      .status(500)
      .json({ error: error.message, message: "Internal server error" });
  }
};

const aPublishedBlog = async (req, res) => {
  const blogId = req.params.id;
  try {
    const blogs = await Blog.findById({
      _id: blogId,
    }).populate("author", "first_name last_name");
    if (blogs.length === 0) {
      return res.status(200).json({ error: "No blog" });
    }
    blogs.read_count++;
    blogs.save();
    res.status(201).json({ message: "Blog created successfully", data: blogs });
  } catch (error) {
    res
      .status(500)
      .json({ error: error.message, message: "Internal server error" });
  }
};

module.exports = {
  createBlog,
  allPublishedBlog,
  aPublishedBlog,
};
