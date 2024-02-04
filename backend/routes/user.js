const express = require("express");
const bcrypt = require("bcrypt");
const { User, Note } = require("./db");
const router = express.Router();
const jwt = require("jsonwebtoken");
const secretKey = require("../config");
const zod = require("zod");
const authMiddleware = require("../middleware");

const inputSchema = zod.object({
  name: zod.string().min(1).max(20).trim(),
  email: zod.string().email().trim(),
  password: zod.string().min(8).max(30).trim(),
});

// * For welcome page
router.get("/", authMiddleware, (req, res) => {
  res.status(200).json({ mess: "User exist" });
});

router.post("/signup", async (req, res) => {
  const name = req.body.name;

  const email = req.body.email;

  const password = req.body.password;

  const isValid = inputSchema.safeParse({ name, email, password });
  console.log(isValid);
  if (!isValid.success)
    return res.status(403).json({ mess: "Please check your inputs" });

  const existingUser = await User.findOne({ email });

  if (existingUser)
    return res.status(403).json({ mess: "The user already exists" });

  const saltRounds = 10;
  if (!(name && email && password))
    return res.status(404).json({ mess: "Incorrect Inputs!!!" });

  const hashedPassword = await bcrypt.hash(password, saltRounds);

  if (!hashedPassword) return res.status(500).json({ mess: "hashing failed" });

  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  const token = jwt.sign({ userId: newUser._id }, secretKey);

  if (!token) return res.status(403).json({ mess: "jwt failed!!!" });

  if (!newUser)
    return res.status(404).json({ mess: "error while creating user." });

  res.status(200).json({ token });

  const newNote = await Note.create({
    userId: newUser._id,
    note: [],
  });
  if (!newNote)
    return res.status(403).json({ mess: "Note can't be created successfully" });
  console.log(newNote);
});

const siginSchema = zod.object({
  email: zod.string().email(),
  password: zod.string().min(8),
});

router.post("/signin", async (req, res) => {
  console.log("benhur");
  const email = req.body.email;
  const password = req.body.password;
  const isValid = siginSchema.safeParse({ email, password });
  console.log("name");
  if (!isValid.success) {
    console.log(isValid);
    return res.status(400).json({ mess: "Incorrect inputs" });
  }
  console.log("name");

  const userExist = await User.findOne({ email });
  if (!userExist) return res.status(404).json({ mess: "User not found" });
  const passwordMatch = await bcrypt.compare(password, userExist.password);
  if (!passwordMatch) return res.status(403).json({ mess: "Invalid password" });
  const token = jwt.sign({ userId: userExist._id }, secretKey);
  if (!token) return res.status(500).json({ mess: "token error" });
  res.status(200).json({ mess: "Login successful", token });
});

module.exports = router;
