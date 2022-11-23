import React from "react";
import { renderRichText } from "gatsby-source-contentful/rich-text";
import { GatsbyImage } from "gatsby-plugin-image";
import { options } from "../../helpers/tools";
import Typed from "react-typed";

const HomepageHeader = ({ data }: any) => {
  return (
    <div className="page-container bg-primary-color w-full md:flex md:items-center md:justify-between">
      <div>
        {data.greeting && (
          <p className="text-2xl md:text-4xl font-bold">
            <Typed strings={[data.greeting]} typeSpeed={150} />
          </p>
        )}
        {data.headerCopy.raw && (
          <div className="header-copy">
            {renderRichText(data.headerCopy, options)}
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
