import React, { Component } from 'react';

class Note extends Component {
  state = {  }
  render() { 
    return ( <p>{this.props.text}</p> );
  }
}
 
export default Note;