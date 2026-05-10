import { Link } from "gatsby";
import React from "react";
import Footer from "../components/Footer/Footer";
import NavbarContainer from "../components/Navbar/NavbarContainer";
import SecondaryHeader from "../components/SecondaryHeader/SecondaryHeader";
import { GatsbySeo } from "gatsby-plugin-next-seo";
import { Helmet } from "react-helmet";

// @ts-ignore
import favicon from '/src/images/favicon.ico'
// @ts-ignore
import androidChrome192 from '/src/images/android-chrome-192x192.png'
// @ts-ignore
import androidChrome512 from '/src/images/android-chrome-512x512.png'
// @ts-ignore
import favicon32 from '/src/images/favicon-32x32.png'
// @ts-ignore
import favicon16 from '/src/images/favicon-16x16.png'
// @ts-ignore
import appleTouch from '/src/images/apple-touch-icon.png'

const ErrorPage = () => {
  return (
    <>
    <Helmet>
        <link rel="icon" type="image/x-icon" href={favicon} />
        <link rel="icon" type="image/png" sizes={'192'} href={androidChrome192} />
        <link rel="icon" type="image/png" sizes={'512'} href={androidChrome512} />
        <link rel="icon" type="image/png" sizes={'32'} href={favicon32} />
        <link rel="icon" type="image/png" sizes={'16'} href={favicon16} />
        <link rel="icon" type="image/png" href={appleTouch} />
        {/* Google tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-E6Y4EMVPRH"></script>
        <script>
        {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments)}
            gtag('js', new Date());

            gtag('config', 'G-E6Y4EMVPRH');
            `}
        </script>
    </Helmet>
    <GatsbySeo 
        title="404 - Nikolaos Kalfas" 
        description="The page you requested does not exist."
      />
      <NavbarContainer />
      <SecondaryHeader data={{ heading: "Page not found" }} />
      <section className="page-container min-h-screen">
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
      </section>
      <Footer />
    </>
  );
};

export default ErrorPage;
