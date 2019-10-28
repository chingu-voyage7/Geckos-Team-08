import React, { Component } from "react";
import WeeklyLog from "../components/WeeklyLog/WeeklyLog.jsx";
import DailyLog from "../components/DailyLog/DailyLog";
import fire, { auth, provider } from '../fire.js';
import "./Notebook.css";


class NoteBook extends Component {
  state = {
    notes:[],
    view: "daily",
    user: null
  };
  changeView(viewName) {
    this.setState({view: viewName});
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
  }
  componentWillMount() {
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
      <React.Fragment>
        <header>
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
    </header>
    <form onSubmit={this.addNote.bind(this)}>
        <input type="text" ref={ el => this.inputEl = el }/>
        <input type="submit"/>
        
        </form>
        <div>
          <button onClick={this.changeView("daily")}>Daily</button>
          <button onClick={this.changeView("weekly")}>Weekly</button>
          <button onClick={this.changeVieew("monthly")}>Monthly</button>
        </div>
        {this.state.view == "daily" ?
          <DailyLog notes={this.state.notes} /> : <></>
        }
        {this.state.view == "weekly" ?
          <WeeklyLog notes={this.state.notes} /> : <></>}
        {this.state.view == "monthly" ?
          <MonthlyLog notes={this.state.notes} /> : <></>
        }
      </React.Fragment>
    );
  }
}

export default NoteBook;
