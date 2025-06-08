import React, { useEffect, useState } from "react";
import { graphql, Link } from "gatsby";
import { componentBuilder } from "../helpers/componentsHelper";
import { GatsbySeo } from "gatsby-plugin-next-seo";
import Footer from "../components/Footer/Footer";
import NavbarContainer from "../components/Navbar/NavbarContainer";
import CookieConsent from "react-cookie-consent";
import { Helmet } from "react-helmet";
import { injectSpeedInsights } from '@vercel/speed-insights'
// @ts-ignore
import favicon from '/src/images/favicon.ico'
// @ts-ignore
import androidChrome192 from '/src/images/android-chrome-192x192.png'
// @ts-ignore
import androidChrome512 from '/src/images/android-chrome-512x512.png'
// @ts-ignore
import favicon32 from '/src/images/favicon-32x32.png'
// @ts-ignore
import favicon16 from '/src/images/favicon-16x16.png'
// @ts-ignore
import appleTouch from '/src/images/apple-touch-icon.png'

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
    componentsArr.push(pageData.faQs)
    componentsArr.push(pageData.iconsRow);
    componentsArr.push(pageData.contactForm);
  }

  createComponentsArr();
  const blocks = componentBuilder(componentsArr);

  // Vercel Tracking
  injectSpeedInsights();

  return (
    <div>
      <Helmet>
        <link rel="icon" type="image/x-icon" href={favicon} />
        <link rel="icon" type="image/png" sizes={'192'} href={androidChrome192} />
        <link rel="icon" type="image/png" sizes={'512'} href={androidChrome512} />
        <link rel="icon" type="image/png" sizes={'32'} href={favicon32} />
        <link rel="icon" type="image/png" sizes={'16'} href={favicon16} />
        <link rel="icon" type="image/png" href={appleTouch} />
        {/* Google tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-E6Y4EMVPRH"></script>
        <script>
          {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments)}
              gtag('js', new Date());

              gtag('config', 'G-E6Y4EMVPRH');
            `}
        </script>
      </Helmet>
      <GatsbySeo
        title={pageData.seo.title + " - Nikolaos Kalfas"}
        description={pageData.seo.description}
        language="en"
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
      <CookieConsent
        location="bottom"
        buttonText="Accept"
        declineButtonText="Decline"
        enableDeclineButton={true}
        cookieName="gatsby-gdpr-google-analytics"
        contentStyle={{ color: "#eee", margin: "15px 0" }}
        buttonStyle={{
          color: "#383838",
          background: "#eee",
          borderRadius: "3px",
        }}
        declineButtonStyle={{
          color: "#383838",
          background: "#eee",
          borderRadius: "3px",
        }}
        containerClasses="consent-container"
        onAccept={() => window.location.reload()}
      >
        This site uses cookies.Read more about my{" "}
        <Link to="/privacy-policy" className="underline">
          Privacy Policy
        </Link>
        .
      </CookieConsent>
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
        note {
          note
        }
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
      faQs {
        __typename
        id
        title
        faqSingleItem {
          question
          answer {
            answer
          }
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
