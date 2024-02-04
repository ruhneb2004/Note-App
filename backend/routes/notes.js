const express = require("express");
const zod = require("zod");
const authMiddleware = require("../middleware");
const { Note } = require("./db");
const router = express.Router();

//post
//get
//put
//delete

const noteSchema = zod.object({
  heading: zod.string().min(5),
  description: zod.string(),
});
router.post("/create", authMiddleware, async (req, res) => {
  const body = req.body;
  const userId = req.userId;
  const parsedBody = noteSchema.safeParse(body);
  console.log("🚀 ~ router.post ~ parsedBody:", parsedBody);
  if (!parsedBody.success)
    return res.status(403).json({ mess: "Zod validation failed" });

  const userNote = await Note.findOneAndUpdate(
    { userId },
    { $push: { note: parsedBody.data } },
    { new: true }
  );
  if (!userNote)
    return res.status(403).json({ mess: "Error while putting the note" });

  return res.status(200).json({ mess: "Note created successfully!!" });
});

router.get("/view", authMiddleware, async (req, res) => {
  const userId = req.userId;
  const notes = await Note.findOne({ userId });
  if (!notes) return res.status(404).json({ mess: "Notes not found" });
  res.status(200).json({ notes });
});

router.get("/indvidualNotes", authMiddleware, async (req, res) => {
  console.log("name");
  const userId = req.userId;
  const notes = await Note.findOne({ userId });
  console.log(notes);
  const key = req.query.key;
  if (!notes) return res.status(404).json({ mess: "Notes not found" });
  res.status(200).json(notes.note[key]);
});

router.put("/edit", authMiddleware, async (req, res) => {
  const userId = req.userId;
  const key = req.query.key;
  console.log("🚀 ~ router.put ~ key:", key);
  const parsedBody = noteSchema.safeParse(req.body);
  if (!parsedBody) return res.status(403).json({ mess: "Input Error!" });
  const updatedNote = await Note.findOneAndUpdate(
    { userId },
    { $set: { [`note.${key}`]: parsedBody.data } },
    {
      new: true,
    }
  );
  if (!updatedNote) return res.status(404).json({ mess: "Notes not updated!" });

  res.status(200).json(updatedNote);
});

router.delete("/delete", authMiddleware, async (req, res) => {
  const userId = req.userId;
  const key = req.query.key;

  const note = await Note.findOne({
    userId,
  });
  const newArr = note.note;
  newArr.splice(key, 1);

  const deleteNote = await Note.findOneAndUpdate(
    {
      userId,
    },
    {
      note: newArr,
    },
    { new: true }
  );
  console.log("🚀 ~ router.delete ~ deleteNote:", deleteNote);
  res.status(200).json(deleteNote);
});

module.exports = router;
