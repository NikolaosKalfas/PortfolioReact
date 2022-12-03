import { Link } from "gatsby";
import React from "react";

type ButtonType = {
  label: string;
  url: string;
  secondary?: boolean;
};

const Button = ({ label, url, secondary }: ButtonType) => {
  return (
    <Link to={url} className={`${secondary ? "btn-secondary" : "btn-primary"}`}>
      {label}
    </Link>
  );
};

export default Button;
