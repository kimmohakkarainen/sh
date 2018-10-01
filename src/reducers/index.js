import { uniqueId } from "../actions";

const person = {
  personId: 1,
  email: "Ylläpitäjä",
  role: "ADMIN"
};

const assignedTasks = [
  {
    taskId: uniqueId(),
    sotu: "123456-7890",
    sukunimi: "Stubb",
    tutkimus: "Tutkimustyyppi",
    tutkimusPaiva: "18.9.2018",
    vastaanottoPaiva: null,
    lisatiedot: "",
    laakari: null
  },
  {
    taskId: uniqueId(),
    sotu: "234567-890A",
    sukunimi: "Selin",
    tutkimus: "ToinenTyyppi",
    tutkimusPaiva: "22.9.2018",
    vastaanottoPaiva: null,
    lisatiedot: "Jalka poikki. Liikkui vaikeasti ja tarvitsi tukea.",
    laakari: null
  },
  {
    taskId: uniqueId(),
    sotu: "345678-9012",
    sukunimi: "Andersson",
    tutkimus: "Kolmastyyppi",
    tutkimusPaiva: "26.9.2018",
    vastaanottoPaiva: "5.10.2018",
    lisatiedot: "",
    laakari: null
  },
  {
    taskId: uniqueId(),
    sotu: "456789-012T",
    sukunimi: "Lepomäki",
    tutkimus: "neljäs tyypi",
    tutkimusPaiva: "27.9.2018",
    vastaanottoPaiva: null,
    lisatiedot: "Karkasi kesken tutkimuksen tupakalle.",
    laakari: null
  }
];

const newTasks = [
  {
    taskId: uniqueId(),
    sotu: "123456-7890",
    sukunimi: "Vanhanen",
    tutkimus: "Tutkimustyyppi",
    tutkimusPaiva: "18.9.2018",
    vastaanottoPaiva: null,
    lisatiedot: "",
    laakari: null
  },
  {
    taskId: uniqueId(),
    sotu: "234567-890A",
    sukunimi: "Niinistö",
    tutkimus: "ToinenTyyppi",
    tutkimusPaiva: "22.9.2018",
    vastaanottoPaiva: null,
    lisatiedot: "Jalka poikki. Liikkui vaikeasti ja tarvitsi tukea.",
    laakari: null
  },
  {
    taskId: uniqueId(),
    sotu: "345678-9012",
    sukunimi: "Soini",
    tutkimus: "Kolmastyyppi",
    tutkimusPaiva: "26.9.2018",
    vastaanottoPaiva: "5.10.2018",
    lisatiedot: "pituus 162cm, paino 82kg",
    laakari: null
  },
  {
    taskId: uniqueId(),
    sotu: "456789-012T",
    sukunimi: "Sipilä",
    tutkimus: "neljäs tyypi",
    tutkimusPaiva: "27.9.2018",
    vastaanottoPaiva: null,
    lisatiedot: "keskeytetty 9min aikaisemmin",
    laakari: null
  }
];

export default function poriState(
  state = {
    person: person,
    newTasks: newTasks,
    assignedTasks: assignedTasks,
    processedTasks: []
  },
  action
) {
  console.log(state);
  console.log(action);

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
  }

  return state;
}
