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

import { connect } from "react-redux";
import { getExaminations, modifyExamination } from "./actions";
import ExaminationTable from "./panels/examinationtable";

class ExaminationAdminView extends Component {
  constructor(props) {
    super(props);
    this.handleTallenna = this.handleTallenna.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(getExaminations());
  }

  handleTallenna(e) {
    const examination = {
      Examination: {
        examinationId: e.examinationId,
        version: e.version,
        name: e.name,
        doctorPrice: e.doctorPrice,
        invoicePrice: e.invoicePrice,
      }
    };
    this.props.dispatch(modifyExamination(examination));
  }

  render() {
    return (
      <Panel bsStyle="primary">
        <Panel.Heading>
          <Panel.Title toggle componentClass="h3">
            Tutkimukset
          </Panel.Title>
        </Panel.Heading>
        <Panel.Body>
          <ExaminationTable
            examinations={this.props.examinations}
            onTallenna={this.handleTallenna}
          />
        </Panel.Body>
      </Panel>
    );
  }
}

function mapStateToProps(state) {
  return {
    person: state.person,
    examinations: state.examinations
  };
}

export default connect(mapStateToProps)(ExaminationAdminView);
