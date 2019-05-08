import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Table, Button, FormControl, FormGroup } from "react-bootstrap";
import RooliValinnat from "./roolivalinnat";

class NewExaminationRow extends Component {
  constructor(props) {
    super(props);

    this.handleTallenna = this.handleTallenna.bind(this);
    this.handlePeruuta = this.handlePeruuta.bind(this);
    this.isValid = this.isValid.bind(this);

    this.state = {
      examinationId: 0,
      name: "",
      nameValid: null,
      doctorPrice: "",
      doctorPriceValid: null,
      invoicePrice: "",
      invoicePriceValid: null
    };
  }

  isValid() {
	  const nameValid = this.state.name.length > 0;
	  const doctorPriceValid =  this.state.doctorPrice.match(/^[0-9]+([,/.][0-9][0-9]?)?$/g);
	  const invoicePriceValid =  this.state.invoicePrice.match(/^[0-9]+([,/.][0-9][0-9]?)?$/g);
	  
	  this.setState({
		  nameValid: (nameValid ? "success" : "error"),
		  doctorPriceValid: (doctorPriceValid ? "success" : "error"),
		  invoicePriceValid: (invoicePriceValid ? "success" : "error"),
	  });
	  
	  return nameValid && doctorPriceValid && invoicePriceValid;
  }
  
  handleTallenna(e) {
	if(this.isValid()) {
		this.props.onTallenna(this.state);
	}
  }

  handlePeruuta(e) {
    this.props.onPeruuta(this.state);
  }

  render() {
    return (
      <tr key={0}>
        <td>
        <FormGroup validationState={this.state.nameValid}>
          <FormControl
            type="text"
            value={this.state.name}
            onChange={e => {
              this.setState({ name: e.target.value });
            }}
          />
          </FormGroup>
         </td>
          <td>
          <FormGroup validationState={this.state.doctorPriceValid}>
          <FormControl
            type="text"
            value={this.state.doctorPrice}
            onChange={e => {
              this.setState({ doctorPrice: e.target.value });
            }}
          />
          </FormGroup>
          </td>
          <td>
          <FormGroup validationState={this.state.invoicePriceValid}>
          <FormControl 
            type="text"
            value={this.state.invoicePrice}
            onChange={e => {
              this.setState({ invoicePrice: e.target.value });
            }}
          />
          </FormGroup>
        </td>
        <td>
          <Button id="myBtn" onClick={this.handleTallenna}>Tallenna</Button>
        </td>
        <td>
          <Button id="myBtn" onClick={this.handlePeruuta}>Peruuta</Button>
        </td>
      </tr>
    );
  }
}

class ExaminationRow extends Component {
  constructor(props) {
    super(props);

    this.handleMuokkaa = this.handleMuokkaa.bind(this);
    this.handleTallenna = this.handleTallenna.bind(this);
    this.handlePeruuta = this.handlePeruuta.bind(this);
    this.isValid = this.isValid.bind(this);

    this.state = {
      editing: false,
      examinationId: 0,
      version: 0,
      name: "",
      nameValid: null,
      doctorPrice: "",
      doctorPriceValid: null,
      invoicePrice: "",
      invoicePriceValid: null,
    };
  }

  handleMuokkaa(e) {
    /* console.log("PersonRow.handleMuokkaa");
    console.log(this.props); */
    this.props.onMuokkaa(this.props.user);
    this.setState({
      editing: true,
      examinationId: this.props.examination.examinationId,
      version: this.props.examination.version,
      name: this.props.examination.name,
      doctorPrice: this.props.examination.doctorPrice,
      invoicePrice: this.props.examination.invoicePrice,
    });
  }
  
  isValid() {
	  const nameValid = this.state.name.length > 0;
	  const doctorPriceValid =  this.state.doctorPrice.match(/^[0-9]+([,/.][0-9][0-9]?)?$/g);
	  const invoicePriceValid =  this.state.invoicePrice.match(/^[0-9]+([,/.][0-9][0-9]?)?$/g);
	  
	  this.setState({
		  nameValid: (nameValid ? "success" : "error"),
		  doctorPriceValid: (doctorPriceValid ? "success" : "error"),
		  invoicePriceValid: (invoicePriceValid ? "success" : "error"),
	  });
	  
	  return nameValid && doctorPriceValid && invoicePriceValid;
  }
  
