import React from 'react';
import Note from './Note';
import '../styles/NoteList.css'

// notes -> Las notas
// searchTerm -> La cadena con la que se realizará la busqueda
// onNoteDelete -> La función que elimina la nota

function NoteList({ notes, searchTerm, setSearchTerm, onNoteDelete }) {
    
  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='NoteList-container'>
      <div id="centrado">  
        <input
          id="buscarNotas"
          type="text"
          placeholder="Buscar notas"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <ul>
        {filteredNotes.map((note) => (
          <Note key={note.id} note={note} onNoteDelete={onNoteDelete} />
        ))}
      </ul>
    </div>
  );
}

export default NoteList;
