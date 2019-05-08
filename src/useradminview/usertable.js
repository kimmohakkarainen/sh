import React, { Component } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

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

export default function UserTable(props) {
  return (
    <Table striped condensed hover>
      <thead>
        <tr>
          <th style={{ width: "10%" }}>Username</th>
          <th style={{ width: "20%" }}>Email</th>
          <th style={{ width: "30%" }}>Fullname</th>
          <th style={{ width: "20%" }}>Rights</th>
          <th style={{ width: "20%" }} />
        </tr>
      </thead>
      <tbody>
        {props.users.map(user => {
          return (
            <tr key={user.personId}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.fullname}</td>
              <td>
                {user.rights.map((right, index) => {
                  const admin = /ADMIN/.test(right);
                  const secretary = /SECR/.test(right);
                  const cname = admin
                    ? "badge btn-danger"
                    : secretary
                    ? "badge btn-warning"
                    : "badge";
                  return (
                    <span className={cname} key={index}>
                      {right}
                    </span>
                  );
                })}
              </td>
              <td>
                <Button
                  bsStyle="primary"
                  onClick={() => {
                    props.onModify(user);
                  }}
                >
                  Muokkaa
                </Button>
                <Button
                  bsStyle="warning"
                  onClick={() => {
                    props.onChangePassword(user);
                  }}
                >
                  Salasana
                </Button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}

UserTable.propTypes = {
  users: PropTypes.array.isRequired,
  onModify: PropTypes.func.isRequired,
  onChangePassword: PropTypes.func.isRequired
};

UserTable.defaultProps = {
  users: []
};