    handleTallenna(e) {
	  if(this.isValid()) {
		  this.props.onTallenna(this.state);
		  this.setState({
			  editing: false
		  });
	  }
  }

  handlePeruuta(e) {
    /* console.log("PersonRow.handlePeruuta");
    console.log(this.props); */
    this.props.onPeruuta(this.state);
    this.setState({
      editing: false
    });
  }

  render() {
	 /* console.log(this.props.examination); */
    if (this.state.editing === true) {
      return (
        <tr key={this.props.examination.examinationId}>
          <td>
          <FormGroup validationState={this.state.nameValid}>
          <FormControl
            type="text"
            value={this.state.name}
            onChange={e => {
              this.setState({ name: e.target.value });
            }}
          />
          </FormGroup>
        </td>
          <td>
          <FormGroup validationState={this.state.doctorPriceValid}>
            <FormControl
              type="text"
              value={this.state.doctorPrice}
              onChange={e => {
                this.setState({ doctorPrice: e.target.value });
              }}
            />
            </FormGroup>
          </td>
            <td>
            <FormGroup validationState={this.state.invoicePriceValid}>
            <FormControl
              type="text"
              value={this.state.invoicePrice}
              onChange={e => {
                this.setState({ invoicePrice: e.target.value });
              }}
            />
          </FormGroup>
          </td>
          <td>
            <Button id="myBtn" onClick={this.handleTallenna}>Tallenna</Button>
          </td>
          <td>
            <Button id="myBtn" onClick={this.handlePeruuta}>Peruuta</Button>
          </td>
        </tr>
      );
    } else {
      return (
        <tr key={this.props.examination.examinationId}>
          <td>{this.props.examination.name}</td>
          <td style={{ textAlign: "right"  }}>{this.props.examination.doctorPrice}</td>
          <td style={{ textAlign: "right"  }}>{this.props.examination.invoicePrice}</td>
          <td />
          <td>
            {this.props.editing === false && (
              <Button id="myBtn" onClick={this.handleMuokkaa}>Muokkaa</Button>
            )}
          </td>
        </tr>
      );
    }
  }
}

class ExaminationTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editing: false,
      newRow: false
    };

    this.handleMuokkaa = this.handleMuokkaa.bind(this);
    this.handlePeruuta = this.handlePeruuta.bind(this);
    this.handleTallenna = this.handleTallenna.bind(this);
    this.handleMuokkaaUusi = this.handleMuokkaaUusi.bind(this);
  }

  handleMuokkaa(e) {
    this.setState({
      editing: true
    });
  }

  handleMuokkaaUusi(e) {
    this.setState({
      editing: true,
      newRow: true
  });
  }

  handlePeruuta(e) {
    this.setState({
      editing: false,
      newRow: false
    });
  }

  handleTallenna(e) {
    this.setState({
      editing: false,
      newRow: false
    });
    this.props.onTallenna(e);
  }

  /*
  handleTallennaUusi(e) {
    this.setState({
      editing: false
    });
    this.props.onTallenna(e);
  }
  */

  render() {
    return (
      <div>
        <Table striped condensed hover>
          <thead>
            <tr>
              <th>Tutkimuksen nimi</th>
              <th style={{ textAlign: "right"  }}>LÃ¤Ã¤kÃ¤rin osuus</th>
              <th style={{ textAlign: "right"  }}>Laskutushinta</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {this.props.examinations && this.props.examinations.map(exam => {
              return (
                <ExaminationRow
                  key={exam.examinationId}
                  examination={exam}
                  editing={this.state.editing}
                  onMuokkaa={this.handleMuokkaa}
                  onTallenna={this.handleTallenna}
                  onPeruuta={this.handlePeruuta}
                />
              );
            })}
            {this.state.newRow && (
              <NewExaminationRow
                key={0}
                onTallenna={this.handleTallenna}
                onPeruuta={this.handlePeruuta}
              />
            )}
          </tbody>
        </Table>
        {this.state.editing == false && (
          <Button bsStyle="primary" onClick={this.handleMuokkaaUusi}>
            Luo tutkimus
          </Button>
        )}
      </div>
    );
  }
}

export default ExaminationTable;
