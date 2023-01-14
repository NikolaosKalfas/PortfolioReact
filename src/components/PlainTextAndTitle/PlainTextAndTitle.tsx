import { renderRichText } from "gatsby-source-contentful/rich-text";
import React from "react";
import SectionTitle from "../SectionTitle/SectionTitle";

type PlainTextAndTitleDataType = {
  data: {
    title: string;
    content: any;
  };
};

const PlainTextAndTitle = (data: PlainTextAndTitleDataType) => {
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
