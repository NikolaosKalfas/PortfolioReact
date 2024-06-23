import { GatsbyImage } from "gatsby-plugin-image";
import React from "react";
import SectionTitle from "../SectionTitle/SectionTitle";

type ProjectsGridDataType = {
  data: {
    title: string;
    projects: ProjectDataType[];
  };
};

type ProjectDataType = {
  title: string;
  link: string;
  image: any;
};

const ProjectsGrid = ({ data }: ProjectsGridDataType) => {
  return (
    <>
      {data.title && (
        <section className="page-container bg-secondary-color">
          {data.title && <SectionTitle title={data.title} secondary />}
          {data.projects && (
            <div className="projects-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2 gap-5">
              {data.projects.map((project) => (
                <a
                  target="__blank"
                  href={project.link}
                  className="text-off-white cursor-pointer grid-card relative"
                  key={project.link}
                >
                  <div className="">
                    <GatsbyImage
                      image={project.image.gatsbyImageData}
                      alt={project.title}
                    />
                  </div>
                  <div className="grid-card-overlay">
                    <p className="">{project.title}</p>
                  </div>
                </a>
              ))}
            </div>
          )}
        </section>
      )}
    </>
  );
};

export default ProjectsGrid;
