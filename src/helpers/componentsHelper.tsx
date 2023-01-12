import React from "react";
import HomepageHeader from "../components/HomepageHeader/HomepageHeader";
import TextWithIcons from "../components/TextWithIcons/TextWithIcons";
import ProjectsGrid from "../components/ProjectsGrid/ProjectsGrid";
import ImageLeftWithText from "../components/ImageLeftWithText/ImageLeftWithText";
import IconsRow from "../components/IconsRow/IconsRow";
import ContactForm from "../components/ContactForm/ContactForm";
import SecondaryHeader from "../components/SecondaryHeader/SecondaryHeader";
import ProductsSlider from "../components/ProductsSlider/ProductsSlider";
import ConsultancyForm from "../components/ConsultancyForm/ConsultancyForm";
import TestimonialsSlider from "../components/TestimonialsSlider/TestimonialsSlider";
import PlainTextAndTitle from "../components/PlainTextAndTitle/PlainTextAndTitle";

const componentMap: any = {
  ContentfulHomepageHeader: (v: any) => <HomepageHeader data={v} key={v.id} />,
  ContentfulSecondaryHeader: (v: any) => (
    <SecondaryHeader data={v} key={v.id} />
  ),
  ContentfulTitleAndText: (v: any) => <TextWithIcons data={v} key={v.id} />,
  ContentfulProjects: (v: any) => <ProjectsGrid data={v} key={v.id} />,
  ContentfulImageLeftWithText: (v: any) => (
    <ImageLeftWithText data={v} key={v.id} />
  ),
  ContentfulIconsRow: (v: any) => <IconsRow data={v} key={v.id} />,
  ContentfulContactForm: (v: any) => <ContactForm data={v} key={v.id} />,
  ContentfulProductsSlider: (v: any) => <ProductsSlider data={v} key={v.id} />,
  ContentfulConsultancyForm: (v: any) => (
    <ConsultancyForm data={v} key={v.id} />
  ),
  ContentfulTestimonialsSlider: (v: any) => (
    <TestimonialsSlider data={v} key={v.id} />
  ),
  ContentfulPlainText: (v: any) => <PlainTextAndTitle data={v} key={v.id} />,
};

export const componentBuilder = (strapiComponents: any[]) => {
  const components = strapiComponents.map((component) => {
    let itemsResult = undefined;

    try {
      // find matching component type
      let builderFn = componentMap[component?.__typename];
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
