import React from 'react';
import '../styles/Note.css'

function Note({ note, onNoteDelete }) {
  return (
    <li className='Note-container'>
      <h2>{note.title}</h2>
      <p>{note.content}</p>
      <button onClick={() => onNoteDelete(note.id)}>Eliminar</button>
    </li>
  );
}

export default Note;