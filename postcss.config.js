// postcss.config.js
module.exports = {
  plugins: {
    "postcss-pxtorem": {
      rootValue({ file }) {
        console.log(file);
        return file.indexOf("vant") !== -1 ? 37.5 : 75;
      },
      propList: ["*"],
      exclude: "github-markdown",
    },
  },
};
