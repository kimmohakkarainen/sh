import React from "react";
import ReactDOM from "react-dom";
import App from "./app.js";

import { createStore } from "redux";
import { Provider } from "react-redux";
import poriState from "./reducers";

const store = createStore(poriState);

const rootElement = document.getElementById("root");
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
);
