import * as api from "../api";

export function fetchState() {
  return dispatch => {
    api.fetchState().then(resp => {
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
