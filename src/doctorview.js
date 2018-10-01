import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Panel } from "react-bootstrap";

import NewEntries from "./panels/newentries.js";
import InProgressEntries from "./panels/inprogressentries.js";

class DoctorView extends Component {
  render() {
    return (
      <div>
        <Panel bsStyle="primary" defaultExpanded>
          <Panel.Heading>
            <Panel.Title toggle componentClass="h3">
              Omat keskeneräiset lausuttavat
            </Panel.Title>
          </Panel.Heading>
          <Panel.Collapse>
            <Panel.Body>
              <InProgressEntries />
            </Panel.Body>
          </Panel.Collapse>
        </Panel>
        <Panel defaultExpanded>
          <Panel.Heading>
            <Panel.Title toggle componentClass="h3">
              Uudet lausuttavat
            </Panel.Title>
          </Panel.Heading>
          <Panel.Collapse>
            <Panel.Body>
              <NewEntries />
            </Panel.Body>
          </Panel.Collapse>
        </Panel>
      </div>
    );
  }
}

export default DoctorView;
