import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Alert, Grid, Row, Col, Panel, Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { connect } from "react-redux";

import { postPassword } from "./actions";

class PasswordView extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			oldpassword: '',
			newpass1: '',
			newpass1valid: false,
			newpass2: '',
			newpass2valid: false,
		};
		
		this.handleNew1 = this.handleNew1.bind(this);
		this.handleNew2 = this.handleNew2.bind(this);
		this.handleTallenna = this.handleTallenna.bind(this);
	}
	
	handleTallenna() {
		
		const params = {
			oldPassword: this.state.oldpassword,
			password: this.state.newpass1,
			password2: this.state.newpass2
		};
		
		this.props.dispatch(postPassword(params));
	}
	
	handleNew1(e) {
		this.setState({newpass1: e.target.value});
	}

	handleNew2(e) {
		this.setState({newpass2: e.target.value});
	}

  render() {
    return (
      <div>
      	{ this.props.passwordStatus == 200 && <Alert bsStyle="success">Salasana vaihdettu!</Alert> }
      	{ this.props.passwordStatus && this.props.passwordStatus != 200 && <Alert bsStyle="danger">Vaihto epÃ¤onnistui!</Alert> }
      	<Grid>
      	<Panel header="Vaihda salasana">
      	<Row>
      	<FormGroup controlId="formCurrent">
      		<Col componentClass={ControlLabel} sm={4}>Nykyinen salasana</Col>
      		<Col sm={4}>
      			<FormControl type="password" value={this.state.oldpassword}
      				onChange={e => { this.setState({ oldpassword: e.target.value }); }} />
        	</Col>
      	</FormGroup>
      	</Row>
      	<Row>
      	<FormGroup controlId="formNew1">
      		<Col componentClass={ControlLabel} sm={4}>Uusi salasana</Col>
      		<Col sm={4}>
      			<FormControl type="password" value={this.state.newpass1}
      				onChange={this.handleNew1} />
        	</Col>
      	</FormGroup>
      	</Row>
      	<Row>
      	<FormGroup controlId="formNew2">
      		<Col componentClass={ControlLabel} sm={4}>Toista uusi salasana</Col>
      		<Col sm={4}>
      			<FormControl type="password" value={this.state.newpass2}
      				onChange={this.handleNew2} />
        	</Col>
      	</FormGroup>
      	</Row>
      	<Row>
      	<Col sm={2} xsOffset={8}><Button onClick={this.handleTallenna}>Vaihda</Button></Col>
      	</Row>
      	</Panel>
      	</Grid>
      </div>
    );
  }
}

function mapStateToProps(state) {
	  return {
		  passwordStatus: state.passwordStatus
	  };
	}


export default connect(mapStateToProps)(PasswordView);
