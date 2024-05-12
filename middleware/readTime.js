const calculateReadingTime = (blog) => {
  const averageSpeed = 225; // Words per minute
  const wordCount = blog.trim().split(/\s+/).length;

  const estimatedTime = Math.ceil(wordCount / averageSpeed);

  return estimatedTime;
};
module.exports = {
  calculateReadingTime,
};
