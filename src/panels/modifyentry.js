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
  Form,
  FormGroup,
  ControlLabel,
  FormControl,
  InputGroup,
  DropdownButton,
  MenuItem,
  HelpBlock,
  Table
} from "react-bootstrap";
import Select from "react-select";


import { createTask, postCreate } from "../actions";

class ModifyEntry extends Component {
  constructor(props) {
    super(props);
    this.state = this.clearValues(props.task);
    this.handleClick = this.handleClick.bind(this);
    this.handleHetu = this.handleHetu.bind(this);
    this.handleSukunimi = this.handleSukunimi.bind(this);
    this.handleEsitietolomake = this.handleEsitietolomake.bind(this);
    this.handleEsitietolomakeToggle = this.handleEsitietolomakeToggle.bind(
      this
    );
  }

  clearValues(task) {
	console.log('clearValues');
	console.log(task);
    return {
      taskId: task.taskId,
      validation: false,
      hetu: task.hetu == null ? '' : task.hetu,
      hetuValid: null,
      sukunimi: task.sukunimi == null ? '' : task.sukunimi,
      sukunimiValid: null,
      tutkimus: task.tutkimus == null ? '' : task.tutkimus,
      tutkimusValid: null,
      tutkimusPaiva: task.tutkimusPaiva == null ? '' : task.tutkimusPaiva,
      tutkimusPaivaValid: null,
      vastaanottoPaiva: task.vastaanottoPaiva == null ? '' : task.vastaanottoPaiva,
      vastaanottoPaivaValid: null,
      esitietolomake: task.esitietolomake == null ? '' : task.lisatietolomake,
      esitietolomakeValid: null,
      esitietolomakeExpanded:
        task.esitietolomake != null && task.esitietolomake.length > 0,
      lisatiedot: task.lisatiedot == null ? '' : task.lisatiedot,
      laakari: task.laakari
    };
  }

  handleHetu(v) {
    const value = v.target.value;
    const valid = value.length === 11 ? "success" : "error";
    this.setState({
      hetu: value,
      hetuValid: valid
    });
  }

  handleSukunimi(v) {
    const value = v.target.value;
    const valid = value.length > 3 ? "success" : "error";
    this.setState({
      sukunimi: value,
      sukunimiValid: valid
    });
  }

  handleEsitietolomake(v) {
    const value = v.target.value;
    const valid = value.length > 3 ? "success" : "error";
    this.setState({
      esitietolomake: value,
      esitietolomakeValid: valid
    });
  }

  handleEsitietolomakeToggle() {
    const expanded = !this.state.esitietolomakeExpanded;
    const valid = expanded ? null : true;

    this.setState({
      esitietolomakeExpanded: expanded,
      esitietolomakeValid: valid,
      esitietolomake: ""
    });
  }

  handleClick() {
    const tutkimusPaivaValid =
      this.state.tutkimusPaivaValid == null
        ? "error"
        : this.state.tutkimusPaivaValid;
    const hetuValid =
      this.state.hetuValid == null ? "error" : this.state.hetuValid;
    const sukunimiValid =
      this.state.sukunimiValid == null ? "error" : this.state.sukunimiValid;
    const tutkimusValid =
      this.state.tutkimusValid == null ? "error" : this.state.tutkimusValid;
    const esitietolomakeValid = this.state.esitietolomakeExpanded
      ? this.state.esitietolomakeValid == null
        ? "error"
        : this.state.esitietolomakeValid
      : "success";

    if (
      tutkimusPaivaValid === "success" &&
      hetuValid === "success" &&
      sukunimiValid === "success" &&
      tutkimusValid === "success" &&
      esitietolomakeValid === "success"
    ) {
      const parms = postCreate({
        Person: this.props.person,
        Task: {
          taskId: this.state.taskId,
          hetu: this.state.hetu,
          sukunimi: this.state.sukunimi,
          tutkimus: {
            examinationId: this.state.tutkimus.value
          },
          tutkimusPaiva: this.state.tutkimusPaiva,
          vastaanottoPaiva: this.state.vastaanottoPaiva,
          lisatiedot: this.state.lisatiedot,
          esitietolomake: this.state.esitietolomake,
          laakari: this.state.laakari
        }
      });
      this.props.dispatch(parms);
      this.setState(this.clearValues());
    } else {
      this.setState({
        tutkimusPaivaValid: tutkimusPaivaValid,
        hetuValid: hetuValid,
        sukunimiValid: sukunimiValid,
        tutkimusValid: tutkimusValid,
        esitietolomakeValid: esitietolomakeValid
      });
    }
  }

