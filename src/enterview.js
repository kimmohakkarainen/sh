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

const Valinnat = () => {
  return (
    <FormControl componentClass="select">
      <option>Datscan</option>
      <option>Luuston gammakuvaus</option>
      <option>Munuaisfunktion gammakuvaus</option>
      <option>pH 24 h</option>
      <option>Bp 24 h</option>
      <option>Keuhkoventilaatio / perfuusio</option>
      <option>
        Kilpirauhassyövän metastaasien gammakuvaus(koko keho ja SPECT / CT)
      </option>
      <option>Lisäkilpirauhasen SPECT / CT</option>
      <option>EKG 24 h</option>
      <option>Luuston gammakuvaus(SPECT / CT)</option>
      <option>Muut isotooppitutkimukset</option>
      <option>Muu tutkimus</option>
      <option>EKG 48 h</option>
    </FormControl>
  );
};

const EnterPanel = props => {
  console.log(props);
  return (
    <div>
      <FormGroup>
        <ControlLabel>Sosiaaliturvatunnus</ControlLabel>
        <FormControl type="text" placeholder="000000-0000" />
        {false && (
          <HelpBlock>Syötä tähän henkilön sosiaaliturvatunnus</HelpBlock>
        )}
      </FormGroup>
      <FormGroup>
        <ControlLabel>Sukunimi</ControlLabel>
        <FormControl type="text" placeholder="Sukunimi" />
        {false && <HelpBlock>Syötä tähän henkilön sukunimi</HelpBlock>}
      </FormGroup>
      <FormGroup>
        <ControlLabel>Tutkimus</ControlLabel>
        <Valinnat />
        {false && <HelpBlock>Syötä tähän tutkimusmuoto</HelpBlock>}
      </FormGroup>
      <FormGroup>
        <ControlLabel>Tutkimuspäivä</ControlLabel>
        <FormControl type="date" />
      </FormGroup>
      <FormGroup>
        <ControlLabel>Lisätiedot</ControlLabel>
        <FormControl
          componentClass="textarea"
          placeholder="Tähän mahdolliset lisätiedot"
        />
        {false && <HelpBlock>Syötä tähän henkilön sukunimi</HelpBlock>}
      </FormGroup>
      <FormGroup>
        <ControlLabel>Vastaanottopäivä</ControlLabel>
        <FormControl type="date" />
      </FormGroup>
      <Button bsStyle="primary">Talleta</Button>
    </div>
  );
};

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
              <EnterPanel
                onDayChange={this.onDayChange}
                value={this.state.date}
              />
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
