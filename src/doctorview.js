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

const NewEntriesPanel = () => {
  return (
    <Table striped bordered condensed hover>
      <thead>
        <tr>
          <th />
          <th>Vastaanottopäivä</th>
          <th>Sosiaaliturvatunnus</th>
          <th>Sukunimi</th>
          <th>Tutkimus</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <button>Työlistalle</button>
          </td>
          <td>24.10.2018</td>
          <td>123456-1234</td>
          <td>Möttönen</td>
          <td>Datscan</td>
        </tr>
        <tr>
          <td>
            <button>Työlistalle</button>
          </td>
          <td>15.11.2018</td>
          <td>345602A5134</td>
          <td>Litmanen</td>
          <td>Luuston gammakuvaus</td>
        </tr>
        <tr>
          <td>
            <button>Työlistalle</button>
          </td>
          <td />
          <td>011248-5412</td>
          <td>Räikkönen</td>
          <td>Datscan</td>
        </tr>
      </tbody>
    </Table>
  );
};

const InProgressPanel = () => {
  return (
    <Table striped bordered condensed hover>
      <thead>
        <tr>
          <th />
          <th>Vastaanottopäivä</th>
          <th>Sosiaaliturvatunnus</th>
          <th>Sukunimi</th>
          <th>Tutkimus</th>
          <th>Lisätiedot</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <button>Valmis</button>
          </td>
          <td>26.9.2018</td>
          <td>123456-1234</td>
          <td>Möttönen</td>
          <td>Datscan</td>
          <td>Jalka poikki. Kulkee keippien avulla</td>
        </tr>
        <tr>
          <td>
            <button>Valmis</button>
          </td>
          <td>30.9.2018</td>
          <td>345612-5134</td>
          <td>Litmanen</td>
          <td>Luuston gammakuvaus</td>
          <td />
        </tr>
        <tr>
          <td>
            <button>Valmis</button>
          </td>
          <td>30.9.2018</td>
          <td>345612-5134</td>
          <td>Litmanen</td>
          <td>Luuston gammakuvaus</td>
          <td>Karkasi kesken tutkimuksen tupakalle</td>
        </tr>
      </tbody>
    </Table>
  );
};

class DoctorView extends Component {
  render() {
    return (
      <div>
        <Panel bsStyle="primary" defaultExpanded>
          <Panel.Heading>
            <Panel.Title toggle componentClass="h3">
              Keskeneräiset Lähetteet
            </Panel.Title>
          </Panel.Heading>
          <Panel.Collapse>
            <Panel.Body>
              <InProgressPanel />
            </Panel.Body>
          </Panel.Collapse>
        </Panel>
        <Panel defaultExpanded>
          <Panel.Heading>
            <Panel.Title toggle componentClass="h3">
              Uudet Lähetteet
            </Panel.Title>
          </Panel.Heading>
          <Panel.Collapse>
            <Panel.Body>
              <NewEntriesPanel />
            </Panel.Body>
          </Panel.Collapse>
        </Panel>
      </div>
    );
  }
}

export default DoctorView;
