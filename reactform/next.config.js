require("dotenv").config;

module.exports = {
  reactStrictMode: true,

  env: {
    MAPBOX_ACCESS_TOKEN: process.env.MAPBOX_ACCESS_TOKEN,
  },
};
