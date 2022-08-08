const buildValidations = require("./config/build-validations");
const commonConfig = require("./config/webpack.common");
const { merge } = require("webpack-merge");

const addons = (/* string | string[] */ addonsArg) => {
  let addons = [...[addonsArg]] // Normalize array of addons (flatten)
    .filter(Boolean); // If addons is undefined, filter it out

  return addons.map((addonName) => require(`./config/webpack.${addonName}.js`));
};

module.exports = () => {
  if (!process.env.NODE_ENV) {
    throw new Error(buildValidations.ERR_NO_ENV_FLAG);
  }

  const envConfig = require(`./config/webpack.${process.env.NODE_ENV}.js`);
  const mergedConfig = merge(
    commonConfig,
    envConfig,
    ...addons(process.env.NODE_ADDONS)
  );

  return mergedConfig;
};
