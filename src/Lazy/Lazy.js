import loadable from "@loadable/component";

// code-splitting-routes
export default loadable(() =>
  import(/* webpackChunkName: "lazy" */ "./lazyComponent")
);
