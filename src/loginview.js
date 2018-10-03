import React, { Component } from "react";
import { FormGroup, ControlLabel, FormControl, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { fetchState } from "./actions";

class LoginView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
    this.login = this.login.bind(this);
  }

  login() {
    this.props.dispatch(fetchState());
  }

  render() {
    return (
      <div className="login-page">
        <div className="login-form">
          <h1>
            Tiedot<sup>2</sup>
          </h1>
          <FormGroup>
            <ControlLabel>username</ControlLabel>
            <FormControl
              type="text"
              placeholder="username"
              value={this.state.username}
              onChange={e => this.setState({ username: e.target.value })}
            />
          </FormGroup>
          <FormGroup>
            <ControlLabel>password</ControlLabel>
            <FormControl
              type="password"
              placeholder="password"
              value={this.state.password}
              onChange={e => this.setState({ password: e.target.value })}
            />
          </FormGroup>
          <Button onClick={this.login} bsStyle="primary">
            Login
          </Button>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    person: state.person
  };
}

export default connect(mapStateToProps)(LoginView);
