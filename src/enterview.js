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
  DropdownButton
} from "react-bootstrap";

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
            <DropdownButton title="Tutkimus" />
          </Col>
          <Col componentClass={ControlLabel} xs={2}>
            Sukunimi
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
  return <div>New Entries</div>;
};

const InProgressPanel = () => {
  return <div>IN Progress</div>;
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
