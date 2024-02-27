import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid'; // Importa uuid

import NoteList from './components/NoteList';
import NoteEditor from './components/NoteEditor';

  

function App() {
  const [notes, setNotes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  
  useEffect(() => {
     const storedNotes = JSON.parse(localStorage.getItem('notes'));
     setNotes(storedNotes);
  }, []);

  useEffect(() => {
    // const stored = localStorage.getItem('notes');
    if(notes.length>0){
      localStorage.setItem('notes', JSON.stringify(notes));
    }
     
  }, [notes]);

  const addNote = (newNote) => {
    let actualizado = [  { ...newNote, id: uuidv4() }, ...notes];
    setNotes(actualizado);
    //localStorage.setItem('notes', JSON.stringify(actualizado))
    console.log(localStorage.getItem('notes'))
  };

  const deleteNote = (noteId) => {
    const updatedNotes = notes.filter((note) => note.id !== noteId);
    //localStorage.setItem('notes', JSON.stringify(updatedNotes));
    setNotes(updatedNotes);
  };

  return (
    <div className="App">
      <h1>Aplicación de Notas</h1>
      <NoteEditor onNoteAdd={addNote} />
      <NoteList notes={notes} searchTerm={searchTerm} setSearchTerm={setSearchTerm} onNoteDelete={deleteNote} />
      
      
    </div>
  );
}

export default App;
