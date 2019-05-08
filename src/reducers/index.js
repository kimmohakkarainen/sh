import { uniqueId } from "../actions";

export default function poriState(
  state = {
    person: null,
    createTaskModal: false,
    modifyTaskModal: null,
    modifyInfoModal: null,
    modifyMessageModal: null,
    deleteTaskModal: null,
    modifyUserModal: null,
    changePasswordModal: null,
    errorModal: null,
    passwordStatus: null,
    newTasks: [],
    assignedTasks: [],
    processedTasks: [],
    examinationOptions: [],
    doctorOptions: [],
    examinations: [],
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
      createTaskModal: false,
      modifyTaskModal: null,
      modifyInfoModal: null,
      modifyMessageModal: null,
      deleteTaskModal: null,
      errorModal: null,
      newTasks: action.payload.newTasks,
      assignedTasks: action.payload.assignedTasks,
      processedTasks: action.payload.processedTasks,
      examinationOptions: action.payload.examinationOptions,
      examinations: state.examinations,
      doctorOptions: action.payload.doctorOptions,
      users: state.users,
      invoice: state.invoice
    };
  } else if (action.type === "OPEN_CREATE_TASK_MODAL") {
    const newstate = Object.assign({}, state, action.payload);
    return newstate;
  } else if (action.type === "OPEN_MODIFY_TASK_MODAL") {
    const newstate = Object.assign({}, state, action.payload);
    return newstate;
  } else if (action.type === "OPEN_MODIFY_INFO_MODAL") {
    const newstate = Object.assign({}, state, action.payload);
    return newstate;
  } else if (action.type === "OPEN_MODIFY_MESSAGE_MODAL") {
    const newstate = Object.assign({}, state, action.payload);
    return newstate;
  } else if (action.type === "OPEN_DELETE_TASK_MODAL") {
    const newstate = Object.assign({}, state, action.payload);
    return newstate;
  } else if (action.type === "OPEN_ERROR_MODAL") {
    const newstate = Object.assign({}, state, action.payload);
    return newstate;
  } else if (action.type === "FETCH_USERS_SUCCEEDED") {
    const newstate = Object.assign({}, state, action.payload, {
      modifyUserModal: null,
      changePasswordModal: null
    });
    return newstate;
  } else if (action.type === "FETCH_EXAMINATIONS_SUCCEEDED") {
    const newstate = Object.assign({}, state, action.payload);
    return newstate;
  } else if (action.type === "FETCH_PREVIEW_SUCCEEDED") {
    const newstate = Object.assign({}, state, { invoice: action.payload });
    return newstate;
  } else if (action.type === "POST_PASSWORD_RESPONSE") {
    const newstate = Object.assign({}, state, action.payload);
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
    };
  } else {
    const newstate = Object.assign({}, state, action.payload);
    return newstate;
  }
  return state;
}
