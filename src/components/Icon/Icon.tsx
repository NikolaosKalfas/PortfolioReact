import { GatsbyImage } from "gatsby-plugin-image";
import React from "react";

type IconType = {
  icon: {
    title: string;
    icon: IconImageType;
  };
};

type IconImageType = {
  icon: {
    title: string;
    icon: any;
  };
};

const Icon = ({ icon }: any) => {
  return (
    <div className="">
      <div className="max-w-60 m-auto">
        <GatsbyImage image={icon.icon.gatsbyImageData} alt={icon.icon.title} />
      </div>
      {icon.title && (
        <p className="text-xl font-bold text-center">{icon.title}</p>
      )}
    </div>
  );
};

export default Icon;
