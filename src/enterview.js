import React, { Component } from "react";
import ReactDOM from "react-dom";
import {
  Panel,
  Grid,
  Row,
  Col,
  FormGroup,
  ControlLabel,
  FormControl,
  DropdownButton,
  MenuItem
} from "react-bootstrap";

const Valinnat = () => {
  return (
    <DropdownButton title="Tutkimus">
      <MenuItem eventKey={1}>Datscan</MenuItem>
      <MenuItem eventKey={2}>Luuston gammakuvaus</MenuItem>
      <MenuItem eventKey={3}>Munuaisfunktion gammakuvaus</MenuItem>
      <MenuItem eventKey={4}>pH 24 h</MenuItem>
      <MenuItem eventKey={5}>Bp 24 h</MenuItem>
      <MenuItem eventKey={6}>Keuhkoventilaatio / perfuusio</MenuItem>
      <MenuItem eventKey={7}>
        Kilpirauhassyövän metastaasien gammakuvaus(koko keho ja SPECT / CT)
      </MenuItem>
      <MenuItem eventKey={8}>Lisäkilpirauhasen SPECT / CT</MenuItem>
      <MenuItem eventKey={9}>EKG 24 h</MenuItem>
      <MenuItem eventKey={10}>Luuston gammakuvaus(SPECT / CT)</MenuItem>
      <MenuItem eventKey={11}>Muut isotooppitutkimukset</MenuItem>
      <MenuItem eventKey={12}>Muu tutkimus</MenuItem>
      <MenuItem eventKey={13}>EKG 48 h</MenuItem>
    </DropdownButton>
  );
};

const EnterPanel = () => {
  return (
    <Grid>
      <Row>
        <FormGroup>
          <Col componentClass={ControlLabel} xs={1}>
            SOTU
          </Col>
          <Col xs={3}>
            <FormControl type="text" placeHolder="000000-0000" />
          </Col>
          <Col componentClass={ControlLabel} xs={2}>
            Sukunimi
          </Col>
          <Col xs={6}>
            <FormControl type="text" placeHolder="Sukunimi" />
          </Col>
        </FormGroup>
      </Row>
      <Row>
        <FormGroup>
          <Col xs={4}>
            <Valinnat />
          </Col>
          <Col componentClass={ControlLabel} xs={2}>
            Vastaanotto
          </Col>
          <Col xs={6}>
            <FormControl type="text" placeHolder="Sukunimi" />
          </Col>
        </FormGroup>
      </Row>
    </Grid>
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
              <EnterPanel />
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
