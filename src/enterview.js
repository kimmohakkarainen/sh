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

const NewEntriesPanel = () => {
  return (
    <Table striped bordered condensed hover>
      <thead>
        <tr>
          <th>Vastaanottopäivä</th>
          <th>Sosiaaliturvatunnus</th>
          <th>Sukunimi</th>
          <th>Tutkimus</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>24.10.2018</td>
          <td>123456-1234</td>
          <td>Möttönen</td>
          <td>Datscan</td>
        </tr>
        <tr>
          <td>15.11.2018</td>
          <td>345602A5134</td>
          <td>Litmanen</td>
          <td>Luuston gammakuvaus</td>
        </tr>
        <tr>
          <td />
          <td>011248-5412</td>
          <td>Räikkönen</td>
          <td>Datscan</td>
        </tr>
      </tbody>
    </Table>
  );
};

const InProgressPanel = () => {
  return (
    <Table striped bordered condensed hover>
      <thead>
        <tr>
          <th>Lääkäri</th>
          <th>Vastaanottopäivä</th>
          <th>Sosiaaliturvatunnus</th>
          <th>Sukunimi</th>
          <th>Tutkimus</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td xs={3}>Tohtori Tolonen</td>
          <td xs={2}>26.9.2018</td>
          <td xs={2}>123456-1234</td>
          <td xs={2}>Möttönen</td>
          <td xs={3}>Datscan</td>
        </tr>
        <tr>
          <td xs={3}>Tohtori Liimatainen</td>
          <td xs={2}>30.9.2018</td>
          <td xs={2}>345612-5134</td>
          <td xs={2}>Litmanen</td>
          <td xs={3}>Luuston gammakuvaus</td>
        </tr>
        <tr>
          <td xs={3}>Tohtori Venäläinen</td>
          <td xs={2}>30.9.2018</td>
          <td xs={2}>345612-5134</td>
          <td xs={2}>Litmanen</td>
          <td xs={3}>Luuston gammakuvaus</td>
        </tr>
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
        <Panel defaultExpanded>
          <Panel.Heading>
            <Panel.Title toggle componentClass="h3">
              Uudet Lähetteet
            </Panel.Title>
          </Panel.Heading>
          <Panel.Collapse>
            <Panel.Body>
              <NewEntriesPanel />
            </Panel.Body>
          </Panel.Collapse>
        </Panel>
        <Panel defaultExpanded>
          <Panel.Heading>
            <Panel.Title toggle componentClass="h3">
              Keskeneräiset Lähetteet
            </Panel.Title>
          </Panel.Heading>
          <Panel.Collapse>
            <Panel.Body>
              <InProgressPanel />
            </Panel.Body>
          </Panel.Collapse>
        </Panel>
      </div>
    );
  }
}

export default EnterView;
