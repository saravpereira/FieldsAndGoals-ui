import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import Routes from "./routers/Routes";
import store from "./redux/store";
import Parse from "parse";

Parse.initialize(REACT_APP_PARSE_APP_ID, REACT_APP_JAVASCRIPT_KEY);
Parse.serverURL = REACT_APP_SERVER_URL;

function App() {
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
}

export default App;
