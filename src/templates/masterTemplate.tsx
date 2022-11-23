import React from "react";
import { graphql } from "gatsby";
import { componentBuilder } from "../helpers/componentsHelper";

export default (data: any) => {
  const pageData = data.data.page;
  const componentsArr: any = [];

  // TODO: push if key is not id || slug || title
  // so that reordering from CMS works
  function createComponentsArr() {
    componentsArr.push(pageData.header);
    componentsArr.push(pageData.titleAndText);
    componentsArr.push(pageData.projectsGrid);
    componentsArr.push(pageData.skills);
    componentsArr.push(pageData.iconsRow);
  }

  createComponentsArr();
  const blocks = componentBuilder(componentsArr);

  console.log(componentsArr);
  console.log(blocks);
  console.log(pageData);
  return (
    <div>
      {blocks?.map((block, id) => (
        <div key={id}>{block}</div>
      ))}
    </div>
  );
};

export const pageQuery = graphql`
  query ($id: String!) {
    page: contentfulPage(id: { eq: $id }) {
      id
      title
      slug
      header {
        __typename
        id
        greeting
        headerCopy {
          raw
        }
        image {
          title
          gatsbyImageData
        }
      }
      titleAndText {
        __typename
        id
        title
        text {
          raw
        }
        icons {
          title
          icon {
            title
            gatsbyImageData
          }
        }
      }
      projectsGrid {
        __typename
        id
        title
        projects {
          title
          link
          image {
            gatsbyImageData
          }
        }
      }
      skills {
        __typename
        id
        title
        text {
          raw
        }
        image {
          gatsbyImageData
        }
      }
      iconsRow {
        __typename
        id
        title
        icons {
          title
          icon {
            gatsbyImageData
            title
          }
        }
      }
    }
  }
`;
