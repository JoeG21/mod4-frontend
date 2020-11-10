import React, { Component } from 'react';
import NoteEditor from './NoteEditor';
import NoteViewer from './NoteViewer';
import Instructions from './Instructions';


// const handleDeleteClick = (note) => {
//   this.props.handleDeleteNote(note)
// }

const renderContent = (props) => {
  if (props.showEditor) {
    return <NoteEditor cancelEditNote={props.cancelEditNote} 
      selNote={props.selNote}/>;
  } 
  else if (props.selNote !== null) {
    return <NoteViewer handleDeleteClick={props.handleDeleteClick}
      handleClick={props.handleClick} 
        selNote={props.selNote}/>;
  } 
  else {
    return <Instructions />;
  }
}

 const Content = (props) => {
    return (
      <div className='master-detail-element detail'>
        {renderContent(props)}
      </div>
    );
}

export default Content;
