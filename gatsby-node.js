const path = require("path");
const ARTICLES_PER_PAGE = 10;

function makeSlug(slug) {
  if (slug === "/") {
    return "/";
  } else return slug;
}

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;

  const typeDefs = [
    `
    union ContentfulArticleBodyBlocks = ContentfulSecondaryHeader | ContentfulTitleAndText | ContentfulImageLeftWithText

    type ContentfulArticle implements Node {
      title: String
      slug: String
      type: String
      summary: String
      tags: String
      publishedDate: Date @dateformat
      readingTime: String
      author: String
      secondaryHeader: ContentfulSecondaryHeader @link(by: "id", from: "secondaryHeader___NODE")
      image: ContentfulAsset @link(by: "id", from: "image___NODE")
      seo: ContentfulSeoComponent @link(by: "id", from: "seo___NODE")
      bodyBlocks: [ContentfulArticleBodyBlocks] @link(by: "id", from: "bodyBlocks___NODE")
    }

    type ContentfulPage implements Node {
      secondaryHeader: ContentfulSecondaryHeader @link(by: "id", from: "secondaryHeader___NODE")
      projectsGrid: ContentfulProjects @link(by: "id", from: "projectsGrid___NODE")
    }

    type ContentfulSecondaryHeader implements Node {
      heading: String
      image: ContentfulAsset @link(by: "id", from: "image___NODE")
    }

    type ContentfulProjects implements Node {
      title: String
    }
    `,
  ];

  createTypes(typeDefs);
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const masterTemplate = path.resolve("src/templates/masterTemplate.tsx");
  const articleTemplate = path.resolve("src/templates/articleTemplate.tsx");
  const blogsListingTemplate = path.resolve(
    "./src/templates/blogsListingTemplate.tsx",
  );

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

  const articlesResult = await graphql(`
    query {
      allContentfulArticle {
        nodes {
          id
          slug
          type
        }
      }
      blogArticles: allContentfulArticle(
        filter: { type: { eq: "blogs" } }
        sort: { fields: [publishedDate], order: DESC }
      ) {
        nodes {
          id
        }
      }
      caseStudyArticles: allContentfulArticle(
        filter: { type: { eq: "case-studies" } }
        sort: { fields: [publishedDate], order: DESC }
      ) {
        nodes {
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

  articlesResult.data.allContentfulArticle.nodes.forEach((article) => {
    createPage({
      path: `/${article.type}/${article.slug}`,
      component: articleTemplate,
      context: {
        id: article.id,
      },
    });
  });

  const blogArticles = articlesResult.data.blogArticles.nodes;
  const blogsHeroId = blogArticles[0]?.id;
  const blogPageCount = Math.max(
    1,
    Math.ceil((blogArticles.length - 1) / ARTICLES_PER_PAGE),
  );

  Array.from({ length: blogPageCount }).forEach((_, i) => {
    createPage({
      path: i === 0 ? "/blogs" : `/blogs/${i + 1}`,
      component: blogsListingTemplate,
      context: {
        limit: ARTICLES_PER_PAGE,
        skip: i * ARTICLES_PER_PAGE + 1,
        pageCount: blogPageCount,
        currentPage: i + 1,
        type: "blogs",
        heroId: blogsHeroId ?? "",
      },
    });
  });

  const caseStudyArticles = articlesResult.data.caseStudyArticles.nodes;
  const csHeroId = caseStudyArticles[0]?.id;
  const caseStudyPageCount = Math.max(
    1,
    Math.ceil((caseStudyArticles.length - 1) / ARTICLES_PER_PAGE),
  );

  Array.from({ length: caseStudyPageCount }).forEach((_, i) => {
    createPage({
      path: i === 0 ? "/case-studies" : `/case-studies/${i + 1}`,
      component: blogsListingTemplate,
      context: {
        limit: ARTICLES_PER_PAGE,
        skip: i * ARTICLES_PER_PAGE + 1,
        pageCount: caseStudyPageCount,
        currentPage: i + 1,
        type: "case-studies",
        heroId: csHeroId ?? "",
      },
    });
  });
};
