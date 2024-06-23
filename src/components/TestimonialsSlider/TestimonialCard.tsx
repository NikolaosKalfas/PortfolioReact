import React from "react";
import { renderRichText } from "gatsby-source-contentful/rich-text";

export type TestimonialCardDataType = {
  data: { title: string; message: any; name: string; business: string };
};

const TestimonialCard = (data: TestimonialCardDataType) => {
  const card = data.data;
  return (
    <div className="text-center">
      {card.title && (
        <h3 className="font-bold text-xl mb-4 text-off-white">{card.title}</h3>
      )}
      {card.message && (
        <div className="testimonial-copy">{renderRichText(card.message)}</div>
      )}
      {card.name && <p className="text-off-white text-sm mb-2">{card.name},</p>}
      {card.business && <p className="text-off-white text-sm">{card.business}</p>}
    </div>
  );
};

export default TestimonialCard;
