import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Menu from "./menu";

import { connect } from "react-redux";
import { fetchState, postLogout } from "./actions";

import DummyView from "./dummyview";
import PasswordView from "./passwordview";
import EnterView from "./enterview";
import DoctorView from "./doctorview";
import PersonAdminView from "./personadminview";
import UserAdminView from "./useradminview";
import ExaminationAdminView from "./examinationadminview";
import InvoiceView from "./invoiceview";
import Footer from "./components/footer.js";

class App extends Component {
  componentDidMount() {
    this.props.dispatch(fetchState());
  }

  render() {
    const personName =
      this.props.person && this.props.person.fullname
        ? this.props.person.fullname
        : this.props.person
        ? this.props.person.email
        : "";

    console.log(this.props.person);

    const rights =
      this.props == null ||
      this.props.person == null ||
      this.props.person.rights == null
        ? []
        : this.props.person.rights;

    console.log(rights);

    const admin = rights.includes("ADMIN");
    const secretary = rights.includes("SECRETARY");
    const doctor = rights.includes("DOCTOR");

    return (
      <div className="App">
        {this.props.person && (
          <Router>
            <div>
              <Menu
                personName={personName}
                admin={admin}
                secretary={secretary}
                doctor={doctor}
              />
              <Route
                exact
                path="/"
                render={() => {
                  if (doctor) {
                    return <Redirect to="/doctor" />;
                  } else {
                    return <Redirect to="/enter" />;
                  }
                }}
              />
              <Route exact path="/enter" component={EnterView} />
              <Route exact path="/doctor" component={DoctorView} />
              <Route exact path="/billing" component={InvoiceView} />
              <Route exact path="/admin/rights" component={UserAdminView} />
              <Route
                exact
                path="/admin/examinations"
                component={ExaminationAdminView}
              />
              <Route exact path="/password" component={PasswordView} />
              <Route
                exact
                path="/logout"
                render={() => {
                  this.props.dispatch(postLogout());
                  return <div>Logging out</div>;
                }}
              />
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
