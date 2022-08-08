// import { hot } from "react-hot-loader/root";
import React from "react";
import ReactDOM from "react-dom/client";

import Home from "./Home/Home";

import "./index.css";

const container = document.getElementById("root");

// Create a root.
const root = ReactDOM.createRoot(container);

// Initial render
root.render(<Home />);
