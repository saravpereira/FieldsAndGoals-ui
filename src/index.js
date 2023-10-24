import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from 'react-redux'; // 1. Import the Provider
import { store } from './redux/store';  // Assuming you have set up your store here
import App from "./App";
import "./App.scss";

const el = document.getElementById("app");

const root = ReactDOM.createRoot(el);

// 2. Wrap your App component with the Provider component
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
