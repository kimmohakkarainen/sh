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
  Table,
  Badge
} from "react-bootstrap";

import { connect } from "react-redux";
import { getUsers, modifyUser } from "../actions";

import CreateUserModal from "./createusermodal";
import UserTable from "./usertable";

class UserAdminView extends Component {
  constructor(props) {
    super(props);
    this.state = this.initState();
    this.handleNewUser = this.handleNewUser.bind(this);
    this.onHideModal = this.onHideModal.bind(this);
    this.submitUser = this.submitUser.bind(this);
  }

  initState() {
    return {
      newUser: false
    };
  }

  componentDidMount() {
    this.props.dispatch(getUsers(this.props.person));
  }

  handleNewUser() {
    this.setState({
      newUser: true
    });
  }

  submitUser(user) {
    this.props.dispatch(modifyUser(user));
    this.setState(this.initState());
  }

  onHideModal() {
    this.setState(this.initState());
  }

  render() {
    const users = this.props.users == null ? [] : this.props.users;
    return (
      <div>
        <CreateUserModal
          show={this.state.newUser}
          onHide={this.onHideModal}
          onSubmit={this.submitUser}
        />
        <Panel bsStyle="primary">
          <Panel.Heading>
            <Panel.Title toggle componentClass="h3">
              Käyttäjähallinta
            </Panel.Title>
          </Panel.Heading>
          <Panel.Body>
            <UserTable users={users} />
            <Button bsStyle="primary" onClick={this.handleNewUser}>
              Luo uusi käyttäjä
            </Button>
          </Panel.Body>
        </Panel>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    person: state.person,
    users: state.users
  };
}

export default connect(mapStateToProps)(UserAdminView);
