import { graphql, Link, useStaticQuery } from "gatsby";
import React from "react";
import SecondaryHeader from "../components/SecondaryHeader/SecondaryHeader";

const Sitemap = () => {
  const query = useStaticQuery(result);
  const links = query.allContentfulPage.nodes;
  console.log(links);

  return (
    <div>
      <SecondaryHeader data={{ heading: "Sitemap" }} />
      <div className="page-container">
        {links.map((page: any) => (
          <Link
            className="block underline text-xl lg:text-2xl mb-5 hover:duration-300 hover:text-link-primary"
            to={page.title === "Home Page" ? page.slug : `/${page.slug}`}
          >
            {page.title}
          </Link>
        ))}
      </div>
    </div>
  );
};

const result = graphql`
  query {
    allContentfulPage {
      nodes {
        title
        slug
      }
    }
  }
`;

export default Sitemap;
