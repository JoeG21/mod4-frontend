import React, { Component, Fragment } from 'react';
import Search from './Search';
import Sidebar from './Sidebar';
import Content from './Content';

import { connect } from 'react-redux'

class NoteContainer extends Component {

  state = {
    selNote: null,
    searchTerm: '',
    foundNotes: [],
    showEditor: false
  }
  // fetching the notes and setting the state
  componentDidMount = () => {
    this.getNotes()
  }

  getNotes = () => {
    fetch('http://localhost:3000/api/v1/notes')
    .then(res => res.json())
    .then(notes => this.setNotes(notes))
  }

  setNotes = (allNotes) => {
    this.setState({
      notes: allNotes
    })
  }

  // selecting a note
  selNote = (note) => {
    this.setState({
      selNote: note
    })
  }

  // searching for a note
  searchNote = (e) => {
    this.setState({
      searchTerm: e.target.value
    }, this.filterNote)
  }

  // filtering out the current state of note by searchTerm
  filterNote = (e) => {
    if (this.state.searchTerm !== '') {
      let currentNote = this.state.notes.filter(note => {
        return note.title.includes(this.state.searchTerm)
      })
      this.setState({
        foundNotes: currentNote
      })
    } else {
      this.setState({
        foundNotes: ''
      })
    }
  }

  // making a new note
  postNote = () => {
    let newNote = {
      title: 'default',
      body: 'placeholder'
    }

    fetch('http://localhost:3000/api/v1/notes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newNote)
    })
    .then(res => res.json())
    .then(note => this.setNewNote(note))
  }  

  // setting the newley note to the current state of notes
  setNewNote = (note) => {
    let newNotes = [...this.state.notes, note]
    this.setState({
      notes: newNotes
    })
  }

  // discarding any changed you made in the note(cancel button)
  cancelEditNote = () => {
    this.setState({
      showEditor: false
    })
  }

  // editing the current note(edit button)
  handleClick = () => {
    this.setState({
      showEditor: true
    })
  }

  // handling the deleted note and setting the state of notes
  handleDeleteClick = (props) => {
    fetch(`http://localhost:3000/api/v1/notes/${props.selNote.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(_ => {
      const filteredNotes = [...this.state.notes].filter(note => note.id !== props.selNote.id)
      this.setState({ 
        ...this.state, 
        notes: filteredNotes,
        selNote: null})
    })
  }

  render() {
    return (
      <Fragment>
        <Search searchNote={this.searchNote}/>
        <div className='container'>
          {
            this.state.foundNotes.length === 0 ? 
              <Sidebar postNote={this.postNote}
                selNote={this.selNote}
                  notes={this.state.notes}/> 
                  : 
                <Sidebar postNote={this.postNote}
                  selNote={this.selNote}
                    notes={this.state.foundNotes}/>
            }
          <Content cancelEditNote={this.cancelEditNote} 
            showEditor={this.state.showEditor} 
              handleDeleteClick={this.handleDeleteClick}
                handleClick={this.handleClick} 
                  selNote={this.state.selNote}/>
        </div>
      </Fragment>
    );
  }
}

export default connect() NoteContainer;
