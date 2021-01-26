export const data = {
  name: "react-treebeard",
  avatar: "../../../assets/img/portrait/small/avatar-s-12.jpg",
  id: 1,
  toggled: true,
  children: [
    {
      name: "example",
      children: [
        { name: "app.js" },
        { name: "data.js" },
        { name: "index.html" },
        { name: "styles.js" },
        { name: "webpack.config.js" }
      ]
    },
    {
      name: "node_modules",
      loading: true,
      children: []
    },
    {
      name: "src",
      children: [
        {
          name: "components",
          children: [{ name: "decorators.js" }, { name: "treebeard.js" }]
        },
        { name: "index.js" }
      ]
    },
    {
      name: "themes",
      children: [{ name: "animations.js" }, { name: "default.js" }]
    },
    { name: "gulpfile.js" },
    { name: "index.js" },
    { name: "package.json" }
  ]
}
