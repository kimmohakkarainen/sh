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
  console.log(action.type);
  console.log(state);
  console.log(action.payload);

  if (action.type === "CREATE_TASK") {
    let task = Object.assign({}, action.payload.Task, { taskId: uniqueId() });
    let nt = Object.assign([], state.newTasks);
    nt.push(task);
    return {
      assignedTasks: state.assignedTasks,
      newTasks: nt,
      person: state.person
    };
  } else if (action.type === "ASSIGN_TASK") {
    let nt = [];
    for (const entry of state.newTasks.values()) {
      if (entry.taskId != action.payload.Task.taskId) {
        nt.push(entry);
      }
    }
    let t = Object.assign({}, action.payload.Task, { laakari: state.person });
    let assigned = Object.assign([], state.assignedTasks);
    assigned.push(t);
    return { newTasks: nt, assignedTasks: assigned, person: state.person };
  } else if (action.type === "UNASSIGN_TASK") {
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
    return {
      person: action.payload.person,
      newTasks: action.payload.newTasks,
      assignedTasks: action.payload.assignedTasks,
      processedTasks: action.payload.processedTasks
    };
  }

  return state;
}
