import React, { Component } from 'react';
import Note from '../Note/Note.js';
import fire, { auth, provider } from '../../fire.js';
import moment from 'moment';

class WeeklyLog extends Component {
  state = { 
    notes:[],
    weekStart: null,
    weekEnd: null,
    user: null
  }
  logout() {
    auth.signOut()
      .then(() => {
        this.setState({
          user: null
        });
      });
  }
  login() {
    auth.signInWithPopup(provider) 
      .then((result) => {
        const user = result.user;
        this.setState({
          user: user,
          uid: user.uid
        });
      });
    };
  componentWillMount() {
    let sunday = moment.utc().startOf('week');
    let saturday = moment.utc().endOf('week');
    let sundayEst = new Date(sunday + 18000000).getTime();
    this.setState( { weekStart: sunday, weekEnd: saturday } );
    auth.onAuthStateChanged((user) => { 
      if (user) {
        this.setState({ user });
         
    let getNotes = fire.database().ref(`notes/${this.state.user.uid}`).orderByChild('date').startAt(sundayEst);
    getNotes.on('value', snapshot => {
      /* Update React state when message is added at Firebase Database */
      let notes = snapshot.val();
      let newState = [];
      for (let note in notes) {
        newState.push({
          id: DataTransferItem,
          text: notes[note].text,
          date: notes[note].date,
          user: notes[note].user
        })
      }
      this.setState({
        notes: newState
      })
    })
      } 
    });
   
  }
  addNote(e) {
    e.preventDefault();
    var notes = fire.database().ref(`/notes/${this.state.user.uid}`);
    let newNote = {
      text : this.inputEl.value,
      date : new Date().getTime()
    }
    notes.push( newNote );
    this.inputEl.value = '';
  }
  componentWillUnmount() {
    this.firebaseRef.off();
  }
  render() { 
    return (
      <div>
          <header>
    <div className="wrapper">
      <h1>Notes App:</h1>
      {this.state.user ?
        <button onClick={this.logout.bind(this)}>Log Out</button>                
        :
        <button onClick={this.login.bind(this)}>Log In</button>            
      }
      {this.state.user ?
      <h2>{this.state.user.displayName}</h2>
      :
      <h2>No user is logged in</h2>
    }
    </div>
  </header>
        <form onSubmit={this.addNote.bind(this)}>
        <input type="text" ref={ el => this.inputEl = el }/>
        <input type="submit"/>
        
        </form>
        {this.state.user ? 
            this.state.notes.map( note => <Note key={note.id} text={note.text}/>)
          
          :
          <p>You must be logged in to see this app</p>
        }
      </div>
    );
  }
}
 
export default WeeklyLog;