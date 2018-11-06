import React, { Component } from "react";
import {
  PageHeader,
  Grid,
  Col,
  Panel,
  Form,
  FormGroup,
  ControlLabel,
  FormControl,
  Button,
  HelpBlock,
  Alert
} from "react-bootstrap";
import { connect } from "react-redux";

import moment from "moment";
import DayPickerInput from "react-day-picker/DayPickerInput";
import MomentLocaleUtils, {
  formatDate,
  parseDate
} from "react-day-picker/moment";
import Select from "react-select";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import { getPreview, getExcel } from "./actions";

class EditView extends Component {
  constructor(props, path) {
    super(props);

    this.state = {
      url: props.match.url,
      errorMsg: null
    };

    this.handleBeginDayChange = this.handleBeginDayChange.bind(this);
    this.handleEndDayChange = this.handleEndDayChange.bind(this);
    this.postParametersAndGetExcel = this.postParametersAndGetExcel.bind(this);
  }

  componentDidMount() {
    /*
    this.props.dispatch(
      getPreview({
        beginDate: null,
        endDate: null,
      })
    );
    */
  }

  postParametersAndGetExcel() {
    this.props.dispatch(
      getExcel({
        beginDate: this.props.beginDate,
        EndDate: this.props.endDate,
        doctorFilter: this.props.doctorFilter,
        examinationFilter: this.props.examinationFilter
      })
    );
  }

  handleBeginDayChange(selectedDay, modifiers) {
    if (selectedDay == undefined) {
      // ignore
    } else {
      console.log("handleEndDayChange");
      console.log(selectedDay);
      this.props.dispatch(
        getPreview({
          beginDate: moment(selectedDay).format("YYYY-MM-DD"),
          endDate: this.props.endDate,
          doctorFilter: this.props.doctorFilter,
          examinationFilter: this.props.examinationFilter
        })
      );
    }
  }

  handleEndDayChange(selectedDay, modifiers) {
    if (selectedDay == undefined) {
      // ignore
    } else {
      console.log("handleEndDayChange");
      console.log(selectedDay);
      this.props.dispatch(
        getPreview({
          beginDate: this.props.beginDate,
          endDate: moment(selectedDay).format("YYYY-MM-DD"),
          doctorFilter: this.props.doctorFilter,
          examinationFilter: this.props.examinationFilter
        })
      );
    }
  }

  render() {
    const { beginDate, endDate } = this.props;
    const DAY_FORMAT = "D.M.YYYY";
    const formattedBeginDay = beginDate
      ? moment(beginDate).format(DAY_FORMAT)
      : "";
    const formattedEndDay = endDate ? moment(endDate).format(DAY_FORMAT) : "";

    const dayPickerProps = {
      locale: "fi",
      localeUtils: MomentLocaleUtils
    };

    const TimeRangeTitle = <h3>Aikaväli</h3>;
    const FilterPanelTitle = <h3>Suodatus</h3>;
    const PreviewPanelTitle = <h3>Esikatselu</h3>;

    return (
      <div className="billingContainer">
        <Grid>
          <PageHeader>
            <small>Laskutus</small>
          </PageHeader>

          {this.state.errorMsg && (
            <Alert bsStyle="danger">
              <strong>Error</strong> {this.state.errorMsg}
            </Alert>
          )}

          <Form horizontal>
            <Panel header={TimeRangeTitle}>
              <FormGroup controlId="formHorizontalDateRange">
                <Col componentClass={ControlLabel} sm={2}>
                  Begin
                </Col>
                <Col sm={3}>
                  <DayPickerInput
                    value={formattedBeginDay}
                    onDayChange={this.handleBeginDayChange}
                    format={DAY_FORMAT}
                    placeholder={DAY_FORMAT}
                    formatDate={formatDate}
                    parseDate={parseDate}
                    dayPickerProps={dayPickerProps}
                  />
                </Col>
                <Col componentClass={ControlLabel} sm={2}>
                  End
                </Col>
                <Col sm={3}>
                  <DayPickerInput
                    value={formattedEndDay}
                    onDayChange={this.handleEndDayChange}
                    format={DAY_FORMAT}
                    placeholder={DAY_FORMAT}
                    formatDate={formatDate}
                    parseDate={parseDate}
                    dayPickerProps={dayPickerProps}
                  />
                </Col>
                <Col sm={2}>
                  <Button
                    bsStyle="primary"
                    type="button"
                    onClick={this.postParametersAndGetExcel}
                  >
                    Tee lasku
                  </Button>
                </Col>
              </FormGroup>
            </Panel>

            <Panel header={PreviewPanelTitle}>
              <BootstrapTable data={this.props.preview} striped hover>
                <TableHeaderColumn dataField="id" isKey hidden>
                  ID
                </TableHeaderColumn>
                <TableHeaderColumn dataField="doctor">
                  Tutkimuspäivä
                </TableHeaderColumn>
                <TableHeaderColumn dataField="doctor">
                  Tutkimus
                </TableHeaderColumn>
                <TableHeaderColumn dataField="hetu">
                  Henkilötunnus
                </TableHeaderColumn>
                <TableHeaderColumn dataField="doctor">
                  Sukunimi
                </TableHeaderColumn>
                <TableHeaderColumn dataField="count">lkm</TableHeaderColumn>
              </BootstrapTable>
            </Panel>
          </Form>
        </Grid>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const beginDate = moment(state.invoice.beginDate, "YYYY-MM-DD");
  const endDate = moment(state.invoice.endDate, "YYYY-MM-DD");
  return {
    person: state.person,
    beginDate: state.invoice.beginDate,
    endDate: state.invoice.endDate,
    preview: state.invoice.preview
  };
}

export default connect(mapStateToProps)(EditView);
