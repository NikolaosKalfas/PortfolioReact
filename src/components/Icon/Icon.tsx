import { GatsbyImage } from "gatsby-plugin-image";
import React from "react";

type IconType = {
  icon: {
    title: string;
    icon: any;
  };
};

const Icon = ({ icon }: IconType) => {
  return (
    <div className="">
      <GatsbyImage image={icon.icon.gatsbyImageData} alt={icon.icon.title} />
    </div>
  );
};

export default Icon;
