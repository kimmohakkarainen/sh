import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Table, Button, FormControl } from "react-bootstrap";
import RooliValinnat from "./roolivalinnat";

class NewPersonRow extends Component {
  constructor(props) {
    super(props);

    this.handleTallenna = this.handleTallenna.bind(this);
    this.handlePeruuta = this.handlePeruuta.bind(this);

    this.state = {
      personId: 0,
      email: "",
      role: ""
    };
  }

  handleTallenna(e) {
    console.log("NewPersonRow.handleTallenna");
    console.log(this.props);
    this.props.onTallenna(this.state);
  }

  handlePeruuta(e) {
    console.log("NewPersonRow.handlePeruuta");
    console.log(this.props);
    this.props.onPeruuta(this.state);
  }

  render() {
    return (
      <tr key={this.props.user.personId}>
        <td>{this.props.user.personId}</td>
        <td>
          <FormControl
            type="text"
            value={this.state.email}
            onChange={e => {
              this.setState({ email: e.target.value });
            }}
          />
        </td>
        <td>
          <RooliValinnat
            value={this.state.role}
            onChange={e => {
              this.setState({ role: e.target.value });
            }}
          />
        </td>
        <td>
          <Button onClick={this.handleTallenna}>Tallenna</Button>
        </td>
        <td>
          <Button onClick={this.handlePeruuta}>Peruuta</Button>
        </td>
      </tr>
    );
  }
}

class PersonRow extends Component {
  constructor(props) {
    super(props);

    this.handleMuokkaa = this.handleMuokkaa.bind(this);
    this.handleTallenna = this.handleTallenna.bind(this);
    this.handlePeruuta = this.handlePeruuta.bind(this);

    this.state = {
      editing: false,
      personId: 0,
      email: "",
      role: null
    };
  }

  handleMuokkaa(e) {
    console.log("PersonRow.handleMuokkaa");
    console.log(this.props);
    this.props.onMuokkaa(this.props.user);
    this.setState({
      editing: true,
      personId: this.props.user.personId,
      email: this.props.user.email,
      role: this.props.user.role
    });
  }

  handleTallenna(e) {
    console.log("PersonRow.handleTallenna");
    console.log(this.props);
    this.props.onTallenna(this.state);
    this.setState({
      editing: false
    });
  }

  handlePeruuta(e) {
    console.log("PersonRow.handlePeruuta");
    console.log(this.props);
    this.props.onPeruuta(this.state);
    this.setState({
      editing: false
    });
  }

  render() {
    if (this.state.editing === true) {
      return (
        <tr key={this.props.user.personId}>
          <td>{this.props.user.personId}</td>
          <td>
            <FormControl
              type="text"
              value={this.state.email}
              onChange={e => {
                this.setState({ email: e.target.value });
              }}
            />
          </td>
          <td>
            <RooliValinnat
              value={this.state.role}
              onChange={e => {
                this.setState({ role: e.target.value });
              }}
            />
          </td>
          <td>
            <Button onClick={this.handleTallenna}>Tallenna</Button>
          </td>
          <td>
            <Button onClick={this.handlePeruuta}>Peruuta</Button>
          </td>
        </tr>
      );
    } else {
      return (
        <tr key={this.props.user.personId}>
          <td>{this.props.user.personId}</td>
          <td>{this.props.user.email}</td>
          <td>{this.props.user.role}</td>
          <td />
          <td>
            {this.props.editing === false && (
              <Button onClick={this.handleMuokkaa}>Muokkaa</Button>
            )}
          </td>
        </tr>
      );
    }
  }
}

class PersonTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editing: false,
      newUser: null
    };

    this.handleMuokkaa = this.handleMuokkaa.bind(this);
    this.handlePeruuta = this.handlePeruuta.bind(this);
    this.handleTallenna = this.handleTallenna.bind(this);
    this.handleTallennaUusi = this.handleTallennaUusi.bind(this);
    this.handleMuokkaaUusi = this.handleMuokkaaUusi.bind(this);
  }

  handleMuokkaa(e) {
    console.log("PersonTable.handleMuokkaa");
    console.log(e);

    this.setState({
      editing: true
    });
  }

  handleMuokkaaUusi(e) {
    console.log("PersonTable.handleMuokkaaUusi");

    this.setState({
      editing: true,
      newUser: {
        personId: 0,
        email: "",
        role: ""
      }
    });
  }

  handlePeruuta(e) {
    console.log("PersonTable.handlePeruuta");
    console.log(e);
    this.setState({
      editing: false,
      newUser: null
    });
  }

  handleTallenna(e) {
    console.log("PersonTable.handleTallenna");
    console.log(e);
    this.setState({
      editing: false
    });
    this.props.onTallenna(e);
  }

  handleTallennaUusi(e) {
    console.log("PersonTable.handleTallennaUusi");
    console.log(e);
    this.setState({
      editing: false,
      newUser: null
    });
    this.props.onTallenna(e);
  }

  render() {
    console.log("PersonTable.render");
    console.log(this.props);
    return (
      <div>
        <Table striped condensed hover>
          <thead>
            <tr>
              <th>user id</th>
              <th>email</th>
              <th>role</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {this.props.users.map(user => {
              return (
                <PersonRow
                  key={user.personId}
                  user={user}
                  editing={this.state.editing}
                  onMuokkaa={this.handleMuokkaa}
                  onTallenna={this.handleTallenna}
                  onPeruuta={this.handlePeruuta}
                />
              );
            })}
            {this.state.newUser != null && (
              <NewPersonRow
                key={0}
                user={this.state.newUser}
                onMuokkaa={this.handleMuokkaa}
                onTallenna={this.handleTallennaUusi}
                onPeruuta={this.handlePeruuta}
              />
            )}
          </tbody>
        </Table>
        {this.state.editing == false && (
          <Button onClick={this.handleMuokkaaUusi}>Luo uusi käyttäjä</Button>
        )}
      </div>
    );
  }
}

export default PersonTable;
