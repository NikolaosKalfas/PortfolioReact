import { Link } from "gatsby";
import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image";
import React, { useEffect, useState } from "react";

type SecondaryHeaderDataType = {
  data: {
    heading: string;
    image?: {
      title: string;
      gatsbyImageData: IGatsbyImageData;
    };
  };
};

type BreadcrumbType = {
  name: string;
  link: string;
};

const SecondaryHeader = ({ data }: SecondaryHeaderDataType) => {
  const [breadcrumbs, setBreadcrumbs] = useState<Array<BreadcrumbType>>([]);

  useEffect(() => {
    const url: string =
      typeof window !== "undefined" ? window.location.pathname : "";
    const newBreadCrumbs: Array<BreadcrumbType> = [{ name: "Home", link: "/" }];

    const parts = url.split("/");
    let cumulativeLink = "/";
    for (let i = 0; i < parts.length; i++) {
      let element = parts[i];
      if (element === "") {
        continue;
      } else {
        const noDash = element.replaceAll("-", " ").replaceAll("_", " ");
        let label = noDash[0].toUpperCase() + noDash.substring(1);

        if (label.toLowerCase() === "case-studies") {
          label = "Case studies";
          element = "case-studies";
        }
        cumulativeLink = cumulativeLink + element + "/";
        newBreadCrumbs.push({
          name: label,
          link: cumulativeLink,
        });
      }
    }

    setBreadcrumbs(newBreadCrumbs);
  }, []);

  const showImage = Boolean(data.image?.gatsbyImageData);

  return (
    <>
      {data.heading && (
        <div
          className={
            showImage
              ? "secondary-header page-container relative w-full flex flex-col justify-end min-h-[420px] md:min-h-[600px] lg:min-h-[720px] pt-10 md:pt-16"
              : "secondary-header page-container bg-primary-color w-full md:pt-80 pt-10"
          }
        >
          {showImage && (
            <>
              <GatsbyImage
                image={data.image!.gatsbyImageData}
                alt={data.image!.title}
                className="absolute inset-0 h-full w-full"
                style={{ position: "absolute" }}
                objectFit="cover"
                objectPosition="center top"
                backgroundColor="#1b365d"
              />
              <div className="absolute inset-0 bg-[rgba(0,0,0,0.75)] md:bg-[rgba(0,0,0,0.55)]" />
            </>
          )}
          <div className={showImage ? "relative z-10 pb-10" : undefined}>
            <div className="my-5">
              {breadcrumbs.map((item: BreadcrumbType, i) => {
                if (i < breadcrumbs.length - 1) {
                  return (
                    <span key={item.name}>
                      <Link
                        key={item.name}
                        to={item.link}
                        className="hover:underline font-bold text-text-color-secondary"
                      >
                        {item.name}
                      </Link>
                      <span className="mx-1 text-text-color-secondary">|</span>
                    </span>
                  );
                } else {
                  return (
                    <span className="text-text-color-secondary" key={item.name}>
                      {item.name}
                    </span>
                  );
                }
              })}
            </div>
            <h1 className="text-text-color-secondary">{data.heading}</h1>
          </div>
        </div>
      )}
    </>
  );
};

export default SecondaryHeader;
