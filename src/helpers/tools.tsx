type handleInputChangeType = (
  e: any,
  setValue: (arg: string) => void,
  setInputValue: (arg: string) => void
) => void;

export const handleInputChange: handleInputChangeType = (
  e,
  setValue,
  setInputValue
) => {
  setValue(e.target.value);
  setInputValue(e.target.value);
};

/**
 * Generates an array of JSON-LD schemas based on page data.
 */
export const generatePageSchemas = (pageData: any, url: string) => {
  const schemas: any[] = [];

  if (!pageData) return schemas;

  // 1. Determine Core Identity: Organization vs Service
  const isArticle = pageData.__typename === "ContentfulArticle" || !!pageData.publishedDate;
  const isListing = pageData.isListingPage; // We will pass this flag manually
  const isHome = pageData.slug === "home" || pageData.slug === "/";

  if (isArticle) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": pageData.title,
      "image": pageData.image?.gatsbyImageData?.images?.fallback?.src || pageData.seo?.image?.file?.url,
      "author": {
        "@type": "Person",
        "name": pageData.author || "Nikolaos Kalfas"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Nikos Web Vision",
      },
      "inLanguage": "en-GB",
      "datePublished": pageData.publishedDate,
      "description": pageData.summary || pageData.seo?.description,
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": url
      }
    });
  } else if (isListing) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": pageData.title,
      "url": url,
      "description": pageData.description,
      "mainEntity": {
        "@type": "ItemList",
        "numberOfItems": pageData.articles?.length || 0,
        "itemListElement": pageData.articles?.map((art: any, index: number) => ({
          "@type": "ListItem",
          "position": index + 1,
          "url": `https://nikoswebvision.com/${art.type}/${art.slug}`
        }))
      }
    });
  } else if (isHome) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      "name": "Nikos Web Vision",
      "url": url,
      "logo": pageData.seo?.image.file.url,
      "image": pageData.seo?.image?.file?.url,
      "description": pageData.seo?.description,
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "GB", 
        "addressLocality": "London"
      },
      "priceRange": "£900+" 
    });
  } else {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "Service",
      "name": pageData.title,
      "provider": {
        "@type": "LocalBusiness",
        "name": "Nikos Web Vision"
      },
      "description": pageData.seo?.description
    });
  }

  // 2. Automated FAQ Detection
  if (pageData.faQs?.faqSingleItem?.length > 0) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": pageData.faQs.faqSingleItem.map((item: any) => ({
        "@type": "Question",
        "name": item.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": item.answer.answer
        }
      }))
    });
  }

  return schemas;
};

export const formatDate = (raw: string) => {
  return new Intl.DateTimeFormat("en-GB", { dateStyle: "long" }).format(
    new Date(raw)
  );
}

const TAG_COLORS: Record<string, { bg: string; color: string }> = {
  seo:          { bg: "#dc582a", color: "#fff" },
  performance:  { bg: "#1b365d", color: "#fff" },
  hosting:      { bg: "#2d6a4f", color: "#fff" },
  wordpress:    { bg: "#3a5fa0", color: "#fff" },
  squarespace:  { bg: "#7b4fa0", color: "#fff" },
};

export function tagColor(tag: string) {
  return TAG_COLORS[tag.toLowerCase()] ?? { bg: "#1b365d", color: "#fff" };
}
