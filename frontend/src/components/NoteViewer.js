import React, { Fragment } from 'react';

const NoteViewer = (props) => {
  return (
    <Fragment>
      <h2>{props.selNote.title}</h2>
      <p>{props.selNote.body}</p>
      <button onClick={() => props.handleClick()}>Edit</button>
      <button onClick={() => props.handleDeleteClick(props)}>Delete</button>
    </Fragment>
  );
}

export default NoteViewer;
