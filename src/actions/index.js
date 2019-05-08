export {
  postLogin,
  postLogout,
  fetchState,
  fetchStateSucceeded,
  postCreate,
  postDelete,
  postAssign,
  postUnassign,
  postFinish,
  postPassword
} from "./server";

export {
  getUsers,
  modifyUser,
  getExaminations,
  modifyExamination
} from "./admincalls";

export { getPreview, getExcel, fetchPreviewSucceeded } from "./invoice";

export function openCreateTaskModal() {
  return {
    type: "OPEN_CREATE_TASK_MODAL",
    payload: {
      createTaskModal: true
    }
  };
}

export function openModifyTaskModal(task) {
  return {
    type: "OPEN_MODIFY_TASK_MODAL",
    payload: {
      modifyTaskModal: task
    }
  };
}

export function openModifyInfoModal(task) {
  return {
    type: "OPEN_MODIFY_INFO_MODAL",
    payload: {
      modifyInfoModal: task
    }
  };
}

export function openModifyMessageModal(task) {
  return {
    type: "OPEN_MODIFY_MESSAGE_MODAL",
    payload: {
      modifyMessageModal: task
    }
  };
}

export function openDeleteTaskModal(task) {
  return {
    type: "OPEN_DELETE_TASK_MODAL",
    payload: {
      deleteTaskModal: task
    }
  };
}

export function openModifyUserModal(user) {
  return {
    type: "OPEN_MODIFY_USER_MODAL",
    payload: {
      modifyUserModal: user
    }
  };
}

export function openChangePasswordModal(user) {
  return {
    type: "OPEN_CHANGE_PASSWORD_MODAL",
    payload: {
      changePasswordModal: user
    }
  };
}
