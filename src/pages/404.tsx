import { Link } from "gatsby";
import React from "react";
import Footer from "../components/Footer/Footer";
import SecondaryHeader from "../components/SecondaryHeader/SecondaryHeader";

const ErrorPage = () => {
  return (
    <div>
      <SecondaryHeader data={{ heading: "Page not found" }} />
      <div className="page-container min-h-screen">
        <p>I’m sorry, the page you have requested doesn’t exist.</p>
        <p>
          Return to{" "}
          <Link
            to="/"
            className="underline hover:duration-300 hover:text-link-primary"
          >
            Home
          </Link>
          .
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default ErrorPage;
