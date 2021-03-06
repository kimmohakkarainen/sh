export function validationState(value) {
  if (value == null) {
    return null;
  } else if (value) {
    return "success";
  } else {
    return "error";
  }
}

export function createResponse(state) {
  var rights = [];
  if (state.rightAdmin) {
    rights.push("ADMIN");
  }
  if (state.rightSecretary) {
    rights.push("SECRETARY");
  }
  if (state.rightDoctor) {
    rights.push("DOCTOR");
  }

  return {
    Person: {
      personId: state.personId,
      version: state.version,
      username: state.username,
      email: state.email,
      fullname: state.fullname,
      password: state.password,
      password2: state.password,
      rights: rights
    }
  };
}

export function initState(person) {
  const initial = {
    validation: false,
    username: "",
    usernameValid: false,
    email: "",
    emailValid: false,
    fullname: "",
    fullnameValid: false,
    rightAdmin: false,
    rightSecretary: false,
    rightDoctor: false,
    password: "",
    password2: "",
    password2Valid: true
  };

  if (person == null) {
    return initial;
  } else {
    const value = Object.assign({}, initial, person);
    value.usernameValid = isUsernameValid(value);
    value.emailValid = isFullnameValid(value);
    value.fullnameValid = isEmailValid(value);
    value.password2Valid = isPasswordValid(value);

    person.rights.forEach(element => {
      if (element === "ADMIN") {
        value.rightAdmin = true;
      } else if (element === "SECRETARY") {
        value.rightSecretary = true;
      } else if (element === "DOCTOR") {
        value.rightDoctor = true;
      }
    });
    return value;
  }
}

export function isUsernameValid(state) {
  return state.username.length > 3;
}

export function isFullnameValid(state) {
  return state.fullname.length > 3;
}

export function isEmailValid(state) {
  return /^[^@\s]+@[^@\s]+$/.test(state.email);
}

export function isPasswordValid(state) {
  return state.password === state.password2;
}
