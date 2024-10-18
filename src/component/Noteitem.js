import React, { useContext } from "react";
import noteContext from "../context/notes/Notecontex";

function Noteitem(props) {
  const { note, updateNotes, showAlert } = props; // Added showAlert as a prop
  const context = useContext(noteContext);
  const { deleteNote } = context;

  // Function to handle note deletion
  const handleDelete = (id) => {
    deleteNote(id); // Delete the note
    showAlert("Note deleted successfully!", "success");
  };

  return (
    <div className="col-md-4 my-3">
      <div className="card overflow-hidden">
        <div className="card-body">
        {/* pass the data in a props  */}
          <span className="badge bg-primary mb-2" style={{ backgroundColor: 'transparent', color: 'white', border: '1px solid white' }}>
            {note.tag || "General"}
          </span>
          
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="card-title text-truncate" style={{ maxWidth: '70%' }}>{note.title}</h5>
            <div>
               
              <i className="fa-solid fa-trash mx-2 text-danger" onClick={() => handleDelete(note._id)}></i>
              <i className="fa-regular fa-pen-to-square mx-2 text-warning" onClick={() => updateNotes(note)}></i>
            </div>
          </div>
          <p className="card-text mt-2 text-truncate" style={{ maxHeight: '50px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {note.description}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Noteitem;
