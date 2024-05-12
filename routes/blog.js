const { Router } = require("express");

const router = Router();
const { requireSignIn } = require("../middleware/auth");
const {
  createBlog,
  allPublishedBlog,
  aPublishedBlog,
} = require("../controllers/blog");

router.route("/create").post(requireSignIn, createBlog);
router.route("/all").get(allPublishedBlog);
router.route("/:id").get(aPublishedBlog);
// router.route("/:id").put(updateState);
// router.route("/:id").delete(deleteBlog);
// router.route("/:id").put(updateBlog);
// router.route("/owner").get(getOwnerBlog);

module.exports = router;
