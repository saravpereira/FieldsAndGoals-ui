import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./App.scss";

const el = document.getElementById("app");

const root = ReactDOM.createRoot(el);

root.render(<App />);
