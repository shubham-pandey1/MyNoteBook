import React, {useContext} from 'react';
import noteContext from "../contest/notes/noteContext";

const NoteItem = (props) => {
    const context = useContext(noteContext);
    const {deleteNote} = context;
    const {note, updateNote} = props;
    return (
        <div className='col-sm-3 p-3'>
            <div className="card "> 
                <div className="card-body">
                  <div className="d-flex">
                    <h5 className="card-title">{note.title}</h5>
                    <i className="fa-solid fa-trash-can ps-2 p-1" onClick={()=>{deleteNote(note._id)}}></i>
                    <i className="fa-solid fa-pen-to-square p-1" onClick={()=>{updateNote(note)}}></i>
                  </div>
                    <h6 className="card-subtitle mb-2 text-body-secondary">{note.tag}</h6>
                    <p className="card-text">{note.description}</p>
                </div>
            </div>
        </div>
    )
}

export default NoteItem
