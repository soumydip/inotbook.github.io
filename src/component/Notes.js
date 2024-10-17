import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../context/notes/Notecontex";
import Noteitem from "./Noteitem";
import Addnote from "./Addnote";
import Alert from "./Alert";
import { useNavigate } from 'react-router-dom';
const Notes = () => {
  const navigate = useNavigate();
  const [alert, setAlert] = useState(null);  // State for alerts
  const context = useContext(noteContext);
  const { notes, getNotes, editNote } = context;

  const [currentNote, setCurrentNote] = useState({ id: "", title: "", description: "", tag: "" });

  const ref = useRef(null);
  const refClose = useRef(null);

  useEffect(() => {
    
    if(localStorage.getItem('token')){
      getNotes();
    }else{
      navigate("/login"); 
    }
  }, []);

  const showAlert = (message, type) => {
    setAlert({ message, type });
    setTimeout(() => setAlert(null), 3000);  // Alert will disappear after 3 seconds
  };

  const updateNotes = (note) => {
    ref.current.click();
    setCurrentNote({
      id: note._id,
      title: note.title,
      description: note.description,
      tag: note.tag,
    });
  };

  const handleSaveChanges = () => {
    editNote(currentNote.id, currentNote.title, currentNote.description, currentNote.tag); // Save changes to note
    showAlert("Note updated successfully!", "success"); // Show alert after saving changes
    refClose.current.click(); // Close the modal after saving
  };

  return (
    <>
      <Alert alert={alert} />
      <Addnote showAlert={showAlert} />
      <button ref={ref} style={{ display: "none" }} className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
      </button>

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Title</label>
                  <input type="text" className="form-control" id="title" value={currentNote.title} minLength={5} required onChange={(e) => setCurrentNote({ ...currentNote, title: e.target.value })} />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description</label>
                  <input type="text" className="form-control" id="description" minLength={5} required value={currentNote.description} onChange={(e) => setCurrentNote({ ...currentNote, description: e.target.value })} />
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">Tag</label>
                  <input type="text" className="form-control" id="tag" value={currentNote.tag} onChange={(e) => setCurrentNote({ ...currentNote, tag: e.target.value })} />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={refClose}>Close</button>
              <button disabled={currentNote.title.length < 5 || currentNote.description.length < 5} type="button" className="btn btn-primary" onClick={handleSaveChanges}>Save changes</button>
            </div>
          </div>
        </div>
      </div>

      <div className="row my-3">
        <h2>Your Notes</h2>
        {notes.length === 0 && (
          <div className="alert alert-info mb-3" role="alert">
            No notes added yet! Start by adding a new note.
          </div>
        )}
        {notes.map((note) => (
          <Noteitem key={note._id} note={note} updateNotes={updateNotes} showAlert={showAlert} />
        ))}
      </div>
    </>
  );
};

export default Notes;
