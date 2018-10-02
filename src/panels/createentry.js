import React, { Component } from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";

import {
  Panel,
  Button,
  ToggleButton,
  ButtonToolbar,
  ToggleButtonGroup,
  Grid,
  Row,
  Col,
  FormGroup,
  ControlLabel,
  FormControl,
  InputGroup,
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
    this.state = this.clearValues();
    this.handleClick = this.handleClick.bind(this);
    this.handleHetu = this.handleHetu.bind(this);
    this.handleSukunimi = this.handleSukunimi.bind(this);
    this.handleEsitietolomake = this.handleEsitietolomake.bind(this);
  }

  clearValues() {
    return {
      validation: false,
      hetu: "",
      hetuValid: null,
      sukunimi: "",
      sukunimiValid: null,
      tutkimus: "",
      tutkimusValid: null,
      tutkimusPaiva: "",
      tutkimusPaivaValid: null,
      vastaanottoPaiva: "",
      vastaanottoPaivaValid: null,
      esitietolomake: "",
      esitietolomakeValid: null,
      esitietolomakeExpanded: false,
      lisatiedot: ""
    };
  }

  handleHetu(v) {
    const value = v.target.value;
    const valid = value.length === 11 ? "success" : "error";
    console.log(valid);
    this.setState({
      hetu: value,
      hetuValid: valid
    });
  }

  handleSukunimi(v) {
    const value = v.target.value;
    const valid = value.length > 3 ? "success" : "error";
    console.log(valid);
    this.setState({
      sukunimi: value,
      sukunimiValid: valid
    });
  }

  handleEsitietolomake(v) {
    const value = v.target.value;
    const valid = value.length > 3 ? "success" : "error";
    console.log(valid);
    this.setState({
      esitietolomake: value,
      esitietolomakeValid: valid
    });
  }

  handleClick() {
    console.log(this.state);
    this.setState({
      hetuValid: this.state.hetuValid == null ? "error" : this.state.hetuValid,
      sukunimiValid:
        this.state.sukunimiValid == null ? "error" : this.state.sukunimiValid,
      tutkimusValid:
        this.state.tutkimusValid == null ? "error" : this.state.tutkimusValid,
      tutkimusPaivaValid: this.state.esitietolomakeExpanded
        ? this.state.tutkimusPaivaValid == null
          ? "error"
          : this.state.tutkimusPaivaValid
        : "success"
    });
    if (
      this.state.hetuValid === "success" &&
      this.state.sukunimiValid === "success" &&
      this.state.tutkimusValid === "success" &&
      this.state.tutkimusPaivaValid === "success" &&
      this.state.esitietolomakeValid === "success"
    ) {
      const parms = createTask({
        Person: this.props.person,
        Task: {
          taskId: null,
          hetu: this.state.hetu,
          sukunimi: this.state.sukunimi,
          tutkimus: this.state.tutkimus,
          tutkimusPaiva: this.state.tutkimusPaiva,
          vastaanottoPaiva: this.state.vastaanottoPaiva,
          lisatiedot: this.state.lisatiedot,
          esitietolomake: this.state.esitietolomake,
          laakari: null
        }
      });
      this.props.dispatch(parms);
      this.setState(this.clearValues());
    }
  }

  render() {
    return (
      <div>
        <FormGroup validationState={this.state.tutkimusPaivaValid}>
          <ControlLabel>Tutkimuspäivä</ControlLabel>
          <FormControl
            type="date"
            value={this.state.tutkimusPaiva}
            onChange={e => {
              this.setState({
                tutkimusPaiva: e.target.value,
                tutkimusPaivaValid: "success"
              });
            }}
          />
        </FormGroup>
        <FormGroup validationState={this.state.hetuValid}>
          <ControlLabel>Henkilötunnus</ControlLabel>
          <FormControl
            type="text"
            placeholder="000000-0000"
            value={this.state.hetu}
            onChange={this.handleHetu}
          />
          {false && (
            <HelpBlock>Syötä tähän henkilön sosiaaliturvatunnus</HelpBlock>
          )}
        </FormGroup>
        <FormGroup validationState={this.state.sukunimiValid}>
          <ControlLabel>Sukunimi</ControlLabel>
          <FormControl
            type="text"
            placeholder="Sukunimi"
            value={this.state.sukunimi}
            onChange={this.handleSukunimi}
          />
          {false && <HelpBlock>Syötä tähän henkilön sukunimi</HelpBlock>}
        </FormGroup>
        <FormGroup validationState={this.state.tutkimusValid}>
          <ControlLabel>Tutkimus</ControlLabel>
          <TutkimusValinnat
            value={this.state.tutkimus}
            onChange={e => {
              this.setState({
                tutkimus: e.target.value,
                tutkimusValid: "success"
              });
            }}
          />
          {false && <HelpBlock>Syötä tähän tutkimusmuoto</HelpBlock>}
        </FormGroup>
        <FormGroup validationState={this.state.vastaanottoPaivaValid}>
          <ControlLabel>Vastaanottopäivä</ControlLabel>
          <FormControl
            type="date"
            value={this.state.vastaanottoPaiva}
            onChange={e => {
              this.setState({
                vastaanottoPaiva: e.target.value,
                vastaanottoPaivaValid: "success"
              });
            }}
          />
        </FormGroup>
        <Panel expanded={this.state.esitietolomakeExpanded}>
          <Panel.Heading>
            <ButtonToolbar>
              <ToggleButtonGroup
                type="radio"
                name="options"
                defaultValue={1}
                onChange={() =>
                  this.setState({
                    esitietolomakeExpanded: !this.state.esitietolomakeExpanded
                  })
                }
              >
                <ToggleButton value={1}>
                  Esitietolomaketta ei ole täytetty
                </ToggleButton>
                <ToggleButton value={2}>
                  Esitietolomake on täytetty
                </ToggleButton>
              </ToggleButtonGroup>
            </ButtonToolbar>
          </Panel.Heading>
          <Panel.Collapse>
            <Panel.Body>
              <FormGroup validationState={this.state.esitietolomakeValid}>
                <ControlLabel>Esitietolomake</ControlLabel>
                <FormControl
                  type="text"
                  placeholder="Esitietolomakkeen tiedostonimi"
                  value={this.state.esitietolomake}
                  onChange={this.handleEsitietolomake}
                />
                {false && <HelpBlock>Syötä tähän henkilön sukunimi</HelpBlock>}
              </FormGroup>
            </Panel.Body>
          </Panel.Collapse>
        </Panel>
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
