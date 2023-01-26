import { Link } from "gatsby";
import React, { useEffect, useState } from "react";

type SecondaryHeaderDataType = {
  data: {
    heading: string;
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
      const element = parts[i];
      if (element === "") {
        continue;
      } else {
        const noDash = element.replaceAll("-", " ").replaceAll("_", " ");
        const label = noDash[0].toUpperCase() + noDash.substring(1);
        cumulativeLink = cumulativeLink + element + "/";
        newBreadCrumbs.push({
          name: label,
          link: cumulativeLink,
        });
      }
    }

    setBreadcrumbs(newBreadCrumbs);
  }, []);

  return (
    <>
      {data.heading && (
        <div className="page-container bg-primary-color w-full pt-80">
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
      )}
    </>
  );
};

export default SecondaryHeader;
