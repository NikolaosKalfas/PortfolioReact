import React from "react";
import { urlifyToKebabCase } from "../../helpers/tools";

type SectionTitleDataType = {
  title: string;
  secondary?: boolean;
};

const SectionTitle = ({ title, secondary }: SectionTitleDataType) => {
  return (
    <h2
      className={`md:text-center font-bold pb-10 ${
        secondary ? "text-text-color-secondary" : "text-text-color-primary"
      }`} id={urlifyToKebabCase(title)}
    >
      {title}
    </h2>
  );
};

export default SectionTitle;
