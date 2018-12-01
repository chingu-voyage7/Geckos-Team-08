import React, { Component } from 'react';
import Note from '../Note/Note.js';
import fire from '../../fire.js';

class WeeklyLog extends Component {
  state = { notes:[] }
  componentWillMount() {
    let getNotes = fire.database().ref('notes').orderByKey().limitToLast(100);
    getNotes.on('child_added', snapshot => {
      /* Update React state when message is added at Firebase Database */
      let note = { text: snapshot.val(), id: snapshot.key };
      this.setState({ notes: [note].concat(this.state.notes) });
    })
  }
  addNote(e) {
    e.preventDefault();
    fire.database().ref('notes').push( this.inputEl.value );
    this.inputEl.value = '';
  }
  render() { 
    return (
      <div>
        <form onSubmit={this.addNote.bind(this)}>
        <input type="text" ref={ el => this.inputEl = el }/>
        <input type="submit"/>
        </form>
          {
            this.state.notes.map( note => <Note key={note.id} text={note.text}/>)
          }
      </div>
    );
  }
}
 
export default WeeklyLog;