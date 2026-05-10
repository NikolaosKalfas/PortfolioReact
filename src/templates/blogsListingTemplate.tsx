import React, { useState, useEffect } from "react";
import { graphql, Link } from "gatsby";
import { Helmet } from "react-helmet";
import { GatsbySeo } from "gatsby-plugin-next-seo";
import NavbarContainer from "../components/Navbar/NavbarContainer";
import Footer from "../components/Footer/Footer";
import SecondaryHeader from "../components/SecondaryHeader/SecondaryHeader";
import { injectSpeedInsights } from '@vercel/speed-insights'
import { inject } from '@vercel/analytics';
import { generatePageSchemas } from "../helpers/tools";
import HeroArticle from "../components/ContentListing/HeroArticle";
import ArticleCard from "../components/ContentListing/ArticleCard";


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


export default ({ data, pageContext }: any) => {
  const { currentPage, pageCount, type } = pageContext;
  const articles = data?.allContentfulArticle.nodes;
  const basePath = type === "blogs" ? "/blogs" : "/case-studies";
  const title = type === "blogs" ? "Blog" : "Case Studies";
  const heroArticle = data?.heroArticle

const [url, setUrl] = useState("");

  useEffect(() => {
    if (globalThis.location !== undefined) {
      setUrl(globalThis.location.href);
    }

    // Vercel Tracking
    injectSpeedInsights();
    inject()
  }, []);

  const getTagsArray = (tagString: string) => 
    tagString ? tagString.split(',').map(t => t.trim()) : [];

  const allArticles = [
    ...(heroArticle ? [heroArticle] : []),
    ...articles,
  ];
  const allTags = [
    ...new Set(allArticles.flatMap((a: any) => getTagsArray(a.tags)))
  ];
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const tagFiltered = activeTag
  ? allArticles.filter((a: any) => getTagsArray(a.tags).includes(activeTag))
  : allArticles;
  const sortedFiltered = [...tagFiltered].sort(
    (a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime()
  );

  const derivedHero = sortedFiltered[0] ?? null;
  const filteredGrid = sortedFiltered.slice(1);

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
            title={title + " - Nikolaos Kalfas"}
            description={`${title} landing page.`}
            language="en"
            canonical={url}
            openGraph={{
                url: url,
                title: title,
                description: `${title} landing page.`,
            }}
            twitter={{
            handle: "@handle",
            site: "@site",
            cardType: "summary_large_image",
            }}
        />
      <NavbarContainer />
      <main id="main-content">
        <SecondaryHeader data={{heading: title}}/>

        {/* Tag filters */}
        <section className="page-container flex gap-4">
          <button
            onClick={() => setActiveTag(null)}
            className={`uppercase p-1 pl-2 pr-2 rounded border-2 border-primary-color text-text-color-primary transition-colors hover:bg-primary-color/85 hover:text-text-color-secondary focus:bg-primary-color/85 focus:text-text-color-secondary focus:outline-none ${activeTag ? "" : "active text-text-color-secondary bg-primary-color"}`}
          >
            All
          </button>
          {allTags.map((tag: any) => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              className={`uppercase p-1 px-2 rounded border-2 border-primary-color text-text-color-primary transition-colors hover:bg-primary-color/85 hover:text-text-color-secondary focus:bg-primary-color/85 focus:text-text-color-secondary focus:outline-none ${activeTag === tag ? "active text-text-color-secondary bg-primary-color" : ""}`}
            >
              {tag}
            </button>
          ))}
        </section>
        
        {derivedHero && (
          <HeroArticle data={derivedHero} />
        )}

        {/* Article grid */}
        <div className="page-container grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {filteredGrid.map((article: any) => {
                return (
                    <ArticleCard key={article.id} data={article}/>
                );
            })}
        </div>

        {/* Pagination */}
        {pageCount > 1 && (
          <nav>
            {Array.from({ length: pageCount }).map((_, i) => {
              const pageNum = i + 1;
              const pagePath = pageNum === 1 ? basePath : `${basePath}/${pageNum}`;
              return (
                <Link
                  key={pageNum}
                  to={pagePath}
                  className={`uppercase p-1 px-2 rounded border-2 border-primary-color text-text-color-primary transition-colors hover:bg-primary-color/85 hover:text-text-color-secondary focus:bg-primary-color/85 focus:text-text-color-secondary focus:outline-none ${currentPage === pageNum ? "active text-text-color-secondary bg-primary-color" : ""}`}
                >
                  {pageNum}
                </Link>
              );
            })}
          </nav>
        )}
      </main>
      <Footer />
    </div>
  );
};

export const Head = ({ data, pageContext }: any) => {
  const articles = data?.allContentfulArticle.nodes;
  const { type } = pageContext;
  const title = type === "blogs" ? "Blogs" : "Case Studies";
  const basePath = type === "blogs" ? "/blogs" : "/case-studies";
  const url = `https://nikoswebvision.com${basePath}`;

  const schemaData = {
    title: title,
    description: `${title} landing page.`,
    isListingPage: true,
    articles: articles,
    type: type
  };
  
  const pageSchemas = generatePageSchemas(schemaData, url);

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

export const query = graphql`
  query ($limit: Int!, $skip: Int!, $type: String!, $heroId: String!) {
    heroArticle: contentfulArticle(id: { eq: $heroId }) {
      id
      title
      slug
      type
      summary
      publishedDate
      readingTime
      tags
      image {
        gatsbyImageData(width: 900, placeholder: BLURRED)
        title
      }
    }
    allContentfulArticle(
      filter: { type: { eq: $type } }
      sort: { fields: [publishedDate], order: DESC }
      limit: $limit
      skip: $skip
    ) {
      nodes {
        id
        title
        slug
        type
        summary
        publishedDate
        readingTime
        tags
        image {
          gatsbyImageData(width: 600, placeholder: BLURRED)
          title
        }
      }
    }
  }
`;