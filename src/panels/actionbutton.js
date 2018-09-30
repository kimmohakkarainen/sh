import React, { Component } from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import { assignTask } from "../actions";

import { Button } from "react-bootstrap";

class ActionButton extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    console.log(this.props);
    const parms = this.props.createAction({
      Person: this.props.person,
      Task: this.props.task
    });
    this.props.dispatch(parms);
  }

  render() {
    return <Button onClick={this.handleClick}>{this.props.text}</Button>;
  }
}

function mapStateToProps(state) {
  const person = state.person;
  return {
    person: person
  };
}

export default connect(mapStateToProps)(ActionButton);
