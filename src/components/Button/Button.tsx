import { Link } from "gatsby";
import React from "react";

type ButtonType = {
  label: string;
  url: string;
  secondary?: boolean;
  ariaLabel?: string;
};

const Button = ({ label, url, secondary, ariaLabel }: ButtonType) => {
  return (
    <Link
      to={url}
      aria-label={ariaLabel}
      className={`${secondary ? "btn-secondary" : "btn-primary"}`}
    >
      {label}
    </Link>
  );
};

export default Button;
