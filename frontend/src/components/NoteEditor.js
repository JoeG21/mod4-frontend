import React, { Component } from 'react';

class NoteEditor extends Component {

  state = {
    title: '',
    body: ''
  }

  // setting the current state above 👆 to the selected note
  componentDidMount () {
    this.setState({
      title: this.props.selNote.title,
      body: this.props.selNote.body
    })
  }

  // constanly updating the state when you make any changes to the note
  setNote = () => {
    if (this.props.selNote !== '') {
      this.setState({
        title: this.props.selNote.title,
        body: this.props.selNote.body
      })
    } else {
      this.setState ({
        title: '',
        body: ''
      })
    }
  }

  // targeting the current title or body and setting the note(onChange)
  setEditNote = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  // persecing the changes of the note to the backend
  postNote = () => {
    let editNote = {
      title: this.state.title,
      body: this.state.body
    }

    fetch(`http://localhost:3000/api/v1/notes/${this.props.selNote.id}`, {
      method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',     
    },
    body: JSON.stringify(editNote)
    })
    .then(res => res.json())
    .then(note => {this.props.cancelEditNote})
  };

  render() {
    return (
      <form className="note-editor">
        <input type="text" name="title" value={this.state.title} onChange={e => this.setEditNote(e)}/>
        <textarea name="body" value={this.state.body} onChange={e => this.setEditNote(e)} />
        <div className="button-row">
          <input className="button" type="submit" value="Save" onClick={() => this.postNote()}/>
          <button type="button" onClick={() => this.props.cancelEditNote()}>Cancel</button>
        </div>
      </form>
    );
  }
}

export default NoteEditor;
