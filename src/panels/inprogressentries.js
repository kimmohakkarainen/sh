import React, { Component } from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";

import { Button, Table, Modal } from "react-bootstrap";
import { finishTask } from "../actions";
import { unassignTask } from "../actions";
import {
  postUnassign,
  postFinish,
  postCreate,
  openModifyMessageModal,
  fetchState
} from "../actions";
import ModifyMessageModal from "../components/modifyMessageModal";

class InProgressEntries extends Component {
  constructor(props) {
    super(props);
    this.exitModal = this.exitModal.bind(this);
    this.handleCreateTask = this.handleCreateTask.bind(this);
  }

  exitModal() {
    this.props.dispatch(fetchState());
  }

  handleCreateTask(task) {
    this.props.dispatch(postCreate({ Person: this.props.person, Task: task }));
  }

  render() {
    const props = this.props;
    return (
      <div>
        {this.props.assignedTasks.length > 0 && (
          <Table striped condensed hover>
            <thead>
              <tr>
                <th />
                <th>Potilaan vastaanottopäivä</th>
                <th>Tutkimus</th>
                <th>Esitietolomake</th>
                <th>Potilaan henkilötunnus</th>
                <th>Potilaan sukunimi</th>
                <th>Tutkimuksesta lisätiedot</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {this.props.assignedTasks.map(function(task) {
                const syntymaaika = task.hetu == null ? "" : task.hetu;
                const tutkimus =
                  task.tutkimus == null ? "" : task.tutkimus.label;
                const ltbutton =
                  task.lisatiedot == null || task.lisatiedot.length == 0
                    ? "default"
                    : "success";
                console.log(task);
                console.log(ltbutton);
                return (
                  <tr key={task.taskId}>
                    <td>
                      <Button
                        bsStyle="primary"
                        onClick={() => {
                          console.log(props);
                          props.dispatch(
                            postFinish({ Person: props.person, Task: task })
                          );
                        }}
                      >
                        Valmis
                      </Button>
                    </td>
                    <td>{task.vastaanottoPaiva}</td>
                    <td>{tutkimus}</td>
                    <td>{task.esitietolomake}</td>
                    <td>{syntymaaika}</td>
                    <td>{task.sukunimi}</td>
                    <td>
                      <Button
                        bsStyle={ltbutton}
                        onClick={() => {
                          props.dispatch(openModifyMessageModal(task));
                        }}
                      >
                        LisÃ¤tiedot
                      </Button>
                    </td>
                    <td>
                      <Button
                        bsStyle="primary"
                        onClick={() => {
                          console.log(props);
                          props.dispatch(
                            postUnassign({ Person: props.person, Task: task })
                          );
                        }}
                      >
                        Vapauta
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        )}
        <Modal
          show={this.props.modifyMessageModal != null}
          onHide={this.exitModal}
        >
          <ModifyMessageModal
            task={this.props.modifyMessageModal}
            dispatch={this.handleCreateTask}
          />
        </Modal>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    person: state.person,
    assignedTasks: state.assignedTasks,
    modifyMessageModal: state.modifyMessageModal
  };
}

export default connect(mapStateToProps)(InProgressEntries);
