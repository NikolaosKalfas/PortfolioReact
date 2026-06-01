import React, {useEffect, useState} from "react";
import { graphql } from "gatsby";
import { GatsbySeo } from "gatsby-plugin-next-seo";
import NavbarContainer from "../components/Navbar/NavbarContainer";
import Footer from "../components/Footer/Footer";
import ImageLeftWithText from "../components/ImageLeftWithText/ImageLeftWithText";
import { Helmet } from "react-helmet";
import { injectSpeedInsights } from '@vercel/speed-insights'
import { inject } from '@vercel/analytics';
import { generatePageSchemas, formatDate, tagColor } from "../helpers/tools";
import TextWithIcons from "../components/TextWithIcons/TextWithIcons";
import SecondaryHeader from "../components/SecondaryHeader/SecondaryHeader";


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
import AuthorCard from "../components/AuthorCard/AuthorCard";


export default ({ data }: any) => {
  const article = data.article;
  const hero = article.bodyBlocks.find((block: any) => block.__typename === "ContentfulSecondaryHeader")

  const [url, setUrl] = useState("");

  useEffect(() => {
    if (window.location !== undefined) {
      setUrl(window.location.href);
    }

    // Vercel Tracking
    injectSpeedInsights();
    inject()
  }, []);

  console.log(article)

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
        title={article.seo?.title + " - Nikolaos Kalfas"}
        description={article.seo?.description}
        language="en"
        canonical={url}
        openGraph={{
          url: url,
          title: article.seo.title,
          description: article.seo.description,
          images: [
            {
              url: article.seo.image.file.url,
              width: 420,
              height: 420,
              alt: article.seo.image.title,
            },
          ],
        }}
        twitter={{
          handle: "@handle",
          site: "@site",
          cardType: "summary_large_image",
        }}
        noindex={article.seo.noIndex}
        nofollow={article.seo.noFollow}
    />
      <NavbarContainer />
      <main id="main-content ">
        <SecondaryHeader data={hero}/>
        <section className="page-container">
          <div className="flex flex-row gap-2 md:gap-4 items-center">
              {article?.tags && ( 
                <span className={`uppercase text-xs md:text-base block text-white rounded py-1 px-2  md:px-4`}
                style={{
                  backgroundColor: tagColor(article.tags).bg,
                }}>
                    {article.tags}
                  </span>
              )}
              {article?.publishedDate && (
                <>
                  <div className='h-1 w-1 rounded bg-primary-color opacity-90'></div>
                  <span className="text-xs md:text-base text-text-color-primary">{formatDate(article?.publishedDate)}</span>
                </>
              )}
              {article?.readingTime && (
                <>
                  <div className='h-1 w-1 rounded bg-primary-color opacity-90'></div>
                  <span className="text-xs md:text-base text-text-color-primary">{article?.readingTime}</span>
                </>
              )}
            </div>
            <div className="border-b-2 h-1 w-full mt-3 md:mt-6 lg:mt-8"></div>
        </section>
        
        <section className="article-body-wrapper">
          {article.bodyBlocks?.map((block: any) => {
            if (block.__typename === "ContentfulTitleAndText") {
              return <TextWithIcons key={block.id} data={block}/>;
            }
            if (block.__typename === "ContentfulImageLeftWithText") {
              return <ImageLeftWithText key={block.id} data={block} />;
            }
            return null;
          })}
        </section>

        <section className="page-container pt-0">
          <div className="border-b-2 h-1 w-full my-6 lg:my-8"></div>
            <AuthorCard data={article.author}/>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export const Head = ({ data }: any) => {
  const article = data.article;
  const url = `https://nikoswebvision.com/${article.type}/${article.slug}`;
  
  const pageSchemas = generatePageSchemas(article, url);

  return (
    <>
      {pageSchemas.map((schema) => (
        <script
          key={`${schema.name}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
};

export const articleQuery = graphql`
  query ($id: String!) {
    article: contentfulArticle(id: { eq: $id }) {
      id
      title
      slug
      type
      tags
      publishedDate
      readingTime
      summary
      author
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
      image {
        gatsbyImageData
        title
      }
      bodyBlocks {
        __typename
        ... on ContentfulSecondaryHeader {
          heading
          image {
            title
            gatsbyImageData
          }
        }
        ... on ContentfulTitleAndText {
          id
          title
          text {
            raw
          }
          cardItems {
            title
            description {
              description
            }
          }
        }
        ... on ContentfulImageLeftWithText {
          id
          title
          text {
            raw
          }
          image {
            title
            gatsbyImageData
          }
          imageRight
        }
      }
    }
  }
`;