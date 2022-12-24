import { graphql, Link, useStaticQuery } from "gatsby";
import React from "react";
import { NavigationLinkType } from "../Footer/Footer";

const Navbar = () => {
  const query = useStaticQuery(navbarQuery);
  const navbarData = query.contentfulNavbar;

  return (
    <nav className=" hidden md:block fixed border-b border-b-primary-color bg-navigation-color w-full top-0 z-50 ">
      <div className="nav-container flex items-center justify-between">
        <div className="text-white">
          <Link
            to="/"
            className="hover:underline underline-offset-2 hover:duration-300"
          >
            Home
          </Link>
        </div>
        <div>
          {navbarData &&
            navbarData.navbarLink.map((link: NavigationLinkType) => (
              <Link
                to={link.link}
                key={link.label}
                className="text-white navbar-link underline-offset-2 hover:underline hover:duration-300"
              >
                {link.label}
              </Link>
            ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

export const navbarQuery = graphql`
  query navbar {
    contentfulNavbar {
      navbarLink {
        link
        label
      }
    }
  }
`;
