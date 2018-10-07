import * as api from "../api";

export function getPreview({ Person, Filter }) {
  return dispatch => {
    api.getPreview(Person, Filter).then(resp => {
      dispatch(fetchPreviewSucceeded(resp.data));
    });
  };
}

export function fetchPreviewSucceeded(data) {
  return {
    type: "FETCH_PREVIEW_SUCCEEDED",
    payload: {
      users: data
    }
  };
}
