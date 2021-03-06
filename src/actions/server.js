import * as api from "../api";

export function fetchState() {
  return dispatch => {
    api.fetchState().then(resp => {
      dispatch(fetchStateSucceeded(resp.data));
    });
  };
}

export function postLogout() {
	return dispatch => {
		api.postLogout().then(resp => {
			console.log('logout successfull');
			window.location.href='/logout';
		})
		.catch(error => {
			console.log('logout error');
			window.location.href='/logout';
		});
	};
}

export function postCreate({ Person, Task }) {
  const params = Object.assign({}, Task, { personId: Person.personId });
  return dispatch => {
    api.postCreateTask(params).then(resp => {
      dispatch(fetchStateSucceeded(resp.data));
    }).catch(error => {
    	dispatch(openErrorModal('Lausuttavan kirjaaminen kantaan ei onnistunut!'));
    });
  };
}

export function postDelete({ Person, Task }) {
  const params = Object.assign({}, Task, { personId: Person.personId });
  return dispatch => {
    api.postDeleteTask(params).then(resp => {
      dispatch(fetchStateSucceeded(resp.data));
   }).catch(error => {
    	dispatch(openErrorModal('Lausuttavan poistaminen ei onnistunut!'));
   });
  };
}

export function postModify({ Person, Task }) {
	  const params = Object.assign({}, Task, { personId: Person.personId });
	  return dispatch => {
	    api.postUpdateTask(params).then(resp => {
	      dispatch(fetchStateSucceeded(resp.data));
	    }).catch(error => {
	    	dispatch(openErrorModal('Muokkaus ei onnistunut!'));
	    });
	  };
	}

export function postAssign({ Person, Task }) {
  const params = Object.assign({}, Task, { personId: Person.personId });
  return dispatch => {
    api.postAssignTask(params).then(resp => {
      dispatch(fetchStateSucceeded(resp.data));
    }).catch(error => {
    	dispatch(openErrorModal('Lausuttava on jo varattu!'));
    });
  };
}

export function postUnassign({ Person, Task }) {
  const params = Object.assign({}, Task, { personId: Person.personId });
  return dispatch => {
    api.postUnassignTask(params).then(resp => {
      dispatch(fetchStateSucceeded(resp.data));
    }).catch(error => {
    	dispatch(openErrorModal('Lausuttavaa ei voinut enÃ¤Ã¤ vapauttaa'));
    });
  };
}

export function postFinish({ Person, Task }) {
  console.log(Person);
  console.log(Task);
  const params = Object.assign({}, Task, { personId: Person.personId });
  return dispatch => {
    api.postFinishTask(params).then(resp => {
      dispatch(fetchStateSucceeded(resp.data));
    }).catch(error => {
    	dispatch(openErrorModal('Lausuttavaa ei voinut enÃ¤Ã¤ merkitÃ¤ valmistuneeksi'));
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
      processedTasks: data.processedTasks,
      examinationOptions: data.examinationOptions,
      doctorOptions: data.doctorOptions,
    }
  };
}

export function openErrorModal(error) {
	return {
	    type: "OPEN_ERROR_MODAL",
	    payload: {
	      errorModal: error,
	      createTaskModal: false,
	      modifyTaskModal: null,
	      deleteTaskModal: null
	    }
	};
}



export function logoutSucceeded(data) {
	  return {
	    type: "LOGOUT_SUCCEEDED",
	    payload: {
	    }
	  };
	}

export function postPassword(params) {
  return dispatch => {
	    api.postPassword(params).then(resp => {
	      dispatch(postPasswordStatus(resp.status));
	      setTimeout(() => {
	    	  dispatch(postPasswordStatus(null));
	      }, 5000);
    }).catch(error => {
	      dispatch(postPasswordStatus(error.response.status));
	      setTimeout(() => {
	    	  dispatch(postPasswordStatus(null));
	      }, 5000);
    });
  };
}

export function postPasswordStatus(data) {
  return {
    type: "POST_PASSWORD_RESPONSE",
    payload: {
    	passwordStatus: data
    }
  };
}

