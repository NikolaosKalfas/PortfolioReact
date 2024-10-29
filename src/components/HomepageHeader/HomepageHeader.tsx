import React from "react";
import { renderRichText } from "gatsby-source-contentful/rich-text";
import { GatsbyImage } from "gatsby-plugin-image";
import Typed from "react-typed";
import Button from "../Button/Button";

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
  return (
    <>
      {data.greeting && (
        <header className="page-container bg-primary-color w-full flex flex-col md:flex-row md:items-center md:justify-between pt-80 text-text-color-secondary">
          <div className="md:w-1/2">
            {data.greeting && (
              <p className="text-2xl md:text-4xl font-bold text-text-color-secondary">
                <Typed strings={[data.greeting]} typeSpeed={150} />
              </p>
            )}
            {data.headerCopy && (
              <div className="header-copy">
                {renderRichText(data.headerCopy)}
              </div>
            )}
            {data.button && (
              <div className="my-4">
                <Button
                  label={data.button.buttonLabel}
                  url={data.button.buttonLink}
                />
              </div>
            )}
          </div>
          <div className="md:w-1/2">
            {data.image && (
              <GatsbyImage
                image={data.image.gatsbyImageData}
                alt={data.image.title}
              />
            )}
          </div>
        </header>
      )}
    </>
  );
};

export default HomepageHeader;
