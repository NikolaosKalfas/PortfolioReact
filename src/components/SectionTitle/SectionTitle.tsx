import React from "react";

type SectionTitleDataType = {
  title: string;
  secondary?: boolean;
};

const SectionTitle = ({ title, secondary }: SectionTitleDataType) => {
  return (
    <h2
      className={`md:text-center font-bold pb-10 ${
        secondary ? "text-text-color-secondary" : "text-text-color-primary"
      }`}
    >
      {title}
    </h2>
  );
};

export default SectionTitle;
