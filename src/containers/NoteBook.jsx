import React, { Component } from "react";
import WeeklyLog from "../components/WeeklyLog/WeeklyLog.jsx";

class NoteBook extends Component {
  state = {};
  render() {
    return (
      <div>
        <div>Bullet Journal</div>
        <WeeklyLog />
      </div>
    );
  }
}

export default NoteBook;
