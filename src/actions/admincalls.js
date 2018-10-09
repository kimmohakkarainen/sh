import * as api from "../api";

export function getUsers({ Person }) {
  return dispatch => {
    api.getUsers().then(resp => {
      dispatch(fetchUsersSucceeded(resp.data));
    });
  };
}

export function modifyUser({ Person }) {
  console.log(Person);
  return dispatch => {
    api.postUser(Person).then(resp => {
      dispatch(fetchUsersSucceeded(resp.data));
    });
  };
}

export function fetchUsersSucceeded(data) {
  return {
    type: "FETCH_USERS_SUCCEEDED",
    payload: {
      users: data
    }
  };
}
