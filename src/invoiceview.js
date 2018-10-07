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
      beginDay: moment().startOf("month"),
      endDay: moment().endOf("month"),
      errorMsg: null,
      doctorFilter: [],
      doctorOptions: [
        { value: 1, label: "Doctor Möttönen" },
        { value: 2, label: "Doctor Nikula" }
      ],
      examinationFilter: [],
      examinationOptions: [
        { value: 1, label: "EKG 24h" },
        { value: 2, label: "phB 12h" }
      ],
      preview: []
    };
    this.fetchSuccessfull = this.fetchSuccessfull.bind(this);
    this.handleResponse = this.handleResponse.bind(this);
    this.connectionError = this.connectionError.bind(this);
    this.postError = this.postError.bind(this);

    this.handleBeginDayChange = this.handleBeginDayChange.bind(this);
    this.handleEndDayChange = this.handleEndDayChange.bind(this);
    this.postParametersAndGetExcel = this.postParametersAndGetExcel.bind(this);
    this.postSuccessfull = this.postSuccessfull.bind(this);
    this.handleCustomerFilterChange = this.handleCustomerFilterChange.bind(
      this
    );
    this.handleProjectFilterChange = this.handleProjectFilterChange.bind(this);
    this.handlePersonFilterChange = this.handlePersonFilterChange.bind(this);

    this.postPreviewParameters = this.postPreviewParameters.bind(this);
    this.postPreviewSuccessfull = this.postPreviewSuccessfull.bind(this);
    this.handlePreviewResponse = this.handlePreviewResponse.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(getPreview({ Person: this.props.person, Filter: {} }));

    /*
    fetch("/rest/admin/report/options", {
      credentials: "same-origin",
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(this.fetchSuccessfull)
      .catch(this.connectionError);
      */
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
      this.setState({
        beginDay: selectedDay
      });
      this.postPreviewParameters(
        selectedDay,
        this.state.endDay,
        this.state.customerFilter,
        this.state.projectFilter,
        this.state.personFilter
      );
    }
  }

  handleEndDayChange(selectedDay, modifiers) {
    if (selectedDay == undefined) {
      // ignore
    } else {
      this.setState({
        endDay: selectedDay
      });
      this.postPreviewParameters(
        this.state.beginDay,
        selectedDay,
        this.state.customerFilter,
        this.state.projectFilter,
        this.state.personFilter
      );
    }
  }

  handleCustomerFilterChange(value) {
    this.setState({
      customerFilter: value,
      projectFilter: []
    });
    this.postPreviewParameters(
      this.state.beginDay,
      this.state.endDay,
      value,
      [],
      this.state.personFilter
    );
  }

  handleProjectFilterChange(value) {
    this.setState({
      projectFilter: value,
      customerFilter: []
    });
    this.postPreviewParameters(
      this.state.beginDay,
      this.state.endDay,
      [],
      value,
      this.state.personFilter
    );
  }

  handlePersonFilterChange(value) {
    this.setState({ personFilter: value });
    this.postPreviewParameters(
      this.state.beginDay,
      this.state.endDay,
      this.state.customerFilter,
      this.state.projectFilter,
      value
    );
  }

  render() {
    const { beginDay, endDay } = this.state;
    const DAY_FORMAT = "D.M.YYYY";
    const formattedBeginDay = beginDay
      ? moment(beginDay).format(DAY_FORMAT)
      : "";
    const formattedEndDay = endDay ? moment(endDay).format(DAY_FORMAT) : "";

    const dayPickerProps = {
      locale: "fi",
      localeUtils: MomentLocaleUtils
    };

    const TimeRangeTitle = <h3>Time Range</h3>;
    const FilterPanelTitle = <h3>Filter</h3>;
    const PreviewPanelTitle = <h3>Preview</h3>;

    return (
      <Grid>
        <PageHeader>
          <small>Reporting</small>
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
                <Button bsStyle="primary">Tee lasku</Button>
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
                  multi
                  onChange={this.handleCustomerFilterChange}
                  options={this.state.doctorOptions}
                  placeholder="Valitse lääkäri(t)"
                  removeSelected={true}
                  rtl={false}
                  simpleValue={false}
                  value={this.state.doctorFilter}
                />
              </Col>
              <Col componentClass={ControlLabel} sm={3}>
                Tutkimus
              </Col>
              <Col sm={9}>
                <Select
                  closeOnSelect={true}
                  disabled={false}
                  multi
                  onChange={this.handlePersonFilterChange}
                  options={this.state.examinationOptions}
                  placeholder="Valitse tutkimus/ tutkimukset"
                  removeSelected={true}
                  rtl={false}
                  simpleValue={false}
                  value={this.state.examinationFilter}
                />
              </Col>
            </FormGroup>
          </Panel>

          <Panel header={PreviewPanelTitle}>
            <BootstrapTable data={this.state.preview} striped hover>
              <TableHeaderColumn dataField="id" isKey hidden>
                ID
              </TableHeaderColumn>
              <TableHeaderColumn dataField="customer">
                Customer
              </TableHeaderColumn>
              <TableHeaderColumn dataField="project">Project</TableHeaderColumn>
              <TableHeaderColumn dataField="person">Person</TableHeaderColumn>
              <TableHeaderColumn dataField="hours">Hours</TableHeaderColumn>
              <TableHeaderColumn dataField="notes">Notes</TableHeaderColumn>
            </BootstrapTable>
          </Panel>

          <Button
            type="button"
            onClick={this.postParametersAndGetExcel}
            bsStyle="primary"
          >
            Generate Excel Report
          </Button>
        </Form>
      </Grid>
    );
  }
}

function mapStateToProps(state) {
  return {
    person: state.person
  };
}

export default connect(mapStateToProps)(InvoiceView);
