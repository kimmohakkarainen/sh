import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Menu from "./menu";

import { connect } from "react-redux";
import { fetchState } from "./actions";

import DummyView from "./dummyview";
import EnterView from "./enterview";
import DoctorView from "./doctorview";
import LoginView from "./loginview";
import AdminView from "./adminview";
import PersonAdminView from "./personadminview";

class App extends Component {
  componentDidMount() {
    /*
    this.props.dispatch(fetchState());
    */
  }

  render() {
    return (
      <div className="App">
        {!this.props.person && <LoginView />}
        {this.props.person && (
          <Router>
            <div>
              <Menu personName={this.props.person.email} privileged={true} />
              <Route exact path="/" component={EnterView} />
              <Route exact path="/doctor" component={DoctorView} />
              <Route exact path="/billing" component={DummyView} />
              <Route exact path="/admin/rights" component={AdminView} />
              <Route exact path="/admin/reports" component={PersonAdminView} />
              <Route exact path="/password" component={DummyView} />
              <Route exact path="/logout" component={DummyView} />
            </div>
          </Router>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    person: state.person
  };
}

export default connect(mapStateToProps)(App);
