import React, { Component } from 'react';
import "./Note.css"

class Note extends Component {
  state = {  }
  render() { 
    return ( <p className="note">{this.props.text}</p> );
  }
}
 
export default Note;