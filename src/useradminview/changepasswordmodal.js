import React, { Component } from "react";
import ReactDOM from "react-dom";

import { Modal, Button } from "react-bootstrap";
import { createResponse, initState } from "./common";
import { PasswordFields } from "./passwordfields";

class ChangePasswordModal extends Component {
  constructor(props) {
    super(props);
    this.state = initState(props.user);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    if (this.state.password2Valid) {
      const params = createResponse(this.state);
      params.password = this.state.password;
      console.log(params);
      this.props.onSubmit(params);
    } else {
      this.setState({ validation: true });
    }
  }

  render() {
    const { username, fullname } =
      this.props.user == null
        ? { username: "", fullname: "" }
        : this.props.user;
    return (
      <div>
        <Modal.Header closeButton>
          <Modal.Title>
            Vaihda salasana käyttäjälle "{fullname}" ({username})
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
      </div>
    );
  }
}

export default ChangePasswordModal;
