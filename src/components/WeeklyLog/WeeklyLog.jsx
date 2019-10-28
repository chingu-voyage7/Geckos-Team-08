import React, { Component } from 'react';
import Note from '../Note/Note.js';
import moment from 'moment';

class WeeklyLog extends Component {
  state = { 
    weekStart: null,
    weekEnd: null,
  }
 
  componentWillMount() {
    let sunday = moment.utc().startOf('week');
    let saturday = moment.utc().endOf('week');
    // let sundayEst = new Date(sunday + 18000000).getTime();
    this.setState( { weekStart: sunday, weekEnd: saturday } );
  }
  render() { 
    return (
      <div> 
        {
          this.props.notes.map(note => { return(
            <Note key={note.id} text={note.text} />
          )})
        }
      </div>
    );
  }
}
 
export default WeeklyLog;