  render() {
    return (
      <div>
        <FormGroup validationState={this.state.tutkimusPaivaValid}>
          <ControlLabel>TutkimuspÃ¤ivÃ¤</ControlLabel>
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
          <ControlLabel>HenkilÃ¶tunnus</ControlLabel>
          <FormControl
            type="text"
            placeholder="000000-0000"
            value={this.state.hetu}
            onChange={this.handleHetu}
          />
          {false && (
            <HelpBlock>SyÃ¶tÃ¤ tÃ¤hÃ¤n henkilÃ¶n sosiaaliturvatunnus</HelpBlock>
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
          {false && <HelpBlock>SyÃ¶tÃ¤ tÃ¤hÃ¤n henkilÃ¶n sukunimi</HelpBlock>}
        </FormGroup>
        <FormGroup validationState={this.state.tutkimusValid}>
          <ControlLabel>Tutkimus</ControlLabel>
          <Select
            closeOnSelect={true}
            disabled={false}
            onChange={value => {
              this.setState({
                tutkimus: value,
                tutkimusValid: "success"
              });
            }}
            options={this.props.examinationOptions}
            placeholder="Valitse tutkimus"
            removeSelected={false}
            rtl={false}
            simpleValue={false}
            value={this.state.tutkimus}
          />
          {false && <HelpBlock>SyÃ¶tÃ¤ tÃ¤hÃ¤n tutkimusmuoto</HelpBlock>}
        </FormGroup>
        <FormGroup validationState={this.state.vastaanottoPaivaValid}>
          <ControlLabel>VastaanottopÃ¤ivÃ¤</ControlLabel>
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
        <FormGroup>
          <ButtonToolbar>
            <ToggleButtonGroup
              type="radio"
              name="options"
              defaultValue={1}
              onChange={this.handleEsitietolomakeToggle}
            >
              <ToggleButton value={1}>
                Esitietolomaketta ei ole tÃ¤ytetty
              </ToggleButton>
              <ToggleButton value={2}>Esitietolomake on tÃ¤ytetty</ToggleButton>
            </ToggleButtonGroup>
          </ButtonToolbar>
        </FormGroup>
        {this.state.esitietolomakeExpanded && (
          <FormGroup validationState={this.state.esitietolomakeValid}>
            <ControlLabel>Esitietolomakkeen tiedostonimi</ControlLabel>
            <FormControl
              type="text"
              placeholder="Esitietolomakkeen tiedostonimi"
              value={this.state.esitietolomake}
              onChange={this.handleEsitietolomake}
            />
            {false && (
              <HelpBlock>SyÃ¶tÃ¤ esitietolomakkeen tiedostonimi</HelpBlock>
            )}
          </FormGroup>
        )}
        <FormGroup>
          <ControlLabel>LisÃ¤tiedot</ControlLabel>
          <FormControl
            componentClass="textarea"
            placeholder="TÃ¤hÃ¤n mahdolliset lisÃ¤tiedot"
            value={this.state.lisatiedot}
            onChange={e => {
              this.setState({ lisatiedot: e.target.value });
            }}
          />
          {false && <HelpBlock>SyÃ¶tÃ¤ tÃ¤hÃ¤n henkilÃ¶n sukunimi</HelpBlock>}
        </FormGroup>
        <Button bsStyle="primary" onClick={this.handleClick}>
          Talleta
        </Button>
      </div>
    );
  }
}

function mapStateToProps(state) {
	  return {
	    person: state.person,
	    examinationOptions: state.examinationOptions
	  };
	}

export default connect(mapStateToProps)(ModifyEntry);