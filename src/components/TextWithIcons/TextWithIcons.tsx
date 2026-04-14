import React from "react";
import { renderRichText } from "gatsby-source-contentful/rich-text";
import SectionTitle from "../SectionTitle/SectionTitle";
import CardItem, { CardItemDataType } from "../CardItem/CardItem";

type TextWithIconsDataType = {
  data: {
    title: string;
    text: any;
    cardItems: CardItemDataType[]
  };
};

const TextWithIcons = ({ data }: TextWithIconsDataType) => {
  return (
    <>
      {data.title && (
        <section className="page-container">
          {data.title && <SectionTitle title={data.title} />}
          {data.text && (
            <div className="mb-5 text-xl lg:text-2xl text-text-color-primary">
              {renderRichText(data.text)}
            </div>
          )}
          {data.cardItems?.length > 0 && (
            <div className="pt-5 lg:pt-16 flex flex-col lg:flex-row w-full justify-between text-text-color-primary gap-7 lg:gap-10">
                {data.cardItems
                  ?.filter(cardItem => cardItem.title || cardItem.description)
                  .map((cardItem) => (
                    <CardItem key={cardItem.title} {...cardItem} />
                  ))
                }
            </div>
          )}
        </section>
      )}
    </>
  );
};

export default TextWithIcons;
