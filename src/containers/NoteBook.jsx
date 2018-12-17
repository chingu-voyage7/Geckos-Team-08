import React, { Component } from "react";
import WeeklyLog from "../components/WeeklyLog/WeeklyLog.jsx";
import DailyLog from "../components/DailyLog/DailyLog";
import "./Notebook.css";


class NoteBook extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <div>
          <WeeklyLog />
        </div>
      </React.Fragment>
    );
  }
}

export default NoteBook;
