import { uniqueId } from "../actions";

const person = {
  personId: 1,
  email: "admin",
  role: "ADMIN"
};

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
    lisatiedot: "",
    laakari: null
  },
  {
    taskId: uniqueId(),
    sotu: "345678-9012",
    sukunimi: "Soini",
    tutkimus: "Kolmastyyppi",
    tutkimusPaiva: "26.9.2018",
    vastaanottoPaiva: "5.10.2018",
    lisatiedot: "",
    laakari: null
  },
  {
    taskId: uniqueId(),
    sotu: "456789-012T",
    sukunimi: "Sipilä",
    tutkimus: "neljäs tyypi",
    tutkimusPaiva: "27.9.2018",
    vastaanottoPaiva: null,
    lisatiedot: "",
    laakari: null
  }
];

export default function poriState(
  state = {
    person: person,
    newTasks: newTasks,
    assignedTasks: [],
    processedTasks: []
  },
  action
) {
  console.log(state);
  console.log(action);

  if (action.type === "CREATE_TASK") {
    return { newTasks: state.newTasks.concat(action.payload) };
  }

  return state;
}
