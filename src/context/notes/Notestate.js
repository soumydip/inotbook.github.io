import React, { useState } from "react";
import noteContext from "./Notecontex";
const Notestate = (props) => {
  const host = 'http://localhost:4000'; // Replace with your actual backend URL
  const notesinitial = [];
  const [notes, setnotes] = useState(notesinitial);

  // Get all notes
  const getNotes = async () => {
    const response = await fetch(`${host}/api/notes/fetchusernotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token') // Replace with your auth-token
      },
    });

    const json = await response.json();
    if (response.ok) {
      setnotes(json);
    } else {
      console.error(json.error);
    }
  };

  // Add a note
  const addNote = async (title, description, tag) => {
    // Default tag to "General" if it's an empty string
    const finalTag = tag.trim() === "" ? "General" : tag;

    const response = await fetch(`${host}/api/notes/addnotes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token') // Replace with your auth-token
      },
      body: JSON.stringify({ title, description, tag: finalTag }) // Use finalTag here
    });

    const json = await response.json();
    if (response.ok) {
      setnotes(notes.concat(json));
    } else {
      console.error(json.error);
    }
  };

  // Delete a note
  const deleteNote = async (id) => {
    const response = await fetch(`${host}/api/notes/delete/${id}`, {
      method: 'DELETE',
      headers: {
        'auth-token': localStorage.getItem('token') // Replace with your auth-token
      }
    });

    const json = await response.json();
    if (response.ok) {
      const newNotes = notes.filter((note) => note._id !== id);
      setnotes(newNotes);
    } else {
      console.error(json.error);
    }
  };

  // Edit a note
  const editNote = async (id, title, description, tag) => {
    // Default tag to "General" if it's an empty string
    const finalTag = tag.trim() === "" ? "General" : tag;

    const response = await fetch(`${host}/api/notes/updatenotes/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token') // Replace with your auth-token
      },
      body: JSON.stringify({ title, description, tag: finalTag }) // Use finalTag here
    });

    const json = await response.json();
    if (response.ok) {
      const updatedNotes = notes.map((note) => {
        if (note._id === id) {
          return { ...note, title, description, tag: finalTag }; // Use finalTag here
        }
        return note;
      });
      setnotes(updatedNotes);
    } else {
      console.error(json.error);
    }
  };

  return (
    <noteContext.Provider value={{ notes, setnotes, editNote, deleteNote, addNote, getNotes }}>
      {props.children}
    </noteContext.Provider>
  );
};

export default Notestate;
