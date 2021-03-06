import React, { Component } from "react";
import ReactDOM from "react-dom";
import {
  Panel,
  Button,
  Grid,
  Row,
  Col,
  FormGroup,
  ControlLabel,
  FormControl,
  DropdownButton,
  MenuItem,
  HelpBlock,
  Table
} from "react-bootstrap";

import { connect } from "react-redux";
import { getUsers, modifyUser } from "./actions";
import PersonTable from "./panels/persontable";

class PersonAdminView extends Component {
  constructor(props) {
    super(props);
    this.handleTallenna = this.handleTallenna.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(getUsers(this.props.person));
  }

  handleTallenna(e) {
    const person = {
      Person: {
        personId: e.personId,
        version: e.version,
        username: e.username,
        email: e.email,
        fullname: e.fullname,
        password: e.password,
        role: e.role
      }
    };
    this.props.dispatch(modifyUser(person));
  }

  render() {
    return (
      <Panel bsStyle="primary">
        <Panel.Heading>
          <Panel.Title toggle componentClass="h3">
            Käyttäjähallinta
          </Panel.Title>
        </Panel.Heading>
        <Panel.Body>
          <PersonTable
            users={this.props.users}
            onTallenna={this.handleTallenna}
          />
        </Panel.Body>
      </Panel>
    );
  }
}

function mapStateToProps(state) {
  return {
    person: state.person,
    users: state.users
  };
}

export default connect(mapStateToProps)(PersonAdminView);
