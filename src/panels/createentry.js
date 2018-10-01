import React, { Component } from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";

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

import TutkimusValinnat from "./tutkimusvalinnat";
import { createTask } from "../actions";

class CreateEntry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      taskId: null,
      sotu: null,
      sukunimi: null,
      tutkimus: null,
      tutkimusPaiva: null,
      vastaanottoPaiva: null,
      lisatiedot: null,
      laakari: null
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    console.log(this.props);
    const parms = createTask({
      Person: this.props.person,
      Task: this.state
    });
    this.props.dispatch(parms);
  }

  render() {
    return (
      <div>
        <FormGroup>
          <ControlLabel>Sosiaaliturvatunnus</ControlLabel>
          <FormControl
            type="text"
            placeholder="000000-0000"
            value={this.state.sotu}
            onChange={e => {
              this.setState({ sotu: e.target.value });
            }}
          />
          {false && (
            <HelpBlock>Syötä tähän henkilön sosiaaliturvatunnus</HelpBlock>
          )}
        </FormGroup>
        <FormGroup>
          <ControlLabel>Sukunimi</ControlLabel>
          <FormControl
            type="text"
            placeholder="Sukunimi"
            value={this.state.sukunimi}
            onChange={e => {
              this.setState({ sukunimi: e.target.value });
            }}
          />
          {false && <HelpBlock>Syötä tähän henkilön sukunimi</HelpBlock>}
        </FormGroup>
        <FormGroup>
          <ControlLabel>Tutkimus</ControlLabel>
          <TutkimusValinnat
            value={this.state.tutkimus}
            onChange={e => {
              this.setState({ tutkimus: e.target.value });
            }}
          />
          {false && <HelpBlock>Syötä tähän tutkimusmuoto</HelpBlock>}
        </FormGroup>
        <FormGroup>
          <ControlLabel>Tutkimuspäivä</ControlLabel>
          <FormControl
            type="date"
            value={this.state.tutkimusPaiva}
            onChange={e => {
              this.setState({ tutkimusPaiva: e.target.value });
            }}
          />
        </FormGroup>
        <FormGroup>
          <ControlLabel>Lisätiedot</ControlLabel>
          <FormControl
            componentClass="textarea"
            placeholder="Tähän mahdolliset lisätiedot"
            value={this.state.lisatiedot}
            onChange={e => {
              this.setState({ lisatiedot: e.target.value });
            }}
          />
          {false && <HelpBlock>Syötä tähän henkilön sukunimi</HelpBlock>}
        </FormGroup>
        <FormGroup>
          <ControlLabel>Vastaanottopäivä</ControlLabel>
          <FormControl
            type="date"
            value={this.state.vastaanottoPaiva}
            onChange={e => {
              this.setState({ tutkimusPaiva: e.target.value });
            }}
          />
        </FormGroup>
        <Button bsStyle="primary" onClick={this.handleClick}>
          Talleta
        </Button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { person: state.person };
}

export default connect(mapStateToProps)(CreateEntry);
