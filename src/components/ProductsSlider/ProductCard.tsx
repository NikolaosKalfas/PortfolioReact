import { GatsbyImage } from "gatsby-plugin-image";
import React from "react";
import Button from "../Button/Button";

export type ProductCardDataType = {
  data: {
    title: string;
    cardImage: any;
    included: any;
    mainButton: CardButtonDataType;
    secondaryButton: CardButtonDataType;
  };
};

type CardButtonDataType = {
  buttonLabel: string;
  buttonLink: string;
  secondary: boolean;
};

const ProductCard = (data: ProductCardDataType) => {
  const card = data.data;

  return (
    <div className="border-2 border-secondary-color p-10 rounded-lg bg-tertiary-color h-full flex flex-col justify-between cursor-grab lg:cursor-auto">
      <div>
        {card.title && (
          <h3 className="text-center font-bold text-xl mb-4 text-primary-color">
            {card.title}
          </h3>
        )}
        {card.cardImage && (
          <div className="text-center max-w-200 m-auto">
            <GatsbyImage
              image={card.cardImage.gatsbyImageData}
              alt={card.title}
            />
          </div>
        )}
        {card.included && (
          <div className="my-4 flex justify-center">
            <div>
              {card.included.map((service: any) => (
                <p className="text-lg text-primary-color" key={service.title}>
                  <span className="text-green-500 text-sm">&#10003;</span>{" "}
                  {service.title}
                </p>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="self-end w-full">
        {card.mainButton && (
          <div className="mb-2 flex justify-center">
            <Button
              label={card.mainButton.buttonLabel}
              url={card.mainButton.buttonLink}
              secondary={card.mainButton.secondary}
            />
          </div>
        )}
        {card.secondaryButton && (
          <div className="flex justify-center">
            <Button
              label={card.secondaryButton.buttonLabel}
              url={card.secondaryButton.buttonLink}
              secondary={card.secondaryButton.secondary}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
