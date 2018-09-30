import React, { Component } from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import { Button, Table } from "react-bootstrap";

class NewEntries extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props);

    return (
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
              <tr>
                <td>
                  <button>Työlistalle</button>
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
    );
  }
}

function mapStateToProps(state) {
  const newTasks = state.newTasks;
  return { newTasks: newTasks };
}

export default connect(mapStateToProps)(NewEntries);
