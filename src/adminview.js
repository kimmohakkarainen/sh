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

import { getUsers, modifyUser } from "./actions";

class AdminView extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.dispatch(getUsers(this.props.person));
  }

  render() {
    console.log(this.props.users);
    return (
      <Table striped condensed hover>
        <thead>
          <tr>
            <th>user id</th>
            <th>email</th>
            <th>role</th>
          </tr>
        </thead>
        <tbody>
          {this.props.users.map(function(user) {
            return (
              <tr key={user.personId}>
                <td>{user.personId}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    );
  }
}

function mapStateToProps(state) {
  return {
    person: state.person,
    users: state.users
  };
}

export default connect(mapStateToProps)(AdminView);
