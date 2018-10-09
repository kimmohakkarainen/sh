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
import { getPreview } from "./actions";

import "react-day-picker/lib/style.css";

class InvoiceView extends Component {
  constructor(props, path) {
    super(props);

    this.state = {
      url: props.match.url,
      errorMsg: null
    };

    this.handleDoctorFilterChange = this.handleDoctorFilterChange.bind(this);
    this.handleExaminationFilterChange = this.handleExaminationFilterChange.bind(
      this
    );

    this.fetchSuccessfull = this.fetchSuccessfull.bind(this);
    this.handleResponse = this.handleResponse.bind(this);
    this.connectionError = this.connectionError.bind(this);
    this.postError = this.postError.bind(this);

    this.handleBeginDayChange = this.handleBeginDayChange.bind(this);
    this.handleEndDayChange = this.handleEndDayChange.bind(this);
    this.postParametersAndGetExcel = this.postParametersAndGetExcel.bind(this);
    this.postSuccessfull = this.postSuccessfull.bind(this);

    this.postPreviewParameters = this.postPreviewParameters.bind(this);
    this.postPreviewSuccessfull = this.postPreviewSuccessfull.bind(this);
    this.handlePreviewResponse = this.handlePreviewResponse.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(
      getPreview({
        beginDate: null,
        endDate: null,
        doctorFilter: [],
        examinationFilter: []
      })
    );
  }

  fetchSuccessfull(response) {
    if (response.redirected) {
      window.location.href = "/admin/reports";
    } else if (response.ok) {
      response.json().then(this.handleResponse);
    }
  }

  handleResponse(response) {
    this.setState({
      options: response,
      customerOptions: response.customerOptions,
      customerFilter: response.customerFilter,
      personOptions: response.personOptions,
      personFilter: response.personFilter,
      projectOptions: response.projectOptions,
      projectFilter: response.projectFilter,
      preview: response.preview
    });
  }

  connectionError(error) {
    this.setState({ errorMsg: "Connection with server broken" });
  }

  handleExcelBlob(response) {
    var a = document.createElement("a");
    a.href = window.URL.createObjectURL(response);
    a.download = "report.xlsx";
    a.style.display = "none";
    document.body.appendChild(a);
    a.click();
  }

  postSuccessfull(response) {
    if (response.redirected) {
      window.location.href = "/admin/reports";
    } else if (response.ok) {
      this.setState({ errorMsg: null });
      response.blob().then(this.handleExcelBlob);
    }
  }

  postError(error) {
    this.setState({ errorMsg: error });
  }

  postParametersAndGetExcel() {
    const postData = {
      beginDay: moment(this.state.beginDay).format("YYYY-MM-DD"),
      endDay: moment(this.state.endDay).format("YYYY-MM-DD"),
      customerFilter: this.state.customerFilter,
      personFilter: this.state.personFilter,
      projectFilter: this.state.projectFilter
    };
    fetch("/rest/admin/report/xlsx", {
      credentials: "same-origin",
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(postData)
    })
      .then(this.postSuccessfull)
      .catch(this.postError);
  }

  postPreviewParameters(
    beginDay,
    endDay,
    customerFilter,
    projectFilter,
    personFilter
  ) {
    const postData = {
      beginDay: moment(beginDay).format("YYYY-MM-DD"),
      endDay: moment(endDay).format("YYYY-MM-DD"),
      customerFilter: customerFilter,
      personFilter: personFilter,
      projectFilter: projectFilter
    };
    fetch("/rest/admin/report/preview", {
      credentials: "same-origin",
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(postData)
    })
      .then(this.postPreviewSuccessfull)
      .catch(this.postError);
  }

  postPreviewSuccessfull(response) {
    if (response.redirected) {
      window.location.href = "/admin/reports";
    } else if (response.ok) {
      response.json().then(this.handlePreviewResponse);
    }
  }

  handlePreviewResponse(response) {
    console.log(response);
    this.setState({
      preview: response.preview
    });
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

  handleDoctorFilterChange(value) {
    console.log("handleDoctorFilterChange");
    console.log(value);
    this.props.dispatch(
      getPreview({
        beginDate: this.props.beginDate,
        endDate: this.props.endDate,
        doctorFilter: value,
        examinationFilter: this.props.examinationFilter
      })
    );
  }

  handleExaminationFilterChange(value) {
    console.log("handleExaminationFilterChange");
    console.log(value);
    this.props.dispatch(
      getPreview({
        beginDate: this.props.beginDate,
        endDate: this.props.endDate,
        doctorFilter: this.props.doctorFilter,
        examinationFilter: value
      })
    );
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

          <Panel header={FilterPanelTitle}>
            <FormGroup controlId="formHorizontalFilterPanel">
              <Col componentClass={ControlLabel} sm={3}>
                Lääkäri
              </Col>
              <Col sm={9}>
                <Select
                  closeOnSelect={true}
                  disabled={false}
                  isMulti
                  onChange={this.handleDoctorFilterChange}
                  options={this.props.doctorOptions}
                  placeholder="Valitse lääkäri(t)"
                  removeSelected={true}
                  rtl={false}
                  simpleValue={false}
                  value={this.props.doctorFilter}
                />
              </Col>
              <Col componentClass={ControlLabel} sm={3}>
                Tutkimus
              </Col>
              <Col sm={9}>
                <Select
                  closeOnSelect={true}
                  disabled={false}
                  isMulti
                  onChange={this.handleExaminationFilterChange}
                  options={this.props.examinationOptions}
                  placeholder="Valitse tutkimus/ tutkimukset"
                  removeSelected={true}
                  rtl={false}
                  simpleValue={false}
                  value={this.props.examinationFilter}
                />
              </Col>
            </FormGroup>
          </Panel>

          <Panel header={PreviewPanelTitle}>
            <BootstrapTable data={this.props.preview} striped hover>
              <TableHeaderColumn dataField="id" isKey hidden>
                ID
              </TableHeaderColumn>
              <TableHeaderColumn dataField="doctor">Lääkäri</TableHeaderColumn>
              <TableHeaderColumn dataField="examination">
                Tutkimus
              </TableHeaderColumn>
              <TableHeaderColumn dataField="dpart">
                Lääkärin korvaus yht.
              </TableHeaderColumn>
              <TableHeaderColumn dataField="sum">
                Laskutettava yhteensä
              </TableHeaderColumn>
              <TableHeaderColumn dataField="count">lkm</TableHeaderColumn>
            </BootstrapTable>
          </Panel>
        </Form>
      </Grid>
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
    doctorOptions: state.invoice.doctorOptions,
    doctorFilter: state.invoice.doctorFilter,
    examinationOptions: state.invoice.examinationOptions,
    examinationFilter: state.invoice.examinationFilter,
    preview: state.invoice.preview
  };
}

export default connect(mapStateToProps)(InvoiceView);
