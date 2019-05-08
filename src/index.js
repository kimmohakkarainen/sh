import React from "react";
import ReactDOM from "react-dom";
import App from "./app.js";

import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import poriState from "./reducers";

import Promise from "core-js/fn/promise";
import Object from "core-js/fn/object";

import "../public/css/bootstrap.min.css";
import "../public/css/bootstrap-theme.min.css";
import "../public/css/daypicker-style.css";
import "../public/css/font-awesome.min.css";
// import "../public/css/styles.css";

const store = createStore(
  poriState,
  composeWithDevTools(applyMiddleware(thunk))
);

const rootElement = document.getElementById("root");
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
);
