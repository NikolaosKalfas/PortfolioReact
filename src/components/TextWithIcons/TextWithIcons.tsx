import React from "react";
import { renderRichText } from "gatsby-source-contentful/rich-text";
import Icon from "../Icon/Icon";
import { IconType } from "../IconsRow/IconsRow";
import SectionTitle from "../SectionTitle/SectionTitle";

type TextWithIconsDataType = {
  data: {
    title: string;
    text: any;
    icons: IconType[];
  };
};

const TextWithIcons = ({ data }: TextWithIconsDataType) => {
  return (
    <>
      {data.title && (
        <section className="page-container">
          {data.title && <SectionTitle title={data.title} />}
          {data.text && (
            <div className="mb-5 text-xl lg:text-2xl">
              {renderRichText(data.text)}
            </div>
          )}
          {data.icons.length && (
            <div className="flex flex-col items-center md:flex-row gap-7 justify-around lg:pt-5">
              {data.icons.map((icon) => (
                <div key={icon.title}>
                  <div className="max-w-60 m-auto">
                    <Icon icon={icon} key={icon.title} />
                  </div>
                  {icon.title && (
                    <p className="text-xl font-bold text-center">
                      {icon.title}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>
      )}
    </>
  );
};

export default TextWithIcons;
