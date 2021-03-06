import React, { Component } from "react";
import ReactDOM from "react-dom";

import { Modal, Button } from "react-bootstrap";
import { createResponse, initState } from "./common";
import { UserFields } from "./userfields";
import { PasswordFields } from "./passwordfields";

class CreateUserModal extends Component {
  constructor(props) {
    super(props);
    this.state = initState();
    this.onHide = this.onHide.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  onHide() {
    this.setState(initState());
    this.props.onHide();
  }

  handleClick() {
    console.log(this.state);
    if (
      this.state.usernameValid &&
      this.state.emailValid &&
      this.state.fullnameValid &&
      this.state.password2Valid
    ) {
      const params = createResponse(this.state);
      this.setState(initState());
      this.props.onSubmit(params);
    } else {
      this.setState({ validation: true });
    }
  }

  render() {
    return (
      <Modal show={this.props.show} onHide={this.onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Uusi Käyttäjä</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <UserFields
            state={this.state}
            onChange={value => {
              this.setState(value);
            }}
          />
          <PasswordFields
            state={this.state}
            onChange={value => {
              this.setState(value);
            }}
          />
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
