import { GatsbyImage } from "gatsby-plugin-image";
import { renderRichText } from "gatsby-source-contentful/rich-text";
import React from "react";
import SectionTitle from "../SectionTitle/SectionTitle";

type ImageLeftWithTextDataType = {
  data: {
    title: string;
    text: any;
    image: {
      gatsbyImageData: any;
      title: string;
    };
  };
};

const ImageLeftWithText = ({ data }: ImageLeftWithTextDataType) => {
  return (
    <div className="page-container bg-primary-color">
      {data.title && <SectionTitle title={data.title} />}
      <div className="md:flex md:gap-5">
        <div className="md:w-1/2">
          <GatsbyImage
            image={data.image.gatsbyImageData}
            alt={data.image.title}
          />
        </div>
        <div className="md:w-1/2 lg:1/3">
          {data.text && (
            <div className="my-5 text-xl">{renderRichText(data.text)}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageLeftWithText;
