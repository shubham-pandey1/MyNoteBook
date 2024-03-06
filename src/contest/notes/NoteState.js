import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props)=>{
    const host = "http://localhost:5000"
    const notesInitial=[];

    const [notes, setNotes] = useState(notesInitial);
    
    //Get all note
    const getNotes = async(title, description, tag)=>{
      // todo api call
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')
        },
       
      });
      const json = await response.json();
      
      setNotes(json);
    }

    //Add a note
    const addNote = async(title, description, tag)=>{
      // todo api call
      const response = await fetch(`${host}/api/notes/addnote`, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')

        },
        body: JSON.stringify({title, description, tag}), // body data type must match "Content-Type" header
      });
      const note = await response.json();
      
      setNotes(notes.concat(note))
    }

    // Delete a note
    const deleteNote = async(id)=>{
      // api call
      const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: "DELETE", // *GET, POST, PUT, DELETE, etc.
        
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')

        },
        
      });
      // const json = response.json();

      
      const newNotes = notes.filter((note)=>{return note._id!==id});
      setNotes(newNotes);
    }

    // Edit a note
    const editNote = async(id, title, description, tag)=>{
      // api call
      
      const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: "PUT", // *GET, POST, PUT, DELETE, etc.
        
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')

        },
        body: JSON.stringify({title,description,tag}), // body data type must match "Content-Type" header
      });
      // const json = await response.json();
      
      // logic to edit in client

      let newNotes = JSON.parse(JSON.stringify(notes));
      for(let index = 0; index< notes.length; index++){
        const element = newNotes[index];
        if(element._id === id){
          newNotes[index].title = title;
          newNotes[index].tag = tag;
          newNotes[index].description = description;
          break; 
        }
      }
      
      setNotes(newNotes);
    }

    return(
        <NoteContext.Provider value = {{notes, addNote, deleteNote,editNote, getNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}
 
export default NoteState;