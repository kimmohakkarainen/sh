import React, { Component } from "react";
import ReactDOM from "react-dom";
import {
  Panel,
  Button,
  Modal,
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
import ChangePasswordModal from "./changepasswordmodal";
import ModifyUserModal from "./modifyusermodal";

import UserTable from "./usertable";

class UserAdminView extends Component {
  constructor(props) {
    super(props);
    this.state = this.initState();
    this.handleNewUser = this.handleNewUser.bind(this);
    this.handleModify = this.handleModify.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.onHideModal = this.onHideModal.bind(this);
    this.submitUser = this.submitUser.bind(this);
  }

  initState() {
    return {
      newUser: false,
      changePasswordModal: null,
      modifyUserModal: null
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

  handleModify(user) {
    this.setState({ modifyUserModal: user });
  }

  handlePassword(user) {
    this.setState({ changePasswordModal: user });
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
        <Modal
          show={this.state.changePasswordModal != null}
          onHide={this.onHideModal}
        >
          <ChangePasswordModal
            onHide={this.onHideModal}
            onSubmit={this.submitUser}
            user={this.state.changePasswordModal}
          />
        </Modal>
        <Modal
          show={this.state.modifyUserModal != null}
          onHide={this.onHideModal}
        >
          <ModifyUserModal
            onHide={this.onHideModal}
            onSubmit={this.submitUser}
            user={this.state.modifyUserModal}
          />
        </Modal>

        <Panel bsStyle="primary">
          <Panel.Heading>
            <Panel.Title toggle componentClass="h3">
              Käyttäjähallinta
            </Panel.Title>
          </Panel.Heading>
          <Panel.Body>
            <UserTable
              users={users}
              onModify={this.handleModify}
              onChangePassword={this.handlePassword}
            />
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
    users: state.users,
    modifyUserModal: state.modifyUserModal,
    changePasswordModal: state.changePasswordModal
  };
}

export default connect(mapStateToProps)(UserAdminView);
