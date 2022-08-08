import React from "react";
import Header from "../components/Header";
import _ from "lodash";
import { add } from "../utils/util";

export default function Articles() {
  const array = [1, 2, 3];
  _.fill(array, "a");
  console.log("add", add(2, 2), "Home Page");
  return (
    <div className="home">
      <Header>Articles</Header>
      <article>
        <h3>Article 1</h3>
        <p>Lorem ipsum</p>
      </article>
      <article>
        <h3>Article 2</h3>
        <p>Lorem ipsum</p>
      </article>
    </div>
  );
}
