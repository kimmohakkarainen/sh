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
import RooliValinnat from "./panels/roolivalinnat";

/*
 ModifyButton toimii nappina, johon saadaan säilöttyä toiminnan suorittamisen kohde
 */

class ModifyButton extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.onClick(this.props.user);
  }

  render() {
    return <Button onClick={this.handleClick}>Muokkaa</Button>;
  }
}

class UserEntriesTable extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    console.log("UserEntriesTable.handleClick");
    console.log(e);
    this.props.onClick(e);
  }

  render() {
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
          {this.props.users.map(user => {
            return (
              <tr key={user.personId}>
                <td>
                  <ModifyButton user={user} onClick={this.handleClick} />
                </td>
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

class AdminView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modify: false,
      personId: 1,
      email: "admin",
      role: "ADMIN"
    };
    this.handleMuokkaa = this.handleMuokkaa.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.handleTallenna = this.handleTallenna.bind(this);
    this.handleTyhjenna = this.handleTyhjenna.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(getUsers(this.props.person));
  }

  handleMuokkaa(e) {
    console.log("AdminView.handleMuokkaa");
    console.log(e);
    this.setState({
      modify: true,
      personId: e.personId,
      email: e.email,
      role: e.role
    });
  }

  handleToggle() {
    if (this.state.modify) {
      this.setState({ modify: !this.state.modify });
    }
  }

  handleTallenna() {
    this.props.dispatch(modifyUser({ Person: this.state }));
  }

  handleTyhjenna() {
    this.setState({
      modify: false
    });
  }

  render() {
    return (
      <div>
        <Panel
          bsStyle="primary"
          expanded={this.state.modify}
          onToggle={this.handleToggle}
        >
          <Panel.Heading>
            <Panel.Title toggle componentClass="h3">
              Muokkaa käyttäjän tietoja
            </Panel.Title>
          </Panel.Heading>
          <Panel.Collapse>
            <Panel.Body>
              <FormGroup>
                <ControlLabel>Email</ControlLabel>
                <FormControl
                  type="text"
                  value={this.state.email}
                  onChange={e => {
                    this.setState({ email: e.target.value });
                  }}
                />
              </FormGroup>
              <FormGroup>
                <ControlLabel>Role</ControlLabel>
                <RooliValinnat
                  value={this.state.role}
                  onChange={e => {
                    this.setState({ role: e.target.value });
                  }}
                />
              </FormGroup>
              <Button bsStyle="primary" onClick={this.handleTallenna}>
                Tallenna
              </Button>
              <Button onClick={this.handleTyhjenna}>Tyhjennä</Button>
            </Panel.Body>
          </Panel.Collapse>
        </Panel>
        <UserEntriesTable
          users={this.props.users}
          onClick={this.handleMuokkaa}
        />
        <Button bsStyle="primary">Luo uusi käyttäjä</Button>
      </div>
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
