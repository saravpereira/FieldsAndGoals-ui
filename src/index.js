import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from 'react-redux';
import store from './redux/store';
import App from "./App";
import "./App.scss";

const el = document.getElementById("app");

const root = ReactDOM.createRoot(el);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
