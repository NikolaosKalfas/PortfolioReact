import React from "react";
import Icon from "../Icon/Icon";
import SectionTitle from "../SectionTitle/SectionTitle";

type IconsRowDataType = {
  data: {
    title: string;
    icons: IconType[];
  };
};

export type IconType = {
  title: string;
  icon: any;
};

const IconsRow = ({ data }: IconsRowDataType) => {
  return (
    <div className="page-container">
      {data.title && <SectionTitle title={data.title} />}
      {data.icons && (
        <div className="flex flex-wrap justify-between gap-10">
          {data.icons.map((icon) => (
            <div className="max-w-200 m-auto" key={icon.title}>
              <Icon icon={icon} key={icon.title} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default IconsRow;
