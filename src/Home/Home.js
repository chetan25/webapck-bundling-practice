import React from "react";
// import _ from "lodash/array";
import "./Home.css";
import About from "../About/About";
import LazyComponent from "../Lazy/Lazy";
import LazyComponent2 from "../Lazy/Lazy2";
import Articles from "./Articles";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

export default function Home() {
  return (
    <BrowserRouter>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/lazy">Lazy</Link>
          </li>
          <li>
            <Link to="/dynamic/dummer">Lazy2</Link>
          </li>
        </ul>

        <hr />

        <Routes>
          <Route index element={<Articles />} />
          <Route path="/about" element={<About />} />
          <Route path="/lazy" element={<LazyComponent />} />
          <Route path="/dynamic/:token" element={<LazyComponent2 />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
