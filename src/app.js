import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Menu from "./menu";

import DummyView from "./dummyview";
import EnterView from "./enterview";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <Menu personName="Matti Meikäläinen" privileged={true} />
            <Route exact path="/" component={EnterView} />
            <Route exact path="/doctor" component={DummyView} />
            <Route exact path="/billing" component={DummyView} />
            <Route exact path="/admin/rights" component={DummyView} />
            <Route exact path="/admin/reports" component={DummyView} />
            <Route exact path="/password" component={DummyView} />
            <Route exact path="/logout" component={DummyView} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
