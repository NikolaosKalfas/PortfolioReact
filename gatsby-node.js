const path = require("path");

function makeSlug(slug) {
  if (slug === "/") {
    return "/";
  } else return slug;
}

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;

  const typeDefs = [
    `
    type ContentfulPage implements Node {
      secondaryHeader: ContentfulSecondaryHeader @link(by: "id", from: "secondaryHeader___NODE")
      projectsGrid: ContentfulProjects @link(by: "id", from: "projectsGrid___NODE")
      iconsRow: ContentfulIconsRow @link(by: "id", from: "iconsRow___NODE")
    }
    type ContentfulSecondaryHeader implements Node {
      heading: String
    }

    type ContentfulProjects implements Node {
      title: String
    }
    type ContentfulIconsRow implements Node {
      title: String
    }


    `,
  ];

  createTypes(typeDefs);
};

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
      internal: {
        type: "page",
      },
    });
  });
};
