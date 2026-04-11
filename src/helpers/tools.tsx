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
  const isHome = pageData.slug === "home" || pageData.slug === "/";
  
  if (isHome) {
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
