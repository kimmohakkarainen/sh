import { uniqueId } from "../actions";

export default function poriState(
  state = {
    person: null,
    newTasks: [],
    assignedTasks: [],
    processedTasks: [],
    users: []
  },
  action
) {
  console.log(action.type);
  console.log(state);
  console.log(action.payload);

  if (action.type === "FETCH_STATE_SUCCEEDED") {
    return {
      person: action.payload.person,
      newTasks: action.payload.newTasks,
      assignedTasks: action.payload.assignedTasks,
      processedTasks: action.payload.processedTasks,
      users: state.users
    };
  } else if (action.type === "FETCH_USERS_SUCCEEDED") {
    const newstate = Object.assign({}, state, action.payload);
    console.log(newstate);
    return newstate;
  }

  return state;
}
