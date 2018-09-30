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
    console.log(this.props);

    return (
      <div>
        {this.props.newTasks.length > 0 && (
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
              {this.props.newTasks.map(function(task) {
                return (
                  <tr key={task.taskId}>
                    <td>
                      <ActionButton
                        task={task}
                        createAction={assignTask}
                        text="Työlistalle"
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
  return { newTasks: state.newTasks, person: state.person };
}

export default connect(mapStateToProps)(NewEntries);
