import React, { useContext, useState } from "react";
import noteContext from "../context/notes/Notecontex";
import './AllCostomCss.css'
function Addnote({ showAlert }) { // Accept showAlert as a prop
    const [note, setnote] = useState({ title: "", description: "", tag: "" });
    const context = useContext(noteContext);
    const { addNote } = context;

    const handleClick = (e) => {
        e.preventDefault(); // Prevent form refresh
        addNote(note.title, note.description, note.tag); // Add new note
        showAlert("Note added successfully", "success"); // Show alert on success
        setnote({ title: "", description: "", tag: "" }); // Clear fields
    };

    const onChange = (e) => {
        setnote({ ...note, [e.target.name]: e.target.value });
    };

    return (
        <div>
            <h1>Add a note</h1>
            <form className="about-container">
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input
                        onChange={onChange}
                        minLength={5} required
                        type="text"
                        name="title"
                        className="form-control"
                        id="title"
                        value={note.title} // Control the input
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input
                        onChange={onChange}
                        name="description"
                        type="text"
                        className="form-control"
                        id="description"
                        minLength={5} required
                        value={note.description} // Control the input
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input
                        onChange={onChange}
                        name="tag"
                        type="text"
                        className="form-control"
                        id="tag"
                        value={note.tag} // Control the input
                    />
                </div>
                <button disabled={note.title.length < 5 || note.description.length < 5} type="submit" className="btn btn-primary" onClick={handleClick}>
                    Add note
                </button>
            </form>
        </div>
    );
}

export default Addnote;
