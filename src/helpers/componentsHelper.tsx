import React from "react";
import HomepageHeader from "../components/HomepageHeader/HomepageHeader";
import TitleAndText from "../components/TitleAndText/TitleAndText";

const componentMap: any = {
  ContentfulHomepageHeader: (v: any) => <HomepageHeader data={v} key={v.id} />,
  ContentfulTitleAndText: (v: any) => <TitleAndText data={v} key={v.id} />,
};

export const componentBuilder = (strapiComponents: any[]) => {
  const components = strapiComponents.map((component) => {
    let itemsResult = undefined;

    try {
      // find matching component type
      let builderFn = componentMap[component.__typename];
      // call build function to a JSX component
      itemsResult = builderFn(component);
    } catch {
      (e: any) => console.error(e);
    }

    if (itemsResult === undefined) {
      return <></>;
    }
    return itemsResult;
  });
  return components;
};
