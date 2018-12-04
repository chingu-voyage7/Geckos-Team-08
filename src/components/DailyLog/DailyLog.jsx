import React, { Component } from "react";
import moment from "moment";
import List from "./List";
import "./DailyLog.css";

class DailyLog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      term: "",
      items: []
    };
  }

  onChange = event => {
    this.setState({ term: event.target.value });
  };

  onSubmit = event => {
    event.preventDefault();
    this.setState({
      term: "",
      items: [...this.state.items, this.state.term]
    });
  };

  render() {
    return (
      <div className="container">
        <h1>{moment().format("MMMM Do")} </h1>
        <p>enter a task for today and hit submit</p>
        <List items={this.state.items} />
        <form onSubmit={this.onSubmit}>
          {/* <input value={this.state.term} onChange={this.onChange} /> */}
          <button>submit</button>
        </form>
      </div>
    );
  }
}

export default DailyLog;
