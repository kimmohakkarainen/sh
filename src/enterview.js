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

import CreateEntry from "./panels/createentry";

const Entries = props => {
  return (
    <Table striped bordered condensed hover>
      <thead>
        <tr>
          <th>Vastaanottopäivä</th>
          <th>Sosiaaliturvatunnus</th>
          <th>Sukunimi</th>
          <th>Tutkimus</th>
          <th>Lisätiedot</th>
        </tr>
      </thead>
      <tbody>
        {props.tasks.map(function(task) {
          return (
            <tr key={task.taskId}>
              <td>{task.vastaanottoPaiva}</td>
              <td>{task.sotu}</td>
              <td>{task.sukunimi}</td>
              <td>{task.tutkimus}</td>
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
    return (
      <div>
        <Panel bsStyle="primary" defaultExpanded>
          <Panel.Heading>
            <Panel.Title toggle componentClass="h3">
              Lähetteen syöttö
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
                Uudet Lähetteet
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
                Keskeneräiset Lähetteet
              </Panel.Title>
            </Panel.Heading>
            <Panel.Collapse>
              <Panel.Body>
                <Entries tasks={this.props.assignedTasks} />
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
