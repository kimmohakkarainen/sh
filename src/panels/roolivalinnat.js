import React from "react";
import { FormControl } from "react-bootstrap";

const RooliValinnat = props => {
  return (
    <FormControl
      componentClass="select"
      value={props.value}
      onChange={props.onChange}
    >
      <option>ADMIN</option>
      <option>SECRETARY</option>
      <option>DOCTOR</option>
      <option>DISABLED</option>
    </FormControl>
  );
};

export default RooliValinnat;
