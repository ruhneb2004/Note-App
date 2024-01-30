const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://ruhneb:PxR29CfqDjCGrZS@cluster0.ci51xdx.mongodb.net/noteApp"
);
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxLength: 30,
  },
  email: {
    type: String,
    required: true,
    maxLength: 50,
  },
  password: {
    type: String,
    required: true,
    minLength: 8,
    maxLength: 100,
  },
});

const noteSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  note: Array,
});

const Note = mongoose.model("Note", noteSchema);
const User = mongoose.model("User", userSchema);
module.exports = { User, Note };
