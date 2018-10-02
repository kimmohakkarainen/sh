import React, { Component } from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";

import { Button, Table } from "react-bootstrap";
import ActionButton from "./actionbutton";
import { finishTask } from "../actions";
import { unassignTask } from "../actions";

class InProgressEntries extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props);

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
                <th>Potilaan syntymäaika</th>
                <th>Sukunimi</th>
                <th>Tutkimuksesta lisätiedot</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {this.props.assignedTasks.map(function(task) {
                const syntymaaika =
                  task.hetu == null ? "" : task.hetu.slice(0, 6);
                return (
                  <tr key={task.taskId}>
                    <td>
                      <ActionButton
                        task={task}
                        createAction={finishTask}
                        text="Valmis"
                      />
                    </td>
                    <td>{task.vastaanottoPaiva}</td>
                    <td>{task.tutkimus}</td>
                    <td>{task.esitietolomake}</td>
                    <td>{syntymaaika}</td>
                    <td>{task.sukunimi}</td>
                    <td>{task.lisatiedot}</td>
                    <td>
                      <ActionButton
                        task={task}
                        createAction={unassignTask}
                        text="Vapauta"
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { assignedTasks: state.assignedTasks };
}

export default connect(mapStateToProps)(InProgressEntries);
