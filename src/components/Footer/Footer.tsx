import { graphql, Link, useStaticQuery } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import React from "react";

export type SocialLinkType = {
  link: string;
  icon: {
    gatsbyImageData: any;
    title: string;
  };
};

export type NavigationLinkType = {
  label: string;
  link: string;
};

const Footer = () => {
  const query = useStaticQuery(footerQuery);
  const footerData = query.contentfulFooter;

  return (
    <footer className="border-t border-t-primary-color bg-navigation-color w-full">
      <div className="page-container">
        <div className="text-white flex flex-col md:flex-row justify-between md:items-end">
          Nikolaos Kalfas &copy; {new Date().getFullYear()}
          <div className="">
            {footerData.socialLink &&
              footerData.socialLink.map((social: SocialLinkType) => (
                <a
                  href={social.link}
                  key={social.link}
                  className="block"
                  target="_blank"
                >
                  <GatsbyImage
                    image={social.icon.gatsbyImageData}
                    alt={social.icon.title}
                    className="max-w-25"
                  />
                </a>
              ))}
          </div>
        </div>
        <hr className="border-t border-t-primary-color bg-secondary-color my-5" />
        <div className="text-white">
          {footerData.footerLink &&
            footerData.footerLink.map((link: NavigationLinkType) => (
              <Link
                to={link.link}
                key={link.label}
                className="block hover:text-link-primary underline-offset-2 underline hover:duration-300 py-1"
              >
                {link.label}
              </Link>
            ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;

const footerQuery = graphql`
  query footer {
    contentfulFooter {
      footerLink {
        link
        label
      }
      socialLink {
        link
        icon {
          gatsbyImageData
          title
        }
      }
    }
  }
`;
