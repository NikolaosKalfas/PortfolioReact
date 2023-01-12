import React, { useEffect, useState } from "react";
import { graphql } from "gatsby";
import { componentBuilder } from "../helpers/componentsHelper";
import { GatsbySeo } from "gatsby-plugin-next-seo";
import Footer from "../components/Footer/Footer";
import NavbarContainer from "../components/Navbar/NavbarContainer";

export default (data: any) => {
  const [url, setUrl] = useState("");
  const pageData = data.data.page;
  const componentsArr: any = [];

  useEffect(() => {
    if (window.location !== undefined) {
      setUrl(window.location.href);
    }
  }, []);

  function createComponentsArr() {
    componentsArr.push(pageData.header);
    componentsArr.push(pageData.secondaryHeader);
    componentsArr.push(pageData.titleAndText);
    componentsArr.push(pageData.projectsGrid);
    componentsArr.push(pageData.plainTextContainer);
    componentsArr.push(pageData.freeConsultancyForm);
    componentsArr.push(pageData.skills);
    componentsArr.push(pageData.productCardsSlider);
    componentsArr.push(pageData.testimonialsCarousel);
    componentsArr.push(pageData.iconsRow);
    componentsArr.push(pageData.contactForm);
  }

  createComponentsArr();
  const blocks = componentBuilder(componentsArr);

  console.log(componentsArr);
  console.log(blocks);
  console.log(pageData);

  return (
    <div>
      <GatsbySeo
        title={pageData.seo.title + " - Nikolaos Kalfas"}
        description={pageData.seo.description}
        canonical={url}
        openGraph={{
          url: url,
          title: pageData.seo.title,
          description: pageData.seo.description,
          images: [
            {
              url: pageData.seo.image.file.url,
              width: 420,
              height: 420,
              alt: pageData.seo.image.title,
            },
          ],
        }}
        twitter={{
          handle: "@handle",
          site: "@site",
          cardType: "summary_large_image",
        }}
        noindex={pageData.seo.noIndex}
        nofollow={pageData.seo.noFollow}
      />

      <NavbarContainer />
      {blocks?.map((block) => block)}
      <Footer />
    </div>
  );
};

export const pageQuery = graphql`
  query ($id: String!) {
    page: contentfulPage(id: { eq: $id }) {
      id
      title
      slug
      seo {
        title
        description
        image {
          title
          file {
            url
          }
        }
        noIndex
        noFollow
      }
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
        button {
          buttonLabel
          buttonLink
          secondary
        }
      }
      secondaryHeader {
        __typename
        id
        heading
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
          title
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
      contactForm {
        __typename
        id
        title
        name
        email
        phone
        message
      }
      productCardsSlider {
        __typename
        id
        title
        sliderProductCard {
          cardImage {
            gatsbyImageData
            title
          }
          mainButton {
            buttonLabel
            buttonLink
            secondary
          }
          secondaryButton {
            buttonLabel
            buttonLink
            secondary
          }
          title
          included {
            title
          }
        }
      }
      freeConsultancyForm {
        __typename
        id
        title
      }
      testimonialsCarousel {
        __typename
        id
        title
        testimonialCard {
          title
          message {
            raw
          }
          name
          business
        }
      }
      plainTextContainer {
        __typename
        title
        content {
          raw
        }
      }
    }
  }
`;
