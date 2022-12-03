import React from "react";
import { renderRichText } from "gatsby-source-contentful/rich-text";
import { GatsbyImage } from "gatsby-plugin-image";
import Typed from "react-typed";
import { Link } from "gatsby";

type HomepageDataType = {
  data: {
    greeting: string;
    headerCopy: any;
    image: any;
    button: {
      buttonLabel: string;
      buttonLink: string;
      secondary: boolean;
    };
  };
};

const HomepageHeader = ({ data }: HomepageDataType) => {
  console.log(data);
  return (
    <div className="page-container bg-primary-color w-full flex flex-col md:flex-row md:items-center md:justify-between">
      <div>
        {data.greeting && (
          <p className="text-2xl md:text-4xl font-bold">
            <Typed strings={[data.greeting]} typeSpeed={150} />
          </p>
        )}
        {data.headerCopy && (
          <div className="header-copy">{renderRichText(data.headerCopy)}</div>
        )}
        {data.button && (
          <div className="btn-primary my-4">
            <Link to={data.button.buttonLink}>{data.button.buttonLabel}</Link>
          </div>
        )}
      </div>
      <div>
        {data.image && (
          <GatsbyImage
            image={data.image.gatsbyImageData}
            alt={data.image.title}
          />
        )}
      </div>
    </div>
  );
};

export default HomepageHeader;
