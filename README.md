# Webpack Bundling

- Webpack is a bundler for bundling modern day applications. - It can be configured to bundle the whole app into a single bundle, with one entry or can be use to do code splitting with multiple entry points.
- Another way it can be configured is to do dynamic bundling for code lazy loaded.

## Bundling Process

- Webpack uses the entry point defined in the config to traverse the code tree and bundle things as it see the imports.
- For example is the entry point is app.js, and the the app.js code looks like

```js
import React from "react";
import Header from "../components/Header";

const LazyComponent = () => {
  return (
    <div>
      <Header>LazyComponent</Header>
      <p>LazyComponent Page</p>
    </div>
  );
};

export default LazyComponent;
```

- When webpack starts to parse this file, it will traverse it line by line.
- As soon as it encounters an `import` statement it will go ahead an traverse that file and include it in the bundle.
- It will go recursively and traverse all those new import files it finds.
- So basically in the above code it will first include React and then the Header component, recursively going inside the all the imports of the Header components.
- This is all done at build time, which is a static analysis process.
- Webpack uses a simple algo to traverse and include files in the final bundle, and its all done on static code analysis which means it cannot predict what will happen when the code executes.
- And majority of the code or imports we have are static like in the above example.
- But with the new dynamic import there is something interesting that happens.
- First let see what is a dynamic import.

```js
// dynamic import
import loadable from "@loadable/component";

// here we are using import as a function to dynamically import Header.
export default loadable(() =>
  import(/* webpackChunkName: "LazyHeader" */ "./Header")
);
```

- When webpack see this kind of import it knows that the author wants to bundle the `./Header` import as a separate bundle, different from the main bundle.
- In the above dynamic import we have specified a relative path to the file we want to extract out, so webpack does not need to guess. It will only traverse and bundle that file in that path.
- Webpack can't predict what will happen when the code executes so it pre-packs everything it sees within the import() call.
- What if we want to do dynamic import using a variable instead of a fixed path.

```js
export default loadable(() => {
  return import(
    /* webpackChunkName: "LazyHeader" */ `../lazyTest/${props.page}`
  );
});
```

- When webpack see the above import, it cannot guess what the value of `componentPath` be at runtime, even though it is specified as "Header" at compile time, so webpack goes ahead and tries to bundle everything in the folder path `../lazyTest`.
- We can see this by running `npm run build` with the two scenarios:
  - First with current setup, where we have dynamic import with variable `import(/* webpackChunkName: "lazy2" */`../lazyTest/${props.page}`)`
  - Next change the variable to a hard coded string ` import(/* webpackChunkName: "lazy2" */ '../lazyTest/dummy')`
- Notice that in the first scenario, the `dist` folder has all files bundles from `lazyTest` folder, while in second it only has the `dummy.js` file.
