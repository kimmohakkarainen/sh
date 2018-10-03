import axios from "axios";

const API_BASE_URL = "http://localhost:8080";

const client = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json"
  }
});

export function fetchState() {
  return client.get("/rest/state/1");
}

export function postCreateTask(params) {
  return client.post("/rest/create/1", params);
}

export function postAssignTask(params) {
  return clieant.post("/rest/assign/1", params);
}

export function postUnassignTask(params) {
  return client.post("/rest/unassign/1", params);
}