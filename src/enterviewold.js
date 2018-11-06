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
  Table,
  Modal
} from "react-bootstrap";
import { connect } from "react-redux";

import CreateEntry from "./panels/createentry";

const IPEntries = props => {
  return (
    <Table striped condensed hover>
      <thead>
        <tr>
          <th>Lääkäri</th>
          <th>Tutkimus</th>
          <th>Potilaan vast.otto</th>
          <th>Syntymäaika</th>
          <th>Sukunimi</th>
        </tr>
      </thead>
      <tbody>
        {props.tasks.map(function(task) {
          const laakari = task.laakari == null ? "" : task.laakari.email;
          const syntymaaika = task.hetu == null ? "" : task.hetu.slice(0, 6);
          const tutkimus = task.tutkimus == null ? "" : task.tutkimus.name;
          return (
            <tr key={task.taskId}>
              <td>{laakari}</td>
              <td>{tutkimus}</td>
              <td>{task.vastaanottoPaiva}</td>
              <td>{syntymaaika}</td>
              <td>{task.sukunimi}</td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

const Entries = props => {
  return (
    <Table striped condensed hover>
      <thead>
        <tr>
          <th>Tutkimuspäivä</th>
          <th>Tutkimus</th>
          <th>Syntymäaika</th>
          <th>Potilaan sukunimi</th>
          <th>Potilaan vastaanotto</th>
          <th>Esitietolomake</th>
          <th>Lisätiedot</th>
        </tr>
      </thead>
      <tbody>
        {props.tasks.map(function(task) {
          const syntymaaika = task.hetu == null ? "" : task.hetu.slice(0, 6);
          const tutkimus = task.tutkimus == null ? "" : task.tutkimus.name;
          return (
            <tr key={task.taskId}>
              <td>{task.tutkimusPaiva}</td>
              <td>{tutkimus}</td>
              <td>{syntymaaika}</td>
              <td>{task.sukunimi}</td>
              <td>{task.vastaanottoPaiva}</td>
              <td>{task.esitietolomake}</td>
              <td>{task.lisatiedot}</td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

class EnterView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date()
    };
    this.onDayChange = this.onDayChange.bind(this);
  }

  onDayChange(selectedDay, modifiers, dayPickerInput) {
    console.log({ selectedDay, modifiers, dayPickerInput });
    this.setState({ date: selectedDay });
  }

  render() {
    const iconClass = this.state.open
      ? "fa fa-plus-circle fa-fw"
      : "fa fa-minus-circle fa-fw";

    return (
      <div>
        <Panel bsStyle="primary" defaultExpanded>
          <Panel.Heading>
            <Panel.Title
              toggle
              componentClass="h3"
              onClick={() => this.setState({ open: !this.state.open })}
            >
              <i className={iconClass} />
              Syötä lausuttavan tiedot
            </Panel.Title>
          </Panel.Heading>
          <Panel.Collapse>
            <Panel.Body>
              <CreateEntry />
            </Panel.Body>
          </Panel.Collapse>
        </Panel>
        {this.props.newTasks.length > 0 && (
          <Panel defaultExpanded>
            <Panel.Heading>
              <Panel.Title toggle componentClass="h3">
                Uudet lausuttavat
              </Panel.Title>
            </Panel.Heading>
            <Panel.Collapse>
              <Panel.Body>
                <Entries tasks={this.props.newTasks} />
              </Panel.Body>
            </Panel.Collapse>
          </Panel>
        )}
        {this.props.assignedTasks.length > 0 && (
          <Panel defaultExpanded>
            <Panel.Heading>
              <Panel.Title toggle componentClass="h3">
                Keskeneräiset lausuttavat
              </Panel.Title>
            </Panel.Heading>
            <Panel.Collapse>
              <Panel.Body>
                <IPEntries tasks={this.props.assignedTasks} showDoctor={true} />
              </Panel.Body>
            </Panel.Collapse>
          </Panel>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  const person = state.person;
  return {
    person: state.person,
    newTasks: state.newTasks,
    assignedTasks: state.assignedTasks
  };
}

export default connect(mapStateToProps)(EnterView);
