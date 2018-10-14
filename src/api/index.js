import axios from "axios";

const API_BASE_URL = "";

const client = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json"
  }
});

export function postLogin(params) {
  let prms = new URLSearchParams();
  prms.append("username", params.username);
  prms.append("password", params.password);

  return client.post("/login", prms);
}

/* deprecated version
export function fetchState() {
  return client.get("/rest/state/1");
}
*/

export function fetchState() {
	  return client.get("/rest/state");
	}


export function postCreateTask(params) {
  return client.post("/rest/create/" + params.personId, params);
}

export function postAssignTask(params) {
  return client.post("/rest/assign", params);
}

export function postUnassignTask(params) {
  return client.post("/rest/unassign", params);
}

export function postFinishTask(params) {
  return client.post("/rest/finish", params);
}

export function getUsers() {
  return client.get("/rest/users");
}

export function postUser(params) {
  return client.post("/rest/user", params);
}

export function getPreview({
  beginDate,
  endDate,
  doctorFilter,
  examinationFilter
}) {
  return client.post("/rest/invoice", {
    beginDate,
    endDate,
    doctorFilter,
    examinationFilter
  });
}

export function postLogout() {
	return client.post("/logout");
}


