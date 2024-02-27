import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid'; 
import '../styles/NoteEditor.css'

function NoteEditor({ onNoteAdd }) {
    
  const [newNote, setNewNote] = useState({ title: '', content: '' });

  const handleAddNote = () => {
    if (newNote.title && newNote.content) {
      onNoteAdd({ ...newNote, id: uuidv4() }); // Genera un ID único con uuid
      setNewNote({ title: '', content: '' });
    }
  }

  return (
    <div className="note-editor-container">
      <input
        className="input-field"
        type="text"
        placeholder="Título"
        value={newNote.title}
        onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
      />
      <textarea
        className="input-field"
        placeholder="Contenido"
        value={newNote.content}
        onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
      />
      <button id="botonAdd" onClick={handleAddNote}>Agregar Nota</button>
    </div>
  );
}

export default NoteEditor;
