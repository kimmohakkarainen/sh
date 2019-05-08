import React, { Component } from "react";
import ReactDOM, { render } from "react-dom";

import {
  FormGroup,
  ControlLabel,
  FormControl,
  HelpBlock
} from "react-bootstrap";

import PropTypes from "prop-types";

import { validationState } from "./common";

export class PasswordFields extends Component {
  constructor(props) {
    super(props);
    this.handlePassword = this.handlePassword.bind(this);
    this.handlePassword2 = this.handlePassword2.bind(this);
  }

  handlePassword(e) {
    const password = e.target.value;
    const valid = this.props.state.password2 == password;
    this.props.onChange({
      password: password,
      password2Valid: valid
    });
  }

  handlePassword2(e) {
    const password2 = e.target.value;
    const valid = this.props.state.password == password2;
    this.props.onChange({
      password2: password2,
      password2Valid: valid
    });
  }

  render() {
    const {
      validation,
      password,
      password2,
      password2Valid
    } = this.props.state;
    return (
      <div>
        <FormGroup validationState={validationState(password2Valid)}>
          <ControlLabel>Password</ControlLabel>
          <FormControl
            type="password"
            placeholder="password"
            value={password}
            onChange={this.handlePassword}
          />
        </FormGroup>
        <FormGroup validationState={validationState(password2Valid)}>
          <ControlLabel>Repeat Password</ControlLabel>
          <FormControl
            type="password"
            placeholder="password"
            value={password2}
            onChange={this.handlePassword2}
          />
          {validation && !password2Valid && (
            <HelpBlock>Passwords do not match</HelpBlock>
          )}
        </FormGroup>
      </div>
    );
  }
}

PasswordFields.propTypes = {
  state: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired
};
