import React from "react";

type SecondaryHeaderDataType = {
  data: {
    heading: string;
  };
};

const SecondaryHeader = ({ data }: SecondaryHeaderDataType) => {
  return (
    <div className="page-container bg-primary-color w-full">
      <div>
        {/* TODO
      CREATE BREADCRUMBS */}
      </div>
      <h1>{data.heading}</h1>
    </div>
  );
};

export default SecondaryHeader;
