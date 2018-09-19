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
  HelpBlock
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
      <FormGroup validationState="error">
        <ControlLabel>Sosiaaliturvatunnus</ControlLabel>
        <FormControl type="text" placeholder="000000-0000" />
        {false && (
          <HelpBlock>Syötä tähän henkilön sosiaaliturvatunnus</HelpBlock>
        )}
      </FormGroup>
      <FormGroup validationState="success">
        <ControlLabel>Sukunimi</ControlLabel>
        <FormControl type="text" placeholder="Sukunimi" />
        {false && <HelpBlock>Syötä tähän henkilön sukunimi</HelpBlock>}
      </FormGroup>
      <FormGroup validationState="success">
        <ControlLabel>Tutkimus</ControlLabel>
        <Valinnat />
        {false && <HelpBlock>Syötä tähän tutkimusmuoto</HelpBlock>}
      </FormGroup>
      <FormGroup validationState="success">
        <ControlLabel>Tutkimuspäivä</ControlLabel>
        <FormControl type="date" />
      </FormGroup>
      <FormGroup validationState="success">
        <ControlLabel>Lisätiedot</ControlLabel>
        <FormControl
          componentClass="textarea"
          placeholder="Tähän mahdolliset lisätiedot"
        />
        {false && <HelpBlock>Syötä tähän henkilön sukunimi</HelpBlock>}
      </FormGroup>
      <FormGroup validationState="success">
        <ControlLabel>Vastaanottopäivä</ControlLabel>
        <FormControl type="date" />
      </FormGroup>
      <Button>Talleta</Button>
    </div>
  );
};

const NewEntriesPanel = () => {
  return (
    <Grid>
      <Row>
        <Col xs={2}>24.10.2018</Col>
        <Col xs={2}>123456-1234</Col>
        <Col xs={2}>Möttönen</Col>
        <Col xs={6}>Datscan</Col>
      </Row>
      <Row>
        <Col xs={2}>15.11.2018</Col>
        <Col xs={2}>345612-5134</Col>
        <Col xs={2}>Litmanen</Col>
        <Col xs={6}>Luuston gammakuvaus</Col>
      </Row>
      <Row>
        <Col xs={2} />
        <Col xs={2}>011248-5412</Col>
        <Col xs={2}>Räikkönen</Col>
        <Col xs={6}>Datscan</Col>
      </Row>
    </Grid>
  );
};

const InProgressPanel = () => {
  return (
    <Grid>
      <Row>
        <Col xs={3}>Tohtori Tolonen</Col>
        <Col xs={2}>26.9.2018</Col>
        <Col xs={2}>123456-1234</Col>
        <Col xs={2}>Möttönen</Col>
        <Col xs={3}>Datscan</Col>
      </Row>
      <Row>
        <Col xs={3}>Tohtori Liimatainen</Col>
        <Col xs={2}>30.9.2018</Col>
        <Col xs={2}>345612-5134</Col>
        <Col xs={2}>Litmanen</Col>
        <Col xs={3}>Luuston gammakuvaus</Col>
      </Row>
      <Row>
        <Col xs={3}>Tohtori Venäläinen</Col>
        <Col xs={2}>30.9.2018</Col>
        <Col xs={2}>345612-5134</Col>
        <Col xs={2}>Litmanen</Col>
        <Col xs={3}>Luuston gammakuvaus</Col>
      </Row>
    </Grid>
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
        <Panel bsStyle="warning" defaultExpanded>
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
        <Panel bsStyle="success">
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
