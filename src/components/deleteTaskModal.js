import React, { Component } from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";

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
import Select from "react-select";

import { createTask, postCreate } from "../actions";

class DeleteTaskModal extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
      this.props.dispatch(this.props.task);
  }

  render() {
	const hetu = this.props.task == null ? '' : this.props.task.hetu;
	const tutkimusPaiva = this.props.task == null ? '' : this.props.task.tutkimusPaiva;
	const sukunimi = this.props.task == null ? '' : this.props.task.sukunimi;
	const tutkimus = this.props.task == null ? '' : this.props.task.tutkimus.label;
    return (
      <div>
      	<Modal.Header closeButton>
      	<Modal.Title>Poista lausuttava</Modal.Title>
      	</Modal.Header>
      	<Modal.Body>
        <FormGroup>
        	<ControlLabel>TutkimuspÃ¤ivÃ¤</ControlLabel>
        	<FormControl.Static>{tutkimusPaiva}</FormControl.Static>
        </FormGroup>
        <FormGroup>
        	<ControlLabel>HenkilÃ¶tunnus</ControlLabel>
        	<FormControl.Static>{hetu}</FormControl.Static>
        </FormGroup>
            <FormGroup>
        	<ControlLabel>Sukunimi</ControlLabel>
        	<FormControl.Static>{sukunimi}</FormControl.Static>
        </FormGroup>
            <FormGroup>
        	<ControlLabel>Tutkimus</ControlLabel>
        	<FormControl.Static>{tutkimus}</FormControl.Static>
        </FormGroup>
        </Modal.Body>
        <Modal.Footer>
        	<Button bsStyle="primary" onClick={this.handleClick}>OK</Button>
        </Modal.Footer>
      </div>
    );
  }
}

export default DeleteTaskModal;