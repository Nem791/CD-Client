import React from "react";
import { Link } from "react-router-dom";

const HaveAccount = ({ text, link, to }) => {
  return (
    <p className="text-center text-lg mb-10">
      {text}{" "}
      <Link
        className="underline font-medium cursor-pointer text-[#90b498]"
        to={to}
      >
        {link}
      </Link>
    </p>
  );
};

export default HaveAccount;
