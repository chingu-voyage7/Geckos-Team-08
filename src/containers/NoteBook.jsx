import React, { Component } from "react";
import DailyLog from "../components/DailyLog/DailyLog";
import "./Notebook.css";

class NoteBook extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <div>
          <DailyLog />
        </div>
      </React.Fragment>
    );
  }
}

export default NoteBook;
