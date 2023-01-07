import { graphql, Link, useStaticQuery } from "gatsby";
import React, { useState } from "react";
import { NavigationLinkType } from "../Footer/Footer";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const query = useStaticQuery(navbarQuery);
  const navbarData = query.contentfulNavbar;

  return (
    <nav className="hidden md:block fixed border-b border-b-primary-color bg-navigation-color w-full top-0 z-50 ">
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
          {navbarData.products && (
            <div
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="text-white navbar-link underline-offset-2 hover:underline hover:duration-300 cursor-pointer inline navbar-link text-base leading-6 relative"
            >
              Products{" "}
              <div
                className={`text-white inline-block  ${
                  dropdownOpen ? "-rotate-90" : "rotate-90"
                }`}
              >
                &gt;
              </div>
              {dropdownOpen ? (
                <div
                  className="absolute flex flex-col bg-navigation-color top-10 p-4"
                  onMouseLeave={() => setDropdownOpen(false)}
                >
                  {navbarData.products.map((product: NavigationLinkType) => (
                    <Link
                      to={product.link}
                      key={product.label}
                      className="text-white navbar-link underline-offset-2 hover:underline hover:duration-300 pb-2"
                    >
                      {product.label}
                    </Link>
                  ))}
                </div>
              ) : null}
            </div>
          )}
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
      products {
        link
        label
      }
    }
  }
`;
