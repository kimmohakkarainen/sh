import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Menu from "./menu";

import { connect } from "react-redux";
import { fetchState, postLogout } from "./actions";

import DummyView from "./dummyview";
import EnterView from "./enterview";
import DoctorView from "./doctorview";
import PersonAdminView from "./personadminview";
import InvoiceView from "./invoiceview";

class App extends Component {
	componentDidMount() {
		this.props.dispatch(fetchState());
	}

	render() {
		return (
		<div className="App">
			{ this.props.person && 
			<Router>
				<div>
				{ this.props.person.role === 'ADMIN' &&
				<div>
					<Menu personName={this.props.person.email} role='ADMIN' />
					<Route exact path="/" component={EnterView} />
					<Route exact path="/billing" component={InvoiceView} />
					<Route exact path="/admin/rights" component={PersonAdminView} />
					<Route exact path="/password" component={DummyView} />
					<Route exact path="/logout" render={() => {
						this.props.dispatch(postLogout());
						return(<div>Logging out</div>);
					}} />
				</div> }
				{ this.props.person.role === 'SECRETARY' &&
					<div>
						<Menu personName={this.props.person.email} role='SECRETARY' />
						<Route exact path="/" component={EnterView} />
						<Route exact path="/billing" component={InvoiceView} />
						<Route exact path="/password" component={DummyView} />
						<Route exact path="/logout" render={() => {
							this.props.dispatch(postLogout());
							return(<div>Logging out</div>);
						}} />
					</div> }
				{ this.props.person.role === 'DOCTOR' &&
					<div>
						<Menu personName={this.props.person.email} role='DOCTOR' />
						<Route exact path="/" component={DoctorView} />
						<Route exact path="/password" component={DummyView} />
						<Route exact path="/logout" render={() => {
							this.props.dispatch(postLogout());
							return(<div>Logging out</div>);
						}} />
					</div> }
				</div>
				</Router> }
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		person: state.person
	};
}

export default connect(mapStateToProps)(App);
