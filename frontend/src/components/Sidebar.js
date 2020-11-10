import React, { Component } from 'react';
import NoteList from './NoteList';

class Sidebar extends Component {
  render() {
    return (
      <div className='master-detail-element sidebar'>
        <NoteList notes={this.props.notes} selNote={this.props.selNote}/>
        <button onClick={this.props.postNote}>New</button>
      </div>
    );
  }
}

export default Sidebar;
