import { GatsbyImage } from "gatsby-plugin-image";
import React from "react";
import Button from "../Button/Button";

const ProductCard = (data: any) => {
  const card = data.data;

  return (
    <div className="border-2 border-secondary-color p-10 rounded-lg bg-primary-color h-full flex flex-col justify-between cursor-grab lg:cursor-auto">
      <div>
        {card.title && (
          <h3 className="text-center font-bold text-xl mb-4">{card.title}</h3>
        )}
        {card.cardImage && (
          <div className="text-center">
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
                <p className="text-lg">
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
