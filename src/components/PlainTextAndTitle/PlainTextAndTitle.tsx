import { renderRichText } from "gatsby-source-contentful/rich-text";
import React from "react";
import SectionTitle from "../SectionTitle/SectionTitle";

const PlainTextAndTitle = (data: any) => {
  console.log(data);
  return (
    <section className="page-container">
      {data.data.title && <SectionTitle title={data.data.title} />}
      {data.data.content && (
        <div className="">{renderRichText(data.data.content)}</div>
      )}
    </section>
  );
};

export default PlainTextAndTitle;
