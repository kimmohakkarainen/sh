import { uniqueId } from "../actions";

export default function poriState(
  state = {
    person: null,
    newTasks: [],
    assignedTasks: [],
    processedTasks: []
  },
  action
) {
  if (action.type === "CREATE_TASK") {
    console.log("reducers CREATE_TASK");
    console.log(state);
    console.log(action.payload);
    let task = Object.assign({}, action.payload.Task, { taskId: uniqueId() });
    let nt = Object.assign([], state.newTasks);
    nt.push(task);
    return {
      assignedTasks: state.assignedTasks,
      newTasks: nt,
      person: state.person
    };
  } else if (action.type === "ASSIGN_TASK") {
    console.log("reducers ASSIGN_TASK");
    console.log(state);
    console.log(action.payload);
    let nt = [];
    for (const entry of state.newTasks.values()) {
      if (entry.taskId != action.payload.Task.taskId) {
        nt.push(entry);
      }
    }
    let t = Object.assign({}, action.payload.Task, { laakari: state.person });
    let assigned = Object.assign([], state.assignedTasks);
    assigned.push(t);
    console.log(nt);
    return { newTasks: nt, assignedTasks: assigned, person: state.person };
  } else if (action.type === "UNASSIGN_TASK") {
    console.log("reducers UNASSIGN_TASK");
    console.log(state);
    console.log(action.payload);
    let nt = Object.assign([], state.newTasks);
    let task = Object.assign({}, action.payload.Task, { laakari: null });
    nt.push(task);
    let at = [];
    for (const entry of state.assignedTasks.values()) {
      if (entry.taskId != action.payload.Task.taskId) {
        at.push(entry);
      }
    }
    return {
      newTasks: nt,
      assignedTasks: at,
      person: state.person
    };
  } else if (action.type === "FINISH_TASK") {
    console.log("reducers FINISH_TASK");
    console.log(state);
    console.log(action.payload);
    let at = [];
    for (const entry of state.assignedTasks.values()) {
      if (entry.taskId != action.payload.Task.taskId) {
        at.push(entry);
      }
    }
    return {
      newTasks: state.newTasks,
      assignedTasks: at,
      person: state.person
    };
  } else if (action.type === "FETCH_STATE_SUCCEEDED") {
    console.log("reducers FETCH_STATE_SUCCEEDED");
    console.log(state);
    console.log(action.payload);
    return {
      person: action.payload.person,
      newTasks: action.payload.newTasks,
      assignedTasks: action.payload.assignedTasks,
      processedTasks: action.payload.processedTasks
    };
  }

  return state;
}
