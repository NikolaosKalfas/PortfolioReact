import React from "react";
import { renderRichText } from "gatsby-source-contentful/rich-text";
import { GatsbyImage } from "gatsby-plugin-image";
import Icon from "../Icon/Icon";

type TextWithIconsDataType = {
  data: {
    title: string;
    text: any;
    icons: [];
  };
};

const TextWithIcons = ({ data }: TextWithIconsDataType) => {
  return (
    <section className="page-container">
      {data.title && <h2 className="text-center font-bold">{data.title}</h2>}
      {data.text && (
        <div className="my-5 text-xl">{renderRichText(data.text)}</div>
      )}
      {data.icons.length && (
        <div className="flex flex-col items-center md:flex-row gap-7 justify-around lg:pt-5">
          {data.icons.map((icon: any) => (
            <Icon icon={icon} key={icon.title} />
          ))}
        </div>
      )}
    </section>
  );
};

export default TextWithIcons;
