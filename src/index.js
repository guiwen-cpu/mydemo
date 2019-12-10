import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import store from "./redux/store";
import "./index.css"
import AppAll from  "./containers/AppAll"

ReactDOM.render(
  <Provider store={store}>
    <AppAll />
  </Provider>,
  document.getElementById("root")
);
