import React, { Component } from "react";
import ReactDOM from "react-dom";

import {
  Modal,
  Panel,
  Button,
  ToggleButton,
  ButtonToolbar,
  ToggleButtonGroup,
  Grid,
  Row,
  Col,
  Form,
  FormGroup,
  ControlLabel,
  FormControl,
  Checkbox,
  InputGroup,
  DropdownButton,
  MenuItem,
  HelpBlock,
  Table
} from "react-bootstrap";

class CreateUserModal extends Component {
  constructor(props) {
    super(props);
    this.state = this.initState();
    this.handleUsername = this.handleUsername.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handleFullname = this.handleFullname.bind(this);
    this.onHide = this.onHide.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handlePassword2 = this.handlePassword2.bind(this);
  }

  initState() {
    return {
      validation: false,
      username: "",
      usernameValid: "error",
      email: "",
      emailValid: "error",
      fullname: "",
      fullnameValid: "error",
      rightAdmin: false,
      rightSecretary: false,
      rightDoctor: false,
      password: "",
      password2: "",
      password2Valid: null
    };
  }

  createResponse(state) {
    var rights = [];
    if (state.rightAdmin) {
      rights.push("ADMIN");
    }
    if (state.rightSecretary) {
      rights.push("SECRETARY");
    }
    if (state.rightDoctor) {
      rights.push("DOCTOR");
    }

    return {
      username: state.username,
      email: state.email,
      fullname: state.fullname,
      password: state.password,
      password2: state.password,
      rights: rights
    };
  }

  onHide() {
    this.setState(this.initState());
    this.props.onHide();
  }

  handleClick() {
    if (
      this.state.usernameValid &&
      this.state.emailValid &&
      this.state.fullnameValid
    ) {
      const params = this.createResponse(this.state);
      this.setState(this.initState());
      this.props.onSubmit(params);
    } else {
      this.setState({ validation: true });
    }
  }

  handleUsername(e) {
    const username = e.target.value;
    const valid = this.validationState(username.length > 3);
    this.setState({
      username: username,
      usernameValid: valid
    });
  }

  handleEmail(e) {
    const email = e.target.value;
    const valid = this.validationState(/^[^@\s]+@[^@\s]+$/.test(email));
    this.setState({
      email: email,
      emailValid: valid
    });
  }

  handleFullname(e) {
    const fullname = e.target.value;
    const valid = this.validationState(fullname.length > 3);
    this.setState({
      fullname: fullname,
      fullnameValid: valid
    });
  }

  handlePassword(e) {
    const password = e.target.value;
    const valid = this.validationState(this.state.password2 == password);
    this.setState({
      password: password,
      password2Valid: valid
    });
  }

  handlePassword2(e) {
    const password2 = e.target.value;
    const valid = this.validationState(this.state.password == password2);
    this.setState({
      password2: password2,
      password2Valid: valid
    });
  }

  /*
  handleAdmin(e) {
    console.log(e.target);
    console.log(e.target.checked);
  }
  */

  validationState(value) {
    if (value == null) {
      return null;
    } else if (value) {
      return "success";
    } else {
      return "error";
    }
  }

  render() {
    return (
      <Modal show={this.props.show} onHide={this.onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Uusi Käyttäjä</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormGroup validationState={this.state.usernameValid}>
            <ControlLabel>Username</ControlLabel>
            <FormControl
              type="text"
              placeholder="username"
              value={this.state.username}
              onChange={this.handleUsername}
            />
            {this.state.validation && !this.state.usernameValid && (
              <HelpBlock>At least three characters needed</HelpBlock>
            )}
          </FormGroup>
          <FormGroup validationState={this.state.emailValid}>
            <ControlLabel>E-mail</ControlLabel>
            <FormControl
              type="text"
              placeholder="username"
              value={this.state.email}
              onChange={this.handleEmail}
            />
            {this.state.validation && !this.state.emailValid && (
              <HelpBlock>Should be valid e-mail address</HelpBlock>
            )}
          </FormGroup>
          <FormGroup validationState={this.state.fullnameValid}>
            <ControlLabel>Fullname</ControlLabel>
            <FormControl
              type="text"
              placeholder="username"
              value={this.state.fullname}
              onChange={this.handleFullname}
            />
            {this.state.validation && !this.state.fullnameValid && (
              <HelpBlock>At least three characters needed</HelpBlock>
            )}
          </FormGroup>
          <FormGroup>
            <ControlLabel>Rights</ControlLabel>
            <Checkbox
              key="admin"
              checked={this.state.rightAdmin}
              onClick={e => {
                this.setState({ rightAdmin: e.target.checked });
              }}
            >
              ADMIN
            </Checkbox>
            <Checkbox
              key="secretary"
              checked={this.state.rightSecretary}
              onClick={e => {
                this.setState({ rightSecretary: e.target.checked });
              }}
            >
              SECRETARY
            </Checkbox>
            <Checkbox
              key="doctor"
              checked={this.state.rightDoctor}
              onClick={e => {
                this.setState({ rightDoctor: e.target.checked });
              }}
            >
              DOCTOR
            </Checkbox>
          </FormGroup>
          <FormGroup validationState={this.state.password2Valid}>
            <ControlLabel>Password</ControlLabel>
            <FormControl
              type="password"
              placeholder="password"
              value={this.state.password}
              onChange={this.handlePassword}
            />
          </FormGroup>
          <FormGroup validationState={this.state.password2Valid}>
            <ControlLabel>Repeat Password</ControlLabel>
            <FormControl
              type="password"
              placeholder="password"
              value={this.state.password2}
              onChange={this.handlePassword2}
            />
            {this.state.validation && !this.state.password2Valid && (
              <HelpBlock>Passwords do not match</HelpBlock>
            )}
          </FormGroup>
        </Modal.Body>

        <Modal.Footer>
          <Button bsStyle="primary" onClick={this.handleClick}>
            Talleta
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default CreateUserModal;
