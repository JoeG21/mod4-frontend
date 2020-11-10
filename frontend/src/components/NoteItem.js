import React from 'react';

const NoteItem = (props) => (
    <li onClick={() => props.selNote(props.note)}>
      <h2>{props.note.title}</h2>
      <p>{props.note.body.slice(0,20)}...</p>
    </li>
);

export default NoteItem;
