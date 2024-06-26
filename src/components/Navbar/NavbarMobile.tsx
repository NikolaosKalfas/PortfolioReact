import { Link, useStaticQuery } from "gatsby";
import React, { useState } from "react";
import { NavigationLinkType } from "../Footer/Footer";
import { navbarQuery } from "./Navbar";

const NavbarMobile = () => {
  const query = useStaticQuery(navbarQuery);
  const navbarData = query.contentfulNavbar;
  const [isOpen, setIsOpen] = useState(false);

  const openNav = () => {
    setIsOpen(true);
    document.body.classList.add("body-no-scroll");
  };
  const closeNav = () => {
    setIsOpen(false);
    document.body.classList.remove("body-no-scroll");
  };
  return (
    <nav className="md:hidden fixed border-b border-b-primary-color bg-off-white w-full top-0 z-50 ">
      <div className="nav-container-mob flex items-center justify-between">
        <div className="text-primary-color font-semibold">
          <Link
            to="/"
            className="hover:underline underline-offset-2 hover:duration-300"
            onClick={closeNav}
          >
            Home
          </Link>
        </div>
        <div className="cursor-pointer" onClick={isOpen ? closeNav : openNav}>
          {isOpen ? (
            <>
              <div className="h-0.5 w-4 bg-primary-color rotate-45 top-0.5 relative"></div>
              <div className="h-0.5 w-4 bg-primary-color -rotate-45 "></div>
            </>
          ) : (
            <>
              <div className="h-0.5 w-4 bg-primary-color mb-1"></div>
              <div className="h-0.5 w-4 bg-primary-color mb-1"></div>
              <div className="h-0.5 w-4 bg-primary-color"></div>
            </>
          )}
        </div>
      </div>
      {isOpen && (
        <div className="nav-container-mob h-screen flex flex-col items-center">
          {navbarData.products.map((product: NavigationLinkType) => (
            <Link
              to={product.link}
              key={product.label}
              className="text-primary-color underline-offset-2 hover:underline hover:duration-300 text-4xl mt-5"
              onClick={closeNav}
            >
              {product.label}
            </Link>
          ))}
          {navbarData &&
            navbarData.navbarLink.map((link: NavigationLinkType) => (
              <Link
                to={link.link}
                key={link.label}
                className="text-primary-color underline-offset-2 hover:underline hover:duration-300 text-4xl mt-5"
                onClick={closeNav}
              >
                {link.label}
              </Link>
            ))}
        </div>
      )}
    </nav>
  );
};

export default NavbarMobile;
