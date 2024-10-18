const mongoose = require('mongoose');
const { Schema } = mongoose;

const NoteSchema = new Schema({  //Schema for add a note
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'user' // Import user models
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true,
  },
  tag: {
    type: String,
    default: "General"
  },
  date: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('notes', NoteSchema);
