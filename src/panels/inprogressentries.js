import React, { Component } from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";

import { Button, Table } from "react-bootstrap";
import ActionButton from "./actionbutton";
import { finishTask } from "../actions";

class InProgressEntries extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props);

    return (
      <div>
        {this.props.assignedTasks.length > 0 && (
          <Table striped bordered condensed hover>
            <thead>
              <tr>
                <th />
                <th>Vastaanottopäivä</th>
                <th>Sosiaaliturvatunnus</th>
                <th>Sukunimi</th>
                <th>Tutkimus</th>
                <th>Lisätiedot</th>
              </tr>
            </thead>
            <tbody>
              {this.props.assignedTasks.map(function(task) {
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
                    <td>{task.sotu}</td>
                    <td>{task.sukunimi}</td>
                    <td>{task.tutkimus}</td>
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
  return { assignedTasks: state.assignedTasks };
}

export default connect(mapStateToProps)(InProgressEntries);
