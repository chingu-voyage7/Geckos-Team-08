import React, { Component } from "react";
import WeeklyLog from "../components/WeeklyLog/WeeklyLog.jsx";
import DailyLog from "../components/DailyLog/DailyLog";
import MonthlyLog from "../components/MontlyLog/MonthlyLog";
import "./Notebook.css";
import jsonResponse from "../data";


class NoteBook extends Component {
  state = {
    notes:[],
    view: "weekly",
    user: null
  };
  componentWillMount() {
    this.setState({notes: jsonResponse});
  }
  render() {
    return (
      <React.Fragment>
        <header>
        <h1>Notes App:</h1>
    </header>
        <div>
        </div>
        {this.state.view === "daily" ?
          <DailyLog notes={this.state.notes} /> : <></>
        }
        {this.state.view === "weekly" ?
          <WeeklyLog notes={this.state.notes} /> : <></>}
        {this.state.view === "monthly" ?
          <MonthlyLog notes={this.state.notes} /> : <></>
        }
      </React.Fragment>
    );
  }
}

export default NoteBook;
