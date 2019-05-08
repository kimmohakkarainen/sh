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

import { createTask, postCreate } from "../actions";

class ModifyMessageModal extends Component {
  constructor(props) {
    super(props);
    this.state =Object.assign({}, {viesti: ''} , this.props.task);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
      console.log(this.state);
      this.props.dispatch(this.state);
  }

  render() {
	const viesti = this.state.viesti == null ? '' : this.state.viesti;
    return (
      <div>
      	<Modal.Header closeButton>
      	<Modal.Title>Viesti</Modal.Title>
      	</Modal.Header>
      	<Modal.Body>
        <FormGroup>
          <ControlLabel>HenkilÃ¶tunnus</ControlLabel>
          <FormControl readOnly
            type="text"
            value={this.state.hetu}
          />
        </FormGroup>
        <FormGroup>
          <ControlLabel>Sukunimi</ControlLabel>
          <FormControl readOnly
            type="text" 
            value={this.state.sukunimi}
          />
        </FormGroup>
        <FormGroup>
          <ControlLabel>Tutkimus</ControlLabel>
          <FormControl type="text" readOnly value={this.state.tutkimus.label} />
        </FormGroup>
        <FormGroup>
          <ControlLabel>LisÃ¤tiedot</ControlLabel>
          <FormControl componentClass="textarea" readOnly
            value={this.state.lisatiedot}
          />
        </FormGroup>
        <FormGroup>
          <ControlLabel>Viesti</ControlLabel>
          <FormControl componentClass="textarea" 
          placeholder="TÃ¤hÃ¤n mahdollinen viesti"
          value={viesti}
          onChange={e => {
              this.setState({ viesti: e.target.value });
          }} />
        </FormGroup>

        </Modal.Body>
        <Modal.Footer>
        	<Button bsStyle="primary" onClick={this.handleClick}>Talleta</Button>
        </Modal.Footer>
      </div>
    );
  }
}

export default ModifyMessageModal;