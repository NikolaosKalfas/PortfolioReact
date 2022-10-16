const path = require("path");

function makeSlug(slug) {
  if (slug === "/") {
    return "/";
  } else return slug;
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const masterTemplate = path.resolve("src/templates/masterTemplate.tsx");

  const result = await graphql(`
    {
      allContentfulPage {
        nodes {
          slug
          id
        }
      }
    }
  `);

  result.data.allContentfulPage.nodes.forEach((node) => {
    createPage({
      path: `${makeSlug(node.slug)}`,
      component: masterTemplate,
      context: {
        id: node.id,
      },
    });
  });
};
