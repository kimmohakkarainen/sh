import React from "react";
import { FormControl } from "react-bootstrap";

const TutkimusValinnat = props => {
  return (
    <FormControl
      componentClass="select"
      value={props.value}
      onChange={props.onChange}
    >
      <option>Datscan</option>
      <option>Luuston gammakuvaus</option>
      <option>Munuaisfunktion gammakuvaus</option>
      <option>pH 24 h</option>
      <option>Bp 24 h</option>
      <option>Keuhkoventilaatio / perfuusio</option>
      <option>
        Kilpirauhassyövän metastaasien gammakuvaus(koko keho ja SPECT / CT)
      </option>
      <option>Lisäkilpirauhasen SPECT / CT</option>
      <option>EKG 24 h</option>
      <option>Luuston gammakuvaus(SPECT / CT)</option>
      <option>Muut isotooppitutkimukset</option>
      <option>Muu tutkimus</option>
      <option>EKG 48 h</option>
    </FormControl>
  );
};

export default TutkimusValinnat;
