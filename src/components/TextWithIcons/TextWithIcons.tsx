import React from "react";
import { renderRichText } from "gatsby-source-contentful/rich-text";
import SectionTitle from "../SectionTitle/SectionTitle";

type TextWithIconsDataType = {
  data: {
    title: string;
    text: any;
  };
};

const TextWithIcons = ({ data }: TextWithIconsDataType) => {
  return (
    <>
      {data.title && (
        <section className="page-container hide-on-mobile">
          {data.title && <SectionTitle title={data.title} />}
          {data.text && (
            <div className="mb-5 text-xl lg:text-2xl text-text-color-primary">
              {renderRichText(data.text)}
            </div>
          )}
        </section>
      )}
    </>
  );
};

export default TextWithIcons;
