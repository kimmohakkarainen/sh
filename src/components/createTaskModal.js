import React, { Component } from "react";
import ReactDOM from "react-dom";

import {
  Modal,
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
import moment from "moment";
import DayPickerInput from "react-day-picker/DayPickerInput";
import MomentLocaleUtils, {
  formatDate,
  parseDate
} from "react-day-picker/moment";


class CreateTaskModal extends Component {
  constructor(props) {
    super(props);
    this.state = this.clearValues();
    this.handleClick = this.handleClick.bind(this);
    this.handleTutkimusPaivaChange = this.handleTutkimusPaivaChange.bind(this);
    this.handleVastaanottoPaivaChange = this.handleVastaanottoPaivaChange.bind(this);
    this.handleHetu = this.handleHetu.bind(this);
    this.handleSukunimi = this.handleSukunimi.bind(this);
    this.handleEsitietolomake = this.handleEsitietolomake.bind(this);
    this.handleEsitietolomakeToggle = this.handleEsitietolomakeToggle.bind(
      this
    );
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
      lisatiedot: "",
      laakari: ""
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

  handleTutkimusPaivaChange(selectedDay, modifiers) {
	  if (selectedDay == undefined) {
	       // ignore
	  } else {
		  this.setState({
			  tutkimusPaiva: selectedDay,
			  tutkimusPaivaValid: "success"
          });
	  }
  }

  handleVastaanottoPaivaChange(selectedDay, modifiers) {
	  if (selectedDay == undefined) {
	       // ignore
	  } else {
		  this.setState({
			  vastaanottoPaiva: selectedDay,
			  vastaanottoPaivaValid: "success"
          });
	  }
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
      const params = {
          taskId: null,
          hetu: this.state.hetu,
          sukunimi: this.state.sukunimi,
          tutkimus: {value : this.state.tutkimus} ,
          tutkimusPaiva: this.state.tutkimusPaiva,
          vastaanottoPaiva: this.state.vastaanottoPaiva,
          lisatiedot: this.state.lisatiedot,
          esitietolomake: this.state.esitietolomake,
          laakari: { value: this.state.laakari} 
        };
      this.props.dispatch(params);
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
    const DAY_FORMAT = "D.M.YYYY";
    const dayPickerProps = {
	    	      locale: "fi",
	    	      localeUtils: MomentLocaleUtils
	    	    };

    return (
    	<div>
    	<Modal.Header closeButton>
    	<Modal.Title>Uusi lausuttava</Modal.Title>
    	</Modal.Header>
    	<Modal.Body>
        <FormGroup validationState={this.state.tutkimusPaivaValid}>
          <ControlLabel>TutkimuspÃ¤ivÃ¤</ControlLabel>
          <div className="form-control">
          <DayPickerInput
          	value={this.state.tutkimusPaiva}
          	format={DAY_FORMAT} placeholder={DAY_FORMAT}
          	formatDate={formatDate} parseDate={parseDate}
          	onDayChange={this.handleTutkimusPaivaChange}
          	dayPickerProps={dayPickerProps} />
          </div>
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
          <FormControl componentClass="select" placeholder="(Valitse)"
        	  value={this.state.tutkimus}
          	  onChange={event => {this.setState({ tutkimus: event.target.value, tutkimusValid: "success"});}}
          >
          {this.props.examinationOptions.map(function (option) {
        	return (
        		<option key={option.value} value={option.value}>{option.label}</option>
        	);  
          })}
          </FormControl>
          {false && <HelpBlock>SyÃ¶tÃ¤ tÃ¤hÃ¤n tutkimusmuoto</HelpBlock>}
        </FormGroup>
        <FormGroup validationState={this.state.vastaanottoPaivaValid}>
          <ControlLabel>VastaanottopÃ¤ivÃ¤</ControlLabel>
          <div className="form-control">
          <DayPickerInput
          	value={this.state.vastaanottoPaiva}
          	format={DAY_FORMAT} placeholder={DAY_FORMAT}
          	formatDate={formatDate} parseDate={parseDate}
          	onDayChange={this.handleVastaanottoPaivaChange}
          	dayPickerProps={dayPickerProps} />
          </div>
        </FormGroup>
        <FormGroup>
          <ButtonToolbar>
            <ToggleButtonGroup style={{zIndex: 0}}
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
        <FormGroup >
        <ControlLabel>LÃ¤Ã¤kÃ¤ri</ControlLabel>
        <FormControl componentClass="select" placeholder="(Valitse)"
      	  value={this.state.laakari}
        	  onChange={event => {this.setState({ laakari: event.target.value});}}
        >
        	<option key={null} value={null}></option>
        {this.props.doctorOptions.map(function (option) {
      	return (
      		<option key={option.value} value={option.value}>{option.label}</option>
      	);  
        })}
        </FormControl>
        {false && <HelpBlock>SyÃ¶tÃ¤ tÃ¤hÃ¤n arvioiva lÃ¤Ã¤kÃ¤ri</HelpBlock>}
      </FormGroup>

        </Modal.Body>
        <Modal.Footer>
        <Button bsStyle="primary" onClick={this.handleClick}>
          Talleta
        </Button>
        </Modal.Footer>
        </div>
    );
  }
}

export default CreateTaskModal;
