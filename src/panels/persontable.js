import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Table, Button } from "react-bootstrap";

class PersonRow extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props);
    return (
      <tr key={this.props.user.personId}>
        <td>{this.props.user.editing}</td>
        <td>{this.props.user.personId}</td>
        <td>{this.props.user.email}</td>
        <td>{this.props.user.role}</td>
        <td>
          {this.props.user.editing && (
            <div>
              <Button>Tallenna</Button>
              <Button>Peruuta</Button>
            </div>
          )}
          {!this.props.user.editing && (
            <Button onClick={this.props.onMuokkaa}>Muokkaa</Button>
          )}
        </td>
      </tr>
    );
  }
}

class PersonTable extends Component {
  constructor(props) {
    super(props);

    const st = props.users.map(user => {
      return {
        personId: user.personId,
        email: user.email,
        role: user.role,
        editing: false
      };
    });

    this.state = {
      users: st,
      editing: false
    };

    this.handleMuokkaa = this.handleMuokkaa.bind(this);
    this.handlePeruuta = this.handlePeruuta.bind(this);
    this.handleTalleta = this.handleTalleta.bind(this);
  }

  handleMuokkaa(e) {
    console.log("handleMuokkaa");
    console.log(e);
  }

  handlePeruuta(e) {
    console.log("handlePeruuta");
    console.log(e);
  }

  handleTalleta(e) {
    console.log("handleTalleta");
    console.log(e);
  }

  render() {
    return (
      <Table striped condensed hover>
        <thead>
          <tr>
            <th>editing</th>
            <th>user id</th>
            <th>email</th>
            <th>role</th>
          </tr>
        </thead>
        <tbody>
          {this.props.users.map(user => {
            return (
              <PersonRow
                key={user.personId}
                user={user}
                onMuokkaa={this.handleMuokkaa}
              />
            );
          })}
        </tbody>
      </Table>
    );
  }
}

export default PersonTable;
