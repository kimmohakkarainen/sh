import * as api from "../api";

export function fetchState() {
  return dispatch => {
    api.fetchState().then(resp => {
      dispatch(fetchStateSucceeded(resp.data));
    });
  };
}

export function postLogin(params) {
  return dispatch => {
    api.postLogin(params).then(resp => {
      dispatch(fetchStateSucceeded(resp.data));
    });
  };
}

export function postCreate({ Person, Task }) {
  const params = Object.assign({}, Task, { personId: Person.personId });
  return dispatch => {
    api.postCreateTask(params).then(resp => {
      dispatch(fetchStateSucceeded(resp.data));
    });
  };
}

export function postAssign({ Person, Task }) {
  const params = Object.assign({}, Task, { personId: Person.personId });
  return dispatch => {
    api.postAssignTask(params).then(resp => {
      dispatch(fetchStateSucceeded(resp.data));
    });
  };
}

export function postUnassign({ Person, Task }) {
  const params = Object.assign({}, Task, { personId: Person.personId });
  return dispatch => {
    api.postUnassignTask(params).then(resp => {
      dispatch(fetchStateSucceeded(resp.data));
    });
  };
}

export function postFinish({ Person, Task }) {
  const params = Object.assign({}, Task, { personId: Person.personId });
  return dispatch => {
    api.postFinishTask(params).then(resp => {
      dispatch(fetchStateSucceeded(resp.data));
    });
  };
}

export function fetchStateSucceeded(data) {
  return {
    type: "FETCH_STATE_SUCCEEDED",
    payload: {
      person: data.person,
      newTasks: data.newTasks,
      assignedTasks: data.assignedTasks,
      processedTasks: data.processedTasks
    }
  };
}
