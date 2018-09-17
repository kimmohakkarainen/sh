import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Menu from "./menu";
import DummyView from "./dummyview";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <Menu personName="Matti Meikäläinen" privileged={true} />
            <Route exact path="/" component={DummyView} />
            <Route exact path="/dashboard" component={DummyView} />
            <Route exact path="/day" component={DummyView} />
            <Route path="/day/:date" component={DummyView} />
            <Route exact path="/week" component={DummyView} />
            <Route path="/week/:date" component={DummyView} />
            <Route exact path="/month" component={DummyView} />
            <Route path="/month/:date" component={DummyView} />
            <Route exact path="/logout" component={DummyView} />
            <Route exact path="/password" component={DummyView} />
            <Route exact path="/pref" component={DummyView} />
            <Route exact path="/pref/projects" component={DummyView} />
            <Route exact path="/admin/customers" component={DummyView} />
            <Route exact path="/admin/reports" component={DummyView} />
            <Route exact path="/admin/dashboard" component={DummyView} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
