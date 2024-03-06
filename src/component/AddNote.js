import React, { useState, useContext } from 'react'
import noteContext from '../contest/notes/noteContext';
// import Notes from './Notes';

const AddNote = (props) => {
    const context = useContext(noteContext);
    const {addNote} = context;

    const [note, setNote] = useState({title: "", description: "", tag: ""})
    const handleClick =(e)=>{
      addNote(note.title, note.description, note.tag);
      setNote({title:"", description:"", tag:""});
      e.preventDefault();
      props.showAlert("Notes added Successfully", "success");
    }

    const onChange= (e)=>{
        setNote({...note, [e.target.id]: e.target.value})
    }
  return (
    <div>
      <div className="container my-3">
                <h2>Add a note</h2>
                <form action="">
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name='title' placeholder="Title" aria-describedby='emailHelp' value={note.title} onChange={onChange} minLength={5} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" name='tag' aria-describedby='emailHelp' placeholder="Enter here..." value={note.tag} onChange={onChange} minLength={5} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" name='description' aria-describedby='emailHelp' placeholder="Enter here..." value={note.description} onChange={onChange} minLength={5} required/>
                </div>
                <button disabled={note.description.length<5 || note.title.length<5} type="submit" className="btn px-5 btn-primary" onClick={handleClick}>Add</button>
                </form>
            </div>
            
    </div>
  )
}

export default AddNote
