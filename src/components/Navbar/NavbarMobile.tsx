import { Link, useStaticQuery } from "gatsby";
import React from "react";
import { navbarQuery } from "./Navbar";

const NavbarMobile = () => {
  const query = useStaticQuery(navbarQuery);
  const navbarData = query.contentfulNavbar;

  console.log(navbarData);
  return (
    <div className="md:hidden fixed border-b border-b-primary-color bg-navigation-color w-full top-0 z-50 ">
      <div className="nav-container-mob flex items-center justify-between">
        <div className="text-white">
          <Link
            to="/"
            className="hover:underline underline-offset-2 hover:duration-300"
          >
            Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NavbarMobile;
