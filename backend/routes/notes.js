const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fatchuser");
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");
const { set } = require("mongoose");

// Router 1: Get all notes for the logged-in user
router.get("/fetchusernotes", fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error("Error fetching notes:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Router 2: Add a note for the logged-in user
router.post(
  "/addnotes",
  fetchuser,
  [
    body("title", "Title should be at least 3 characters long").isLength({
      min: 3,
    }),
    body(
      "description",
      "Description should be at least 5 characters long"
    ).isLength({ min: 5 }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { title, description, tag } = req.body;
      const note = new Notes({
        user: req.user.id,
        title,
        description,
        tag,
      });

      const savedNote = await note.save();
      res.json(savedNote);
    } catch (error) {
      console.error("Error adding note:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
); 
//rout:3:-  PUT route: Update an existing note for the logged-in user
// Update an existing note for the logged-in user
router.put("/updatenotes/:id", fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;

  try {
    // Create a new note object
    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }

    // Find the note to be updated
    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Note not found");
    }

    // Check if the logged-in user owns this note
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not allowed");
    }

    // Update the note
    note = await Notes.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json(note); // Return the updated note
  } catch (error) {
    console.error("Error updating note:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


//delete a note login require
router.delete("/delete/:id", fetchuser, async (req, res) => {
   const { title, description, tag } = req.body;
 
   try {
     // Create a new note object
     const newNote = {};
     if (title) {
       newNote.title = title;
     }
     if (description) {
       newNote.description = description;
     }
     if (tag) {
       newNote.tag = tag;
     }
 
     // Find the note to be delete
     let note = await Notes.findById(req.params.id);
     if (!note) {
       return res.status(404).send("Note not found");
     }
 
     // Check if the logged-in user owns this note allow deleteion
     if (note.user.toString() !== req.user.id) {
       return res.status(401).send("Not allowed");
     }
 
     // Update the note
     note = await Notes.findByIdAndDelete(req.params.id);
     res.json({"Success":"note has been deleted"}); // Return the delete note
   } catch (error) {
     console.error("Error updating note:", error);
     res.status(500).json({ error: "Internal server error" });
   }
 });
module.exports = router;
