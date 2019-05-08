import React, { Component } from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import { fetchState } from "./actions";
import { Modal, Button } from "react-bootstrap";



class ErrorView extends Component {
	constructor(props) {
		super(props);
	}
	
	render() {
		return(
			<div>
			{ this.props.errorModal != null &&
			<Modal.Dialog>
				<Modal.Header><Modal.Title>Virhe</Modal.Title></Modal.Header>
				<Modal.Body>{this.props.errorModal}</Modal.Body>
				<Modal.Footer>
					<Button bsStyle="primary" onClick={() => this.props.dispatch(fetchState())}>OK</Button>
				</Modal.Footer>
			</Modal.Dialog> 
			}
			</div>
	);
	}
}

function mapStateToProps(state) {
  return {
    errorModal: state.errorModal,
  };
}

export default connect(mapStateToProps)(ErrorView);
