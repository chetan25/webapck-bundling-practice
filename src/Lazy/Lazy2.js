import loadable from "@loadable/component";
import { useParams } from "react-router-dom";
import React from "react";

const AsyncComponent = loadable((props) =>
  import(/* webpackChunkName: "lazy2" */ `../lazyTest/${props.page}`)
);

// code-splitting-routes
export default function Lazy2() {
  let { token } = useParams();

  return <AsyncComponent page={token} />;
}
