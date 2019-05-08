import React, { Component } from "react";
import PropTypes from "prop-types";

import {
  FormGroup,
  ControlLabel,
  FormControl,
  Checkbox,
  HelpBlock
} from "react-bootstrap";

import * as common from "./common";

export class UserFields extends Component {
  constructor(props) {
    super(props);
    this.handleUsername = this.handleUsername.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handleFullname = this.handleFullname.bind(this);
  }

  handleUsername(e) {
    const username = e.target.value;
    const valid = common.isUsernameValid({ username: username });

    const state = Object.assign({}, this.props.state, {
      username: username,
      usernameValid: valid
    });
    this.props.onChange(state);
  }

  handleEmail(e) {
    const email = e.target.value;
    const valid = common.isEmailValid({ email: email });
    const state = Object.assign({}, this.props.state, {
      email: email,
      emailValid: valid
    });
    this.props.onChange(state);
  }

  handleFullname(e) {
    const fullname = e.target.value;
    const valid = common.isFullnameValid({ fullname: fullname });
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
        <FormGroup validationState={common.validationState(usernameValid)}>
          <ControlLabel>Username</ControlLabel>
          <FormControl
            type="text"
            placeholder="username"
            value={username}
            onChange={this.handleUsername}
          />
          {validation && !usernameValid && (
            <HelpBlock>At least four characters needed</HelpBlock>
          )}
        </FormGroup>
        <FormGroup validationState={common.validationState(emailValid)}>
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
        <FormGroup validationState={common.validationState(fullnameValid)}>
          <ControlLabel>Fullname</ControlLabel>
          <FormControl
            type="text"
            placeholder="username"
            value={fullname}
            onChange={this.handleFullname}
          />
          {validation && !fullnameValid && (
            <HelpBlock>At least four characters needed</HelpBlock>
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
