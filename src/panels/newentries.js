import React, { Component } from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";

import { Button, Table } from "react-bootstrap";
import ActionButton from "./actionbutton";
import { assignTask } from "../actions";

class NewEntries extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        {this.props.newTasks.length > 0 && (
          <Table striped condensed hover>
            <thead>
              <tr>
                <th />
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
              {this.props.newTasks.map(function(task) {
                const syntymaaika =
                  task.hetu == null ? "" : task.hetu.slice(0, 6);
                return (
                  <tr key={task.taskId}>
                    <td>
                      <ActionButton
                        task={task}
                        createAction={assignTask}
                        text="Työlistalle"
                      />
                    </td>
                    <td>{task.tutkimusPaiva}</td>
                    <td>{task.tutkimus}</td>
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
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { newTasks: state.newTasks, person: state.person };
}

export default connect(mapStateToProps)(NewEntries);
