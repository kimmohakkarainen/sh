export {
  fetchState,
  fetchStateSucceeded,
  postCreate,
  postAssign,
  postUnassign,
  postFinish
} from "./server";

let _id = 1;
export function uniqueId() {
  return _id++;
}

export function createTask({ Person, Task }) {
  return {
    type: "CREATE_TASK",
    payload: {
      Person,
      Task
    }
  };
}

export function assignTask({ Person, Task }) {
  return {
    type: "ASSIGN_TASK",
    payload: {
      Person,
      Task
    }
  };
}

export function unassignTask({ Person, Task }) {
  return {
    type: "UNASSIGN_TASK",
    payload: {
      Person,
      Task
    }
  };
}

export function finishTask({ Person, Task }) {
  return {
    type: "FINISH_TASK",
    payload: {
      Person,
      Task
    }
  };
}
