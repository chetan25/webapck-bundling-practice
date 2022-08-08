import React, { useState } from "react";
import "./About.css";
import Header from "../components/Header";
import _ from "lodash";
import { add } from "../utils/util";

import LazyHeader from "../Lazy/LazyHeader";

const About = () => {
  const [showOnDemand, setShowOnDemand] = useState(false);
  const array = [1, 2, 3];
  _.fill(array, "a");
  console.log(array);
  console.log("add", add(2, 2), "About Page");
  return (
    <div className="about">
      <Header>About</Header>
      <p>World Page</p>
      <button onClick={() => setShowOnDemand(true)}>Load Lazy Header</button>
      {/*splitting-component-level */}
      {showOnDemand && <LazyHeader>I am Lazy Header</LazyHeader>}
    </div>
  );
};

export default About;
