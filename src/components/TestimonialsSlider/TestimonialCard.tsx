import React from "react";
import { renderRichText } from "gatsby-source-contentful/rich-text";

const TestimonialCard = (data: any) => {
  const card = data.data;
  console.log(card);
  return (
    <div className="text-center">
      {card.title && (
        <h3 className="font-bold text-xl mb-4 text-white">{card.title}</h3>
      )}
      {card.message && (
        <div className="testimonial-copy">{renderRichText(card.message)}</div>
      )}
      {card.name && <p className="text-white text-sm mb-2">{card.name},</p>}
      {card.business && <p className="text-white text-sm">{card.business}</p>}
    </div>
  );
};

export default TestimonialCard;
