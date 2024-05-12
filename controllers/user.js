const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { handleErrors } = require("../middleware/errorHandler");
const register = async (req, res) => {
  let { first_name, last_name, email, password } = req.body;

  try {
    const emailAlreadyExists = await User.findOne({ email });
    if (!email || !password || !first_name || !last_name) {
      return res.status(400).json({ error: "All fields are required" });
    }
    if (emailAlreadyExists) {
      return res.status(400).json({ error: "Email already exist" });
    }
    const newUser = new User({
      first_name,
      last_name,
      email,
      password,
    });
    savedUser = await newUser.save();
    res.status(201).json({ message: "Registration completed" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server error" });
  }
};

const login = async (req, res) => {
  let { password, email } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const user = await User.login(email, password);
    const id = user._id;
    const token = jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({ message: "Login successful", user, token });
  } catch (err) {
    console.log(err);
    const error = handleErrors(err);
    res.status(400).json({ error });
  }
};
module.exports = {
  register,
  login,
};
