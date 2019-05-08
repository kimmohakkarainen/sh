import React, { Component } from "react";
import ReactDOM, { render } from "react-dom";

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

import PropTypes from "prop-types";

import { validationState } from "./common";

export class UserFields extends Component {
  constructor(props) {
    super(props);
    this.handleUsername = this.handleUsername.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handleFullname = this.handleFullname.bind(this);
  }

  handleUsername(e) {
    const username = e.target.value;
    const valid = username.length > 3;

    const state = Object.assign({}, this.props.state, {
      username: username,
      usernameValid: valid
    });
    this.props.onChange(state);
  }

  handleEmail(e) {
    const email = e.target.value;
    const valid = /^[^@\s]+@[^@\s]+$/.test(email);
    const state = Object.assign({}, this.props.state, {
      email: email,
      emailValid: valid
    });
    this.props.onChange(state);
  }

  handleFullname(e) {
    const fullname = e.target.value;
    const valid = fullname.length > 3;
    const state = Object.assign({}, this.props.state, {
      fullname: fullname,
      fullnameValid: valid
    });
    this.props.onChange(state);
  }

  render() {
    const {
      validation,
      username,
      usernameValid,
      email,
      emailValid,
      fullname,
      fullnameValid,
      rightAdmin,
      rightSecretary,
      rightDoctor
    } = this.props.state;
    return (
      <div>
        <FormGroup validationState={validationState(usernameValid)}>
          <ControlLabel>Username</ControlLabel>
          <FormControl
            type="text"
            placeholder="username"
            value={username}
            onChange={this.handleUsername}
          />
          {validation && !usernameValid && (
            <HelpBlock>At least three characters needed</HelpBlock>
          )}
        </FormGroup>
        <FormGroup validationState={validationState(emailValid)}>
          <ControlLabel>E-mail</ControlLabel>
          <FormControl
            type="text"
            placeholder="username"
            value={email}
            onChange={this.handleEmail}
          />
          {validation && !emailValid && (
            <HelpBlock>Should be valid e-mail address</HelpBlock>
          )}
        </FormGroup>
        <FormGroup validationState={validationState(fullnameValid)}>
          <ControlLabel>Fullname</ControlLabel>
          <FormControl
            type="text"
            placeholder="username"
            value={fullname}
            onChange={this.handleFullname}
          />
          {validation && !fullnameValid && (
            <HelpBlock>At least three characters needed</HelpBlock>
          )}
        </FormGroup>
        <FormGroup>
          <ControlLabel>Rights</ControlLabel>
          <Checkbox
            key="admin"
            checked={rightAdmin}
            onChange={e => {
              this.props.onChange({ rightAdmin: e.target.checked });
            }}
          >
            ADMIN
          </Checkbox>
          <Checkbox
            key="secretary"
            checked={rightSecretary}
            onChange={e => {
              this.props.onChange({ rightSecretary: e.target.checked });
            }}
          >
            SECRETARY
          </Checkbox>
          <Checkbox
            key="doctor"
            checked={rightDoctor}
            onChange={e => {
              this.props.onChange({ rightDoctor: e.target.checked });
            }}
          >
            DOCTOR
          </Checkbox>
        </FormGroup>
      </div>
    );
  }
}

UserFields.propTypes = {
  state: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired
};
