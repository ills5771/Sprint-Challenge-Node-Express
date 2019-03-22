import React, { Component } from "react";
import axios from "axios";
import "./App.css";

class App extends Component {
  state = {
    projects: []
  };

  componentDidMount() {
    axios.get(`http://localhost:5000/projects`).then(res => {
      this.setState({
        projects: res.data
      });
    });
  }

  render() {
    return (
      <div className="App">
        {this.state.projects.map(project => (
          <div key={project.id}>{project.name} </div>
        ))}
      </div>
    );
  }
}

export default App;
