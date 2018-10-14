import { uniqueId } from "../actions";

export default function poriState(
  state = {
    person: null,
    newTasks: [],
    assignedTasks: [],
    processedTasks: [],
    examinationOptions: [],
    users: [],
    invoice: {
      beginDate: null,
      endDate: null,
      doctorOptions: [],
      doctorFilter: [],
      examinationOptions: [],
      examinationFilter: []
    }
  },
  action
) {
  console.log(action);
  if (action.type === "FETCH_STATE_SUCCEEDED") {
    return {
      person: action.payload.person,
      newTasks: action.payload.newTasks,
      assignedTasks: action.payload.assignedTasks,
      processedTasks: action.payload.processedTasks,
      examinationOptions: action.payload.examinationOptions,
      users: state.users,
      invoice: state.invoice
    };
  } else if (action.type === "FETCH_USERS_SUCCEEDED") {
    const newstate = Object.assign({}, state, action.payload);
    return newstate;
  } else if (action.type === "FETCH_PREVIEW_SUCCEEDED") {
    const newstate = Object.assign({}, state, { invoice: action.payload });
    return newstate;
  } else if (action.type === "LOGOUT_SUCCEEDED") {
	  return {
		  person: null,
		  newTasks: [],
		  assignedTasks: [],
		  processedTasks: [],
		  examinationOptions: [],
		  users: [],
		  invoice: {}
	  }
  }
  return state;
}
