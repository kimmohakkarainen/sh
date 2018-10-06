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
import { getUsers } from "./actions";
import PersonTable from "./panels/persontable";

class PersonAdminView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modify: false,
      personId: 0,
      email: null,
      role: null
    };
  }

  componentDidMount() {
    this.props.dispatch(getUsers(this.props.person));
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
          <PersonTable users={this.props.users} />
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
