import React, { useContext,useEffect, useRef, useState } from 'react'
import noteContext from "../contest/notes/noteContext";

import NoteItem from './NoteItem';
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom';

const Notes = (props) => {

    const context = useContext(noteContext);
    const {notes,getNotes,editNote} = context;
    const ref = useRef(null);
    const refClose = useRef(null);
    const Navigate = useNavigate();
    useEffect(()=>{
      if(localStorage.getItem('token'))
        getNotes();
      else
        Navigate('/login')
    },[])

  const updateNote = (currentNote)=>{
    ref.current.click();
    setNote({id:currentNote._id, etitle:currentNote.title, edescription:currentNote.description, etag:currentNote.tag});
  }

  
  const [note, setNote] = useState({id:"", etitle: "", edescription: "", etag: ""})
    const handleClick =(e)=>{
      
      console.log("Updating note... " + note);
      editNote(note.id, note.etitle, note.edescription, note.etag);
      refClose.current.click();
      props.showAlert("Notes updated successfully!", "success");
    }

    const onChange= (e)=>{
        setNote({...note, [e.target.id]: e.target.value})
    }
  return (
  <>
  <AddNote showAlert={props.showAlert}/>
  <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
      Launch demo modal
  </button>
  
<div className="modal fade" id="exampleModal"  tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <form action="">
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="etitle" name='etitle' value={note.etitle} placeholder="Title" aria-describedby='emailHelp' onChange={onChange} minLength={5} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="etag" name='etag' value={note.etag} aria-describedby='emailHelp' placeholder="Enter here..." onChange={onChange} minLength={5} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="edescription" value={note.edescription} name='edescription' aria-describedby='emailHelp' placeholder="Enter here..." onChange={onChange} minLength={5} required/>
                </div>
                
                </form>
      </div>
      <div className="modal-footer">
        <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" disabled={note.edescription.length<5 || note.etitle.length<5} className="btn btn-primary" onClick={handleClick}>Save changes</button>
      </div>
    </div>
  </div>
</div>
   
    <div className='row ms-2'>
      <div className="ps-1">
      {notes.length===0 && "No Notes to Display"}
      </div>
       {notes.map((note)=>{
            return <NoteItem updateNote={updateNote} key={note._id} note={note}/>
        })}
    </div>
    </>  
  )
}

export default Notes
