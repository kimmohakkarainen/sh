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
import ModifyEntry from "./panels/modifyentry";

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
      enterModalVisible: false,
      modifyModalVisible: false
    };
  }

  render() {
    return (
      <div>
        <Panel defaultExpanded>
          <Panel.Heading>
            <Panel.Title toggle componentClass="h3">
              Uudet lausuttavat
            </Panel.Title>
          </Panel.Heading>
          <Panel.Collapse>
            <Panel.Body>
              <Entries tasks={this.props.newTasks} />
              <Button
                bsStyle="primary"
                onClick={() => {
                  this.setState({ enterModalVisible: true });
                }}
              >
                Syötä uusi lausuttava
              </Button>
            </Panel.Body>
          </Panel.Collapse>
        </Panel>
        <Modal
          show={this.state.enterModalVisible}
          onHide={() => {
            this.setState({ enterModalVisible: false });
          }}
        >
          <Modal.Header closeButton>
            <Modal.Title>Uusi lausuttava</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <CreateEntry />
          </Modal.Body>
          <Modal.Footer />
        </Modal>
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
        <Modal
          show={this.state.modifyModalVisible}
          onHide={() => {
            this.setState({ modifyModalVisible: false });
          }}
        >
          <Modal.Header closeButton>
            <Modal.Title>Muokkaa lausuttavaa</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <CreateEntry />
          </Modal.Body>
          <Modal.Footer />
        </Modal>
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
